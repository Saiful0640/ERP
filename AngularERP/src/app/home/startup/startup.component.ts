import { AssignModule } from './../../models/settings/assign-module.model';
import { Module } from './../../models/settings/app-settings/app-module.model';
import { AuthService } from './../../services/auth.service';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SettingService } from '../../services/settings/Setting.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-startup',
  templateUrl: './startup.component.html',
  styleUrls: ['./startup.component.css']
})
export class StartupComponent implements OnInit{

  public response: string;
  compId: number ;
  userId:number;
  assignModule:AssignModule[]=[];
  modules: Module[] = [];
  allModule:Module[]=[];
  isLoading:boolean = false;
  userRoleId:number;
  constructor(
    private settingService:SettingService,
    private toaster : ToastrService,private router: Router

  ) {
  }
  ngOnInit() {
    this.getModules()
    this.compId=AuthService.CompanyId;
    this.userRoleId=AuthService.UserRoleId;
    this.userId=AuthService.UserId;
    if(this.userRoleId==1){
    this.settingService.getAllModule().subscribe((response:any)=>{
              if(response){
                this.modules=response ;
                console.log(this.modules,"if")
                   } })

    }else if(this.userRoleId==undefined){
      this.router.navigate(['/user/login'])
    }else{
      this.getAssignedModules();
    }
     //this.getAssignedModules();
  }
  getModules(){
    this.isLoading = true;
   this.settingService.getAllModule()
   .subscribe((response:any)=>{
     if(response){
       this.isLoading = false;
       this.allModule = response as any[];
       console.log(this.modules,"Usertype1")

     }
   })
 }
  onModuleSelected(moduleName:string){
    switch(moduleName){
      case 'Accounting':AuthService.CurrentModuleId=6;
      break;
      case 'HR':AuthService.CurrentModuleId=20;
      break;
      case 'Payroll':AuthService.CurrentModuleId=30;
      break;
      case 'Sales & Purchase':AuthService.CurrentModuleId=40;
      break;
      case 'Setting':AuthService.CurrentModuleId=1;
      break;
      default:AuthService.CurrentModuleId=2;
      break;
    }

  }
  getAssignedModules() {
    this.isLoading = true;
    this.settingService.GetAssignedModule()
      .subscribe((response: any) => {
        if (response) {
         this.assignModule = (response as any[]).filter(m=>m.compId==this.compId);
         console.log(response,this.assignModule,this.allModule)
          if(this.assignModule.length>0){
            let modules:Module[]=[];
             for(let i=0;this.assignModule.length>i;i++){
              let module:Module=new Module();
              module.id=this.allModule.find(c=>c.id==this.assignModule[i].moduleId).id;
              module.name=this.allModule.find(c=>c.id==this.assignModule[i].moduleId).name;
              module.moduleRoutePath=this.allModule.find(c=>c.id==this.assignModule[i].moduleId).moduleRoutePath;
              module.isActive=this.allModule.find(c=>c.id==this.assignModule[i].moduleId).isActive;
              module.serialNo=this.allModule.find(c=>c.id==this.assignModule[i].moduleId).serialNo;
              console.log(this.allModule,module)
              modules.push(module);
            }
            this.modules=modules;
                   }else{

            }

        }
        this.isLoading = false;
      },err=>{
        this.isLoading = false;
        this.toaster.error(err.error,'An eror occured');
      })
  }
}
