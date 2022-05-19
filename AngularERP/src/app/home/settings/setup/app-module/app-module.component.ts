import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ApplicationModuleModel } from '../../../../models/settings/app-settings/application-module.model';
import { Module } from '../../../../models/settings/app-settings/app-module.model';
import { AuthService } from '../../../../services/auth.service';
import { SettingService } from '../../../../services/settings/Setting.service';

@Component({
  selector: 'app-app-module',
  templateUrl: './app-module.component.html',
  styleUrls: ['./app-module.component.scss']
})
export class AppModuleComponent implements OnInit {

  moduleForm:FormGroup;
  modules:ApplicationModuleModel[]=[];
  filteredModules:ApplicationModuleModel[]=[];
  isSubmitted:boolean=false;
  btnStatus:string = 'Save';
  isLoading:boolean = false;
  isSaving:boolean = false;
  constructor(
    private fb:FormBuilder,
    private settingService:SettingService,
    private toaster:ToastrService
  ) {
  }
  ngOnInit() {
    this.createForm();
   this.getModules();

 }
 onSubmit(){
  if(this.btnStatus=="Save"){
    this.save();
  }else{
    this.update();
  }
 }
 save(){
  //  if(this.moduleForm.invalid){
  //   // this.toaster.error('Invalid Submission!');
  //    return;
  //  }
   let appModule = new Module();
   appModule = this.moduleForm.value;
  //  if (this.frmControl.isParent.value == true) {
  //   appModule.isParent = 1;
  // } else {
  //   appModule.isParent = 0;
  // }
  this.isSaving = true;
   this.settingService.saveAppModule(appModule)
   .subscribe((response:any)=>{
     if(response){
      //this.getModules()
       this.toaster.success( 'Success!');
      this.reset();
      }else{
       this.toaster.error( 'Failed!')
     }
     this.isSaving = false;
   },err=>{
     this.isSaving = false;
     throw Error(err)
   })
 }
 update(){
  //  if(this.moduleForm.invalid){
  //   // this.toaster.error('Invalid Submission!');
  //    return;
  //  }
   let appModule = new Module();
   appModule = this.moduleForm.value;
  //  if (this.frmControl.isParent.value == true) {
  //   appModule.isParent = 1;
  // } else {
  //   appModule.isParent = 0;
  // }
  this.isSaving = true;
  console.log(appModule)
   this.settingService.updateAppModule(appModule)
   .subscribe((response:any)=>{
     if(response){
      //this.getModules()
       this.toaster.success( 'Success!');
       this.reset();
     }else{
       this.toaster.error( 'Failed!')
     }
     this.isSaving = false;
   },err=>{
     this.isSaving = false;
     throw Error(err)
   })
 }
 getModules(){
   this.isLoading = true;
  this.settingService.getAllModule()
  .subscribe((response:any)=>{
    if(response){
      this.isLoading = false;
      this.modules = response as ApplicationModuleModel[];
      this.filteredModules = response as ApplicationModuleModel[];
    }
  })
}
 edit(id:number){

   this.btnStatus = 'Update'
   let mod = this.modules.find(c => c.id === id);

   this.moduleForm.patchValue(mod);
 }
 createForm(){
   this.moduleForm = this.fb.group({
     id:[0,[]],
     //parentModuleID:[,[]],
     name:[,[Validators.required]],
     moduleRoutePath:[,[Validators.required]],
     isActive:[true,[]],
     serialNo:[,[]]
   });
 }
 get frmControl(){
   return this.moduleForm.controls;
 }
 reset(){
   this.moduleForm.reset();
   this.isSubmitted=false;
   this.btnStatus = 'Save'
   this.getModules();
 }
 onSearch(searchKey:string){
  if(searchKey){
    this.filteredModules = this.modules.filter(page=>page.name.toLowerCase().match(searchKey.toLowerCase()));
  }else{
    this.filteredModules = this.modules;
  }
}

}
