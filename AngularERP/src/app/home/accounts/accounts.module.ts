

import { FormsModule } from '@angular/forms';
import { LaddaModule } from 'angular2-ladda';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountsReportModule } from './accounts-report/accounts-report.module';
import { AccountsIndexComponent } from './accounts-index/accounts-index.component';
import { AccountsRoutingModule } from './accounts.routing.module';
import { AccountsDashboardComponent } from './accounts-dashboard/accounts-dashboard.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [AccountsIndexComponent, AccountsDashboardComponent],
  imports: [
    CommonModule,
    AccountsReportModule,
    AccountsRoutingModule,
    LaddaModule,
    SharedModule,
    FormsModule,

  ]
})
export class AccountsModule { }
