import { AuthService } from './../../../services/auth.service';
// import { ReportService } from './../../../services/report.service';
import { HttpErrorResponse } from '@angular/common/http';
import { CustomerLocation } from './../../../models/sales-purchase/customer-location.model';
import { ReportModel } from './../../../models/settings/app-settings/report-model';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SalesPurchaseService } from '../../../services/sales-purchase/sales-purchase.service';
import { NgbDateCustomParserFormatter } from '../../dateformat';
import { ToastrService } from 'ngx-toastr';
import { PageAuthModel } from '../../../models/settings/page-auth.model';
import { SettingService } from '../../../services/settings/Setting.service';
import { ApiResponse } from '../../../models/api-response';
import { Router } from '@angular/router';
import { Customer } from '../../../models/sales-purchase/customer.model';
import { Helper } from '../../helper';

@Component({
  selector: 'app-search-invoice',
  templateUrl: './search-invoice.component.html',
  styleUrls: ['./search-invoice.component.scss','../../../../vendor/libs/angular2-ladda/angular2-ladda.scss']
})
export class SearchInvoiceComponent implements OnInit {

  companyId: number = AuthService.CompanyId;
  branchId: number = AuthService.BranchId;

  @Input() invoiceType: string;
  @Input() searchText:string='';
  @Input() searchLevel:number;
  @Input() moduleId:number;
  @Input() isInvoiceForChallan:boolean = false;
  @Output() onSelect: EventEmitter<number> = new EventEmitter()

  isLoadFromOrder: boolean = false;

  restrictForEdit: boolean = false;
  filterForm: FormGroup;
  isLoading: boolean = false;
  isSubmitted: boolean = false;
  invoices: any[] = [];
  filterInvoices: any[] = [];
    ///CreatedBy Nasrin
    totalInvoiceAmount:number=0;
    compId:number;
    reportId: number;
    pageId: number;
   @Input() childModuleId: number = 20;
   //subModuleId:number=75;
    isExporting: boolean = false;
    exportType: string = 'pdf';
    companyType:number;
    reports: ReportModel[] = [];
    locations: CustomerLocation[] = [];
    filterlocations: any[] = [];
    mobileBankTypes: { name: string }[] = [];
    /// Nasrin
    pageAuthInfo:PageAuthModel = new PageAuthModel()
  constructor(
    public modalService: NgbModal,
    private fb: FormBuilder,
    private salesPurchaseService: SalesPurchaseService,
    private toasterService: ToastrService,
    // private reportService: ReportService,
    public dateService: NgbDateCustomParserFormatter,
    public router:Router,
    private settingService:SettingService) { }

  ngOnInit() {
   // this.pageId = AuthService.CurrentPageId;Note:This Modal Effects Another Page and For Sales Invoice We use fixed PageId here
    /* this.childModuleId=AuthService.CurrentModuleId */
    this.companyType=AuthService.CompanyType;
    this.pageId = AuthService.CurrentPageId
    this.settingService.getPageAuthInfo(AuthService.UserId, AuthService.CurrentPageId)
    .subscribe((res:ApiResponse)=>{
      if(res.status){
        this.pageAuthInfo = res.result as PageAuthModel;
        if(!this.pageAuthInfo.isAssigned){
          this.router.navigate(['forbidden']);
        }
      }
    });
    this.createForm();
    if(AuthService.SaleInvoiceSearchDate !=null || AuthService.SaleInvoiceSearchDate !=undefined){
      this.filterForm.patchValue({
        invoiceDate: AuthService.SaleInvoiceSearchDate,
        invoiceDateNgb:this.dateService.getYyyymmddToNgbDate(AuthService.SaleInvoiceSearchDate)
      })
    }else{
      this.filterForm.patchValue({
        invoiceDate:this.dateService.getDateToYyyymmdd(new Date()),
        invoiceDateNgb:this.dateService.getYyyymmddToNgbDate(this.filterForm.controls['invoiceDate'].value)
      })
    }
    this.search();
    this.getReportInfo();
  }
  // selectAddress(location: CustomerLocation) {
  //   if (location) {
  //     this.filterForm.patchValue({
  //       partyId: location.accountId,
  //       partyName: location.formatedName,
  //       billTo: location.formatedName,
  //       billAddress: location.customerAddress
  //     })
  //   }
  // }
  onSelectCustomer(customer: Customer) {
  if (customer) {
      this.filterForm.patchValue({
        billContactNo: customer.billContactNo,
        accountId:customer.accountId
      })
    }
  }

  get formVal() {
    return this.filterForm.value;
  }
  onDateChange(yyyymmdd) {
    this.filterForm.patchValue({ invoiceDate: yyyymmdd })
    AuthService.SaleInvoiceSearchDate=yyyymmdd;
  }
  onDateNgbChange(yyyymmdd){
    this.filterForm.patchValue({ invoiceDateNgb: yyyymmdd })
    AuthService.SaleInvoiceSearchDate=this.dateService.getNgbDateToYyyymmdd(yyyymmdd);
  }
  search() {
    this.isLoading = true;
    this.salesPurchaseService.searchInvoice(this.filterForm.value)
      .subscribe((response: any) => {
        this.isLoading = false;
        if (response.status) {
          this.invoices = response.result;
         // this.filterInvoices=response.result;
          this.filterInvoices=(response.result as any[])
          .map(item=>{
            this.totalInvoiceAmount+=Number(item.totalAmount);
           // this.totalCredit+=item.credit;
            return item;
          });
        } else {
          this.invoices = [];
        }
      }, err => {
        this.isLoading = false;
        this.invoices = [];
        this.filterInvoices = [];
      })
  }

  searchbypartyname() {
    // this.isLoading = true;
        this.salesPurchaseService.Searchbypartyname(this.filterForm.value)
      .subscribe((response: any) => {
        // this.isLoading = false;
        if (response.status) {
          this.invoices = response.result;
          // this.filterInvoices=response.result;
          this.filterInvoices=(response.result as any[])
          .map(item=>{
            this.totalInvoiceAmount+=Number(item.totalAmount);
           // this.totalCredit+=item.credit;
            return item;
          });
        } else {
          this.invoices = [];
        }
      }, err => {
        // this.isLoading = false;
        this.invoices = [];
        this.filterInvoices = [];
      })
  }
  filterParty(filterKey:string){
    if (filterKey && filterKey!='') {
      this.filterInvoices = this.invoices.filter(invoice =>
        this.isNull(invoice.partyName).toLowerCase().match(filterKey.toLowerCase()) ||
        this.isNull(invoice.formattedVoucherNo).toLowerCase().match(filterKey.toLowerCase())
        // || this.isNull(invoice.voucherNo).toLowerCase().match(filterKey.toLowerCase())
         || this.isNull(invoice.billContactNo).toLowerCase().match(filterKey.toLowerCase())
      )

    } else {
      this.filterInvoices = this.invoices;
    }
  }
  isNull(value){
    return value?value:'';
  }
  onSelectInvoice(transId) {
    console.log(transId);
    this.onSelect.emit(transId)
  }
  createForm() {
    this.filterForm = this.fb.group({
      searchText: [this.searchText],
      invoiceType: [this.invoiceType],
      invoiceDate: [this.dateService.getDateToYyyymmdd(new Date()),[]],
      invoiceDateNgb:[,[]],
      searchAnyDate: [0, []],
      companyId: [this.companyId],
      SearchLevel:[this.searchLevel,[]],
      ModuleId:[this.moduleId,[]],
      billContactNo:[,[]],
      partyId:[,[]],
      accountId:[,[]],
    })
  }
   //CreatedBy Nasrin
  getReportInfo() {
    // this.reportService.getReports(this.companyId, this.moduleId, this.pageId)
    //   .subscribe(response => {
    //     if (response.status) {
    //       this.reports = response.result as ReportModel[];
    //  console.log(this.reports)
    //     }
    //   }, err => {
    //     this.toasterService.warning(err.error,'Report Info not found');
    //   })
  }

  onPrint(transId:number) {
    // console.log("Transe Id For Print",transId)
    // if (transId != null && transId != 0) {
    //   this.isExporting = true;
    //   this.reportId = this.reports.length > 0 ? this.reports[0].reportId : null;
    //  this.reportService.getCommercialReportForRpt({
    //     ReportId: this.reportId,
    //     ExportType: this.exportType,
    //    trmasterid: transId,
    //     CompId: this.companyId,
    //     BranchId: this.branchId,
    //     TransId: transId
    //   }).subscribe((file) => {
    //     this.isExporting = false;
    //     if (file) {
    //       this.reportService.openFileWindow(file)
    //     }
    //   }, (err: HttpErrorResponse) => {
    //     this.isExporting = false;
    //     this.toasterService.error('An unexpected Error occured', 'Error')
    //   })
    // } else { return; }
  }
  // Nasrin
}
