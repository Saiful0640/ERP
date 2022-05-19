import { LaddaModule } from 'angular2-ladda';
import { DateControlComponent } from './../../../../shared/components/date-control/date-control.component';
import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewBankComponent } from './new-bank/bank.component';
import { BankRoutingModule } from './bank-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ChequeBookComponent } from './cheque-book/cheque-book.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NewBankComponent,ChequeBookComponent],
  imports: [
    CommonModule,
    BankRoutingModule,
    NgSelectModule,
    SharedModule,
    ReactiveFormsModule,
    LaddaModule
  ],
  exports: [
   NewBankComponent,
   ChequeBookComponent
  ],
  providers:[DateControlComponent],
  entryComponents:[DateControlComponent]
})
export class BankModule { }
