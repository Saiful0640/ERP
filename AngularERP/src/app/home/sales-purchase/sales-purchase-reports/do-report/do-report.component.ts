import { HttpErrorResponse } from '@angular/common/http';
import { isNull } from '@angular/compiler/src/output/output_ast';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastRef, ToastrService } from 'ngx-toastr';
import { Doreport } from '../../../../models/sales-purchase/doreport.model';
import { ReportModel } from '../../../../models/settings/app-settings/report-model';
import { AuthService } from '../../../../services/auth.service';
// import { ReportService } from '../../../../services/report.service';
import { SalesPurchaseService } from '../../../../services/sales-purchase/sales-purchase.service';
import { NgbDateCustomParserFormatter } from '../../../../shared/dateformat';

@Component({
  selector: 'app-do-report',
  templateUrl: './do-report.component.html',
  styleUrls: ['./do-report.component.scss']
})
export class DoReportComponent implements OnInit {
  @Input() title: string = "DO Report"
  rptDOForm: FormGroup;
  subModuleId: number;
  pageId: number;
  isExporting: boolean;
  moduleId: number;
  compId: number;
  reportId: number;
  isPrinting: boolean;
  DOList: any[] = [];
  isLoading: boolean;
  DOReportsModel: Doreport[] = [];
  filterDOModel: Doreport[] = [];
  DOfilter: Doreport[] = [];
  userId: number;
  orders: any[] = [];
  childModuleId: number = 21;
  DORptinfo: ReportModel[] = [];
  branchId: number;
  orderId: number;
  exportType: string = "pdf"
  isOrder:number;
  tableColumn:string;
  constructor(private fb: FormBuilder,

    private toastrService: ToastrService,
    private dateService: NgbDateCustomParserFormatter,
    private salePurchaseService: SalesPurchaseService,
 ) { }

  ngOnInit() {
    this.compId = AuthService.CompanyId;
    this.moduleId = AuthService.CurrentModuleId;
    this.pageId = AuthService.CurrentPageId;
    this.userId = AuthService.UserId;
    this.branchId = AuthService.BranchId;
    this.createForm();
     this.getReportInfo();
    
    //this.getAllDoForReport();
  }

  createForm() {
    this.rptDOForm = this.fb.group({
      id: [0, []],
      startDate: [, []],
      endDate: [, []],
      fromDate: [, []],
      fromDateNgb: [, []],
      todate: [, []],
      todateNgb: [, []],
      accountId: [0, []],
      compId: [this.compId, []],
      partyId: [, []],
      userId: [this.userId, []],
      orderId: [, []],
      branchId: [this.branchId, []],
      productId: [, []],
      //For Report
      reportId: [null, [Validators.required]],
      between: [this.dateService.getDateToYyyymmdd(new Date()), []],
      and: [this.dateService.getDateToYyyymmdd(new Date()), []],
      isOrder:[0,[]]
      /* exportType:['pdf',[]] */

    })
  }
  DOReportsfilter(searchKey: string) {
    if (searchKey && searchKey != '') {
      this.filterDOModel = this.DOReportsModel.filter(DO =>
        this.isNull(DO.customerName).toLowerCase().match(searchKey.toLowerCase()) ||
        this.isNull(DO.orderNo).toLowerCase().match(searchKey.toLowerCase())
      )
    }
    else {
      this.filterDOModel = this.DOReportsModel;
    }
  }
  isNull(value) {
    return value ? value : '';
  }

  status(){
    if(this.rptDOForm.controls.isOrder.value==1){
     this.tableColumn='Order Date'
    }else{
      this.tableColumn='Challan Date'
    }
    }
    onSelectCheckBox(event: boolean) {
      if (event) {
        this.f.isOrder.patchValue(1)
      } else {
        this.f.isOrder.patchValue(0)
      }
    }
    onSelectAllChallan(isSelect) {
     
      if (isSelect) {
        this.f.isOrder.patchValue(1)
      
      }
      else {
        this.f.isOrder.patchValue(0)
        
      }
    }

  getAllDoForReport() {
    this.isLoading = true;
 this.salePurchaseService.getAllDoForReport(this.rptDOForm.value).subscribe((res: any) => {
      if (res.status) {
        this.DOReportsModel = res.result;
        this.filterDOModel = res.result;
        
        /* this.orderId=this.DOReportsModel.orderId */
      }
      else {
        this.DOReportsModel = [];
      }
      this.isLoading = false;
    },
      err => {
        this.toastrService.error('An unexpexted error occured')
        this.isLoading = false;
      })
  }
  onSelect() { }
  reset() {
    this.rptDOForm.reset();
    this.createForm();

  }
  getReportInfo() {
    // this.rptService.getReports(this.compId, this.childModuleId, this.pageId)
    //   .subscribe(response => {
    //     if (response) {
    //       this.DORptinfo = response.result as ReportModel[];
    //     }
    //   }, err => {
    //     this.toastrService.error("Report Info Not Found");
    
    //   })
  }

  onPrint(orderId) {
    // if (orderId != null && orderId != 0) {
    //   this.isExporting = true;
    //   this.reportId = this.DORptinfo.length > 0 ? this.DORptinfo[0].reportId : null;
    //   this.reportService.getCommercialReportForRpt({
    //     ReportId: this.reportId,
    //     ExportType: this.exportType,
    //     orderId: orderId,
    //     CompId: this.formVal.compId,
    //     BranchId: this.formVal.branchId
    //   }).subscribe((file) => {
    //     this.isExporting = false;
    //     if (file) {
    //       this.reportService.openFileWindow(file)
    //     }
    //   }, (err: HttpErrorResponse) => {
    //     this.isExporting = false;
    //     this.toastrService.error('An unexpected Error occured', 'Error')
    //   })
    // } else { return; }
  }
  get formVal() {
    return this.rptDOForm.value;
  }
  get f() {
    return this.rptDOForm.controls;
  }
  //Sales Report
  onExportSalesReport() { }
}
