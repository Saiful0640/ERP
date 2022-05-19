import { PageGuard } from './../../guards/page.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountsIndexComponent } from './accounts-index/accounts-index.component';
import { AccountsDashboardComponent } from './accounts-dashboard/accounts-dashboard.component';

const routs:Routes = [
      {path:'index', component:AccountsIndexComponent},
      {path:'dashboard',  component:AccountsDashboardComponent},
      {path:'basic', loadChildren:'./accounts-basic-entry/accounts-basic-entry.module#AccountsBasicEntryModule'},
      {path:'transaction', loadChildren:'./accounts-transaction/accounts-transaction.module#AccountsTransactionModule'},
      {path:'report', loadChildren:'./accounts-report/accounts-report.module#AccountsReportModule'}
  ]
  @NgModule({
      imports:[RouterModule.forChild(routs)],
      exports:[RouterModule]
  })
export class AccountsRoutingModule{}
