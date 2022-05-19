import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageGuard } from '../../../guards/page.guard';
import { BillCollectionComponent } from '../../bill-collection/bill-collection.component';
import { BillPrepareComponent } from '../../bill-prepare/bill-prepare.component';
import { OpeningBalanceComponent } from '../../opening-balance/opening-balance.component';
import { LoanAndAdvanceComponent } from './loan-and-advance/loan-and-advance.component';

const routes: Routes = [
  // {path:'payroll-receipt-entry',component:ReceiptEntryComponent},
  // {path:'payroll-payment-entry',component:PaymentComponent},
  {path:'payroll-bill-prepare',component:BillPrepareComponent},
  {path:'payroll-bill-collection',component:BillCollectionComponent},
  {path:'payroll-payable-opening-balance',component:OpeningBalanceComponent},
  {path:'payroll-receivable-opening-balance',component:OpeningBalanceComponent},
  {path:'payroll-others-bill-prepare',component:BillPrepareComponent},
  {path:'payroll-loan-and-advance',component:LoanAndAdvanceComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PayrollTransactionRoutingModule { }
