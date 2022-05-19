import { LaddaModule } from 'angular2-ladda';
import { CustomerLocationSearchComponent } from './customer-location-search/customer-location-search.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category/category.component';
import { ProductComponent } from './product/product.component';
import { ProductUnitComponent } from './product-unit/product-unit.component';
import { ProductModelComponent } from './product-model/product-model.component';
import { ProductBrandComponent } from './product-brand/product-brand.component';
import { ProductColorComponent } from './product-color/product-color.component';
import { SalesPurchaseSettingsRoutingModule } from './sales-purchase-settings-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { CustomerDeliveryLocationComponent } from './customer-delivery-location/customer-delivery-location.component';
import {FormsModule} from '@angular/forms';
import { DiscountSattingsComponent } from './discount-sattings/discount-sattings.component';
import { DuesMonitoringComponent } from './dues-monitoring/dues-monitoring.component';
import { DuesReceivableMonitorComponent } from './dues-receivable-monitor/dues-receivable-monitor.component';

import { ProductSizeComponent } from './product-size/product-size.component';
import { ProductEntryComponent } from './product-entry/product-entry.component';
@NgModule({
  declarations: [
    CategoryComponent,
    ProductComponent,
   ProductUnitComponent,
    ProductModelComponent,
     ProductBrandComponent,
    ProductColorComponent,
     CustomerDeliveryLocationComponent,
     CustomerLocationSearchComponent,
     DiscountSattingsComponent,
     DuesMonitoringComponent,
     DuesReceivableMonitorComponent,
     ProductSizeComponent,
     ProductEntryComponent,
    /*  InventoryReportComponent */

    ],
  imports: [
    CommonModule,
    SalesPurchaseSettingsRoutingModule,
    NgSelectModule,
    ReactiveFormsModule,
    SharedModule,
    NgxDatatableModule,
    FormsModule,
LaddaModule,
/* InventoryReportModule */
  ],
  exports:[
    CustomerLocationSearchComponent,
    ProductComponent,
    ProductUnitComponent,
    ProductModelComponent,
    ProductColorComponent,
    ProductBrandComponent
  ]
})
export class SalesPurchaseSettingsModule { }
