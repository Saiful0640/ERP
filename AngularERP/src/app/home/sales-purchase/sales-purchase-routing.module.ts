import { PageGuard } from './../../guards/page.guard';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router/src/config';
import { RouterModule } from '@angular/router';
import { SalesPurchaseIndexComponent } from './sales-purchase-index/sales-purchase-index.component';
import { SalesManageComponent } from './sales-manage/sales-manage.component';
import { PurchaseManageComponent } from './purchase-manage/purchase-manage.component';

const routes: Routes = [
  { path: 'index', component:SalesPurchaseIndexComponent },
  { path: 'purchase-manage', component:PurchaseManageComponent },
  { path: 'sales-manage', component:SalesManageComponent },
  { path: 'sales-purchase-settings', loadChildren: './sales-purchase-settings/sales-purchase-settings.module#SalesPurchaseSettingsModule' },
  { path: 'invoice', loadChildren: './invoice/invoice.module#InvoiceModule' },
  { path: 'billing', loadChildren: './billing/billing.module#BillingModule' },
  { path: 'order', loadChildren: './order/order.module#OrderModule' },
  { path: 'sales-purchase-reports', loadChildren: './sales-purchase-reports/sales-purchase-reports.module#SalesPurchaseReportsModule' },

]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SalesPurchaseRoutingModule { }
