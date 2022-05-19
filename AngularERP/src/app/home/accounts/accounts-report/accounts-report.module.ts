
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportIndexComponent } from './report-index/report-index.component';
import { AccountsReportRoutingModule } from './accounts-report-routing.module';
import { RptDaybookComponent } from './rpt-daybook/rpt-daybook.component';
import { SharedModule } from '../../../shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LaddaModule } from 'angular2-ladda';
import { NgSelectModule } from '@ng-select/ng-select';

@NgModule({
  declarations: [
    RptDaybookComponent,
    ReportIndexComponent,

  ],
  imports: [
    CommonModule,
    AccountsReportRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    LaddaModule,
    NgSelectModule
  ],exports:[
    RptDaybookComponent
  ],

})
export class AccountsReportModule { }
