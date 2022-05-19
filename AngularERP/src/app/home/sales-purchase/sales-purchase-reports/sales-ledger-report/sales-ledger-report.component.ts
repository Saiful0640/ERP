import { AuthService } from './../../../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
// import { ReportService } from './../../../../services/report.service';
import { NgbDateCustomParserFormatter } from './../../../../shared/dateformat';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { ReportModel } from '../../../../models/settings/app-settings/report-model';
import { AccountingBasicEntryService } from '../../../../services/accounting/accounting-basic-entry.service';
import { AccountingReportsService } from '../../../../services/accounting/accounting-reports.service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountChart } from '../../../../models/accounting/basic-entry/bank/AccountChart';
import { AccountChartService } from '../../../../services/accounting/AccountChartService';

@Component({
  selector: 'app-sales-ledger-report',
  templateUrl: './sales-ledger-report.component.html',
  styleUrls: ['./sales-ledger-report.component.scss']
})
export class SalesLedgerReportComponent implements OnInit {
  @Input() rptName:string;
  @Input() ledgerType:number;
  @Input() pageId:number=1229;
  @Input() subModuleId:number=21;
  constructor(
    private formBuilder: FormBuilder,
    private accountChartService: AccountChartService,
    private basicEntry: AccountingBasicEntryService,
    private accReportService:AccountingReportsService,
    private router: Router,
    private modalService: NgbModal,
    public dateFormatter:NgbDateCustomParserFormatter,
    // public reportService: ReportService,
    private toasterService:ToastrService
  ) {

   }
  @Input() fromDate: any;
  @Input() toDate: any;
  @Input() lowerGroupId: number;
  @Input() accountId: number;
  @Output() selectEvent = new EventEmitter<any>();
  parentModuleID:number;
  reportId:number;
  exportType:string = 'pdf';
  rptLedgerForm: FormGroup;
  @Input() compId: number;
  ledgerModel: AccountChart[] = [];
  ledgerForReportModel: any[] = [];
  filterLedgerDaybookModel:any []=[];
  subledgers:any[]=[];
  voucherType: string;
  isLoading:boolean = false;
  isExporting:boolean = false;
  reports:ReportModel[]=[];
  // exportTypes:any[] = this.reportService.exportTypes();
  totalDebit:number = 0;
  totalCredit:number = 0;
  branchID:number;
  isCostCenter:number=1;////Defalt
  // public routeInfo = {transId:0, pageId:0,voucherType:null,voucherDate:null};
  public routeInfo = {transId:0, pageId:0};
  accountNameModel:AccountChart[]=[];
  ngOnInit() {
    this.compId = AuthService.CompanyId;
    this.branchID=AuthService.BranchId
    this.parentModuleID=AuthService.CurrentModuleId;
    this.createForm();
    this.getAccountName();
    this.getAllLedger(this.f.lowerGroupId.value);
    if(this.rptName=='Subledger'){
        this.onSelectSubledger(this.f.accountId.value);
    }
    if (this.accountId != null) {
      this.getAllLedgerForReport()
    }

  }
  onSelectCustomer(customer){
if(customer){
  this.rptLedgerForm.patchValue({
    accountId:customer.accountId
  })
}
}
  getAccountName(){
    this.basicEntry.getAllAccountNameForReport(this.compId,0).subscribe((response:any)=>{
      if(response.status){
        this.accountNameModel=response.result;
       }
      else{
        this.accountNameModel= [];
      }

    })
   }
  getAllLedger(lowerGroupId: number) {
    if (lowerGroupId == null) {
      this.accountChartService.getAllAccountChart().subscribe((response:any) => {
        if (response.status) {
          ///Filtering by this.compId, 0,this.branchID
          if(this.rptName=='Subledger'){
            this.ledgerModel = response.result.filter(c=>c.isSubledger==1) ;
          }else if(this.rptName=='CostCenter'){
            this.ledgerModel = response.result.filter(c=>c.isCostCenter==1) ;
          }else{
           return;
          }
        }
        else {
          this.ledgerModel = [];
        }
      })
     } else {
      this.accountChartService.getAllAccountChart().subscribe((response:any) => {
        if (response.status) {
          ///Filtering by this.compId, lowerGroupId,this.branchID
          this.ledgerModel = response.result ;
        }
        else {
          this.ledgerModel = [];
        }
      })
    }
  }
  onSelectSubledger(accountId:number){
    if(accountId !=null){
      this.basicEntry.getAllSubledger(this.compId,accountId).subscribe((response:any)=>{
        if(response.status){
          this.subledgers=response.result;
        }else
        {
          this.subledgers=[];
        }
      })
    }else{
      this.accReportService.getSubLedgerList(this.compId).subscribe((response:any)=>{
        if(response.status){
           this.subledgers=response.result;
        }else
         {
         this.subledgers=[];
          }
          })
    }
  }
  onSelctCostCenter(costCenter: any) {
    this.rptLedgerForm.patchValue({
      ledgerId: costCenter.detailsID
    })
   }
  getAllAccountGroup(accountList: any) {
    this.rptLedgerForm.patchValue({
      lowerGroupId: accountList.lowerGroupId,
    })
    this.getAllLedger(this.f.lowerGroupId.value)
  }
  getAllLedgerForReport() {
    this.isLoading = true;
    this.totalDebit = 0;
    this.totalCredit = 0;
    this.accReportService.getSubledgerDaybookForReport(this.rptLedgerForm.value).subscribe((response: any) => {
      if (response.status) {
        this.ledgerForReportModel = (response.result )
        // .map(item=>{
        //   this.totalDebit+=item.drAmount;
        //   this.totalCredit+=item.crAmount;
        //   return item;
        // });
        this.filterLedgerDaybookModel=(response.result )
        .map(item=>{
          this.totalDebit+=item.drAmount;
          this.totalCredit+=item.crAmount;
          return item;
        });
      }
      else {
        this.ledgerForReportModel = [];
      }
      this.isLoading = false;
    },err=>{
      this.toasterService.error('An unexpected error occured');
      this.isLoading = false;
    })
  }
  filterLedgerDayBookReport(searchKey:string) {
    if (searchKey && searchKey!='') {
      this.filterLedgerDaybookModel = this.ledgerForReportModel.filter(dbook =>
        this.isNull(dbook.accountName).toLowerCase().match(searchKey.toLowerCase()) ||
        this.isNull(dbook.refNo).toLowerCase().match(searchKey.toLowerCase()) ||
        this.isNull(dbook.vno).toLowerCase().match(searchKey.toLowerCase())
      )
0
    } else {
      this.filterLedgerDaybookModel = this.ledgerForReportModel;
    }

  }
  isNull(value){
    return value?value:'';
  }
  //++++=================end============
  onSelect(costdata: any) {
    this.routeInfo.pageId=this.pageId;
    this.routeInfo.transId=costdata.transId;
    // this.routeInfo.voucherType=costdata.voucherType;
    // this.routeInfo.voucherDate=costdata.vdate;
    if (costdata.transType == 11) {
      let modal = this.router.navigate(['/accounts/transaction/cash-transaction',this.routeInfo])
      this.selectEvent.emit(modal)
    } else if (costdata.transType == 12) {
      let modal = this.router.navigate(['/accounts/transaction/bank-transaction',this.routeInfo])
      this.selectEvent.emit(modal)
    } else if (costdata.transType == 13) {
      let modal = this.router.navigate(['/accounts/transaction/journal-entry',this.routeInfo])
      this.selectEvent.emit(modal)
    } else if (costdata.transType == 14) {
      let modal = this.router.navigate(['/commercial/voucher-entry/cash-lc-voucher-entry',this.routeInfo])
      this.selectEvent.emit(modal)
    } else if (costdata.transType == 15) {
      let modal = this.router.navigate(['/accounts/transaction/payment-entry',this.routeInfo])
      this.selectEvent.emit(modal)
    }
    this.cancel();
  }
  onSelectAcc(account){
    if(account){
      this.rptLedgerForm.patchValue({
        accountName:account.accountName
      })
      this.onSelectSubledger(account.accountId)
    }
  }
  createForm() {
    this.rptLedgerForm = this.formBuilder.group({
      fromDate: [, []],
      fromDateNgb: [, []],
      todate: [, []],
      todateNgb: [, []],
      ledgerId: [, []],
      accountId: [, []],
      ledgerType:[this.ledgerType,[]],
      lowerGroupId: [this.lowerGroupId, []],
      refNo: [, []],
      amount: [0, []],
      compId: [this.compId, []],
      selctedItem: [, []],
      //For Report
      reportId:[null,[Validators.required]],
      between:[this.dateFormatter.getDateToYyyymmdd(new Date()),[]],
      and:[this.dateFormatter.getDateToYyyymmdd(new Date()),[]],
      exportType:['pdf',[]]
    })
  }
  get f() {
    return this.rptLedgerForm.controls;
  }
  cancel() {
    this.modalService.dismissAll();
  }
  reset() {
    this.createForm();
    this.ledgerForReportModel = [];
    this.isLoading = false;
  }
  get formVal(){
    return this.rptLedgerForm.value;
  }
  onExportVoucher(voucher) {
    // if(!this.reportId){
    //   return this.toasterService.error('Select Report Type.')
    // }
    // if(!this.exportType){
    //   return this.toasterService.error('Select Export Type.');
    // }
    // this.reportService.getAccReport({
    //   ReportId:this.reportId,
    //   ExportType:this.exportType,
    //   TransId:voucher.transId,
    //   VoucherType:voucher.voucherType,
    //   CompId:this.formVal.compId
    // }).subscribe((file)=>{
    //   this.isExporting = false;
    //   if(file){
    //     this.reportService.openFileWindow(file)
    //   }
    // },(err:HttpErrorResponse)=>{
    //   console.error(err)
    //   this.toasterService.error('An unexpected Error occured','Error')
    // })
  }

  onExportLedger(reportModel:ReportModel){
    this.isExporting = true;
    if(this.f['accountId'].value==null){
      this.f['accountId'].patchValue(0)
    }
    let LedgerID:number;
    let LedgerType:number;
    if(this.rptLedgerForm.controls.ledgerId.value==null)
    {
      LedgerID=0;
    }else{
      this.rptLedgerForm.controls.ledgerId.value;
    }
    if(this.rptLedgerForm.controls.ledgerType.value==null)
    {
      LedgerType=1;
    }else{
      this.rptLedgerForm.controls.ledgerType.value;
    }
// this.reportService.getCommercialReportForRpt({
//       ReportId: reportModel.reportId,
//       ExportType:reportModel.exportType,
//       Between: this.formVal.between,
//       StartDate: this.formVal.between,
//       EndDate: this.formVal.and,
//       LedgerID: this.formVal.ledgerId?this.formVal.ledgerId:0,
//       AccounId: this.formVal.accountId,
//       LedgerType: this.formVal.ledgerType,
//       And: this.formVal.and,
//       CompId: this.formVal.compId
//     }).subscribe((file)=>{
//       this.isExporting = false;
//       if(file){
//         this.reportService.openFileWindow(file)
//       }
//     },(err:HttpErrorResponse)=>{
//       this.isExporting = false;
//       this.toasterService.error('An unexpected Error occured','Error')
//     })
  }
}
