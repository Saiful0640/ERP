import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { User } from '../../../../models/settings/user.model';
import { AuthService } from '../../../../services/auth.service';
import { MemberPersonalInfoService } from '../../../../services/member-personal-info.service';
import { SettingService } from '../../../../services/settings/Setting.service';

@Component({
  selector: 'app-approval-entry',
  templateUrl: './approval-entry.component.html',
  styleUrls: ['./approval-entry.component.scss']
})
export class ApprovalEntryComponent implements OnInit {

  constructor(
    private formbuilder:FormBuilder,
    private memPersonalInfoService:MemberPersonalInfoService,
    private settingService:SettingService,
    private toasterService:ToastrService
  ) { }
    compId:number;
    moduleId:number;
    users:User[]=[];
    modules:any[]=[];
    approvalForm:FormGroup;
  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.moduleId=AuthService.CurrentModuleId;
    this.getAssignedModules();
    this.getUsers();
    this.createForm();

  }

  getAssignedModules() {
      // this.settingService.GetAssignedModule(this.compId)
      // .subscribe((response: any) => {
      //   if (response.status) {
      //     this.modules = response.result;
      //   }
      // })

  }
  getUsers() {
    this.settingService.getUsers(AuthService.UserTypeId,AuthService.ClientId,AuthService.CompanyId,undefined,1)
      .subscribe((response: any) => {
        if (response.status) {
          this.users = response.result as User[];
        }
      })
  }
  onSubmit(){
    if(this.approvalForm.invalid){
      return this.toasterService.success('Please fill all required field.','Invalid Submission.');
    }
    if(!this.approvalForm.value.canCheck && !this.approvalForm.value.canVerify && !this.approvalForm.value.canApprove){
      return this.toasterService.error('Please select a approval level.','Invalid submission.');
    }
    console.log(this.approvalForm.value);
    this.settingService.saveUserApprovalLevel(this.approvalForm.value)
    .subscribe((response:any)=>{
      if(response.status){
        this.toasterService.success(response.result);
        this.reset();
      }else{
        this.toasterService.error(response.result);
      }
    })
  }
  getApprovalLevel(){
    let formVal = this.approvalForm.value;
    if(formVal.userId && formVal.companyId && formVal.moduleId){
      this.settingService.getUserApprovalLevel(formVal.userId,formVal.companyId,formVal.moduleId)
      .subscribe((response:any)=>{
        if(response.status && response.result){
          this.approvalForm.patchValue(response.result);
        }else{
          this.approvalForm.patchValue({
            canCheck:false,
            canVerify:false,
            canApprove:false
          })
        }
      })
    }
  }
createForm(){
  this.approvalForm=this.formbuilder.group({
    id:[,[]],
    moduleId:[this.moduleId,[]],
    userId:[,[]],
    companyId:[this.compId],
    canCheck:[false,[]],
    canVerify:[false,[]],
    canApprove:[false,[]]
  })
}
get f(){
  return this.approvalForm.controls;
}

reset(){
  this.createForm();
}

}
