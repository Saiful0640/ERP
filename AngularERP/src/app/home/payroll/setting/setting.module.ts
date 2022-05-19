import { NgSelectModule } from '@ng-select/ng-select';
import { SettingRoutingModule } from './setting-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { LaddaModule } from 'angular2-ladda';
import { HomeModule } from '../../home.module';
import { SetupModule } from '../../settings/setup/setup.module';
import { EmpSalaryStructureComponent } from './emp-salary-structure/emp-salary-structure.component';
import { PayrollCriteriaEntryComponent } from './payroll-criteria-entry/payroll-criteria-entry.component';
import { MonthlyAttendenceComponent } from './monthly-attendence/monthly-attendence.component';
import { PayrollSectionComponent } from './payroll-section/payroll-section.component';
import { HrBasicEntryModule } from '../../hr/hr-basic-entry/hr-basic-entry.module';
import { EmpSalaryStructureSComponent } from './emp-salary-structure-s/emp-salary-structure-s.component';
import { CenterServiceNameSettingComponent } from './center-service-name-setting/center-service-name-setting.component';

@NgModule({
  declarations: [EmpSalaryStructureComponent, PayrollCriteriaEntryComponent, MonthlyAttendenceComponent, PayrollSectionComponent, EmpSalaryStructureSComponent, CenterServiceNameSettingComponent],
  imports: [
    CommonModule,
    SettingRoutingModule,
    NgSelectModule,
    ReactiveFormsModule,
    SharedModule,
    LaddaModule,
    HomeModule,
    SetupModule,
    HrBasicEntryModule
  ],
  exports: [MonthlyAttendenceComponent]
})
export class SettingModule { }
