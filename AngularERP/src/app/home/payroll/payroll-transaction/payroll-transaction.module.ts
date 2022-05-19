import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PayrollTransactionRoutingModule } from './payroll-transaction-routing.module';
import { HomeModule } from '../../home.module';
import { SetupModule } from '../../settings/setup/setup.module';
import { LoanAndAdvanceComponent } from './loan-and-advance/loan-and-advance.component';

@NgModule({
  declarations: [LoanAndAdvanceComponent],
  imports: [
    CommonModule,
    PayrollTransactionRoutingModule,
    HomeModule,
    SetupModule
  ]
})
export class PayrollTransactionModule { }
