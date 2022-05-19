import { NgSelectModule } from '@ng-select/ng-select';
import { SalaryProcessRoutingModule } from './salary-process-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalaryProcessComponent } from './salary-process/salary-process.component';
import { SalaryViewComponent } from './salary-view/salary-view.component';
import { MonthlySalaryProcessComponent } from './monthly-salary-process/monthly-salary-process.component';
import { SharedModule } from '../../../shared/shared.module';
import { HomeModule } from '../../home.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SetupModule } from '../../settings/setup/setup.module';
import { BonusProcessComponent } from './bonus-process/bonus-process.component';

@NgModule({
  declarations: [SalaryProcessComponent, SalaryViewComponent,  MonthlySalaryProcessComponent, BonusProcessComponent],
  imports: [
    CommonModule,
    SalaryProcessRoutingModule,
    HomeModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    SharedModule,
    SetupModule
  ]
})
export class SalaryProcessModule { }
