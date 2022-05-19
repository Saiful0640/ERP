import { SettingModule } from './../../payroll/setting/setting.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ManualAttendanceComponent } from './manual-attendance/manual-attendance.component';
import { AttendanceRoutingModule } from './attendance-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../../../shared/shared.module';
import { LaddaModule } from 'angular2-ladda';
import { NgSelectModule } from '@ng-select/ng-select';
import { MonthlyAttendenceComponent } from '../../payroll/setting/monthly-attendence/monthly-attendence.component';
import { SettingsModule } from '../../settings/settings.module';

@NgModule({
  declarations: [ManualAttendanceComponent],
  imports: [
    CommonModule,
    AttendanceRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    LaddaModule,
    NgSelectModule,
   SettingModule
  ]
})
export class AttendanceModule { }
