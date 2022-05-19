import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ServiceNameModel } from '../../models/service-name-model';
import { AuthService } from '../../services/auth.service';
import { CenterServiceNameService } from '../../services/center-service-name.service';
import { NgbDateCustomParserFormatter } from '../../shared/dateformat';
import { Helper } from '../../shared/helper';

@Component({
  selector: 'app-cenetr-service-name',
  templateUrl: './cenetr-service-name.component.html',
  styleUrls: ['./cenetr-service-name.component.scss']
})
export class CenetrServiceNameComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    // private settingSevice:SettingService,
    private toasterService:ToastrService,
    private centerService:CenterServiceNameService,
    public dateFormatter:NgbDateCustomParserFormatter,
    private modalService:NgbModal
  ) { }
  serviceNameForm:FormGroup;
  isSubmitted: boolean = false;
  serviceName:[]=[];
  compID:number;
  title:string;
  branchId:number;
  userId:number;
  btnStatus = 'Save';
  moduleId:number;
  pageId:number;
  ngOnInit() {
    this.compID=AuthService.CompanyId;
    this.moduleId=AuthService.CurrentModuleId;
    this.pageId=AuthService.CurrentPageId;
    this.getAllServiceName();
    this.createform();
  }
  getAllServiceName(){
    this.centerService.getAllServiceNameNew().subscribe((response:any)=>{
      if(response){
        // this.compID,this.moduleId
        this.serviceName=response;
      }else
      {
        this.serviceName=[];
      }
    })
  }
  onSelect(data:any){
    console.log(data)
    this.serviceNameForm.patchValue(data);
    this.btnStatus="Update";

  }
  onSubmit(){
    if(this.btnStatus=="Save"){
      this.saveServiceName();
    }else{
      this.updateServiceName();
    }
  }
  saveServiceName() {
    this.isSubmitted = true;
     if (this.serviceNameForm.invalid) {
       this.toasterService.error("Please fill the all required fields", "Invalid submission");
       return;
     }
     let serviceNameInfo=new ServiceNameModel();
     serviceNameInfo=this.serviceNameForm.value;
    //  if(this.f.isFixedAmount.value==true ){
    //   serviceNameInfo.isFixedAmount=1;
    // }else{
    //   serviceNameInfo.isFixedAmount=0;
    // }
     this.centerService.saveServiceName(serviceNameInfo).subscribe((response: any) => {
       if (response) {
         this.toasterService.success("Success!")
       } else {
         this.toasterService.error("Failed!")
       }
       this.reset();
     })
   }
  updateServiceName() {
    this.isSubmitted = true;   
     let serviceNameInfo=new ServiceNameModel();
     serviceNameInfo=this.serviceNameForm.value;
    //  if(this.f.isFixedAmount.value==true ){
    //   serviceNameInfo.isFixedAmount=1;
    // }else{
    //   serviceNameInfo.isFixedAmount=0;
    // }
     this.centerService.updateServiceName(serviceNameInfo).subscribe((response: any) => {
       if (response) {
         this.toasterService.success("Success!")
       } else {
         this.toasterService.error("Failed!")
       }
       this.reset();
     })
   }

  reset() {
    this.isSubmitted = false;
    this.btnStatus = 'Save'
    this.createform();
    this.getAllServiceName();
  }
 createform(){
   this.serviceNameForm=this.formBuilder.group({
     id   : [0,[]],
     serviceName  : [,[]],
     unitPrice  : [,[]],
     isFixedAmount  : [,[]],
     accountID  : [0,[]],
     compId  : [this.compID,[]],
     serviceTypeID  : [,[]],
     addDeduct:[null,[]],
     moduleID:[this.moduleId,[]]
   })
 }
 get f(){
  return this.serviceNameForm.controls;
}
get formVal(){
  return this.serviceNameForm.value;
}
}
