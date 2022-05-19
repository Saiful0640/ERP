
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JournalEntriesComponent } from './journal-entries/journal-entries.component';
import { CashTransactionComponent } from './cash-transaction/cash-transaction.component';
import { BankTransactionComponent } from './bank-transaction/bank-transaction.component';
const routes:Routes=[
  {path:'cash-transaction',  component:CashTransactionComponent},
  {path:'bank-transaction',  component:BankTransactionComponent},
  {path:'journal-entry',  component:JournalEntriesComponent },

]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class AccountsTransactionRoutingModule { }
