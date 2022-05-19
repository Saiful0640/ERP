
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from './../../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsIndexComponent } from './settings-index/settings-index.component';
import { SettingsDashboardComponent } from './settings-dashboard/settings-dashboard.component';
import { RouterModule } from '@angular/router';
import { SettingsRoutingModule } from './settings-routing.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { ReactiveFormsModule } from '@angular/forms';
import { BranchComponent } from './branch/branch.component';



@NgModule({
  declarations: [SettingsIndexComponent, SettingsDashboardComponent,BranchComponent],
  imports: [
    CommonModule,
    RouterModule,
    SettingsRoutingModule,
    SharedModule,
    NgSelectModule,
    NgbModule,
    ReactiveFormsModule
  ]
})
export class SettingsModule { }
