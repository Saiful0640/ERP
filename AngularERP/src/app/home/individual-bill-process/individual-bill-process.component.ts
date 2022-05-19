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

@Component({
  selector: 'app-individual-bill-process',
  templateUrl: './individual-bill-process.component.html',
  styleUrls: ['./individual-bill-process.component.scss']
})
export class IndividualBillProcessComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private toasterService:ToastrService,
    private proBillService:BillProcessService,
    private modalService:NgbModal,
    private centerService:CenterServiceNameService,
  ) { }
  title:string;
  moduleID:number;
 @Input() voucherType:string;
 @Input() partyId:number;
 @Input() transType:number;
 individualBillProcForm:FormGroup;
 compId:number;
  periodItem:PeriodModel[]=[];
  btnStatus = 'Save';
  branchID:number;
  userId:number;
  pageId:number;
  processType:number;
  servicesByType:any[]=[];
  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.userId=AuthService.UserId;
    this.branchID=AuthService.BranchId;
    this.moduleID=AuthService.CurrentModuleId;
    this.pageId=AuthService.CurrentPageId;
    this.title=Helper.onSetTitleByModuleId(this.moduleID,this.pageId).processTitle;
    this.processType=Helper.onSetTitleByModuleId(this.moduleID,this.pageId).processType;
    this.createForm();
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
    this.individualBillProcForm.patchValue({
      memberIDOrEmpCode:memList.id
    })
  }
    onSelectPeriod(periods:any){
      this.individualBillProcForm.patchValue({
        periodID:periods.id
      })
    }
    processBill(){
        this.proBillService.processBill(this.individualBillProcForm.value)
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
      this.individualBillProcForm.reset();
      this.createForm();
      this.getServiceNameByType();
    }
  createForm(){
    this.individualBillProcForm=this.formBuilder.group({
      serviceHead:[this.processType==1?0:null,[]],
      periodID   :[,[]],
      moduleID  :[this.moduleID,[]],
      compId  :[this.compId,[]]
    })
  }
  get f(){
    return this.individualBillProcForm.controls
  }
  get formVal(){
    return this.individualBillProcForm.value;
  }
}
