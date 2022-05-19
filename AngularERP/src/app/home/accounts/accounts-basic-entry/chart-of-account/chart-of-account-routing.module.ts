import { OthersComponent } from './others/others.component';
import { PageGuard } from './../../../../guards/page.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CostCenterComponent } from './cost-center/cost-center.component';
import { NewSubLedgerComponent } from './sub-ledger/sub-ledger.component';
import { NewGroupComponent } from './group/group.component';
import { NewLedgerComponent } from '../../../../shared/components/ledger/ledger.component';
const routes:Routes = [
  {path: 'ledger',  component:NewLedgerComponent},
  {path: 'sub-ledger',  component:NewSubLedgerComponent},
  {path: 'group',  component:NewGroupComponent},
  {path: 'cost-center',  component:CostCenterComponent},
  {path:'others',  component:OthersComponent}
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports:[RouterModule]
})
export class ChartOfAccountRoutingModule { }
