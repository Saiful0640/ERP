
import { InvoiceComponent } from './invoice/invoice.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PurchaseInvoiceComponent } from './purchase-invoice/purchase-invoice.component';
import { PurchaseReturnComponent } from './purchase-return/purchase-return.component';
import { SalesReturnComponent } from './sales-return/sales-return.component';
import { Routes, RouterModule } from '@angular/router';
import { SalesInvoiceComponent } from './sales-invoice/sales-invoice.component';

const routes: Routes = [
  { path: 'purchase-invoice',  component:PurchaseInvoiceComponent},
  { path: 'purchase-return',  component:PurchaseReturnComponent},
  { path: 'sales-invoice',  component:SalesInvoiceComponent},
  { path: 'sales-return',  component:SalesReturnComponent},
  { path: 'invoice',  component:InvoiceComponent}
 ]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
