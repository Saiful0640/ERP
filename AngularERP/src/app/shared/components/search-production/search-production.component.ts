import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ReportModel } from '../../../models/settings/app-settings/report-model';
import { AuthService } from '../../../services/auth.service';
import { SalesPurchaseService } from '../../../services/sales-purchase/sales-purchase.service';
import { NgbDateCustomParserFormatter } from '../../dateformat';

@Component({
  selector: 'app-search-production',
  templateUrl: './search-production.component.html',
  styleUrls: ['./search-production.component.scss']
})
export class SearchProductionComponent implements OnInit {
  compId: number = AuthService.CompanyId;

  @Input() OrderId: number;
  @Output() onSelect: EventEmitter<number> = new EventEmitter()

  filterForm: FormGroup;
  isLoading: boolean = false;
  invoices: any[] = [];
  isPrinting:boolean;
  childModuleId:number=62;
  reportlist:ReportModel[]=[];
  pageId:number;
  reportId:number;
  constructor(
    public modalService: NgbModal,
    private fb: FormBuilder,
    private salesPurchaseService: SalesPurchaseService,
    public dateService: NgbDateCustomParserFormatter,
    private toastrService:ToastrService,
  ) { }

  ngOnInit() {
    this.pageId=AuthService.CurrentPageId;
    this.createForm();
    this.search();
    //this. getReportInfo();
  }
  search() {
    this.isLoading = true;
    this.f.startDate.setValue(this.dateService.getNgbDateToYyyymmdd(this.f.startDateNgb.value));
    this.f.endDate.setValue(this.dateService.getNgbDateToYyyymmdd(this.f.endDateNgb.value))
    this.salesPurchaseService.getProductionSearch(this.compId,this.f.startDate.value,this.f.endDate.value,this.OrderId)
      .subscribe((response: any) => {
        this.isLoading = false;
        if (response.status) {
          this.invoices = response.result
        } else {
          this.invoices = [];
        }
      }, err => {
        this.isLoading = false;
        this.invoices = [];
      })
  }
  onSelectInvoice(event) {
    this.onSelect.emit(event)
  }
  createForm() {
    this.filterForm = this.fb.group({
      startDate: [,[]],
      startDateNgb: [this.dateService.getCurrentNgbDate(),[]],
      endDate: [,[]],
      endDateNgb: [this.dateService.getCurrentNgbDate(),[]],
      compId: [this.compId,[]],
      orderId:[this.OrderId,[]]
    })
  }
  get f(){
    return this.filterForm.controls;
  }

  //Report

  // getReportInfo() {

  //   this.rptService.getReports(this.compId, this.childModuleId, this.pageId)
  //     .subscribe(response => {
  //       if (response.status) {
  //         this.reportlist = response.result as ReportModel[];
          
  //         }
  //     }, err => {
  //       this.toastrService.warning(err.error,'Report Info not found');
  //     })
  // }
  // onPrint(challanId: number) {
    
  //   if (challanId > 0) {
  //     this.isPrinting = true;
  //     this.reportId = this.reportlist.length > 0 ? this.reportlist[0].reportId : null;
  //     this.rptService.getCommercialReportForRpt({
  //       CompId: this.compId,
  //       ChllanId: challanId,
  //       ReportId: this.reportId,
  //       OrderId: this.filterForm.value.orderId,
  //       ExportType: "pdf"
  //     }).subscribe((file: Blob) => {
  //       this.rptService.openFileWindow(file)
  //       this.isPrinting = false;
  //     }, err => {
  //       this.isPrinting = false;
  //       this.toastrService.error(err.message, 'ERROR!')
  //     })
  //   }
  // }

}
