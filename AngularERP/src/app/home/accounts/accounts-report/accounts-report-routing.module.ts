import { ReportIndexComponent } from './report-index/report-index.component';

import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RptDaybookComponent } from './rpt-daybook/rpt-daybook.component';




const routs:Routes = [
    {path:'rpt-chart-account', component:ReportIndexComponent},
    {path:'rpt-daybook',  component:RptDaybookComponent},
    {path:'rpt-final-account',  component:ReportIndexComponent},
    {path:'rpt-ledger',  component:ReportIndexComponent},
    {path:'rpt-trial-balance-details',  component:ReportIndexComponent},
    {path:'rpt-costcenter-daybook',  component:ReportIndexComponent},
    {path:'app-rpt-final-account',  component:ReportIndexComponent },

  ]
  @NgModule({
      imports:[RouterModule.forChild(routs)],
      exports:[RouterModule]
  })
export class AccountsReportRoutingModule{}
