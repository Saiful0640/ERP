import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ServiceNameModel } from '../../../../models/service-name-model';
import { AuthService } from '../../../../services/auth.service';
import { CenterServiceNameService } from '../../../../services/center-service-name.service';
import { PayrollServiceService } from '../../../../services/payroll/payroll-service.service';
import { NgbDateCustomParserFormatter } from '../../../../shared/dateformat';
import { Helper } from '../../../../shared/helper';

@Component({
  selector: 'app-center-service-name-setting',
  templateUrl: './center-service-name-setting.component.html',
  styleUrls: ['./center-service-name-setting.component.scss']
})
export class CenterServiceNameSettingComponent implements OnInit {
  constructor(
    private formBuilder:FormBuilder,
    private toasterService:ToastrService,
    private centerService:CenterServiceNameService,
    private payrollService:PayrollServiceService,
    public dateFormatter:NgbDateCustomParserFormatter,
    private modalService:NgbModal
  ) { }
  serviceNameSettingForm:FormGroup;
  isSubmitted: boolean = false;
  serviceName:[]=[];
  salaryHeadSettings:[]=[];
  compID:number;
  title:string;
  branchId:number;
  userId:number;
  btnStatus = 'Save';
  moduleId:number;
  pageId:number;
  labelCngByModule:string;
  ngOnInit() {
    this.compID=AuthService.CompanyId;
    this.moduleId=AuthService.CurrentModuleId;
    this.pageId=AuthService.CurrentPageId;
    this.getAllServiceName();
    this.getAllSalarySettings();
    this.createform();
  }
  getAllServiceName(){
    this.payrollService.getAllServiceHeadName(this.moduleId).subscribe((response:any)=>{
      if(response.status){
        this.serviceName=response.result;
      }else
      {
        this.serviceName=[];
      }
    })
  }
  onChangesalaryHead(headDetails:any){
    this.serviceNameSettingForm.controls.serviceHeadID.setValue(headDetails.id);
  }
  save(){
    if(this.f.isFixedAmount.value==true ){
      this.serviceNameSettingForm.controls.isFixedAmount.setValue(1);
    }else{
      this.serviceNameSettingForm.controls.isFixedAmount.setValue(0);
    }
    console.log(this.serviceNameSettingForm.value);
    this.payrollService.salaryHeadSettingSaveUpdate(this.serviceNameSettingForm.value).subscribe((response:any)=>{
      if(response.status){
        this.toasterService.success(response.result);
        this.reset();
      }else{
        this.toasterService.error(response.status,"Failed!");
      }
  })
}
  onSelect(data:any){
    this.serviceNameSettingForm.patchValue(data);
    this.btnStatus="Update";

  }
  getAllSalarySettings() {
     this.payrollService.getAllSalaryHeadSetting(this.compID).subscribe((response: any) => {
       if (response.status) {
        this.salaryHeadSettings=response.result as any;
       } else {
         this.toasterService.error("No Data Found")
       }
       this.reset();
     })
   }

  reset() {
    this.isSubmitted = false;
    this.btnStatus = 'Save'
    this.createform();
    this.getAllServiceName();
    //this.getAllSalarySettings();
  }
 createform(){
   this.serviceNameSettingForm=this.formBuilder.group({
     id   : [0,[]],
     serviceHeadID  : [,[]],
     grossPercent  : [,[]],
     isFixedAmount  : [,[]],
     compId  : [this.compID,[]],
     serviceTypeID  : [,[]],
     moduleID:[this.moduleId,[]]
   })
 }
 get f(){
  return this.serviceNameSettingForm.controls;
}
get formVal(){
  return this.serviceNameSettingForm.value;
}
}
