import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { PeriodModel } from '../../models/hr/period.model';
import { AuthService } from '../../services/auth.service';
import { BillProcessService } from '../../services/bill-process.service';
import { CenterServiceNameService } from '../../services/center-service-name.service';
import { SettingService } from '../../services/settings/Setting.service';
import { NgbDateCustomParserFormatter } from '../../shared/dateformat';
import { Helper } from '../../shared/helper';
import { CriteriaCenterService } from '../../services/criteria-center.service';

@Component({
  selector: 'app-bill-prepare',
  templateUrl: './bill-prepare.component.html',
  styleUrls: ['./bill-prepare.component.scss']
})
export class BillPrepareComponent implements OnInit {
 title:string;
 moduleID:number;
@Input() voucherType:string;
@Input() partyId:number;
@Input() transType:number;
billProcForm:FormGroup;
  constructor(
    private formBuilder:FormBuilder,
    private toasterService:ToastrService,
    private settingService:SettingService,
    private dateFormatter:NgbDateCustomParserFormatter,
    private proBillService:BillProcessService,
    private modalService:NgbModal,
    private centerService:CenterServiceNameService,
    private criteriaService:CriteriaCenterService,
  ) { }
  compId:number;
  periodItem:PeriodModel[]=[];
  btnStatus = 'Save';
  branchID:number;
  userId:number;
  pageId:number;
  processType:number;
  servicesByType:any[]=[];
  parentDetailsItems:any[]=[];
  subDetailsItems:any[]=[];
  superSubDetailsItems:any[]=[];
  fstlabelName:string;
  sndlableName:string;
  thrdlableName:string;
  @Input() labelName:string;
  criteriaType:any[]=[];
  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.userId=AuthService.UserId;
    this.branchID=AuthService.BranchId;
    this.moduleID=AuthService.CurrentModuleId;
    this.pageId=AuthService.CurrentPageId;
    this.title=Helper.onSetTitleByModuleId(this.moduleID,this.pageId).processTitle;
    this.processType=Helper.onSetTitleByModuleId(this.moduleID,this.pageId).processType;
    this.labelName=Helper.onSetTitleByModuleId(this.moduleID,this.pageId).memberLblName;
    this.getAllCriteriaTypeByModuleId();
    this.createForm();
    this.getCriteria();
    this.getServiceNameByType();
  }
  getAllCriteriaTypeByModuleId(){
    this.criteriaService.getAllCriteriaTypeByModuleId(this.moduleID,this.compId).subscribe((types:any)=>{
      if(types.status){
        this.criteriaType=types.result;
        if(this.criteriaType.length>2){
        this.fstlabelName=this.criteriaType.find(c=>c.criteriaID==1).criteriaCaption;
         this.sndlableName=this.criteriaType.find(c=>c.criteriaID==2).criteriaCaption;
         this.thrdlableName=this.criteriaType.find(c=>c.criteriaID==3).criteriaCaption;
        }else if(this.criteriaType.length>1){
          this.fstlabelName=this.criteriaType.find(c=>c.criteriaID==1).criteriaCaption;
          this.sndlableName=this.criteriaType.find(c=>c.criteriaID==2).criteriaCaption;
        }else{
          this.fstlabelName=this.criteriaType.find(c=>c.criteriaID==1).criteriaCaption;
        }
      }
      else{
        this.criteriaType=[]
      }
    })
  }
  getCriteria() {
    this.criteriaService.getCriteriaCenter(this.moduleID,this.compId,1)
      .subscribe((response: any) => {
        if (response.status) {
       this.parentDetailsItems=(response.result) ;
      }
      },(err:any)=>{
        this.toasterService.error(err.error,"Failed!")
      })
  }
  onSelectCriteria(parentId: number ) {
    if(parentId !=null){
      let subDetailsItems=this.parentDetailsItems.find(crt => crt.detailsID == parentId).subCriteria;
      if( subDetailsItems.length>0){
        this.subDetailsItems=subDetailsItems;
      }else{
        this.f.detailsID.patchValue(parentId)
      }
      }
  }
  onSelectSubCriteria(underCriteriaID: number) {
    if(underCriteriaID !=null){
      let superSubDetailsItems=this.subDetailsItems.find(crt => crt.detailsID == underCriteriaID).subCriteria;
      if( superSubDetailsItems.length>0){
        this.superSubDetailsItems=superSubDetailsItems;
        this.thrdlableName=this.criteriaType.find(c=>c.criteriaID==3).criteriaCaption;
      }else{
        this.f.detailsID.patchValue(underCriteriaID);
      }
    }
  }
  getServiceNameByType(){
    this.centerService.getAllServiceName(this.compId,this.moduleID).subscribe((response:any)=>{
      if(response.status){
        this.servicesByType=response.result;
      }else
      {
        this.servicesByType=[];
      }
    })
  }
  createNewItem(event:any){
    this.modalService.open(event,{size: 'lg', windowClass: 'modal-xl'})
  }
  onSelectMemberInfo(memList:any){
    this.billProcForm.patchValue({
      memberID:memList.id
    })
  }
    onSelectPeriod(periods:any){
      this.billProcForm.patchValue({
        periodID:periods.id
      })
    }
    processBill(){
      if(this.f.detailsID.value ==null && this.f.underCriteriaID.value==null){
        this.f.detailsID.patchValue(this.f.parentID.value);
      }else if(this.f.detailsID.value ==null && this.f.underCriteriaID.value !=null){
        this.f.detailsID.patchValue(this.f.underCriteriaID.value);
      }
      console.log(this.billProcForm.value)
        this.proBillService.processBill(this.billProcForm.value)
        .subscribe((response: any) => {
          if (response) {
            this.toasterService.success(response.message, 'Success');
           // this.isSubmitted = false;
            this.reset();

          } else {
            this.toasterService.error(response.message, 'Failed');
            this.reset();
          }
        })
    }
    reset() {
      this.btnStatus = 'Save'
      this.billProcForm.reset();
      this.createForm();
      this.getServiceNameByType();
    }
  createForm(){
    this.billProcForm=this.formBuilder.group({
      parentID:[,[]],
      underCriteriaID:[,[]],
      detailsID:[,[]],
      memberID:[,[]],
      serviceHead:[this.processType==1?0:null,[]],
      periodID   :[,[]],
      moduleID  :[this.moduleID,[]],
      compId  :[this.compId,[]],
      type:[this.processType,[]]
    })
  }
  get f(){
    return this.billProcForm.controls
  }
  get formVal(){
    return this.billProcForm.value;
  }
}
