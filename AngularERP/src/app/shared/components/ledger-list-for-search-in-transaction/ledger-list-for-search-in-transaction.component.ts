import { AccountingBasicEntryService } from './../../../services/accounting/accounting-basic-entry.service';
import { ToastrService } from 'ngx-toastr';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../services/auth.service';
import { Customer } from '../../../models/sales-purchase/customer.model';
import { Helper } from '../../helper';
import { AccountChart } from '../../../models/accounting/basic-entry/bank/AccountChart';
import { AccountChartService } from '../../../services/accounting/AccountChartService';
import { AccountChartView } from '../../../models/accounting/chart-of-account/account-chart-view.model.ts';

@Component({
  selector: 'app-ledger-list-for-search-in-transaction',
  templateUrl: './ledger-list-for-search-in-transaction.component.html',
  styleUrls: ['./ledger-list-for-search-in-transaction.component.scss']
})
export class LedgerListForSearchInTransactionComponent implements OnInit {
  @Input() lowerGroupId:number;
  @Output() selectEvent = new EventEmitter<AccountChart>();
  compId:number;
  branchID:number;
  accchartSearch: AccountChart = new AccountChart();
  accountChartBasicEntry:AccountChartView[]=[];
  newCustomerModel:AccountChartView;
  filteredAccChart:AccountChartView[]=[];
  customers:Customer[]=[];
  constructor(
    private modalService:NgbModal,
    private accChartService:AccountChartService,
    private toaster:ToastrService
  ) { }

  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.branchID=AuthService.BranchId;
    this.getAllAccountChartBasicEntry();
  }
  onSearchClick(searchModal: any) {
    this.accchartSearch.accountName = '';
    //this.fdbcSearchKeys.idenNo = null;
    this.modalService.open(searchModal, {size: 'lg', windowClass: 'modal-xl'});
  }

  getAllAccountChartBasicEntry(){
    this.accChartService.getAllAccountChart().subscribe((response:any)=>{
      if(response){
        ////Fintering By this this.compId,this.lowerGroupId,this.branchID
        this.accountChartBasicEntry=(response as AccountChartView[]).map(item=>{
          item.formateAccountName=item.accountName+"--"+item.aliasName;
          return item;
        });
        this.filteredAccChart = (response as AccountChartView[]).map(item=>{
          item.formateAccountName=item.accountName+"--"+item.aliasName;
          return item;
        });
      }else
      {
        this.accountChartBasicEntry=[];
      }
    })
  }
  eventTracker:NodeJS.Timer;
  filterAccountChartBasicEntry(event) {
    //Stop auto scroll
    if (event.shiftKey && (event.key == 'ArrowDown' || event.key == 'ArrowUp') && event.altKey) {
      if(this.eventTracker){
        clearInterval(this.eventTracker);
        this.eventTracker = null;
      }
      return;
    }
    //Start auto scroll to down
    if (event.shiftKey && event.key == 'ArrowDown' && this.filteredAccChart.length>0 && !this.eventTracker) {
      this.eventTracker = setInterval(()=>{
        this.onArrowDownKey();
      },100);
      return;
    }
    //Start auto scroll to up
    if (event.shiftKey && event.key == 'ArrowUp' && this.filteredAccChart.length>0 && !this.eventTracker) {
      this.eventTracker = setInterval(()=>{
        this.onArrowUpKey();
      },100);
      return;
    }
    //Select Up
    if (!event.shiftKey && event.key == 'ArrowUp' && this.filteredAccChart.length>0) {
      this.onArrowUpKey();
      return;
    }
    //Select Down
    if(!event.shiftKey && event.key == 'ArrowDown' && this.filteredAccChart.length>0) {
      this.onArrowDownKey();
      return;
    }
    //Focus Search field
    if(event.shiftKey && event.key=='S'){
      if(this.eventTracker){
        clearInterval(this.eventTracker);
      }
      Helper.focusTextField('txtSearch');
      this.selectedRow = -1;
      return;
    }

    //Search
    if(event.target.value != null && event.target.value !='' ){
      this.filteredAccChart = this.accountChartBasicEntry.filter(c => c.accountName.toLowerCase().match(event.target.value.toLowerCase()) 
      );

    }else{
      this.filteredAccChart = this.accountChartBasicEntry;
    }
   }
  onSelect(model: any) {
    this.selectEvent.emit(model);
    this.cancel();
  }

  cancel(){
    if(this.eventTracker){
      clearInterval(this.eventTracker);
      this.eventTracker = null;
    }
    this.modalService.dismissAll();

  }
  selectedRow: number = -1;
  onArrowDownKey() {
    this.selectedRow = (this.selectedRow + 1) % this.filteredAccChart.length;
    console.log(this.selectedRow)
    Helper.focusTextField('btnSelectRow' + this.selectedRow)
    document.getElementById('row' + this.selectedRow).classList.add('selected-row')
    if (this.selectedRow > 0) {
      document.getElementById('row' + (this.selectedRow - 1)).classList.remove('selected-row')
    } else {
      document.getElementById('row' + (this.filteredAccChart.length - 1)).classList.remove('selected-row')
    }
  }
  onArrowUpKey() {
    this.selectedRow = this.selectedRow > 0 ? this.selectedRow-1 : this.filteredAccChart.length - 1;
    document.getElementById('row' + this.selectedRow).classList.add('selected-row')
    Helper.focusTextField('btnSelectRow' + this.selectedRow)
    if (this.selectedRow >= this.filteredAccChart.length-1) {
      document.getElementById('row'+0).classList.remove('selected-row')
    } else {
      document.getElementById('row' + (this.selectedRow + 1)).classList.remove('selected-row')
    }
  }

  /* onAddNewCustomer(){
    this.accChartService.saveAccChart(this.newCustomerModel)
    .subscribe((response:any)=>{
      if(response.status && response.newAccChart){
        var newCustomer = new Customer();
        newCustomer.accountId = response.newAccChart.accountId;
        newCustomer.accountName = response.newAccChart.accountName;
        newCustomer.aliasName = response.newAccChart.aliasName;
        newCustomer.formattedName = response.newAccChart.accountName + ((!response.newAccChart.aliasName || response.newAccChart.aliasName=='null')?'':(' - '+response.newAccChart.aliasName));
        newCustomer.billContactNo
        this.customers.push(newCustomer);
        this.filteredAccChart.push(newCustomer);

        //this.onSelect(newCustomer)
        this.toaster.success('New Customer added successfully!', 'Saved');
      }else{
        this.toaster.error('Failed to save new customer', 'Failed');
      }
    })
  } */
}
