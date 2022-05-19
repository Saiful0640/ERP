import { AccountingBasicEntryService } from './../../../services/accounting/accounting-basic-entry.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subledger } from './../../../models/accounting/basic-entry/chart-of-account/subledger.model';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-transaction-subledger-select-list',
  template: `
  <!-- <div class=" input-group"> -->
    <ng-select
  [(ngModel)]="transSubledgerID"
  name="transSubledgerID"
  (change)="onSelect($event)"
  [items]="transSubledgerModel"
  bindLabel="subledgerName"
  bindValue="id"
  [id]="idForTabIndex"
  [ngStyle]="{'width.px':subWidth}"
  placeholder="Select Subledger">
  </ng-select> `,
  styleUrls: []
})
export class TransactionSubledgerSelectListComponent implements OnInit, OnChanges {

  constructor(
    private chartOfAccountService:AccountingBasicEntryService
  ) { }
  transSubledgerModel:Subledger[]=[];
  // @Input() isPlusBtnHide=false;
  @Input() subWidth:number=220;
  @Input() idForTabIndex:string;
  @Input() transSubledgerID:any;
  @Input() accountId:number;
  @Output() onChange=new EventEmitter<any>();
 compId:number;
   ngOnChanges(){
    this.compId=AuthService.CompanyId;
    if(this.accountId !=null){
      this.getAllSubledger(this.accountId)
    }else{
      return;
    }
  }
  ngOnInit() {
   this.compId=AuthService.CompanyId;
   if(this.accountId !=null){
  this.getAllSubledger(this.accountId);
    }else{
  return;
    }
  }
  onSelect(subLedger:any){
    if(subLedger==null){
      this.onChange.emit({subledgerId:null,subledgerName:null});
      return;
    }
    this.onChange.emit(subLedger);
  }
  getAllSubledger(accountId:number){
      this.chartOfAccountService.getSubledgers().subscribe((response:any)=>{
        if(response){
          this.transSubledgerModel=response.filter(c=>{return c.accountId==accountId && c.compId==this.compId});
        }else
        {
          this.transSubledgerModel=[];
        }
      })

  }
  // createNewItem(){
  //   this.modalService.open(this.modalName)
  // }
}
