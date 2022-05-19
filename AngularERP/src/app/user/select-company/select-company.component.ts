import { UserType } from './../../shared/lookup';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../app.service';
import { AuthService } from '../../services/auth.service';
import { SettingService } from '../../services/settings/Setting.service';

@Component({
  selector: 'app-select-company',
  templateUrl: './select-company.component.html',
  styleUrls: ['./select-company.component.scss', '../../../vendor/styles/pages/authentication.scss']
})
export class SelectCompanyComponent implements OnInit {
  companies: any[] = [];
  branches: any[] = [];
  loginCompId: number;
  loginCompName: string;
  loginBranchId: number;
  companyType:number;


  constructor(
    private settingsServices: SettingService,
    private toaster: ToastrService,
    private appService: AppService
  ) { }
  ngOnInit() {

    // if (AuthService.isAuthenticated()) {
    //   this.getCompanies();
    // } else {
    //   this.appService.redirect('/user/login')
    // }
    this.getCompanies();
  }

  getCompanies() {
    this.companies=[{
      address: null,
bin: null,
branches: [{
  address: null,
branchId: 5,
branchName: "Demo Branch",
compId: 1,
companyName: null,
contactNo: null,
createdBy: 1,
criteriaId: 0,
id: 5,
isActive: null,
isAssigned: false,
name: "Demo Branch",
shortName: "test",
userId: 0
}],
businessType: null,
clientId: 1,
compId: 1,
companyType: 1,
dateCreated: "2022-02-25T02:07:17.493",
description: null,
email: null,
id: null,
idenNo: 1,
isActive: true,
isAssigned: false,
logo: null,
name: "Demo Comp",
phone: null,
tin: null,
userId: 0,
website: null,
    }]
    // this.settingsServices.getCompanies(AuthService.UserId, AuthService.UserTypeId, AuthService.ClientId)
    //   .subscribe((response: any) => {
    //     if (response.status) {
    //       this.companies = (response.result as any[])
          console.log( this.companies)
          // if (this.companies.length > 0) {
             this.loginCompId = this.companies[0].compId;
             this.loginCompName = this.companies[0].name;
           this.branches = (this.companies[0].branches as any[]);
             this.companyType=this.companies[0].companyType;
          //   this.settingsServices.getCompIdName(AuthService.ClientId,this.loginCompId,this.companies[0].clientId)
            if ((this.companies[0].branches as any[]).length > 0) {
              this.loginBranchId = (this.companies[0].branches as any[])[0].branchId;
              if (this.companies.length == 1 && (this.companies[0].branches as any[]).length == 1) {
                this.onSubmit();
              }
            }

          // }
      //   }
      // })
  }
  onChangeCompany(company) {

    if (company) {
      this.loginCompName = company.name;
      this.companyType=company.companyType;
      this.branches = (company.branches as any[]).filter(branch => (branch.isAssigned
        || AuthService.UserTypeId == UserType.SuperAdmin
        || AuthService.UserTypeId == UserType.ClientAdmin));
      if (this.branches.length > 0) {
        this.loginBranchId = this.branches[0].branchId;
        if (this.branches.length == 1) {
          this.onSubmit();
        }
      }
    }
  }
  onSelectbranch(branch){
    if(branch){
      this.loginCompName=this.loginCompName+" - "+branch.branchName+"";
    }
  }
  onSubmit() {
    // if (!this.loginCompId) {
    //   this.toaster.error('Select a company', 'Invalid Submission');
    //   return;
    // }
    // if (!this.loginBranchId) {
    //   this.toaster.error('Select a branch', 'Invalid Submission');
    //   return;
    // }
    AuthService.CompanyId = this.loginCompId;
    AuthService.CompanyName = this.loginCompName;
    AuthService.BranchId = this.loginBranchId;
    AuthService.CompanyType=this.companyType;
    AuthService.CurrentModuleId=1;
    if(this.loginBranchId==29 && this.companyType==5){
      AuthService.CompanyName=this.loginCompName+' - '+'Head Office';
    }
    if (AuthService.UserTypeId == UserType.SuperAdmin) {
      this.appService.redirect('/');
    } else {
      this.appService.redirect('/');
    }

  }
  onBack() {
    localStorage.clear()
    sessionStorage.clear()
    this.appService.redirect('user/login');
  }
}
