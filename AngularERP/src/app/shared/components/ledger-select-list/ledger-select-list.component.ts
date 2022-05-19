import { map } from 'rxjs/operators';
import { AccountingBasicEntryService } from './../../../services/accounting/accounting-basic-entry.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountChart } from '../../../models/accounting/basic-entry/bank/AccountChart';
import { AccountChartService } from '../../../services/accounting/AccountChartService';
import { AccountChartView } from '../../../models/accounting/chart-of-account/account-chart-view.model.ts';

@Component({
  selector: 'app-ledger-select-list',
  templateUrl: './ledger-select-list.component.html',
  styleUrls: []
})
export class LedgerSelectListComponent implements OnInit {

  constructor(
    private accountChartService:AccountChartService,
    public modalService:NgbModal,
  ) { }
  ledgerModel:AccountChartView[]=[];
  @Input() idTabIndex:string;
  @Input() widthVal:number=320;
  @Input() isSearchBtnHide=false;
  @Input() isInvalid:boolean = false;
  @Input() ledgerID:number;
  @Output() onChange=new EventEmitter<any>();
  @Output() onKeyEvent=new EventEmitter<any>();
  compId:number;
  branchID:number;
  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.branchID=AuthService.BranchId;
    this.getAllLedger();
  }
  onKeyDownPress(event:KeyboardEvent){
    this.onKeyEvent.emit(event)
  }
  onSelect(ledger:any){
    if(ledger==null){
      this.onChange.emit({accountId:null, formateAccountName:null});
      return;
    }
    //this.onKeyDownPress()
    this.onChange.emit(ledger);
    }

  getAllLedger(){
   this.accountChartService.getAllAccountChart().subscribe((response:any)=>{
     if(response){
       ///filtering by this.compId,0,this.branchID
       this.ledgerModel=(response as AccountChartView[]).map(item=>{
        item.formateAccountName=item.accountName+"--"+item.aliasName;
        return item;
      });
     }
     else{
       this.ledgerModel= [];
     }

   })
  }
  onSearchBtnClick(acoountId:number){
    this.ledgerID=acoountId;

  }
}
