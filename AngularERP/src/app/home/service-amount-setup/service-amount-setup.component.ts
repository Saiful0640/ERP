import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CenterServiceAmount } from '../../models/center-service-amount';
import { CriteriaCenterModel } from '../../models/criteria-center-model';
import { AuthService } from '../../services/auth.service';
import { CriteriaCenterService } from '../../services/criteria-center.service';
import { ServiceAmountSetupService } from '../../services/service-amount-setup.service';
import { Helper } from '../../shared/helper';
import { CenserviceAmtParam } from '../../models/payroll/censervice-amt-param';


@Component({
  selector: 'app-service-amount-setup',
  templateUrl: './service-amount-setup.component.html',
  styleUrls: ['./service-amount-setup.component.scss']
})
export class ServiceAmountSetupComponent implements OnInit {
  title:string;
  moduleId:number;
  serviceAmountForm:FormGroup;
  criteriaAllArea:any[]=[];
  cenServiceAmountModel:any[]=[];
  serviceBillProcessTypes:any[]=[];
  _serviceAmountForm:FormArray;  
  isSubmitted:boolean=false;
  criteriaForms: FormArray;
  compId:number;
  btnStatus = 'Save';
  isAmountVisible:number;

  /////
  fstlabelName:string;
  sndlableName:string;
  thrdlableName:string;
criteriaType:any[]=[];
criteriaItemForTypeTwo:any[]=[];
criteriaItemForTypeThree:any[]=[];
parentDetailsItems:any[]=[];
subDetailsItems:any[]=[];
superSubDetailsItems:any[]=[];
pageId:number;
/////
  constructor(
    private formBuilder:FormBuilder,
    private toasterService:ToastrService,
    private criteriaService:CriteriaCenterService,
    private serviceAmtSer:ServiceAmountSetupService,
    private modalService:NgbModal
  ) {
    this._serviceAmountForm=this.formBuilder.array([]);
    
   }

  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.moduleId=AuthService.CurrentModuleId;
    this.pageId=AuthService.CurrentPageId;
    this.createForm();
    this.getAllCriteriaTypeByModuleId();
    this.getCriteria();
    this.getServiceBillProcessType();
    this.addRow();
    this.addRow();
    this.addRow();
    this.addRow();
    this.addRow();
    this.addRow();
  }
  getAllCriteriaTypeByModuleId(){
    this.criteriaService.getAllCriteriaTypeByModuleIdNew().subscribe((types:any)=>{
      if(types){
        ///this.moduleId,this.compId
        this.criteriaType=types.filter(c=>c.moduleId==this.moduleId);
        if(this.criteriaType.length>0){
          if(this.criteriaType.length>2){
            this.fstlabelName=this.criteriaType.find(c=>c.id==1).criteriaCaption;
            this.sndlableName=this.criteriaType.find(c=>c.id==2).criteriaCaption;
            this.thrdlableName=this.criteriaType.find(c=>c.id==3).criteriaCaption;
            }else if(this.criteriaType.length>1){
              this.fstlabelName=this.criteriaType.find(c=>c.id==1).criteriaCaption;
              this.sndlableName=this.criteriaType.find(c=>c.id==2).criteriaCaption;
              }else {
                this.fstlabelName=this.criteriaType.find(c=>c.id==1).criteriaCaption;
              }
        }
      }
      else{
        this.criteriaType=[]
      }
    })
  }

  getCriteria() {
    this.criteriaService.getDetailsCriteriaCenter(this.moduleId,1,0)
      .subscribe((response: any) => {
        if (response) {
          //this.moduleId,this.compId,1
       this.parentDetailsItems=response;
       if(this.parentDetailsItems.length>0){
         for(let i=0;this.parentDetailsItems.length>i;i++){
           this.criteriaService.getDetailsCriteriaCenter(this.moduleId,2,this.parentDetailsItems[i].id).subscribe((subresponse:any)=>{
             if(subresponse){
              this.parentDetailsItems[i].subCriteria=subresponse;
              if(this.parentDetailsItems[i].subCriteria.length>0){
                for(let subi=0;this.parentDetailsItems[i].subCriteria.length>subi;subi++){
                  this.criteriaService.getDetailsCriteriaCenter(this.moduleId,3,this.parentDetailsItems[i].subCriteria[i].id).subscribe((supersubres:any)=>{
                    if(supersubres){
                      this.parentDetailsItems[i].subCriteria[i].subCriteria=supersubres;
                    }
                  })
                }
              }
             }
           })
         }
       }
       console.log(this.parentDetailsItems)
      }
      },(err:any)=>{
        this.toasterService.error(err.error,"Failed!")
      })
  }
  onSelectCriteria(parentId: number ) {   
    if(parentId !=null){      
      let subDetailsItems=this.parentDetailsItems.find(crt =>crt.id == parentId).subCriteria;
      if( subDetailsItems.length>0){
        this.subDetailsItems=subDetailsItems;
      }else{
        this.f.detailsID.patchValue(parentId);
        this.getAllCenServicAmount(parentId);
      }
      }
  }

  onSelectSubCriteria(underCriteriaID: number) {
    if(underCriteriaID !=null){
      let superSubDetailsItems=this.subDetailsItems.find(crt => crt.id == underCriteriaID).subCriteria;
      if( superSubDetailsItems.length>0){
        this.superSubDetailsItems=superSubDetailsItems;
      }else{
        this.f.detailsID.patchValue(underCriteriaID)
        //this.getAllCenServicAmount(underCriteriaID)
      }
    }
  }

  onSelectSupSubCriteria(detailsId: number) {
    this.getAllCenServicAmount(detailsId);
  }

  getServiceBillProcessType(){
    this.serviceAmtSer.getServiceBillProcessType().subscribe((response:any)=>{
      if(response){
        this.serviceBillProcessTypes=response;
      }
      else{
        this.serviceBillProcessTypes=[]
      }
    })
  }

  onSelectServiceHead(services:any,i:number){
    this._serviceAmountForm.controls[i].patchValue({
      serviceID:services.id
    })
  }
  onVisibleAmount(processType:number){
    this.isAmountVisible=processType;

  }
  getAllCenServicAmount(detailsID:number){
    if(detailsID !=null){
    this.serviceAmtSer.getAllCenServiceAmountNew(this.moduleId,detailsID).subscribe((response:any)=>{
      if(response){
        this.cenServiceAmountModel=response;
        if(this.cenServiceAmountModel.length >0){
      this._serviceAmountForm = this.formBuilder.array([]);
      this.cenServiceAmountModel.forEach(item=>{
        this._serviceAmountForm.push(
          new FormGroup({
            id:new FormControl(item.id,[]),
            serviceID:new FormControl(item.serviceID,[]),
            amount:new FormControl(item.amount,[])   ,
            serialNo:new FormControl(item.serialNo,[]) ,
            processType:new FormControl(item.processType,[])
          })
        )
   })
  } else{
    this._serviceAmountForm = this.formBuilder.array([]);
    this.addRow();
    this.addRow();
    this.addRow();
    this.addRow();
    this.addRow();
    this.addRow();
  }
      }else
      {
        this.cenServiceAmountModel=[];
      }
    })
  }
  }
  saveServiceAmt() {
    this.isSubmitted = true;
     if (this.serviceAmountForm.invalid) {
       this.toasterService.error("Please fill the all required fields", "Invalid submission");
       return;
     }  
      if(this._serviceAmountForm.length>0){
       if(this.f.detailsID.value>0){
        let cenParam=new CenserviceAmtParam();
        cenParam.detailsId=this.f.detailsID.value;
        cenParam.moduleId=this.moduleId;
        this.serviceAmtSer.deleteCenServiceAmtSetting(cenParam).subscribe((res:any)=>{ 
          for(let i=0;this._serviceAmountForm.length>i;i++){
            let serAmt=new CenterServiceAmount();
            serAmt.id=this.f.id.value ;
            serAmt.detailsID=this.f.detailsID.value 
            serAmt.serviceID=this._serviceAmountForm.value[i]['serviceID'] ;
            serAmt.amount=this._serviceAmountForm.value[i]['amount'];
            serAmt.compID=this.compId; 
            serAmt.moduleID=this.moduleId;
            serAmt.processType=this._serviceAmountForm.value[i]['processType'];
            serAmt.serialNo=i
            if(serAmt.serviceID >0){
              this.serviceAmtSer.saveServiceAmount(serAmt).subscribe((response: any) => {
                if (response) {
                  this.toasterService.success( "Success!")
                } else {
                  this.toasterService.error( "Failed!")
                }
                this.reset();
              })
            }

          }

        })
       }
      }

  
   }
   createSupSubCriteriaForms(supSubCriterias: any[]): FormArray {
    let supSubCriteriaForms: FormArray = this.formBuilder.array([]);
    supSubCriterias.forEach(subCriteria => {
      supSubCriteriaForms.push(new FormGroup({
        id: new FormControl(subCriteria.id),
        detailsID: new FormControl(subCriteria.detailsID),
        detailsCaption: new FormControl(subCriteria.detailsCaption),
        isSelected: new FormControl(false)
      }))
    })
    return supSubCriteriaForms;
  }
  createSubCriteriaForms(subCriterias: any[]): FormArray {
    let subCriteriaForms: FormArray = this.formBuilder.array([]);
    subCriterias.forEach(subCriteria => {
      subCriteriaForms.push(new FormGroup({
        detailsID: new FormControl(subCriteria.detailsID),
        detailsCaption: new FormControl(subCriteria.detailsCaption),
        subCriteria: this.createSupSubCriteriaForms(subCriteria.subCriteria),
        isSelected: new FormControl(false)
      }))
    })
    return subCriteriaForms;
  }

 createCriteriaForms(criterias: any[]) {
  (criterias).forEach(crt => {
    this.criteriaForms.push(new FormGroup({
      detailsID: new FormControl(crt.detailsID, []),
      detailsCaption: new FormControl(crt.detailsCaption, []),
      subCriteria: this.createSubCriteriaForms(crt.subCriteria),
      isSelected: new FormControl(false, [])
    }))
  })
}
  addRow() {
    this._serviceAmountForm.push(
    new FormGroup({
      id:new FormControl(0,[]),
      serviceID:new FormControl(null,[]),
      amount:new FormControl(null,[])  ,
      meterNo:new FormControl(null,[]) ,
      serialNo:new FormControl(null,[]) ,
      processType:new FormControl(null,[])
    })
  )
}
  createForm(){
    this.serviceAmountForm=this.formBuilder.group({
      id:[,[]] ,
      detailsID   :[,[]],
      moduleID  :[this.moduleId,[]],
      compID  :[this.compId,[]],
      criteriaID:[,[]],
      parentID:[,[]],
      underCriteriaID:[,[]]
    })
  }
  reset() {
     this.btnStatus = 'Save'
     this.serviceAmountForm.reset();
     this.createForm();
     this.criteriaForms = this.formBuilder.array([]);
     this._serviceAmountForm=this.formBuilder.array([]);
     this.addRow();
     this.addRow();
     this.addRow();
     this.addRow();
     this.addRow();
     this.addRow();
    //  this.getCriteria();
   }
  removeRow(index:number){
    this._serviceAmountForm.removeAt(index);
  }
  get f(){
    return this.serviceAmountForm.controls
  }
  get formVal(){
    return this.serviceAmountForm.value;
  }
}
