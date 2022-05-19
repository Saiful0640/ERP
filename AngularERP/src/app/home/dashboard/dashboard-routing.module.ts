import { DashboardindexComponent } from './dashboardindex/dashboardindex.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {path:'index',component:DashboardindexComponent},
  {path:'dashboard-setup',loadChildren:'./Dashboard Setup/dashboard-setup.module#DashboardSetupModule'},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
