import { AccountingBasicEntryService } from './../../../services/accounting/accounting-basic-entry.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { AccountChart } from '../../../models/accounting/basic-entry/bank/AccountChart';
import { AccountChartService } from '../../../services/accounting/AccountChartService';

@Component({
  selector: 'app-account-name-select-list',
  template: `<ng-select
  [(ngModel)]="accountNameID"
  name="accountNameID"
  (change)="onSelect($event)"
  [items]="accountNameModel"
  bindLabel="accountName"
  bindValue="accountId"
  placeholder="Select Account Name">
  </ng-select>`,
  styleUrls: []
})
export class AccountNameSelectListComponent implements OnInit {

  constructor(

    private accChartService:AccountChartService
  ) { }
  accountNameModel:AccountChart[]=[];
 @Input() accountNameID:number;
 @Output() onChange=new EventEmitter<AccountChart>();
 compId:number;
  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.getAccountName();
  }
  onSelect(accountName:any){
    console.log(accountName)
    if(accountName==null){
      this.onChange.emit(new AccountChart());
      return;
    }
    this.onChange.emit(accountName);
  }
  getAccountName(){
   this.accChartService.getAllAccountChart().subscribe((response:any)=>{
     if(response){
       this.accountNameModel=response;
     }
     else{
       this.accountNameModel= [];
     }

   })
  }
}
