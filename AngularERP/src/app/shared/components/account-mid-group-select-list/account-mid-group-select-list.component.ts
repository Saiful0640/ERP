import { AccountingBasicEntryService } from './../../../services/accounting/accounting-basic-entry.service';
import { AccountMidGroup } from './../../../models/accounting/basic-entry/chart-of-account/account-group/account-mid-group.model';
import { Component, OnInit, Input, Output, OnChanges, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-account-mid-group-select-list',
  template:  `<div class="input-group"><ng-select
  [(ngModel)]="accountMidGroupID"
  #field="ngModel"
  (change)="onSelect($event)"
  [items]="accountMidGroupModel"
  bindLabel="groupName"
  bindValue="midGroupId"
  [ngClass]="{'is-invalid':IsInvalid && (field.touched || field.dirty)}"
  placeholder="Select Under Group">
  </ng-select>
  <div *ngIf="IsInvalid && (field.touched || field.dirty)" class="text-danger">
    <i>This field is required</i>
  </div>
  </div>
  `,
  styleUrls: []
})
export class AccountMidGroupSelectListComponent implements OnInit {

  constructor(
    private accountChartService:AccountingBasicEntryService
  ) { }
 @Input() accountMidGroupID:number;
 @Input() IsInvalid: boolean = true;
 @Output() onChange=new EventEmitter<AccountMidGroup>();
 @Output() onClicGrpNAme=new EventEmitter<AccountMidGroup>();
 accountMidGroupModel:AccountMidGroup[]=[];

  ngOnInit() {
    this.getAllAccountMidgroup();
  }
  onSelect(accountMidGroup:any){
    if(accountMidGroup==null){
      this.onChange.emit(new AccountMidGroup());
      return;
    }
    this.onChange.emit(accountMidGroup);
  }
  getAllAccountMidgroup(){
    this.accountChartService.getAllAccountMidGroup().subscribe((response:any)=>{
      if(response.status){
        this.accountMidGroupModel=response.result;
      }else{
        this.accountMidGroupModel= [];
      }
    })
  }

}
