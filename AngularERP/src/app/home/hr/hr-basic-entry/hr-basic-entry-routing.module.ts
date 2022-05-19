import { GroupTypeComponent } from './group/group-type.component';
import { HrPeriodComponent } from './hr-period/hr-period.component';
import { HolidaySetupComponent } from './holiday-setup/holiday-setup.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentComponent } from './department/department.component';
import { SectionComponent } from './section/section.component';
import {  RouterModule } from '@angular/router';
import { DesignationEntryComponent } from './designation-entry/designation-entry.component';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    [RouterModule.forChild([
      {path:'department',component: DepartmentComponent},
      {path:'designation',component:DesignationEntryComponent},
      {path:'section',component:SectionComponent},
      {path:'hr-period',component:HrPeriodComponent},
      {path:'holiday',component:HolidaySetupComponent},
      {path:'group-type',component:GroupTypeComponent}
    ])]
  ],
  exports: [RouterModule]
})
export class HrBasicEntryRoutingModule { }
