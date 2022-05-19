import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SettingService } from '../../../../services/settings/Setting.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  formGroup:FormGroup;
  isSubmitted=false;
  btnStatus:string="Change Password"
  dataModel:any[]=[];
  userName:string;

  constructor(
    private formBuilder:FormBuilder,
    private settingService: SettingService,
    private toastr:ToastrService
  ) { }

  ngOnInit() {
    //  if(localStorage.getItem('isRemembered')=='true'){
    //   this.userName = localStorage.getItem('userName')
    // }else{
    //   this.userName = sessionStorage.getItem('userName');
    // }
    this.createForm();
  }

  saveData(){
    this.markFormGroupTouched(this.formGroup);
    if(this.formGroup.invalid){
      return;
    }
    this.settingService.changePassword(this.formVal.userName, this.formVal.oldPassword, this.formVal.newPassword)
    .subscribe((response:any)=>{
      if(response.status){
        this.toastr.success(response.message, 'Success!')
        this.formGroup.reset();
      }else{
        this.toastr.error(response.message, 'Failed')
      }
    })
  }

  reset(){
    this.isSubmitted=false;
    this.formGroup.reset();
    this.createForm();
    this.btnStatus="Change Password"
  }
   markFormGroupTouched(group:FormGroup){
    Object.values(group.controls).forEach((control:AbstractControl)=>{
      control.markAsTouched();
    })
  }

  createForm(){
    this.formGroup=this.formBuilder.group({
      id:[,[]],
      userName:[this.userName,[Validators.required]],
      oldPassword:[,[Validators.required]],
      newPassword:[,[Validators.required]],
      confirmPassword:[,[Validators.required]]
    },
    {validator: this.isMatch('newPassword', 'confirmPassword')})
  }

  get formVal(){
    return this.formGroup.value;
  }

  get f(){
    return this.formGroup.controls;
  }

  isMatch(value1:string, value2:string){
    return (group: FormGroup) => {
      if (group.controls[value1].value !=  group.controls[value2].value) {
        return group.controls[value2].setErrors({matched: false})
      }
    }
  }

}
