import { NgSelectModule } from '@ng-select/ng-select';
import { LoanAndAdvanceRoutingModule } from './loan-and-advance-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoanAndAdvanceComponent } from './loan-and-advance/loan-and-advance.component';
import { LaddaModule } from 'angular2-ladda';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [LoanAndAdvanceComponent],
  imports: [
    CommonModule,
    LoanAndAdvanceRoutingModule,
    NgSelectModule,
    ReactiveFormsModule,
    SharedModule,
    LaddaModule,
  ]
})
export class LoanAndAdvanceModule { }
