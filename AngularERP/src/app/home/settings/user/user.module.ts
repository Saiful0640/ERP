import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { UserComponent } from './user.component';
import { NewUserComponent } from './new-user/new-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UserRoutingModule } from './user-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { RoleComponent } from './role/role.component';
import { RolePrivilegeComponent } from './role-privilege/role-privilege.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ChangePasswordComponent } from './change-password/change-password.component';

@NgModule({
  declarations: [UserComponent, NewUserComponent, UserListComponent, RoleComponent, RolePrivilegeComponent, ChangePasswordComponent],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule,
    NgSelectModule,
    ReactiveFormsModule,

  ]
})
export class UserModule { }
