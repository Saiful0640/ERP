import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LeaveEntryComponent } from './leave-entry/leave-entry.component';
import { LeaveCategoryComponent } from './leave-category/leave-category.component';
import { LeaveSubCategoryComponent } from './leave-sub-category/leave-sub-category.component';
import { LeaveClassificationComponent } from './leave-classification/leave-classification.component';
import { PageGuard } from '../../../guards/page.guard';

const routes:Routes=[
  {path:'leave-category', component:LeaveCategoryComponent},
  {path:'leave-sub-category', component:LeaveSubCategoryComponent},
  {path:'leave-classification', component:LeaveClassificationComponent},
  {path:'leave-entry', component:LeaveEntryComponent},

]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgSelectModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class LeaveRoutingModule { }
