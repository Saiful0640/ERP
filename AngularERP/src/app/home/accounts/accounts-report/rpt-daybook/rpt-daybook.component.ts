import { NgbDateCustomParserFormatter } from './../../../../shared/dateformat';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { VoucherType } from '../../../../models/accounting/transaction/voucher-type.model';
import { ReportsService } from '../../../../services/reports.service';
import { DaybookReport } from '../../../../models/accounting/reports/daybook-report.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-rpt-daybook',
  templateUrl: './rpt-daybook.component.html',
  styleUrls: ['./rpt-daybook.component.scss', '../../../../../vendor/libs/angular2-ladda/angular2-ladda.scss']
})
export class RptDaybookComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private reportService: ReportsService,
    private toaster: ToastrService,
    public dateService: NgbDateCustomParserFormatter
  ) { }
  rptDayBookForm: FormGroup;
  daybookModel: DaybookReport[] = [];
  filterDaybookModel: DaybookReport[] = [];
  totalDebit: number = 0;
  totalCredit: number = 0;
  isLoading:boolean;
  isExporting: boolean = false;
  ngOnInit() {
    this.createForm();   
  }
  onSelctVoucherType(voucherTypeInfo: VoucherType) {
    this.rptDayBookForm.patchValue({
      voucherType: voucherTypeInfo.prefixCode
    })
  }
  onSelectedVocherNo(event){
    this.rptDayBookForm.patchValue({
      VoucherType:event
    })
  }
  getAllDaybookForReport() {
    this.isLoading = true;
    this.totalDebit = 0;
    this.totalCredit = 0;
    this.reportService.getDaybookForReport(this.f.fromDate.value,this.f.todate.value,this.f.voucherType.value,this.f.accountId.value).subscribe((response: any) => {
      if (response) {       
        this.daybookModel = response.map(item=>{
          this.totalDebit+=item.debit;
          this.totalCredit+=item.credit;
          return item;
        });
        this.filterDaybookModel = response.map(item => {
            this.totalDebit += item.debit;
            this.totalCredit += item.credit;
            return item;
          });
      }
      else {
        this.daybookModel = [];
      }
      this.isLoading = false;
    }, err => {
      this.toaster.error('An unexpected error occured');
      this.isLoading = false;
    })
  }
  filterDayBookReport(searchKey: string) {
    if (searchKey && searchKey != '') {
      this.filterDaybookModel = this.daybookModel.filter(dbook =>
        this.isNull(dbook.accountname).toLowerCase().match(searchKey.toLowerCase()) ||
        this.isNull(dbook.refno).toLowerCase().match(searchKey.toLowerCase()) ||
        this.isNull(dbook.formatevoucherno).toLowerCase().match(searchKey.toLowerCase())
      )

    } else {
      this.filterDaybookModel = this.daybookModel;
    }

  }
  isNull(value) {
    return value ? value : '';
  }

  createForm() {
    this.rptDayBookForm = this.formBuilder.group({
      fromDate: [,[]],
      fromDateNgb: [,[]],
      todate: [, []],
      todateNgb: [, []],
      voucherType: [, []],
      accountId: [0, []],
    })
  }
  get f() {
    return this.rptDayBookForm.controls;
  }
  get formVal() {
    return this.rptDayBookForm.value;
  }
  reset() {
    this.createForm();
    this.f['fromDate'].setValue((new Date).toLocaleDateString());
    this.f['fromDateNgb'].setValue(this.dateService.getCurrentNgbDate())
    this.f['todate'].setValue((new Date).toLocaleDateString());
    this.f['todateNgb'].setValue(this.dateService.getCurrentNgbDate())
    this.daybookModel = [];
    this.isLoading=false;
  }
  onPrintPDF(){
    this.reportService.getDaybookPDFReport(this.f.fromDate.value,this.f.todate.value,this.f.voucherType.value,this.f.accountId.value).subscribe((x:any)=>{
      console.log(x)
      this.reportService.openFileWindow(x);
      console.log(x)
    })
  }
}
