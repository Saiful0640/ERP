import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesPurchaseRoutingModule } from './sales-purchase-routing.module';
import { SalesPurchaseIndexComponent } from './sales-purchase-index/sales-purchase-index.component';
import { SalesManageComponent } from './sales-manage/sales-manage.component';
import { NgbAccordionModule, NgbDatepickerModule, NgbTabsetModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from '../../shared/shared.module';
import { PurchaseManageComponent } from './purchase-manage/purchase-manage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderModule } from './order/order.module';





@NgModule({
  declarations: [SalesPurchaseIndexComponent, SalesManageComponent, PurchaseManageComponent],
  imports: [
    CommonModule,
    SalesPurchaseRoutingModule,
    NgSelectModule,
    NgbAccordionModule,
    SharedModule,
    NgbDatepickerModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    NgbTabsetModule,
    OrderModule
   
  ]

})
export class SalesPurchaseModule { }
