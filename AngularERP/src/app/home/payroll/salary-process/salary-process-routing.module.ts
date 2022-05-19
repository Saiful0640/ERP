import { SalaryViewComponent } from './salary-view/salary-view.component';
import { SalaryProcessComponent } from './salary-process/salary-process.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MonthlySalaryProcessComponent } from './monthly-salary-process/monthly-salary-process.component';
import { BonusProcessComponent } from './bonus-process/bonus-process.component';
const routes: Routes = [
  {path:'salary-process', component:SalaryProcessComponent},
  {path:'salary-view', component:SalaryViewComponent},
  {path:'monthly-salary-process', component:MonthlySalaryProcessComponent},
  {path:'bonus-process', component:BonusProcessComponent},
  ]
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class SalaryProcessRoutingModule { }
