import { RolePrivilegeComponent } from './role-privilege/role-privilege.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NewUserComponent } from './new-user/new-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserComponent } from './user.component';
import { RoleComponent } from './role/role.component';
import { ChangePasswordComponent } from './change-password/change-password.component';

const routes:Routes = [
  {path: 'new-user', component:NewUserComponent},
  {path: 'user-list', component:UserListComponent},
  {path: 'change-password', component:ChangePasswordComponent},
  {path: 'user', component:UserComponent},
 {path: 'role', component:RoleComponent},
 {path:'role-privilege' , component:RolePrivilegeComponent}

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class UserRoutingModule { }
