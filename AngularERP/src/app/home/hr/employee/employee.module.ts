import { NgSelectModule } from '@ng-select/ng-select';
import { LaddaModule } from 'angular2-ladda';
import { SharedModule } from './../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeGenInfoComponent } from './employee-gen-info/employee-gen-info.component';
import { EmploymentInfoComponent } from './employment-info/employment-info.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { FamilyInfoComponent } from './family-info/family-info.component';
import { HomeModule } from '../../home.module';


@NgModule({
  declarations: [EmployeeGenInfoComponent, EmploymentInfoComponent, FamilyInfoComponent],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    LaddaModule,
    NgSelectModule,
    HomeModule
  ]
})
export class EmployeeModule { }
