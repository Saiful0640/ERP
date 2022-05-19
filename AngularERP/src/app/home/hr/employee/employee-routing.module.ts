import { FamilyInfoComponent } from './family-info/family-info.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeGenInfoComponent } from './employee-gen-info/employee-gen-info.component';
import { EmploymentInfoComponent } from './employment-info/employment-info.component';
import { PageGuard } from '../../../guards/page.guard';

const routes:Routes = [
  {path:'employee-gen-info', component:EmployeeGenInfoComponent},
  {path:'employment-info', component:EmploymentInfoComponent},
  {path:'family-info', component:FamilyInfoComponent},

]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class EmployeeRoutingModule { }
