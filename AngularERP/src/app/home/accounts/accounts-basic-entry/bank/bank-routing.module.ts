import { PageGuard } from './../../../../guards/page.guard';
import { ChequeBookComponent } from './cheque-book/cheque-book.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewBankComponent } from './new-bank/bank.component';

const routes:Routes=[
  {path:'new-bank',  component:NewBankComponent},
  {path:'cheque-book',  component:ChequeBookComponent}
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class BankRoutingModule { }
