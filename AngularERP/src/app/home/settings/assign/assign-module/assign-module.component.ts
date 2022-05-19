import { Module } from './../../../../models/settings/app-settings/app-module.model';
import { Company } from './../../../../models/settings/company.model';
import { forEach } from '@angular/router/src/utils/collection';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AssignModule } from '../../../../models/settings/assign-module.model';
import { AuthService } from '../../../../services/auth.service';
import { SettingService } from '../../../../services/settings/Setting.service';

@Component({
  selector: 'app-assign-module',
  templateUrl: './assign-module.component.html',
  styleUrls: ['./assign-module.component.scss']
})
export class AssignModuleComponent implements OnInit {
  assignModules: AssignModule[]=[];
  compId:number;
  userId:number ;
  modules:Module[]=[];
  clientId:number;

  constructor(
    private settingService:SettingService,
    private toasterService:ToastrService,
    private router:Router
  ) { }

  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.userId= AuthService.UserId;
    console.log( this.compId, this.userId);
    this.getAllModule();

  }
  getAllModule(){
    this.settingService.getAllModule().subscribe((response:any)=>{
      if(response){
        this.modules=response;
      }
    })
  }

  getAssignedModules(company) {
     if(company){
       this.compId= company.id;
        //this.modules =this.modules.filter(c=>c.id==company.id)
         this.settingService.GetAssignedModule()
         .subscribe((response: any) => {
           if (response) {
            this.assignModules = (response).filter(c=>c.compId==company.id);
            if(this.assignModules.length>0){
              for(let i=0; this.assignModules.length>i; i++ ){
                this.modules.filter(c=>c.id == this.assignModules[i].moduleId  )
                let isCheckedId='moduleCheck'+i
                document.getElementById(isCheckedId).setAttribute('Checked','true')

              }
            }
           console.log(response);
           }
         })
      }
  }
  onChangeEvent(isCheakced, moduleId:number){
    if(isCheakced){
      let assignModule = new AssignModule();
      assignModule.id=null;
       assignModule.moduleId = moduleId;
       assignModule.compId = this.compId;
       assignModule.assignBy = this.userId;
       this.assignModules.push(assignModule);
    }

  }
  onSubmit(){
  // let assignedModule = this.modules.filter(m=>m.isAssigned).map(mod=>{
  //   return {moduleID:mod.moduleID,compId:mod.compId,assignBy:this.userId,id:0, isAssigned:1}
  // });
  for(let i=0; this.assignModules.length>i; i++){
    console.log(this.assignModules.length,this.assignModules[i])
    this.settingService.assignModule(this.assignModules[i])
  .subscribe((response:any)=>{
    if(response){
      this.toasterService.success('Success')
     // this.router.navigate(['settings/user/new-user'])
    }
    else{
      this.toasterService.error('Failed')
    }
  })
  };


  }
}
