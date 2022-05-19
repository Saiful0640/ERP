import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { StartupComponent } from './startup/startup.component';
import { DashboardComponent } from './dashboard/dashboard.component';



@NgModule({
  imports: [RouterModule.forChild([
    { path: '', component: StartupComponent },
    { path: 'dashboard', component: DashboardComponent }
  ])],
  exports: [RouterModule]
})
export class HomeRoutingModule { }
