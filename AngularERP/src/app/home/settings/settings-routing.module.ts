import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SettingsIndexComponent } from './settings-index/settings-index.component';
import { SettingsDashboardComponent } from './settings-dashboard/settings-dashboard.component';
import { BranchComponent } from './branch/branch.component';

const routes: Routes = [
  { path: 'index', component: SettingsIndexComponent },
  { path: 'dashboard', component: SettingsDashboardComponent },
  { path: 'company',  loadChildren: './company/company.module#CompanyModule' },
  { path: 'branch',component:BranchComponent},
  { path: 'user', loadChildren: '../settings/user/user.module#UserModule' },
  { path: 'assign', loadChildren: './assign/assign.module#AssignModule' },
  { path: 'setup',  loadChildren: './setup/setup.module#SetupModule' }


]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class SettingsRoutingModule { }
