import { PayrollModule } from './../payroll/payroll.module';
import { LaddaModule } from 'angular2-ladda';
import { SharedModule } from './../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HrIndexComponent } from './hr-index/hr-index.component';
import { HrRoutingModule } from './hr-routing.module';
import { HrBasicEntryModule } from './hr-basic-entry/hr-basic-entry.module';
import { SettingsModule } from '../settings/settings.module';
import { MonthlyAttendenceComponent } from '../payroll/setting/monthly-attendence/monthly-attendence.component';

@NgModule({
  declarations: [HrIndexComponent],
  imports: [
    CommonModule,
    HrRoutingModule,
    SettingsModule,
  ],
  exports:[
    HrBasicEntryModule
  ]
})
export class HrModule { }
