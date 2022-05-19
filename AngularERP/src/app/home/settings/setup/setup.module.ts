import { AppModuleComponent } from './app-module/app-module.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SetupRoutingModule } from './setup-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { SharedModule } from '../../../shared/shared.module';
import { YearComponent } from './year/year.component';
import { PeriodComponent } from './period/period.component';
import { LaddaModule } from 'angular2-ladda';
import { FinancialYearComponent } from './financial-year/financial-year.component';
@NgModule({
  declarations: [
       YearComponent,
       FinancialYearComponent,
       PeriodComponent,
       AppModuleComponent
      ],
  imports: [
    CommonModule,
    SetupRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    SharedModule,
    FormsModule,
    LaddaModule
  ],
  exports: [YearComponent,PeriodComponent]
})
export class SetupModule { }
