import { AccountingBasicEntryService } from './../../../services/accounting/accounting-basic-entry.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { LowerGroupType } from '../../lookup';
import { AccountChart } from '../../../models/accounting/basic-entry/bank/AccountChart';
import { AccountChartService } from '../../../services/accounting/AccountChartService';

@Component({
  selector: 'app-bank-select-list',
  template:  `<ng-select
  [(ngModel)]="bankID"
  name="bankID"
  (change)="onSelect($event)"
  [items]="bankList"
  [ngClass]="{'is-invalid':isInValid}"
  bindLabel="accountName"
  bindValue="accountId"
  autofocus
  placeholder="Select a Bank" [id]="elementId">
  </ng-select>`,
})
export class BankSelectListComponent implements OnInit {

  constructor(
    private bankService:AccountChartService
  ) { }
  @Input() bankID:number;
  @Input() focusId:string;
  @Input() isInValid:boolean = false;
  @Input() elementId:string ;
  @Output() onChange=new EventEmitter<AccountChart>()
  bankList:AccountChart[]=[];
  compId:number;
  branchID:number;
  lowerGroupId:number=LowerGroupType.Bank
  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.branchID=AuthService.BranchId;
    this.getBankByLowerID();
  }
  onSelect(banklist:any){
    if(banklist==null){
      this.onChange.emit(new AccountChart());
      return;
    }
    this.onChange.emit(banklist);
  }
 getBankByLowerID(){
   this.bankService.getAllAccountChart().subscribe((response:any)=>{
     if(response){
       /////Filtering by this.compId,this.lowerGroupId,this.branchID
      //  this.bankList =response.result;
       this.bankList = (response as AccountChart[]).filter(x=>x.lowerGroupId==94).map(item=>{
        item.accountName=item.accountName+"--"+item.aliasName
        console.log(item.accountName,item.accountId)
        return item;
      });
      
     }else{
       this.bankList=[];
     }
   })
 }
}
