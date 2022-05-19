import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PayrollIndexComponent } from './payroll-index/payroll-index.component';
import { PayrollRoutingModule } from './payroll-routing.module';
import { HomeModule } from '../home.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [PayrollIndexComponent],
  imports: [
    CommonModule,
    PayrollRoutingModule,
    HomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    SharedModule
  ]
})
export class PayrollModule { }
