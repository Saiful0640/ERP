import { ActivatedRoute } from "@angular/router";
import { HttpErrorResponse } from "@angular/common/http";
// import { ReportService } from "./../../../../services/report.service";
import { DuesPayType } from "./../../../../shared/lookup";
import { AuthService } from "./../../../../services/auth.service";
import { ToastrService } from "ngx-toastr";
import { FormGroup, FormBuilder } from "@angular/forms";
import { Component, Input, OnInit } from "@angular/core";
import { SalesPurchaseDiscountService } from "../../../../services/sales-purchase-discount.service";
import { NgbDateCustomParserFormatter } from "../../../../shared/dateformat";
import { ReportModel } from "../../../../models/settings/app-settings/report-model";

@Component({
  selector: "app-dues-monitoring",
  templateUrl: "./dues-monitoring.component.html",
  styleUrls: ["./dues-monitoring.component.scss"],
})
export class DuesMonitoringComponent implements OnInit {
  duesForm: FormGroup;
  dues: any[] = [];
  filterPayable:any[]=[];
  compId: number;
  totalAmount: number = 0;
 // @Input() lblName: string;
  @Input() title: string="Dues Payable Information";
  @Input() payReceive: number=DuesPayType.DuesMonitoringComponent;
   receivePay: number;
  //For Reports
  isValidForPAyble: boolean = false;
  isExporting: boolean = false;
  childModuleId: number = 18;
  exportType: string = "pdf";
  reports: ReportModel[] = [];
  Recivablepayble: number;
  reportId: number;
  pageId: number;
  routeInfo = { pageId: 0 };
  constructor(
    private discountservice: SalesPurchaseDiscountService,
    private toastr: ToastrService,
    private formBuilder: FormBuilder,
    public dateFormat: NgbDateCustomParserFormatter,
    // public reportService: ReportService,
    public toastrService: ToastrService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
   this.routeInfo.pageId = this.route.snapshot.params["pageId"];
    this.compId = AuthService.CompanyId;
    this.pageId = AuthService.CurrentPageId;
    this.createForm();
    this.getAllPaybleDue();
    // this.getReportInfo();
  }

  createForm() {
    this.duesForm = this.formBuilder.group({
      /* id:[,[]], */
      voucherDate: [, []],
      chequeDate: [, []],
      accountName: [, []],
      /* partyId:[0,[]],
     accountId:[0,[]], */
      /* transId:[0,[]], */
      netPayable: [, []],
      address: ["", []],
      mobileNo: ["", []],
      email: ["", []],
      compId: [this.compId, []],
      payReceive: [this.payReceive, []],
    });
  }

  onSearch(searchKey:string) {
    if (searchKey && searchKey!='') {
      this.filterPayable = this.dues.filter(c =>
        this.isNull(c.accountName).toLowerCase().match(searchKey.toLowerCase()) ||
        this.isNull(c.mobileNo).toLowerCase().match(searchKey.toLowerCase()) ||
        this.isNull(c.voucherNo.toString()).toLowerCase().match(searchKey.toLowerCase())
      )
      console.log(this.filterPayable);
      this.totalAmount=0;
      this.filterPayable.map(item=>{
        this.totalAmount+=item.netPayable;
      })

    } else {
      this.filterPayable = this.dues;
    }
  }
  isNull(value){
    return value?value:'';
  }

  getAllPaybleDue() {
    this.discountservice
      .getAllPaybleDues(this.compId,this.payReceive)
      .subscribe((res: any) => {
        if (res) {
          this.dues = res as any[];
          this.filterPayable=(res as any[])
          .map(item=>{
            this.totalAmount+=item.netPayable;
            return item;
          });
        }else{
          this.dues=[];
        }
      });
  }

  get f() {
    return this.duesForm.controls;
  }

  //For Report

//   getReportInfo() {
//     this.reportService
//       .getReports(this.compId, this.childModuleId, this.pageId)
//       .subscribe(
//         (response) => {
//           if (response.status) {
//             console.log()
//             this.reports = response.result as ReportModel[];
//             console.log(this.reports)
//           }
//         },
//         (err) => {
//           this.toastrService.error("Report Info not found");
//           console.error(err);
//         }
//       );
//   }

//   print() {
//      this.isExporting = true;
//     this.reportId = this.reports.length > 0 ? this.reports[0].reportId : null;
//     this.reportService
//       .getSalePurchaseReport({
//         ReportId: this.reportId,
//         ExportType: this.exportType,
//         CompId: this.compId,
//         Recivablepayble: this.payReceive,
//       })
//       .subscribe(
//         (file) => {
//           this.isExporting = false;
//           if (file) {
//             this.reportService.openFileWindow(file);
//           }
//         },
//         (err: HttpErrorResponse) => {
//           this.isExporting = false;
//           this.toastrService.error(err.error,'An unexpected Error occured');
//         }
//       );
//   }

//   printDue() {
//     this.isExporting = true;
//    this.reportId = this.reports.length > 0 ? this.reports[0].reportId : null;
//    this.reportService
//      .getSalePurchaseReport({
//        ReportId: this.reportId,
//        ExportType: this.exportType,
//        CompId: this.compId,
//        Recivablepayble: this.payReceive,
//      })
//      .subscribe(
//        (file) => {
//          this.isExporting = false;
//          if (file) {
//            this.reportService.openFileWindow(file);
//          }
//        },
//        (err: HttpErrorResponse) => {
//          this.isExporting = false;
//          this.toastrService.error(err.error,'An unexpected Error occured');
//        }
//      );
//  }
}
