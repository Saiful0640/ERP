import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AssignCompanyComponent } from './assign-company/assign-company.component';
import { AssignBranchComponent } from './assign-branch/assign-branch.component';
import { AssignRoutingModule } from './assign-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../../shared/shared.module';
import { LaddaModule } from 'angular2-ladda';
import { ApprovalEntryComponent } from './approval-entry/approval-entry.component';
import { AssignModuleComponent } from './assign-module/assign-module.component';

@NgModule({
  declarations: [AssignCompanyComponent, AssignBranchComponent,  ApprovalEntryComponent, AssignModuleComponent],
  imports: [
    CommonModule,
    AssignRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    SharedModule,
    LaddaModule,

  ]
})
export class AssignModule { }
