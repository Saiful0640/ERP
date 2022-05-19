import { SetupModule } from './../../settings/setup/setup.module';
import { LaddaModule } from 'angular2-ladda';
import { BankModule } from './bank/bank.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsBasicEntryRoutingModule } from './accounts-basic-entry-routing.module';
import { NewCustomerComponent } from './customer/customer.component';
import { NewSupplierComponent } from './supplier/supplier.component';
import { SharedModule } from '../../../shared/shared.module';
import { FixedAssetsComponent } from './fixed-assets/fixed-assets.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { HomeModule } from '../../home.module';
import { ChartOfAccountModule } from './chart-of-account/chart-of-account.module';
import { PeriodSetupComponent } from './period/period-setup/period-setup.component';
import { SalesPurchaseSettingsModule } from '../../sales-purchase/sales-purchase-settings/sales-purchase-settings.module';


@NgModule({
  declarations: [
    NewCustomerComponent,
    NewSupplierComponent,
    FixedAssetsComponent,
    PeriodSetupComponent
    ],
  imports: [
    CommonModule,
    AccountsBasicEntryRoutingModule,
    ReactiveFormsModule,
    SharedModule,
    NgSelectModule,
    FormsModule,
    BankModule,
    ChartOfAccountModule,
    HomeModule,
    LaddaModule,
    SetupModule,
    SalesPurchaseSettingsModule
  ],
  exports:[NewCustomerComponent,NewSupplierComponent,FixedAssetsComponent ]

})
export class AccountsBasicEntryModule { }
