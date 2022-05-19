import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { TransactionService } from '../../../services/accounting/transaction.service';
import { TransMasterModel } from '../../../models/accounting/transaction/trans-master-model';
import { AuthService } from '../../../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from '../../dateformat';
import { ReportModel } from '../../../models/settings/app-settings/report-model';
import { ToastrService } from 'ngx-toastr';
import { HttpErrorResponse } from '@angular/common/http/index';
import { StoreStartAndEndDate } from '../../../models/store-start-and-end-date';
import { AccountChartService } from '../../../services/accounting/AccountChartService';

@Component({
  selector: 'app-transaction-list-show-temp',
  templateUrl: './transaction-list-show-temp.component.html',
  styleUrls: ['./transaction-list-show-temp.component.scss']
})
export class TransactionListShowTempComponent implements OnInit {

  constructor(
    private transactionService:TransactionService,
    private accChartService: AccountChartService,
    private modalService: NgbModal,
    public dateFormatter:NgbDateCustomParserFormatter
  ) { }
  @Input() transType:number;
  transactionListModel:any[]=[];
  filtertransactionListModel:any[]=[];
  transSearch:TransMasterModel = new TransMasterModel();  
  compId:number;
  @Output() selectEvent = new EventEmitter<TransMasterModel>();
  fromDate:any;
  toDate:any;
  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.getTransactionList();
    
  }
  onSearchClick(accountName: string, searchModal: any) {
    this.transSearch.accountName = '';
    //this.fdbcSearchKeys.idenNo = null;
    this.modalService.open(searchModal, {size: 'lg', windowClass: 'modal-xl'});
  }

  getTransactionList(){
    this.transactionService.getAllTransactionMaster().subscribe((response:TransMasterModel[])=>{
      if(response){
        ////voucherType:string,fromDate:any,toDate:any, compId:number,branchId:number//this.voucherType,this.f.fromDate.value,this.f.toDate.value,this.compId,this.branchId
       
        this.accChartService.getAllAccountChart().subscribe((accountChart:any)=>{
          if(accountChart){
            let accountChartInfo=accountChart;
            let filterByTrasType=response.filter(c => c.transType==this.transType);
            // this.filtertransactionListModel=filterByTrasType
            this.transactionListModel=filterByTrasType.map(item=>{
              item.accountName=accountChartInfo.find(c=>c.accountId==item.partyId).accountName
              return item;
            });
            this.filtertransactionListModel=filterByTrasType.map(item=>{
              item.accountName=accountChartInfo.find(c=>c.accountId==item.partyId).accountName
              return item;
            });
            console.log(accountChartInfo,this.transactionListModel)
          }
        })
         
      }
    })
  }
  filterAccountChartBasicEntry(accountName: string) {
    if(accountName != null ){
      let filterAg = this.transactionListModel.filter(c => c.accountName.toLowerCase().match(accountName.toLowerCase()));
      this.filtertransactionListModel=filterAg;
    }else{
    }
   }
  onSelect(model:any){
    this.selectEvent.emit(model);
    this.cancel();
  }

  cancel(){
    this.modalService.dismissAll();
  }
}
