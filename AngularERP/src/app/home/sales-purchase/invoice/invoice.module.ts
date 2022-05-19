import { SharedModule } from './../../../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseInvoiceComponent } from './purchase-invoice/purchase-invoice.component';
import { PurchaseReturnComponent } from './purchase-return/purchase-return.component';
import { SalesReturnComponent } from './sales-return/sales-return.component';
import { InvoiceRoutingModule } from './invoice-routing.module';
import { SalesInvoiceComponent } from './sales-invoice/sales-invoice.component';
import { LaddaModule } from 'angular2-ladda';
import { InvoiceComponent } from './invoice/invoice.component';

@NgModule({
  declarations: [PurchaseInvoiceComponent, PurchaseReturnComponent, SalesInvoiceComponent, SalesReturnComponent, InvoiceComponent],
  imports: [
    CommonModule,
    InvoiceRoutingModule,
    NgSelectModule,
    ReactiveFormsModule,
    SharedModule,
    LaddaModule,
    FormsModule
  ]
})
export class InvoiceModule { }
