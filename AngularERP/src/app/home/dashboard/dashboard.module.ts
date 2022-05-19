
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardindexComponent } from './dashboardindex/dashboardindex.component';
import { LaddaModule } from 'angular2-ladda';
import { SharedModule } from '../../shared/shared.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [ DashboardindexComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    LaddaModule,
    SharedModule,
    FormsModule,
  ]
})
export class dashboardModule { }
