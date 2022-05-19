import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HrPayrollReportComponent } from './hr-payroll-report/hr-payroll-report.component';
import { LeaveReportComponent } from './leave-report/leave-report.component';
import { PageGuard } from '../../../guards/page.guard';

const routes:Routes=[
  {path:'hr-payroll-report', component:HrPayrollReportComponent},
  {path:'leave-report', component:LeaveReportComponent},

]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class HrReportsRoutingModule { }
