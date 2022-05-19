import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../../shared/shared.module';

import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LeaveEntryComponent } from './leave-entry/leave-entry.component';
import { LeaveRoutingModule } from './leave-routing.module';
import { LeaveCategoryComponent } from './leave-category/leave-category.component';
import { LeaveSubCategoryComponent } from './leave-sub-category/leave-sub-category.component';
import { LeaveClassificationComponent } from './leave-classification/leave-classification.component';
import { LaddaModule } from 'angular2-ladda';
@NgModule({
  declarations: [
    LeaveEntryComponent,
    LeaveCategoryComponent,
    LeaveSubCategoryComponent,
    LeaveClassificationComponent],
  imports: [
    CommonModule,
    LeaveRoutingModule,
    NgSelectModule,
    SharedModule,
    CommonModule,
    LaddaModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class LeaveModule { }
