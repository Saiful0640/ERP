
import { ReportSalesComponent } from './report-sales/report-sales.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoReportComponent } from './do-report/do-report.component';
import { Routes, RouterModule } from '@angular/router';
import { SalesLedgerReportComponent } from './sales-ledger-report/sales-ledger-report.component';


const routes: Routes = [
  { path: 'do-reports', component:DoReportComponent},
  { path: 'report-sales', component:ReportSalesComponent},
  { path: 'app-sales-ledger-report', component:SalesLedgerReportComponent},
 ]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SalesPurchaseReportsRoutingModule { }
