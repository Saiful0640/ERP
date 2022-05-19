import { HrPeriodComponent } from './hr-period/hr-period.component';
import { SharedModule } from './../../../shared/shared.module';
import {  NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BasicEntryComponent } from './hr-basic-entry.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DepartmentComponent } from './department/department.component';
import { SectionComponent } from './section/section.component';
import { HrBasicEntryRoutingModule } from './hr-basic-entry-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { HolidaySetupComponent } from './holiday-setup/holiday-setup.component';
import { DeleteConfirmationComponent } from '../../../shared/components/delete-confirmation/delete-confirmation.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { LaddaModule } from 'angular2-ladda';
import { SetupModule } from '../../settings/setup/setup.module';
import { GroupTypeComponent } from './group/group-type.component';
import { DesignationEntryComponent } from './designation-entry/designation-entry.component';


@NgModule({
  declarations: [
    DepartmentComponent,
    SectionComponent,
    HolidaySetupComponent,
    BasicEntryComponent,
    HrPeriodComponent,
    GroupTypeComponent,
    DesignationEntryComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    HrBasicEntryRoutingModule,
    SetupModule,
    NgSelectModule,
    NgbModule,
    FormsModule,
    PerfectScrollbarModule,
    LaddaModule
    //NgxDatatableModule,
  ],
  exports:[
DepartmentComponent,
DesignationEntryComponent,
SectionComponent,
BasicEntryComponent

  ],
  entryComponents: [
    DeleteConfirmationComponent
  ]
})
export class HrBasicEntryModule { }
