import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PayrollIndexComponent } from './payroll-index/payroll-index.component';
const routes: Routes = [
  { path: 'index', component:PayrollIndexComponent },
  { path: 'setting', loadChildren: './setting/setting.module#SettingModule' },
  { path: 'salary-process', loadChildren: './salary-process/salary-process.module#SalaryProcessModule' },
  { path: 'payroll-transaction', loadChildren: './payroll-transaction/payroll-transaction.module#PayrollTransactionModule' },
  { path: 'report', loadChildren: './report/report.module#ReportModule' },
  ]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class PayrollRoutingModule { }
