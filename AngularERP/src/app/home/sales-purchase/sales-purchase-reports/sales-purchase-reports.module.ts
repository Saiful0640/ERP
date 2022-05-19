import { LaddaModule } from 'angular2-ladda';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AccountsModule } from './../../accounts/accounts.module';
import { SharedModule } from './../../../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DoReportComponent } from './do-report/do-report.component';
import { SalesPurchaseReportsRoutingModule } from './sales-purchase-reports-routing.module';
import { ReportSalesComponent } from './report-sales/report-sales.component';
import { SalesLedgerReportComponent } from './sales-ledger-report/sales-ledger-report.component';

@NgModule({
  declarations: [
     DoReportComponent,
     ReportSalesComponent, 
     SalesLedgerReportComponent
    ],
  imports: [
    CommonModule,
    SalesPurchaseReportsRoutingModule,
    NgSelectModule,
    SharedModule,
    FormsModule,
    LaddaModule,
    ReactiveFormsModule,
  ],
  exports:[
    DoReportComponent
  ]
})
export class SalesPurchaseReportsModule { }
