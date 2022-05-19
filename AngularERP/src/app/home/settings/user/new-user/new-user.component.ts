import { UserType } from './../../../../shared/lookup';
import { ToastrService } from 'ngx-toastr';
import { SettingService } from '../../../../services/settings/Setting.service';
import { User } from './../../../../models/settings/user.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { Company } from '../../../../models/settings/company.model';
import { Helper } from '../../../../shared/helper';

@Component({
  selector: 'app-new-user',
  templateUrl: './new-user.component.html',
  styleUrls: ['./new-user.component.scss', '../../../../../vendor/libs/ng-select/ng-select.scss']
})
export class NewUserComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private settingService: SettingService,
    private toasterService: ToastrService,
    private route: ActivatedRoute,
    private router:Router
  ) { }
  users: User[] = [];
  filteredUsers:User[]=[];
  isLoading:boolean = false;
  isSuperAdmin = AuthService.UserTypeId==UserType.SuperAdmin;
  clientId:number;
  compId:number;
  branchId:number;
  userId:number;
  userForm: FormGroup;
  userTypes: any[] = [];
  branches:any[]=[];
  userRoles:any[]=[];
  btnStatus = "Create";
  moduleId:number=30;//Module 30 for HR

  ngOnInit() {
    // this.clientId = AuthService.ClientId;
    // this.compId = AuthService.CompanyId;
    // this.branchId = AuthService.BranchId;
    // this.userId = AuthService.UserId;
    this.getUserRole();
    this.createForm();
    // this.editUser(this.route.snapshot.params['userId']);
     this.getUsers();

  }
  getUsers() {
    this.isLoading = true;
    this.settingService.getAllUser().subscribe((response: any) => {
      if (response) {
        //AuthService.UserTypeId,AuthService.ClientId,AuthService.CompanyId,AuthService.UserId
        this.users = (response as User[]).filter(c=>c.isActive==true);
        this.filteredUsers = (response as User[]).filter(c=>c.isActive==true);
        console.log("res",this.filteredUsers);
      }
      else {
        this.users = [];
        this.filteredUsers = []
      }
      this.isLoading = false;
    })
  }

  onSearch(searchKey:string){
    this.isLoading = true;
    if(searchKey){
      this.filteredUsers = this.users.filter(user=>{
        return Helper.coalesce(user.userName,'').toLowerCase().match(searchKey.toLowerCase())
      //   || Helper.coalesce(user.companyName,'').toLowerCase().match(searchKey.toLowerCase())
      //   || Helper.coalesce(user.branchName,'').toLowerCase().match(searchKey.toLowerCase())
      //   || Helper.coalesce(user.userTypeName,'').toLowerCase().match(searchKey.toLowerCase())
       })
    }else{
      this.filteredUsers = this.users;
    }
    this.isLoading = false;
  }
  onSelectCompany(company:Company){
    if(company){
      this.userForm.patchValue({
        //clientId:company.clientId,
        compId:company.id
      })
     // this.branches = company.branches;
    }else{
      this.branches = [];
    }
  }
  onSelectEmp(employee) {
    if (employee) {
      console.log(employee);
      this.userForm.patchValue({
        empId: employee.memberCode,
      })
    }
  }
  onSelectuserType(userType) {
    if (userType) {
      this.userForm.patchValue({
        userTypeId: userType.id
      })
    }
  }
  onSubmit(){
    if(this.btnStatus=="Create"){
      this.saveUser();
    }else{
      this.updateUser();
    }
  }
  saveUser() {
    // if(this.userForm.invalid){
    //  // this.toasterService.error('Invalid Submission!','Failed');
    //   return;
    // }
    this.settingService.saveUser(this.userForm.value).subscribe((response: any) => {
      if (response) {
        this.toasterService.success('User Saved', "Success!");
        //this.createForm();
        //this.router.navigate(['settings/assign/page'])
      } else {
        this.toasterService.error(response)
      }
      this.reset();
    })
  }
  updateUser() {
    // if(this.userForm.invalid){
    //  // this.toasterService.error('Invalid Submission!','Failed');
    //   return;
    // }
    alert("kajhoyse")
    this.settingService.updateUser(this.userForm.value).subscribe((response: any) => {
      if (response) {
        this.toasterService.success('User Updated', "Success!");
        //this.createForm();
        //this.router.navigate(['settings/assign/page'])
      } else {
        this.toasterService.error(response)
      }
      this.reset();
    })
  }
  getBranches(compId=this.compId){
    this.settingService.getAllBranch(compId)
    .subscribe((response:any)=>{
      if(response.status){
        this.branches = response.result as any[];
      }else{
        this.branches=[];
      }
    })
  }
  getUserRole(){
    this.settingService.getUserRole()
    .subscribe((response:any)=>{
      if(response){
        this.userRoles = response as any[];
      }else{
        this.userRoles=[];
      }
    })
  }
  edit(user:any){
    this.btnStatus="Update";
    console.log(user);
    this.userForm.patchValue(user);

  }
  editUser(id) {
    if (id != null) {
      this.settingService.getUsers(UserType.User,-1,-1,id).subscribe((response: any) => {
        if (response.status) {
          this.userForm.patchValue((response.result as User[])[0]);
          this.btnStatus = 'Update';
          this.getBranches((response.result as User[])[0].compId)
        }
      })
    }else{
      this.getBranches();
    }
  }

  reset() {
    this.createForm();
    this.getUsers();
    this.btnStatus = "Create";
  }
  createForm() {
    this.userForm = this.formBuilder.group({
      id: [, []],
      userName: [, [Validators.required]],
      password: [, [Validators.required]],
      //clientId: [this.clientId, []],
      compId: [this.compId, []],
      //branchId: [this.branchId, []],
      empId: [, []],
      isActive: [UserType.User, []],
      userTypeId: [, []],
      //createdBy:[this.userId,[]],
      roleId:[,[]]
    })
  }

  get f() {
    return this.userForm.controls;
  }
}
