import { ReportModule } from './report.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PayrollReportComponent } from './payroll-report/payroll-report.component';
import { PageGuard } from '../../../guards/page.guard';
const routes: Routes = [
  {path:'payroll-report', component:PayrollReportComponent},
  ]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class ReportRoutingModule { }
