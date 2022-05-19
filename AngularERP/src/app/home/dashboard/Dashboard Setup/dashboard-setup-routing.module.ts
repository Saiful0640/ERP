
import { PageGuard } from './../../../guards/page.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashoardtestComponent } from './dashoardtest/dashoardtest.component';

const routes: Routes = [
  {path:'dashboard-test',component:DashoardtestComponent},

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardSetupRoutingModule { }
