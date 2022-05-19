
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NewOrderComponent } from './new-order/new-order.component';
import { OrderListComponent } from './order-list/order-list.component';
import { PendingOrderComponent } from './pending-order/pending-order.component';
import { DeliveryOrderComponent } from './delivery-order/delivery-order.component';

const routes: Routes = [
  { path: 'new-order',  component:NewOrderComponent},
  { path: 'order-list',  component:OrderListComponent},
  { path: 'app-pending-order',  component:PendingOrderComponent},
  { path: 'app-delivery-order',  component:DeliveryOrderComponent},
 ]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class OrderRoutingModule { }
