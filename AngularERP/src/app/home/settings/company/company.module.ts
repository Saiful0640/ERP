import { HomeModule } from './../../home.module';
import { SharedModule } from './../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyComponent } from './company.component';
import { NewCompanyComponent } from './new-company/new-company.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CompanyRoutingModule } from './company-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { BranchCriteriaComponent } from './branch-criteria/branch-criteria.component';

@NgModule({
  declarations: [CompanyComponent, NewCompanyComponent, CompanyListComponent, BranchCriteriaComponent],
  imports: [
    CommonModule,
    CompanyRoutingModule,
    SharedModule,
    NgSelectModule,
    ReactiveFormsModule,
    HomeModule

  ]
})
export class CompanyModule { }
