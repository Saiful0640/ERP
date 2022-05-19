import { LaddaModule } from 'angular2-ladda';
import { BankTransactionModule } from './bank-transaction/bank-transaction.module';
import { CashTransactionModule } from './cash-transaction/cash-transaction.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsTransactionRoutingModule } from './accounts-transaction-routing.module';
import { JournalEntriesModule } from './journal-entries/journal-entries.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeModule } from '../../home.module';
import { ReceiptEntryBillAmountSetComponent } from '../../receipt-entry-bill-amount-set/receipt-entry-bill-amount-set.component';
@NgModule({
  declarations: [
    ],
  imports: [
    CommonModule,
    CashTransactionModule,
    BankTransactionModule,
    JournalEntriesModule,
    AccountsTransactionRoutingModule,
    NgSelectModule,
    ReactiveFormsModule,
    SharedModule,
    HomeModule,
    LaddaModule,

  ],exports:[ ReceiptEntryBillAmountSetComponent]
})
export class AccountsTransactionModule { }
