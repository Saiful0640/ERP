import { NgSelectModule } from '@ng-select/ng-select';
import { ReportRoutingModule } from './report-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayrollReportComponent } from './payroll-report/payroll-report.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { LaddaModule } from 'angular2-ladda';
import { HrReportsModule } from '../../hr/hr-reports/hr-reports.module';

@NgModule({
  declarations: [PayrollReportComponent],
  imports: [
    CommonModule,
    ReportRoutingModule,
    NgSelectModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    LaddaModule,
    HrReportsModule
  ]
})
export class ReportModule { }
