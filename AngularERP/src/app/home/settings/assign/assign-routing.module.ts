import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';
import { AssignCompanyComponent } from './assign-company/assign-company.component';
import { AssignBranchComponent } from './assign-branch/assign-branch.component';
import { ApprovalEntryComponent } from './approval-entry/approval-entry.component';
import { AssignModuleComponent } from './assign-module/assign-module.component';

const routes:Route[]=[
  {path:'company',  component:AssignCompanyComponent},
  {path:'branch',  component:AssignBranchComponent},
  {path:'approval-entry',component:ApprovalEntryComponent},
  {path:'assing-module',component:AssignModuleComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class AssignRoutingModule { }
