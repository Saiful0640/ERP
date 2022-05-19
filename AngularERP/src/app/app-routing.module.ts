import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutBlankComponent } from './layout/layout-blank/layout-blank.component';
import { NoPageComponent } from './error/no-page/no-page.component';
import { AppErrorComponent } from './error/app-error/app-error.component';
import { LayoutComponent } from './layout/layout.component';
import { ForbiddenComponent } from './error/forbidden/forbidden.component';
import { Layout2Component } from './layout/layout-2/layout-2.component';

const routes: Routes = [
  { path: '', component:  Layout2Component,   loadChildren: './home/home.module#HomeModule' },
  { path: 'user', component: LayoutBlankComponent, loadChildren: './user/user.module#UserModule' },
  { path: 'accounts', component: LayoutComponent,  loadChildren: './home/accounts/accounts.module#AccountsModule' },
  { path: 'settings', component: LayoutComponent,  loadChildren: './home/settings/settings.module#SettingsModule' },
  { path: 'sales-purchase',  component: LayoutComponent,  loadChildren: './home/sales-purchase/sales-purchase.module#SalesPurchaseModule' },
  { path: 'hr',  component: LayoutComponent,  loadChildren: './home/hr/hr.module#HrModule' },
  { path: 'payroll',  component: LayoutComponent, loadChildren: './home/payroll/payroll.module#PayrollModule' }, 
  { path: 'error', component: AppErrorComponent },
  { path: 'forbidden', component: ForbiddenComponent },
  { path: '**', component: NoPageComponent },
  // { path: 'hr',  data:{moduleId:30}, component: LayoutComponent, loadChildren: './home/hr/hr.module#HrModule' },
  // { path: 'payroll',  data:{moduleId:37}, component: LayoutComponent, loadChildren: './home/payroll/payroll.module#PayrollModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
