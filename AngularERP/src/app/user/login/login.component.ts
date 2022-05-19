import { Router } from '@angular/router';
import { AuthService } from './../../services/auth.service';
import { Component, ViewEncapsulation, } from '@angular/core';
import { AppService } from '../../app.service';
import { ToastrService } from 'ngx-toastr';
import { SettingService } from '../../services/settings/Setting.service';
import { User } from '../../models/settings/user.model';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../../../vendor/styles/pages/authentication.scss',
    '../../../vendor/libs/ngx-sweetalert2/ngx-sweetalert2.scss',
    '../../../vendor/libs/angular2-ladda/angular2-ladda.scss'],
  styles: [`
    .authentication-inner{
      box-shadow: 0px 0px 5px 0px;
    }
    .loginBtn{
  border-radius: 0px 50px 50px 0px;
}
    `
  ]
})
export class LoginComponent {

  submitted = false;
  isLoading = false;
  users:User[]=[];

  credentials = {
    userName: '',
    password: '',
    rememberMe: false
  };

  loginError = null;

  constructor(private appService: AppService,
    private authService: AuthService,
    private settingsService: SettingService,
    private toastr: ToastrService,
    private router: Router) {

    this.appService.pageTitle = 'Login';
  }

  loginFormInvalid() {
    if (this.credentials.userName.length === 0) {
      return true;
    }

    if (this.credentials.password.length === 0) {
      return true;
    }
    return false;
  }

  // login() {
  //   this.loginError = null;
  //   this.submitted = true;
  //   if (this.loginFormInvalid()) {
  //     return this.toastr.error('Invalid Submission!');
  //   }
  //   this.isLoading = true;
  //   this.settingsService.login(this.credentials).subscribe((response: any) => {
  //     this.isLoading = false;
  //     if (response.status) {
  //         AuthService.IsRemembered = this.credentials.rememberMe;
  //       AuthService.Token = response.result.token;
  //       AuthService.UserTypeId = response.result.userTypeId;
  //        //AuthService.CompanyName = response.result.companyName;
  //       // AuthService.LoginId = this.credentials.userName;
  //       // AuthService.LoginPassword = this.credentials.password;
  //       // AuthService.UserId = response.result.userId;
  //       // AuthService.ClientId = response.result.clientId;
  //       // AuthService.CompanyId = response.result.compId;
  //       // AuthService.BranchId = response.result.branchId;
  //       this.router.navigate(['user/select-company'])
  //     } else {
  //       this.loginError = response.result;
  //     }
  //   }, () => {
  //     this.isLoading = false;
  //   });
  // }
  login() {
    this.isLoading= true;
    this.settingsService.getAllUser().subscribe((response: any) => {
      if (response) {
        //AuthService.UserTypeId,AuthService.ClientId,AuthService.CompanyId,AuthService.UserId
        this.users = (response as User[]).filter(c=>c.isActive==true);
       let isUser:User =  this.users.filter(c=>c.userName==this.credentials.userName && c.password==this.credentials.password)[0];
        if(isUser){
          AuthService.IsRemembered = false;
          AuthService.UserRoleId= isUser.roleId;
          AuthService.UserTypeId= isUser.userTypeId;
          AuthService.UserId=isUser.id;
          AuthService.LoginPassword=isUser.password;
          AuthService.LoginId=isUser.userName;

            this.settingsService.getCompanyById(isUser.compId).subscribe((response:any)=>{
              if(response){
                AuthService.CompanyName=response.name
              }
            })

          AuthService.CompanyId=isUser.compId;
        // AuthService.Token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIxIiwiVXNlck5hbWUiOiJzYSIsIlBhc3N3b3JkIjoiMTIzIiwiVXNlclR5cGVJZCI6IjEiLCJCcmFuY2hJZCI6IjEiLCJFbXBJZCI6IjEiLCJDb21wSWQiOiIxIiwiQ29tcE5hbWUiOiJEZW1vIENvbXAiLCJDbGllbnROYW1lIjoiRGVtb24gQ2xpZW50IiwiQ2xpZW50SWQiOiIxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE2NDY0NTE2MjksImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMS8iLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjQyMDAvIn0.mDMbsq1uroNLkp5C2Dpa61vDSYttw_pUyaM9VRTC5so';
        // AuthService.UserTypeId=1;
        this.router.navigate(['/'])
        }else{
          this.toastr.error("You are not Valid User or please input valid username or password")
        }
      }
      else {
        this.users = [];

      }
      this.isLoading = false;
    })


  }
}
