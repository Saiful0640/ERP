import { LoanAndAdvanceComponent } from './loan-and-advance/loan-and-advance.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { PageGuard } from '../../../guards/page.guard';

const routes:Routes = [
  {path:'loan-and-advance', component:LoanAndAdvanceComponent},
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class LoanAndAdvanceRoutingModule { }
