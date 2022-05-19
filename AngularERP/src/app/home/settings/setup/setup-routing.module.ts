import { NgModule, Component } from '@angular/core';
import { Route, RouterModule, CanActivate } from '@angular/router';
import { YearComponent } from './year/year.component';
import { FinancialYearComponent } from './financial-year/financial-year.component';
import { AppModuleComponent } from './app-module/app-module.component';

const routes: Route[] = [
  { path: 'year',  component: YearComponent },
  { path: 'financial-year',   component: FinancialYearComponent },
  { path: 'app-module',   component: AppModuleComponent }
];
@NgModule({
  declarations: [],
  imports: [

    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SetupRoutingModule { }
