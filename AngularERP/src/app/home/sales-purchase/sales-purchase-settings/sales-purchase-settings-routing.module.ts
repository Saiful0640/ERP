import { ProductSizeComponent } from './../sales-purchase-settings/product-size/product-size.component';
import { DuesReceivableMonitorComponent } from './dues-receivable-monitor/dues-receivable-monitor.component';
import { DuesMonitoringComponent } from '././dues-monitoring/dues-monitoring.component';
import { DiscountSattingsComponent } from './discount-sattings/discount-sattings.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { ProductBrandComponent } from './product-brand/product-brand.component';
import { ProductColorComponent } from './product-color/product-color.component';
import { ProductModelComponent } from './product-model/product-model.component';
import { ProductUnitComponent } from './product-unit/product-unit.component';
import { CustomerDeliveryLocationComponent } from './customer-delivery-location/customer-delivery-location.component';
import { ProductEntryComponent } from './product-entry/product-entry.component';
const routes: Routes = [
  { path: 'category',  component:CategoryComponent},
  { path: 'product',  component:ProductComponent },
  { path: 'product-brand',  component:ProductBrandComponent },
  { path: 'product-color',  component:ProductColorComponent },
  { path: 'product-model',  component:ProductModelComponent },
  { path: 'product-unit',  component:ProductUnitComponent },
  { path: 'customer-delivery-location',  component:CustomerDeliveryLocationComponent },
  {path:'discount-sattings',component:DiscountSattingsComponent},
  {path:'dues-monitoring',component:DuesMonitoringComponent},
  {path:'dues-receivable-monitor',component:DuesReceivableMonitorComponent},
   { path: 'product-size',  component:ProductSizeComponent },
   { path: 'product-entry',  component:ProductEntryComponent },
 ]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SalesPurchaseSettingsRoutingModule { }
