import { group } from 'console';
import { Subledger } from './../../../../models/accounting/basic-entry/chart-of-account/subledger.model';
import { CommonModule } from '@angular/common';
import { SharedModule } from './../../../../shared/shared.module';
import { NgModule } from '@angular/core';
import { ChartOfAccountRoutingModule } from './chart-of-account-routing.module';
import { CostCenterComponent } from './cost-center/cost-center.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAccordionModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NewSubLedgerComponent } from './sub-ledger/sub-ledger.component';
import { NewGroupComponent } from './group/group.component';
import { AccountsBasicEntryModule } from '../accounts-basic-entry.module';
import { SubledgerListTempComponent } from './subledger-list-temp/subledger-list-temp.component';

import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';

import { LaddaModule } from 'angular2-ladda';
import { HomeModule } from '../../../home.module';
import { OthersComponent } from './others/others.component';


@NgModule({
  declarations: [
    CostCenterComponent,
    NewSubLedgerComponent,
    NewGroupComponent,
    SubledgerListTempComponent,

    OthersComponent],
  imports: [
    CommonModule,
    ChartOfAccountRoutingModule,
    NgSelectModule,
    ReactiveFormsModule,
    SharedModule,
    NgbAccordionModule,
    FormsModule,
    NgbModule,
    MultiselectDropdownModule,
    LaddaModule,
    HomeModule
  ],
  exports:[
    NewSubLedgerComponent,
    CostCenterComponent
  ]

})
export class ChartOfAccountModule { }
