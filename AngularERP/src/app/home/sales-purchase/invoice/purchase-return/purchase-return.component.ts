import { HttpErrorResponse } from '@angular/common/http';
// import { ReportService } from './../../../../services/report.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormArray, FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { ApiResponse } from '../../../../models/api-response';
import { Customer } from '../../../../models/sales-purchase/customer.model';
import { MoneyReceiptModel } from '../../../../models/sales-purchase/money-receipt-mode';
import { TransactionService } from '../../../../services/accounting/transaction.service';
import { AppCollectionService } from '../../../../services/app-collection.service';
import { AuthService } from '../../../../services/auth.service';
import { SalesPurchaseService } from '../../../../services/sales-purchase/sales-purchase.service';
import { NgbDateCustomParserFormatter } from '../../../../shared/dateformat';
import { Helper } from '../../../../shared/helper';
import { ChallanType, InvoiceType, PaymentType, ProductUnitType, TransType } from '../../../../shared/lookup';
import { ReportModel } from '../../../../models/settings/app-settings/report-model';

@Component({
  selector: 'app-purchase-return',
  templateUrl: './purchase-return.component.html',
  styleUrls: ['./purchase-return.component.scss', '../../../../../vendor/libs/ng-select/ng-select.scss']
})
export class PurchaseReturnComponent implements OnInit {
  CustomerType:number=2;
  compId: number;
  userId: number;
  branchId: number;
  totalDisCount = 0;
  disCountAmount: number = 0;
  disCountRate: number = 0;
  totalDiscountAmount: number = 0; 0
  totalVatAmount: number = 0;
  moneyReceipts: MoneyReceiptModel[] = [];
  totalQuantity: number = 0;
  Customers: Customer[] = [];
  totalAmount: number = 0
  totalNetAmount: number = 0;
  invoiceForm: FormGroup
  ProductForm: FormArray;
  showModal: boolean = false;
  showList: boolean = false;
  challanList: boolean = false;
  restrictForEdit: boolean = true;
  invoiceTypeKey: string;
  challanType:ChallanType= ChallanType.ReceiveReturn;
  isLoadFromChallan:boolean = false;
  mobileBankTypes: { name: string }[] = [];
  searchLevelForPR:number=4;////Purchase Return
  searchLevelForPU:number=2;///Purchase
  //for report
  childModuleId:number=20;
  moduleId:number=20;
  pageId:number=63;
  reports:ReportModel[]=[];
  isExporting:boolean;
  exportType:string="pdf";
  transId:number;
  reportId:number;
  isSaved:boolean=false;
  constructor(
    private formBuilder: FormBuilder,
    private toasterService: ToastrService,
    private dateService: NgbDateCustomParserFormatter,
    private salesPurchaseService: SalesPurchaseService,
    private transactionService: TransactionService,

    public modalService: NgbModal,
    private appCollection: AppCollectionService,
    // private reportService:ReportService
    ) {
    this.ProductForm = this.formBuilder.array([]);
  }
  ngOnInit() {
    this.compId = AuthService.CompanyId;
    this.userId = AuthService.UserId;
    this.branchId = AuthService.BranchId;
    this.pageId=AuthService.CurrentPageId;
    this.invoiceTypeKey = this.salesPurchaseService.getInvoiceTypeKey(InvoiceType.PurchaseReturn)
    this.createFrorm();
    this.getAllMoneyReceipt();
    this.getVoucherNo(this.invoiceTypeKey, new Date().toLocaleDateString(), this.compId)
    this.getReportInfo();
    this.mobileBankTypes = this.appCollection.getMobileBankingType();
  }
  getVoucherNo(voucherType, voucherDate, compnayId) {
    this.transactionService.getVoucherNo(voucherType, voucherDate, compnayId)
      .subscribe((response: any) => {
        if (response) {
          this.invoiceForm.patchValue({
            voucherNo: response.voucherNo,
            voucherNoView: response.formatVoucherNo
          })
        }
      })
  }
  changeVoucherNoByDate(date){
    this.getVoucherNo(this.invoiceTypeKey, date, this.compId);

  }
  onSelectAllCustomer(isSelect) {
    if (isSelect) {
      this.CustomerType = 3;
    } else {
      switch (this.challanType) {
        case ChallanType.Delivery:
          this.CustomerType = 1;
          break;
        case ChallanType.Receive || ChallanType.DeliveryReturn:
          this.CustomerType = 2;
          break;
      }
    }
  }
  onSelectCustomer(customer:Customer){
    if(customer){
      this.invoiceForm.patchValue({
        partyId:customer.accountId,
        partyName:customer.formattedName,
        billTo:customer.formattedName
      })
    }
  }
  onSelectSalesman(salesman) {
    if (salesman) {
      this.invoiceForm.patchValue({
        salesPersonEmpCode: salesman.empCode
      })
      Helper.focusNgSelect('ngSelectPayType')
    }
  }
  getAllMoneyReceipt() {
    this.salesPurchaseService.getAllMoneyReceipt(this.compId).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.moneyReceipts = response.result as MoneyReceiptModel[];
      }
    })
  }
  getProductInfo(product, rowIndex: number) {
    const tr = document.getElementById('tr' + rowIndex);
    if (tr == null) { return; }
    if (product == null) {
      this.ProductForm.controls[rowIndex].patchValue({
        description: null,
        unitId: null,
        unitPrice: null,
        vat: null,
        unitQty: null,
        discount: null,
        total: null,
        netAmount: null
      })
      tr.classList.add('border-danger')
      return;
    }
    else {
      tr.classList.remove('border-danger')
      this.salesPurchaseService.getProductUnit(product.id, this.compId, ProductUnitType.BillUnit).subscribe((response: ApiResponse) => {
        if (response.status) {
          let units = response.result as any[];
          const productInfo = units.length > 1 ? units[1] : units[0];
          this.ProductForm.controls[rowIndex].patchValue({
            productId: product.id,
            productDesc: product.description,
            unitId: productInfo ? productInfo.unitId : null,
            unitPrice: product.salePrice,
            vat: product.vatrate,
            unitFactor: productInfo ? productInfo.factor : null
          })
        }
        else {
        }
      })
    }
    Helper.focusTextField('r'+rowIndex+'c4')
  }
  onChangeProductQty(rowIndex) {
    let unitQty = this.ProductForm.value[rowIndex]["unitQty"]
    let factor = this.ProductForm.value[rowIndex]["unitFactor"]
    this.ProductForm.controls[rowIndex].patchValue({
      uniqueQty: unitQty / Number(factor)
    })
  }
  onChangeDiscRate(index) {
    let discount = Number(this.ProductForm.value[index]["discount"]);
    if (discount > 100 || discount < 0) {
      this.ProductForm.controls[index].patchValue({
        discount: 0
      })
    }
  }
  onChangeVatRate(index) {
    let vat = Number(this.ProductForm.value[index]["vat"]);
    if (vat > 100 || vat < 0) {
      this.ProductForm.controls[index].patchValue({
        vat: 0
      })
    }
  }
  onChangeQty(rowIndex: number) {
    let unitPrice = this.ProductForm.value[rowIndex]["unitPrice"]
    let unitQty = this.ProductForm.value[rowIndex]["unitQty"]
    let totalAmount = unitPrice * unitQty;
    let discount = this.ProductForm.value[rowIndex]["discount"]
    let vat = this.ProductForm.value[rowIndex]["vat"]
    let disCountAmount = totalAmount * discount * 0.01;
    this.totalDisCount = this.totalDisCount + discount;
    this.ProductForm.controls[rowIndex].patchValue({
      total: totalAmount.toFixed(3),
      netAmount: (totalAmount - disCountAmount) + (totalAmount - disCountAmount) * vat * 0.01,
    })
    let totalDiscountAmount = 0;
    this.totalVatAmount = 0;
    this.totalQuantity = 0;
    this.totalAmount = 0;
    this.totalNetAmount = 0;
    this.ProductForm.controls.forEach(frmGroup => {
      let unitQty = Number(frmGroup.get('unitQty').value);
      let unitPrice = Number(frmGroup.get('unitPrice').value);
      let amount = Number(frmGroup.get('netAmount').value);
      let discount = Number(frmGroup.get('discount').value);
      let vat = Number(frmGroup.get('vat').value);
      this.totalQuantity += unitQty;
      this.totalAmount += unitQty * unitPrice;
      this.totalNetAmount += amount;
      totalDiscountAmount += (unitPrice * unitQty) * discount * 0.01;
      this.totalVatAmount += ((unitPrice * unitQty) - (unitPrice * unitQty) * discount * 0.01) * vat * 0.01;
    })
    this.invoiceForm.patchValue({
      discountAmount: totalDiscountAmount,
      vatAmount: this.totalVatAmount,
      totalAmount: this.totalAmount.toFixed(3),
      totalNetAmount: this.totalNetAmount,
      vatRate: vat,
      discountRate: discount
    })
    this.updateNetPayable();
  }
  onChangeReturnQty(index, elementId) {
    const returnQty = Number(this.getProductVal(index, 'unitQty'));
    const purchaseQty = Number(this.getProductVal(index, 'purchaseQty'));
    const factor = Number(this.getProductVal(index, 'unitFactor'));
    this.ProductForm.controls[index].patchValue({
      uniqueQty: returnQty / factor
    })
    const element = document.getElementById(elementId);
    if (returnQty > purchaseQty) {
      this.ProductForm.controls[index].get('unitQty').setValidators([Validators.max(purchaseQty)])
      element.classList.add('invalid')
    } else {
      element.classList.remove('invalid')
    }
  }
  updateNetPayable() {
    let netAmount = this.totalNetAmount;
    let paidAmount = Number(this.formVal.paidAmount);
    let transportCost = Number(this.formVal.transportCost);
    let labourCost = Number(this.formVal.labourCost);
    let miscAdd = Number(this.formVal.otherAddition);
    let missdeduct = Number(this.formVal.otherDeduction);
    let payableAmount = netAmount - paidAmount - missdeduct + transportCost + labourCost + miscAdd;
    this.invoiceForm.patchValue({ netPayable: payableAmount.toString() });
    if(payableAmount<=0){
      this.invoiceForm.patchValue({ payMode: PaymentType.Cash });
    }
    if(payableAmount>0){
      this.invoiceForm.patchValue({ payMode: PaymentType.Due });
    }

  }

  saveInvoice() {
    if (this.invoiceForm.invalid) {
      this.toasterService.error('Invalid Submission');
      this.isSaved=false;
      return;
    }
    this.isSaved=true;
    const paramObj = {
      transaction: this.formVal,
      billMaster: this.ProductForm.value.filter(bill => bill.productId && Number(bill.unitQty) > 0),
      invoiceType: InvoiceType.PurchaseReturn
    }
    this.salesPurchaseService.saveInvoice(paramObj).subscribe((response: any) => {
      if (response.status) {
       /*  console.log(response.result.transId) */
        this.toasterService.success(response.result);
        this.onPrint(response.transId);
        this.resetForSave();
      }
      else {
        this.toasterService.error(response.result);
        this.isSaved=false;
      }
    }, err => {
      this.toasterService.error(err.message)
      this.isSaved=false;
    })
  }
  edit(transId) {
    console.log(transId)
    this.salesPurchaseService.getInvoiceByTransId(transId, this.compId, TransType.PurchaseReturn)
      .subscribe((response: any) => {
        if (response.status) {
          console.log(response.result)
          const transaction = response.result.transaction;
          // this.invoiceForm.patchValue(transaction);
          this.invoiceForm.patchValue({
            partyId: transaction.partyId,
            voucherType: this.invoiceTypeKey,
            refAccountId: InvoiceType.PurchaseReturn,
            transType: TransType.PurchaseReturn,
            refBillId: transaction.transId,
            voucherDateNgb:this.dateService.getYyyymmddToNgbDate(transaction.voucherDate as string)
          })
          this.ProductForm = this.formBuilder.array([]);
          this.totalQuantity = 0; this.totalNetAmount = 0;
          (response.result.billMaster as any[]).forEach(bill => {
            let form = this.newProductForm()
            form.patchValue(bill);
            form.patchValue({
              total: Number(form.value.unitPrice) * Number(form.value.unitQty),
              purchaseQty: Math.round(Number(bill.unitQty) - (Number(bill.challanQty) * Number(bill.unitFactor))),
              unitQty: null,
              discountAmt: null,
              netAmount: null,
              billNatureId: TransType.PurchaseReturn,
              serialNo:bill.id
            })
            this.ProductForm.push(form);
            this.totalQuantity += bill.unitQty;
            //this.totalNetAmount += bill.netAmount;
          })
        }
        this.modalService.dismissAll();
      })
  }
  loadChallan(template) {
    this.modalService.open(template, { size: 'lg', windowClass: 'my-class' })
  }
  onSelectChallan(selectedChallanId) {
    this.isLoadFromChallan = true;
    if (selectedChallanId) {
      this.salesPurchaseService.getBillFromChallan(selectedChallanId, this.formVal.partyId, this.compId).subscribe((response: any) => {
        if (response.status && (response.result as any[]).length > 0) {
          this.restrictForEdit = true;
          this.invoiceForm.patchValue({
            selectedChallanId: selectedChallanId
          })
          this.ProductForm = this.formBuilder.array([]);
          this.totalQuantity = 0; this.totalNetAmount = 0;
          let totalVatAmount = 0, totalAmount = 0;
          (response.result as any[]).forEach(bill => {
            let form = this.newProductForm()
            form.patchValue(bill)
            form.patchValue({
              unitQty: Number(bill.unitQty),
              uniqueQty: Number(bill.uniqueQty),
              uniquePrice: Number(bill.uniquePrice),
              total: Number(bill.unitQty) * Number(bill.unitPrice),
              netAmount: Number(bill.netAmount),
              billNatureId: TransType.PurchaseReturn
            })
            this.ProductForm.push(form);
            this.totalQuantity += Number(bill.unitQty);
            this.totalNetAmount += Number(bill.netAmount)
            totalVatAmount += Number(form.value.total) * 0.01 * Number(bill.vat)
            totalAmount += Number(Number(bill.unitQty) * Number(bill.unitPrice))
          })
          this.invoiceForm.patchValue({
            discountAmount: 0,
            vatAmount: totalVatAmount,
            totalAmount: totalAmount.toFixed(3),
            totalNetAmount: this.totalNetAmount,
            vatRate: 0,
            discountRate: 0,
            netPayable: totalAmount.toFixed(3)
          })
        }
      })
    }
  }
  createFrorm() {
    this.invoiceForm = this.formBuilder.group({
      transId: [, []],
      partyId: [, [Validators.required]],
      partyName: ['', []],
      voucherNo: [, []],
      voucherNoView: [, []],
      // voucherDate: [this.dateService.getDateToYyyymmdd(new Date()), []],
      voucherDate: [this.dateService.getDateToYyyymmdd(new Date()), []],
      voucherDateNgb:[,[]],
      voucherType: [this.invoiceTypeKey, []],
      refAccountId: [InvoiceType.PurchaseReturn, []],
      isPosted: [, []],
      voucherTypeId: [null, []],
      moneyReceiptId: [, []],
      transType: [TransType.PurchaseReturn, []],
      totalAmount: [0, []],
      refNo: [, []],
      narration: [, []],
      otherAddition: [, []],
      otherDeduction: [, []],
      transportCost: [, []],
      labourCost: [, []],
      paidAmount: [, []],
      payMode: [PaymentType.Cash, []],
      billTo: [, []],
      billAddress: [, []],
      billContactNo: [, []],
      bankBranch: [, []],
      chequeNo: [, []],
      chequeDate: [, []],
      empId: [, []],
      discountRate: [, []],
      discountAmount: [0, []],
      vatRate: [, []],
      vatAmount: [0, []],
      netPayable: [, []],
      userId: [this.userId, []],
      branchId: [this.branchId, []],
      compId: [this.compId, []],
      salesPersonEmpCode: [, []],
      modifiedBy: [, []],
      modifiedDate: [, []],
      createdDate: [, []],
      yearID: [, []],
      conRate: [, []],
      accountId: [, []],
      amount: [, []],
      currencyRate: [1.000, []],
      refBillId: [, []]
    })
  }
  addRow() {
    this.ProductForm.push(this.newProductForm())
  }
  newProductForm() {
    return new FormGroup({
      productId: new FormControl(null, [Validators.required]),
      productDesc: new FormControl(null, []),
      id: new FormControl(null, []),
      unitId: new FormControl(null, []),
      unitFactor: new FormControl(null, []),
      categoryId: new FormControl(null, []),
      productType: new FormControl(null, []),
      costPrice: new FormControl(null, []),
      unitPrice: new FormControl(null, []),
      vat: new FormControl(null, []),
      unitQty: new FormControl(null, []),
      pcsQty: new FormControl(0, []),
      purchaseQty: new FormControl(null, []),
      uniqueQty: new FormControl(null, []),
      discount: new FormControl(null, []),
      disCountAmount: new FormControl(null, []),
      total: new FormControl(null, []),
      netAmount: new FormControl(null, []),
      branchId:new FormControl(this.branchId,[]),
      compId: new FormControl(this.compId, []),
      billNatureId: new FormControl(TransType.PurchaseReturn, []),
      serialNo:new FormControl(null, []),
    })
  }
  removeRow(index: number) {
    let deletedRowQty = this.ProductForm.value[index]["unitQty"];
    let deletedRowTotalAmount = this.ProductForm.value[index]["total"];
    let deletedRowNetAmount = this.ProductForm.value[index]["netAmount"];
    let deletedRowDiscount = this.ProductForm.value[index]["discount"] * deletedRowTotalAmount * 0.01;
    let deletedRowVat = this.ProductForm.value[index]["vat"] * deletedRowTotalAmount * 0.01;
    this.invoiceForm.patchValue({
      discountAmount: this.formVal.discountAmount - deletedRowDiscount,
      vatAmount: this.formVal.vatAmount - deletedRowVat,
      totalAmount: (this.formVal.totalAmount - deletedRowTotalAmount).toFixed(3)
    })
    this.totalNetAmount -= deletedRowNetAmount;
    this.totalQuantity -= deletedRowQty;
    this.updateNetPayable()
    this.ProductForm.removeAt(index);
  }
  get f() {
    return this.invoiceForm.controls;
  }
  get formVal() {
    return this.invoiceForm.value;
  }
  getProductVal(index, key) {
    return this.ProductForm.controls[index].get(key).value;
  }
  reset() {
    this.invoiceForm.reset();
    this.createFrorm();
    // this.invoiceForm.controls['voucherDate'].setValue((new Date).toLocaleDateString());
    this.invoiceForm.controls['voucherDateNgb'].setValue(this.dateService.getYyyymmddToNgbDate(this.f['voucherDate'].value))
    this.getVoucherNo(this.invoiceTypeKey, new Date().toLocaleDateString(), this.compId)
    this.ProductForm = this.formBuilder.array([])
    this.totalDisCount = 0;
    this.disCountAmount = 0;
    this.disCountRate = 0;
    this.totalDiscountAmount = 0; 0
    this.totalVatAmount = 0;
    this.totalQuantity = 0;
    this.totalAmount = 0
    this.totalNetAmount = 0;
  }
  resetForSave() {
    this.isSaved=false;
    let voucherDate=this.formVal['voucherDate'];
    let voucherDateNgb=this.formVal['voucherDateNgb'];
    this.invoiceForm.reset();
    this.createFrorm();
    this.f['voucherDate'].setValue(voucherDate);
    this.f['voucherDateNgb'].setValue(voucherDateNgb);
    this.getVoucherNo(this.invoiceTypeKey, new Date().toLocaleDateString(), this.compId)
    this.ProductForm = this.formBuilder.array([])
    this.totalDisCount = 0;
    this.disCountAmount = 0;
    this.disCountRate = 0;
    this.totalDiscountAmount = 0; 0
    this.totalVatAmount = 0;
    this.totalQuantity = 0;
    this.totalAmount = 0
    this.totalNetAmount = 0;
  }
  ///Nasrin
  onEnterOrTabKeyDown(event: KeyboardEvent,  elementId: string) {
    if (event.key == 'Enter' || event.key=='Tab' ) {
      Helper.focusTextField(elementId);
      event.preventDefault();
    }
  }
  onEnterOrTabKeyDownForNgSelect(event: KeyboardEvent,  elementId: string){
    if (event.key == 'Enter' || event.key=='Tab') {
      Helper.focusNgSelect(elementId);
      event.preventDefault();
    }
  }
  onBlurNarration(event:KeyboardEvent){
    if(event.key=='Tab'){
      event.preventDefault();
      Helper.focusTextField('btnPurchaseReturn');
    }
  }
  onChangePaytype(event:any){
    if(event){
    if(event.id==4){
      this.invoiceForm.patchValue({payMode:PaymentType.MobileBanking})
      Helper.focusNgSelect('bkType')
    }else if(event.id==0){
      this.invoiceForm.patchValue({payMode:PaymentType.Due})
       Helper.focusTextField('pDate')
    }else if(event.id==6){
      this.invoiceForm.patchValue({payMode:PaymentType.Cheque})
      Helper.focusTextField('banks');
    }else if(event.id==27){
      this.invoiceForm.patchValue({payMode:PaymentType.Card})
      Helper.focusTextField('txtBillTo')
    }else {
      this.invoiceForm.patchValue({payMode:PaymentType.Cash})
      Helper.focusTextField('txtBillTo')
    }
  }

  }
  onBlurPaytype(event:KeyboardEvent){
    if(this.f.payMode.value==PaymentType.Cash || this.f.payMode.value==PaymentType.Card ){
     Helper.focusTextField('txtBillTo')
     }
   }
   onSelectPaymentDateByPAyMode(event:any){
    if(event){
     this.invoiceForm.patchValue({chequeDate:event})
      Helper.focusTextField('txtBillTo')
     }
   }
   onSelectVoucherDate(vdate:any){
    if(vdate !=null){
      this.invoiceForm.patchValue({
        voucherDate:vdate
      })
    }
  }
   onSelectBakingType(){
    Helper.focusTextField('mobile');
  }
  ///Nasrin
  onBlurPayType(){
    Helper.focusTextField('txtBillTo');
  }
  // onBlurNarration(){
  //   Helper.focusTextField('btnPurchaseReturn');
  // }
  onBlurPurchaseReturnBtn(){
    Helper.focusTextField('btnSearchInvoice');
  }
  onBlurVatField(index:number, event:KeyboardEvent){
    if((this.ProductForm.length-1==index && event.key=='Tab') || (event.key=='Tab' && event.shiftKey)){
      event.preventDefault();
      Helper.focusTextField('transportCost');
    }
  }

  //Report
  getReportInfo() {
    // console.log(this.compId, this.childModuleId, this.pageId)
    // this.reportService.getReports(this.compId, this.childModuleId, this.pageId)
    //   .subscribe(response => {
    //     if (response.status) {

    //       this.reports = response.result as ReportModel[];
    //       console.log( this.reports);
    //    }
    //   }, err => {
    //     this.toasterService.error('Report Info not found');
    //   })
  }
  onPrint(transId){
  //   if (transId!= null && transId!= 0) {
  //     this.isExporting = true;
  //     this.reportId = this.reports.length > 0 ? this.reports[0].reportId : null;
  //     console.log(this.reportId,transId,this.formVal.branchId,this.formVal.compId,);
  //     this.reportService.getCommercialReportForRpt({
  //       ReportId: this.reportId,
  //       ExportType: this.exportType,
  //       trmasterid: transId,
  //       CompId: this.formVal.compId,
  //       BranchId: this.formVal.branchId
  //     }).subscribe((file) => {
  //       this.isExporting = false;
  //       if (file) {
  //         this.reportService.openFileWindow(file)
  //       }
  //     }, (err: HttpErrorResponse) => {
  //       this.isExporting = false;
  //       this.toasterService.error('An unexpected Error occured', 'Error')
  //     })
  //  } else { return; }
  }
}
