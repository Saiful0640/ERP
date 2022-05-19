
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { UserRoutingModule } from './user-routing.module';
import { LoginComponent } from './login/login.component';
import { LockComponent } from './lock/lock.component';
import { RetrieveComponent } from './retrieve/retrieve.component';
import { LaddaModule } from 'angular2-ladda';
import { SelectCompanyComponent } from './select-company/select-company.component';
import { NgSelectModule } from '@ng-select/ng-select';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    UserRoutingModule,
    LaddaModule,
    NgSelectModule
  ],
  declarations: [
    LoginComponent,
    LockComponent,
    RetrieveComponent,
    SelectCompanyComponent
  ]
})
export class UserModule { }
