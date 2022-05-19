import { HomeModule } from './../../home.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HrPayrollReportComponent } from './hr-payroll-report/hr-payroll-report.component';
import { LeaveReportComponent } from './leave-report/leave-report.component';
import { HrReportsRoutingModule } from './hr-reports-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { LaddaModule } from 'angular2-ladda';

@NgModule({
  declarations: [HrPayrollReportComponent, LeaveReportComponent],
  imports: [
    CommonModule,
    HrReportsRoutingModule,
    NgSelectModule,
    HomeModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    LaddaModule
  ],
  exports:[
    HrPayrollReportComponent
  ]
})
export class HrReportsModule { }
