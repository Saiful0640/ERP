import { BillPrepareComponent } from './bill-prepare/bill-prepare.component';
import { BillReceiptComponent } from './bill-receipt/bill-receipt.component';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ChartsModule as Ng2ChartsModule } from 'ng2-charts/ng2-charts';
import { HomeRoutingModule } from './home-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { StartupComponent } from './startup/startup.component';
import { BlockUIModule } from 'ng-block-ui';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { LaddaModule } from 'angular2-ladda';
import { SweetAlert2Module } from '@toverux/ngx-sweetalert2';
import { AccountsModule } from './accounts/accounts.module';
import { CriteriaCenterComponent } from './criteria-center/criteria-center.component';
import { MemberPersonalInfoComponent } from './member-personal-info/member-personal-info.component';
import { PaymentComponent } from './payment/payment.component';
import {BillCollectionComponent} from './bill-collection/bill-collection.component';
import { RptReceivableMemberListComponent } from './rpt-receivable-member-list/rpt-receivable-member-list.component';
import { OpeningBalanceComponent } from './opening-balance/opening-balance.component';
import { IndividualReceiptEntryComponent } from './individual-receipt-entry/individual-receipt-entry.component';
import { IndividualBillProcessComponent } from './individual-bill-process/individual-bill-process.component';
import { CriteriaEntryFormComponent } from './criteria-entry-form/criteria-entry-form.component';
import { ReceiptEntryBillAmountSetComponent } from './receipt-entry-bill-amount-set/receipt-entry-bill-amount-set.component';
import { CenetrServiceNameComponent } from './cenetr-service-name/cenetr-service-name.component';
import { ServiceAmountSetupComponent } from './service-amount-setup/service-amount-setup.component';
import { AssignCriteriaComponent } from './assign-criteria/assign-criteria.component';

@NgModule({

  imports: [
    CommonModule,
    FormsModule,
    NgbModule,
    Ng2ChartsModule,
    PerfectScrollbarModule,
    HomeRoutingModule,
    SweetAlert2Module,
    LaddaModule,
    BlockUIModule,
    NgSelectModule,
    NgxDatatableModule,
    AccountsModule,
    SharedModule,
    ReactiveFormsModule,
    LaddaModule,
    SharedModule,
  ],
  declarations: [
    DashboardComponent,
    StartupComponent,
    CriteriaCenterComponent,
    MemberPersonalInfoComponent,
    BillReceiptComponent,
    PaymentComponent,
    RptReceivableMemberListComponent,
    BillPrepareComponent,
    BillCollectionComponent,
    OpeningBalanceComponent,
    IndividualReceiptEntryComponent,
    IndividualBillProcessComponent,
    CriteriaEntryFormComponent,
    CenetrServiceNameComponent ,
    ReceiptEntryBillAmountSetComponent,
    ServiceAmountSetupComponent ,
    AssignCriteriaComponent 
  ],
  providers:[],
  exports:[
    CriteriaCenterComponent,
    MemberPersonalInfoComponent,
    BillPrepareComponent,
    PaymentComponent,
    BillReceiptComponent,
    RptReceivableMemberListComponent,
    BillCollectionComponent,
    OpeningBalanceComponent,
    CriteriaEntryFormComponent,
    ReceiptEntryBillAmountSetComponent,
    ServiceAmountSetupComponent ,
    CenetrServiceNameComponent ,
    AssignCriteriaComponent 
  ]
})
export class HomeModule { }
