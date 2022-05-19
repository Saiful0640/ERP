import { AccountingBasicEntryService } from './../../../services/accounting/accounting-basic-entry.service';
import { AccountGroup } from '../../../models/accounting/basic-entry/chart-of-account/account-group/account-group.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-account-group-select-list',
  template: `<ng-select
  [(ngModel)]="accountGroupID"
  name="accountGroupID"
  (change)="onSelect($event)"
  [items]="accountGroupModel"
  bindLabel="groupName"
  bindValue="lowerGroupId"
  style="text-align: left;"
  placeholder="Select Account Group">
  </ng-select>`,
  styleUrls: []
})
export class AccountGroupSelectListComponent implements OnInit {

  constructor(
    private accGrouptService:AccountingBasicEntryService,
  ) { }
  accountGroupModel:any[]=[];
 @Input() accountGroupID:number;
 @Output() onChange=new EventEmitter<any>();
 compId:number;
  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.getAccountGroup();
  }
 onSelect(accountGroup:any){
   if(accountGroup==null){
     this.onChange.emit(new AccountGroup());
     return;
   }
   this.onChange.emit(accountGroup);
 }
 getAccountGroup(){
  this.accGrouptService.getAccountGroups().subscribe((response:any)=>{
    if(response){
      this.accountGroupModel=response;
    }
    else{
      this.accountGroupModel= [];
    }
  })
 }
}
