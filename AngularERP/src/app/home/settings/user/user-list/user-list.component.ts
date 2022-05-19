import { AuthService } from './../../../../services/auth.service';
import { UserType } from './../../../../shared/lookup';
import { User } from './../../../../models/settings/user.model';
import { ApiResponse } from './../../../../models/api-response';
import { SettingService } from '../../../../services/settings/Setting.service';
import { Component, OnInit } from '@angular/core';
import { Helper } from '../../../../shared/helper';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit {

  constructor(
    private settingService: SettingService
  ) { }
  users: User[] = [];
  filteredUsers:User[]=[];
  isLoading:boolean = false;
  isSuperAdmin = AuthService.UserTypeId==UserType.SuperAdmin;
  ngOnInit() {
    this.getUsers();
  }
  getUsers() {
    this.isLoading = true;
    this.settingService.getUsers(AuthService.UserTypeId,AuthService.ClientId,AuthService.CompanyId,AuthService.UserId).subscribe((response: any) => {
      if (response.status) {
        this.users = response.result as User[];
        this.filteredUsers = response.result as User[];
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
}
