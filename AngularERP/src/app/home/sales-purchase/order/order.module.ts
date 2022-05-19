import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrderRoutingModule } from './order-routing.module';
import { SharedModule } from '../../../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NewOrderComponent } from './new-order/new-order.component';
import { OrderListComponent } from './order-list/order-list.component';
import { LaddaModule } from 'angular2-ladda';
import { PendingOrderComponent } from './pending-order/pending-order.component';
import { DeliveryOrderComponent } from './delivery-order/delivery-order.component';

@NgModule({
  declarations: [NewOrderComponent, OrderListComponent, PendingOrderComponent, DeliveryOrderComponent],
  imports: [
    CommonModule,
    OrderRoutingModule,
    NgSelectModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    LaddaModule
  ],
  exports:[OrderListComponent, NewOrderComponent]
})
export class OrderModule { }
