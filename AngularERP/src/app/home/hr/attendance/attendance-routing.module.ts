import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { ManualAttendanceComponent } from './manual-attendance/manual-attendance.component';
import { PageGuard } from '../../../guards/page.guard';
import { MonthlyAttendenceComponent } from '../../payroll/setting/monthly-attendence/monthly-attendence.component';

const routes:Routes = [
  {path:'manual-attendance', component:ManualAttendanceComponent},
  {path:'monthly-attendence', component:MonthlyAttendenceComponent},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class AttendanceRoutingModule { }
