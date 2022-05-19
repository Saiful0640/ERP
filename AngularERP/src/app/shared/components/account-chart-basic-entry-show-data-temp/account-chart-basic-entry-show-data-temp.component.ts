import { AccountingBasicEntryService } from './../../../services/accounting/accounting-basic-entry.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountChartService } from '../../../services/accounting/AccountChartService';
import { AccountChart } from '../../../models/accounting/basic-entry/bank/AccountChart';

@Component({
  selector: 'app-account-chart-basic-entry-show-data-temp',
  templateUrl: './account-chart-basic-entry-show-data-temp.component.html',
  styleUrls: ['./account-chart-basic-entry-show-data-temp.component.scss']
})
export class AccountChartBasicEntryShowDataTempComponent implements OnInit {
  @Input() lowerGroupId:number;
  @Output() selectEvent = new EventEmitter<AccountChart>();
  compId:number;
  randomName:string;
  accchartSearch: AccountChart = new AccountChart();
  accountChartBasicEntry:AccountChart[]=[];
  filteredAccChart:AccountChart[]=[];
  branchID:number;
  constructor(
    private modalService:NgbModal,
    private accChartService:AccountChartService
  ) { }

  ngOnInit() {
    this.compId=1;
    this.branchID=1;
    this.getAllAccountChartBasicEntry();
    if(this.lowerGroupId==3){
      this.randomName="Customer"
    }else if(this.lowerGroupId==4){
      this.randomName="Supplier"
    }else if(this.lowerGroupId==152){
      this.randomName="Asset"
    }else if(this.lowerGroupId==94){
      this.randomName="Bank"
    }else{
      this.randomName="Ledger"
    }

  }
  onSearchClick(accountName: string, searchModal: any) {
    this.accchartSearch.accountName = '';
    //this.fdbcSearchKeys.idenNo = null;
    this.modalService.open(searchModal, { windowClass:'modal-width' });
  }

  getAllAccountChartBasicEntry(){
    if(this.lowerGroupId==null){this.lowerGroupId=0}
    this.accChartService.getAllAccountChart().subscribe((response:any)=>{
      if(response){
        this.accountChartBasicEntry=(response).filter(c=>c.lowerGroupId==this.lowerGroupId);
        this.filteredAccChart = (response).filter(c=>c.lowerGroupId==this.lowerGroupId);

      }else
      {
        this.accountChartBasicEntry=[];
      }
    })
  }
  filterAccountChartBasicEntry(accountName: string) {
    if(accountName != null ){
      let filterAg = this.accountChartBasicEntry.filter(c => c.accountName.toLowerCase().match(accountName.toLowerCase()));
      this.filteredAccChart=filterAg;
    }
   }
  Select(model: any) {
    this.selectEvent.emit(model);
    this.cancel();
  }

  cancel(){
    this.modalService.dismissAll();

  }
}
