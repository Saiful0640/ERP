import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../../../shared/shared.module';
import { HomeModule } from './../../home.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DashboardSetupRoutingModule } from './dashboard-setup-routing.module';
import { DashoardtestComponent } from './dashoardtest/dashoardtest.component';

@NgModule({
  declarations: [DashoardtestComponent],
  imports: [
    CommonModule,
    DashboardSetupRoutingModule,
    HomeModule,
    SharedModule,
    ReactiveFormsModule,
    NgSelectModule,
    NgbModule
  ]
})
export class DashboardSetupModule { }
