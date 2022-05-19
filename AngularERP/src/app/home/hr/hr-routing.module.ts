
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HrIndexComponent } from './hr-index/hr-index.component';
import { Routes, RouterModule } from '@angular/router';
const routes: Routes = [
  { path: 'index', component:HrIndexComponent },
  { path: 'hr-basic-entry', loadChildren: './hr-basic-entry/hr-basic-entry.module#HrBasicEntryModule' },
  { path: 'employee', loadChildren: './employee/employee.module#EmployeeModule' },
  { path: 'leave', loadChildren: './leave/leave.module#LeaveModule' },
  { path: 'hr-reports', loadChildren: './hr-reports/hr-reports.module#HrReportsModule' },
  { path: 'attendance', loadChildren: './attendance/attendance.module#AttendanceModule' },
  { path: 'loan-and-advance', loadChildren: './loan-and-advance/loan-and-advance.module#LoanAndAdvanceModule' },
  ]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class HrRoutingModule { }
