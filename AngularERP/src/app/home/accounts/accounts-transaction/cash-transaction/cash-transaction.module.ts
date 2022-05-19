import { LaddaModule } from 'angular2-ladda';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../../../shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { DateControlComponent } from './../../../../shared/components/date-control/date-control.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CashTransactionComponent } from './cash-transaction.component';
import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [CashTransactionComponent],
  imports: [
    CommonModule,
    NgSelectModule,
    SharedModule,
    NgbAlertModule,
    ReactiveFormsModule,
    LaddaModule
  ],
  providers:[DateControlComponent],
  entryComponents:[DateControlComponent]
})
export class CashTransactionModule { }
