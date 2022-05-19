import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RetrieveComponent } from './retrieve/retrieve.component';
import { SelectCompanyComponent } from './select-company/select-company.component';

@NgModule({
  imports: [RouterModule.forChild([
    { path: 'login', component: LoginComponent },
    { path: 'retrieve', component: RetrieveComponent },
    { path: 'select-company', component: SelectCompanyComponent }
  ])],
  exports: [RouterModule]
})
export class UserRoutingModule { }
