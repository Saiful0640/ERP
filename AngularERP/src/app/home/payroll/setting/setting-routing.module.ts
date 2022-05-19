import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PeriodComponent } from '../../settings/setup/period/period.component';
import { CriteriaCenterComponent } from '../../criteria-center/criteria-center.component';
import { MemberPersonalInfoComponent } from '../../member-personal-info/member-personal-info.component';
import { EmpSalaryStructureComponent } from './emp-salary-structure/emp-salary-structure.component';
import { PayrollSectionComponent } from './payroll-section/payroll-section.component';
import { EmpSalaryStructureSComponent } from './emp-salary-structure-s/emp-salary-structure-s.component';
import { CenetrServiceNameComponent } from '../../cenetr-service-name/cenetr-service-name.component';
import { ServiceAmountSetupComponent } from '../../service-amount-setup/service-amount-setup.component';
import { AssignCriteriaComponent } from '../../assign-criteria/assign-criteria.component';
const routes: Routes = [
  { path: 'payroll-member-information', component:MemberPersonalInfoComponent },
  { path: 'payroll-period-setup', component:PeriodComponent },
  { path: 'payroll-service-name-setup', component:CenetrServiceNameComponent },
  { path: 'payroll-criteria', component:CriteriaCenterComponent},
  { path: 'payroll-service-amount-setup', component:ServiceAmountSetupComponent},
  { path: 'payroll-member-assign', component:AssignCriteriaComponent},
  { path: 'emp-salary-structure', component:EmpSalaryStructureComponent},
  { path: 'payroll-section', component:PayrollSectionComponent},
  { path: 'employee-salary-structure-s', component:EmpSalaryStructureSComponent},
  

  ]
@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class SettingRoutingModule { }
