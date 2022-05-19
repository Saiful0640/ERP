import { LaddaModule } from 'angular2-ladda';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../../../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankTransactionComponent } from './bank-transaction.component';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [BankTransactionComponent],
  imports: [
    CommonModule,
    NgSelectModule,
    SharedModule,
    NgbAlertModule,
    ReactiveFormsModule,
    LaddaModule,
  ]
})
export class BankTransactionModule { }
