import { BranchCriteriaComponent } from './branch-criteria/branch-criteria.component';
import { PageGuard } from './../../../guards/page.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NewCompanyComponent } from './new-company/new-company.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyComponent } from './company.component';

const routes:Routes = [
  {path:'new-company',   component:NewCompanyComponent},
  {path:'company-list',  component:CompanyListComponent},
  {path:'branch-criteria',  component:BranchCriteriaComponent},
  {path:'company', component:CompanyComponent}


]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class CompanyRoutingModule { }
