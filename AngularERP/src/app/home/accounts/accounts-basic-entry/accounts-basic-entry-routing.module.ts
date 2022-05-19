import { PeriodSetupComponent } from './period/period-setup/period-setup.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { NewSupplierComponent } from './supplier/supplier.component';
import { FixedAssetsComponent } from './fixed-assets/fixed-assets.component';
import { NewCustomerComponent } from './customer/customer.component';


const routes: Routes = [
  { path: 'customer',  component:NewCustomerComponent },
  { path: 'supplier',  component:NewSupplierComponent },
  { path: 'fixed-assets',  component:FixedAssetsComponent },
  { path: 'period-setup',  component:PeriodSetupComponent },
  { path: 'bank', loadChildren: './bank/bank.module#BankModule' },
  { path: 'chart-of-account', loadChildren: './chart-of-account/chart-of-account.module#ChartOfAccountModule' },

]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class AccountsBasicEntryRoutingModule { }
