import { SimpleInvoice } from './../../../../models/sales-purchase/simple-invoice.model';
import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { InvoiceCustomerModel } from './../../../../models/sales-purchase/invoice-customer.model';
import { InvoiceProductModel } from './../../../../models/sales-purchase/invoice.model';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AppCollectionService } from '../../../../services/app-collection.service';
import { SalesPurchaseService } from '../../../../services/sales-purchase/sales-purchase.service';
import { MoneyReceiptModel } from '../../../../models/sales-purchase/money-receipt-mode';
import { ApiResponse } from '../../../../models/api-response';
import { AuthService } from '../../../../services/auth.service';
import { InvoiceType, PaymentType, TransType } from '../../../../shared/lookup';
import { Helper } from '../../../../shared/helper';
import { CustomerLocation } from '../../../../models/sales-purchase/customer-location.model';
import { TransactionService } from '../../../../services/accounting/transaction.service';
import { NgbDateCustomParserFormatter } from '../../../../shared/dateformat';
import { ReportModel } from '../../../../models/settings/app-settings/report-model';
// import { ReportService } from '../../../../services/report.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.scss']
})
export class InvoiceComponent implements OnInit {
  compId: number;
  userId: number;
  branchId: number;
  pageId: number;
  BillingAccountsForm: FormArray;
  billNatureId: number = 1;//ForSale=1
  isLoadFromOrder: boolean = false;
  isSubmitted: boolean = false;
  restrictForEdit: boolean = false;
  products: any[] = [];
  product: any;
  mobileBankTypes: { name: string }[] = [];
  moneyReceipts: MoneyReceiptModel[] = [];
  invoiceForm: FormGroup;
  currencyList: any[] = [];
  productsFormArr: FormArray;
  quantity: number;
  totalAmount: number = 0;
  netAmount: number = 0;
  finalTotalQty: number = 0;
  finalTotalAmount: number = 0;
  finalNetAmount: number = 0;
  finalNetPayableAmount: number = 0;
  invoiceTypeKey: string = this.salesPurchaseService.getInvoiceTypeKey(InvoiceType.Sales);
  forHideField: false;
  billingAccounts: any[] = [];
  filtered: any[] = [];
  isLoadFromChallan: boolean = false;
  isSaving: boolean = false;
  transId: number;
  totalDiscountAmount: number = 0;
  totalVatAmount: number = 0;
  totalTaxAmount: number = 0;
  totalQuantity: number = 0;
  totalNetAmount: number = 0;
  totalDisCount: number = 0;
  reportId: number;
  childModuleId: number = 20;
  isExporting: boolean = false;
  exportType: string = 'pdf';
  reports: ReportModel[] = [];
  locations: CustomerLocation[] = [];
  filterlocations: any[] = [];

  constructor(
    private dateService: NgbDateCustomParserFormatter,
    private transactionService: TransactionService,
     private appCollection: AppCollectionService,
    private salesPurchaseService: SalesPurchaseService,
    public modalService: NgbModal,
    private toasterService: ToastrService,
    private fb: FormBuilder,
    // private reportService: ReportService,
  ) { this.BillingAccountsForm = this.fb.array([]); }

  ngOnInit() {
    this.compId = AuthService.CompanyId;
    this.userId = AuthService.UserId;
    this.branchId = AuthService.BranchId;
    this.pageId = AuthService.CurrentPageId;
    this.createForm();
    this.product = new InvoiceProductModel();
    this.getAllMoneyReceipt();
    this.productsFormArr = this.fb.array([]);
    this.getAllCurrency();
    this.getVoucherNo(this.invoiceTypeKey, new Date().toLocaleDateString(), this.compId);
    this.getReportInfo();
    this.mobileBankTypes = this.appCollection.getMobileBankingType();
    this.getbillingAccounts();
  }
  getReportInfo() {
    // this.reportService.getReports(this.compId, this.childModuleId, this.pageId)
    //   .subscribe(response => {
    //     if (response.status) {
    //       this.reports = response.result as ReportModel[];

    //     }
    //   }, err => {
    //     this.toasterService.error('Report Info not found');
    //   })
  }
  getVoucherNo(voucherType, voucherDate, compnayId) {
    this.transactionService.getVoucherNo(voucherType, voucherDate, compnayId)
      .subscribe((response: any) => {
        if (response) {
          this.invoiceForm.patchValue({
            invoiceNo: response.voucherNo,
            voucherNoView: response.formatVoucherNo,
            yearID: response.financialYearID
          })
        }
      })
  }
  onSaleInvoiceTypeChange() {
    this.invoiceTypeKey = this.salesPurchaseService.getInvoiceTypeKey(InvoiceType.Sales);
    this.getVoucherNo(this.invoiceTypeKey, new Date().toLocaleDateString(), this.compId)
    this.f.refAccountId.patchValue(InvoiceType.Sales);
    this.f.transType.patchValue(TransType.Sales);
    this.billNatureId = 1;
  }
  onPurchaseInvoiceTypeChange() {
    this.invoiceTypeKey = this.salesPurchaseService.getInvoiceTypeKey(InvoiceType.Purchase);
    this.getVoucherNo(this.invoiceTypeKey, new Date().toLocaleDateString(), this.compId)
    this.f.refAccountId.patchValue(InvoiceType.Purchase);
    this.f.transType.patchValue(TransType.Purchase);
    this.billNatureId = 2;
  }
  getAllCurrency() {
    // this.commercialService.getAllCurrencies().subscribe((response: any) => {
    //   if (response.status) {
    //     this.currencyList = response.result;
    //   } else {
    //     this.currencyList = [];
    //   }
    // })
  }
  onSelectCustomer(customer: InvoiceCustomerModel) {
    if (customer) {
      this.invoiceForm.patchValue({
        partyId: customer.accountId,
        partyName: customer.formattedName,
        billerName: customer.formattedName,
        billerCountry: customer.country,
        billerEmail: customer.email,
        billerAddress: customer.address,
        billerContactNo: customer.billContactNo,
      })
      Helper.focusTextField('productSearchBtnId' + '0');
    }
  }
  selectAddress(location: CustomerLocation) {
    if (location) {
      this.invoiceForm.patchValue({
        partyId: location.accountId,
        partyName: location.formatedName,
        billerName: location.formatedName,
        billerAddress: location.customerAddress
      })
    }
  }

  getAllMoneyReceipt() {
    this.salesPurchaseService.getAllMoneyReceipt(this.compId).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.moneyReceipts = response.result as MoneyReceiptModel[];
      }
    })
  }
  createForm() {
    this.invoiceForm = this.fb.group({
      transId: [, []],
      partyId: [, [Validators.required]],
      partyName: ['', []],
      invoiceNo: [, []],
      voucherNoView: [, []],
      refAccountId: [InvoiceType.Sales, []],
      voucherTypeId: [6, []],
      moneyReceiptId: [, []],
      transType: [TransType.Sales, []],
      totalAmount: [0, []],
      refNo: [, []],
      narration: [, []],
      transportCost: [, []],
      labourCost: [, []],
      paidAmount: [, []],
      paymentType: [PaymentType.Cash, []],
      billerAddress: [, []],
      bankBranch: [, []],
      chequeNo: [, []],
      chequeDate: [this.dateService.getDateToYyyymmdd(new Date()), []],
      netPayable: [0, []],
      userId: [this.userId, []],
      branchId: [this.branchId, []],
      compId: [this.compId, []],
      yearID: [, []],
      conRate: [1.00, []],
      currencyRate: [1.000, []],
      selectedChallanId: [, []],
      challanType: [, []],
      invoiceType: [InvoiceType.Sales, []],
      invoiceDate: [this.dateService.getDateToYyyymmdd(new Date()), []],
      invoiceDateNgb: [, []],
      billerCountry: [null, []],
      billerEmail: [null, []],
      billerContactNo: [, []],
      currencyType: [, []],
      billerName: [, []],
      miscAdd: [, []],
      miscDeduct: [, []],
      totalDiscount: [, []],
      expDate: [this.dateService.getDateToYyyymmdd(new Date()), []],
      expDateNgb: [, []],
      salesBy: [, []],
      netAmount: [, []],
      description: [, []],
      qty: [, []],
      costPrice: [, []],
      purchaseSLNO: [, []],
      discountRate: [, [Validators.min(0), Validators.max(100)]],
      vatRate: [, []],
      totalVat: [, []],
      taxRate: [, []],
      taxAmount: [, []],
      totalCost: [, []],
      jobNo: [, []],
      due: [, []]
    })
  }
  calculation() {
    let discount = this.invoiceForm.controls.discountRate.value;
    let vat = this.invoiceForm.controls.vatRate.value;
    let tax = this.invoiceForm.controls.taxRate.value;
    let qty = this.invoiceForm.controls.qty.value;
    let uniqPrice = this.invoiceForm.controls.costPrice.value;
    let totalAmount = qty * uniqPrice;
    let discountAmount = totalAmount * discount * 0.01;
    let grossAmount = totalAmount - discountAmount;
    let vatAmount = grossAmount * vat * 0.01;
    let taxAmount = grossAmount * tax * 0.01;
    let netAmount = grossAmount + vatAmount + taxAmount;
    this.quantity = this.invoiceForm.controls.qty.value;
    this.invoiceForm.controls.totalAmount.setValue(totalAmount),
      this.invoiceForm.controls.netAmount.setValue(netAmount)
  }

  onChangeProduct(product: any) {
    let costPrice: number;
    if (product.costPrice == 0) {
      costPrice = null;
    }
    if (product) {
      this.invoiceForm.controls.description.setValue(product.description);
      this.invoiceForm.controls.costPrice.setValue(costPrice);
      this.product.productId = product.productId;
      this.product = product;
    } else {
      this.product.productId = null;
      this.product.name = null;
      this.product.productDescription = null;
      this.product.price = null;
      this.product.vat = null;
      this.product.discount = null;
      this.product.tax = null;
      this.product.netAmount = null;
    }
  }
  addProduct() {
    if (this.product.productId != null && this.formVal.qty != null ) {//&& this.formVal.costPrice(sajib remove it from if condition)
      let product = this.product;
      this.finalTotalQty += this.quantity;
      this.finalTotalAmount += this.invoiceForm.controls.totalAmount.value;
      this.finalNetAmount += this.invoiceForm.controls.netAmount.value;
      this.invoiceForm.controls.netPayable.setValue(this.finalNetAmount.toFixed(3));
      this.invoiceForm.controls.totalCost.setValue(this.finalTotalAmount);
      //this.onDue();
      this.productsFormArr.push(new FormGroup({
        serialNo: new FormControl(product.id, [Validators.required]),
        productId: new FormControl(product.productId, [Validators.required]),
        productDescription: new FormControl(product.name, []),
        quantity: new FormControl(this.formVal.qty, []),
        price: new FormControl(this.formVal.costPrice, []),//unitPrice
        discount: new FormControl(this.formVal.discountRate, []),
        vat: new FormControl(this.formVal.vatRate, []),
        tax: new FormControl(this.formVal.taxRate, []),
        netAmount: new FormControl(this.formVal.netAmount, []),
        transId: new FormControl(0, []),
        uniqueQty: new FormControl(this.formVal.qty, []),
        unitId: new FormControl(product.unitId, []),
        total: new FormControl(this.formVal.qty * this.formVal.costPrice, []),
        billNatureId: new FormControl(this.billNatureId, []),
        purchaseSLNO: new FormControl(this.formVal.purchaseSLNO, []),
        expiredDate: new FormControl(this.formVal.expDate, []),
        expiredDateNgb: new FormControl(null, [])
      }))
      this.costAddDeduct();
      this.product.productId = null;
      this.invoiceForm.controls.description.setValue(null);
      this.invoiceForm.controls.expDate.setValue(null);
      this.invoiceForm.controls.expDate.setValue((new Date).toLocaleDateString());
      this.invoiceForm.controls.qty.setValue(null);
      this.invoiceForm.controls.costPrice.setValue(null);
      this.invoiceForm.controls.discountRate.setValue(null);
      this.invoiceForm.controls.vatRate.setValue(null);
      this.invoiceForm.controls.taxRate.setValue(null);
      this.invoiceForm.controls.purchaseSLNO.setValue(null);
      this.invoiceForm.controls.totalAmount.setValue(null);
      this.invoiceForm.controls.netAmount.setValue(null);
    } else {
      this.toasterService.error("Please Select Product & Enter Qty and Price");
    }
  }

  costAddDeduct() {
    let totalCost = Number(this.formVal.netPayable);
    let totalAddition: number = 0;
    let totaldeduction: number = 0;
    let additionArray: any[] = [];
    let deductionArray: any[] = [];
    additionArray = this.BillingAccountsForm.controls.filter(c => c.value.addDeductValue == 1);
    deductionArray = this.BillingAccountsForm.controls.filter(c => c.value.addDeductValue == -1);
    additionArray.forEach(c => {
      let tamt = Number(c.get('amount').value);
      totalAddition += tamt;
    })
    deductionArray.forEach(c => {
      let tamt = Number(c.get('amount').value);
      totaldeduction += tamt;
    })
    let totalAddDeductCost = totalCost + totalAddition - totaldeduction;
    this.f.totalCost.patchValue(totalAddDeductCost);

  }
  onDue() {
    this.f.due.patchValue(0)
    let totalCost = this.formVal.totalCost;
    let payable = this.formVal.paidAmount;
    if (payable == null) {
      payable = 0;
    }
    let due = totalCost - payable;
    this.f.due.patchValue(due);
  }

  editProduct(productId: number, index: number) {
    let product = this.productsFormArr.controls.find(product => product.value.productId == productId).value;
    this.invoiceForm.controls.description.setValue(product.productDescription);
    this.invoiceForm.controls.expDate.setValue(product.expiredDate);
    this.invoiceForm.controls.expDateNgb.setValue(this.dateService.getYyyymmddToNgbDate(product.expiredDate));
    this.invoiceForm.controls.qty.setValue(product.quantity);
    this.invoiceForm.controls.costPrice.setValue(product.price);
    this.invoiceForm.controls.discountRate.setValue(product.discount);
    this.invoiceForm.controls.vatRate.setValue(product.vat);
    this.invoiceForm.controls.taxRate.setValue(product.tax);
    this.invoiceForm.controls.purchaseSLNO.setValue(product.purchaseSLNO);
    this.invoiceForm.controls.totalAmount.setValue(product.total);
    this.invoiceForm.controls.netAmount.setValue(product.netAmount);
    this.finalTotalQty -= product.quantity;
    this.finalTotalAmount -= product.total;
    this.finalNetAmount -= product.netAmount;
    this.product.productId = product.productId;
    this.invoiceForm.controls.netPayable.setValue(this.finalNetAmount);
    this.costAddDeduct()
    this.productsFormArr.removeAt(index);

  }
  edit(transId) {
    this.isLoadFromChallan = false;
    this.salesPurchaseService.getInvoiceByTransId(transId, this.compId, 1)
      .subscribe((response: any) => {
        if (response.status) {
          this.transId = transId;
          const transaction = response.result.transaction;
          this.invoiceForm.patchValue({
            transId: transaction.transId,
            partyId: transaction.partyId,
            partyName: transaction.partyName,
            invoiceNo: transaction.voucherNo,
            refAccountId: transaction.refAccountId,
            voucherTypeId: transaction.voucherTypeId,
            moneyReceiptId: transaction.moneyReceiptId,
            transType: transaction.transType,
            totalAmount: transaction.totalAmount.toFixed(3),
            refNo: transaction.refNo,
            narration: transaction.narration,
            transportCost: transaction.transportCost,
            labourCost: transaction.labourCost,
            paymentType: transaction.payMode,
            billerAddress: transaction.billAddress,
            bankBranch: transaction.bankBranch,
            chequeNo: transaction.chequeNo,
            chequeDate: transaction.chequeDate,
            chequeDateNgb: this.dateService.getYyyymmddToNgbDate(transaction.chequeDate),
            yearID: transaction.yearID,
            conRate: transaction.conRate,
            paidAmount: transaction.paidAmount,
            currencyRate: transaction.currencyRate,
            selectedChallanId: transaction.selectedChallanId,
            challanType: transaction.challanType,
            invoiceType: transaction.voucherType == 'SA' ? InvoiceType.Sales : InvoiceType.Purchase,
            invoiceDate: transaction.voucherDate,
            invoiceDateNgb: this.dateService.getYyyymmddToNgbDate(transaction.voucherDate),
            billerCountry: transaction.billCountry,
            billerEmail: transaction.billEmail,
            billerContactNo: transaction.billContactNo,
            currencyType: transaction.currencyType,
            billerName: transaction.billTo,
            miscAdd: transaction.otherAddition,
            miscDeduct: transaction.otherDeduction,
            totalDiscount: transaction.discountAmount,
            salesBy: transaction.salesPersonEmpCode,
            totalVat: transaction.vatAmount,
            taxAmount: transaction.taxAmount,
            due: transaction.netPayable,
            jobNo: transaction.lcType,
            voucherNoView: this.invoiceTypeKey + (transaction.voucherDate as string).substring(2, 4) + '-' + (transaction.voucherDate as string).substring(4, 6) + '-' + (transaction.voucherNo.toString()).padStart(5, '0')
          })
          this.BillingAccountsForm.controls.forEach(item => {
            let accountName = item.value.accountName;
            switch (accountName) {
              case "Other Deduction":
                item.get('amount').patchValue(this.f.miscDeduct.value);
                break
              case "Misc Income":
                item.get('amount').patchValue(this.f.miscAdd.value);
                break
              case "Transport Cost":
                item.get('amount').patchValue(this.f.transportCost.value);
                break
              case "Labour Cost":
                item.get('amount').patchValue(this.f.labourCost.value);
                break
                break
              case "Other Addition":
                item.get('amount').patchValue(this.f.otherAddition.value);
                break
              default:
                "Test";
            }
          })
          this.productsFormArr = this.fb.array([]);
          (response.result.billMaster as any[]).forEach(bill => {
            let discount = bill.discount;
            let vat = bill.vat;
            let tax = bill.tax;
            let qty = bill.pcsQty;
            let uniqPrice = bill.unitPrice;
            let totalAmount = qty * uniqPrice;
            let discountAmount = totalAmount * discount * 0.01;
            let grossAmount = totalAmount - discountAmount;
            let vatAmount = grossAmount * vat * 0.01;
            let taxAmount = grossAmount * tax * 0.01;
            let netAmount = grossAmount + vatAmount + taxAmount;
            this.quantity = this.invoiceForm.controls.qty.value;
            this.productsFormArr.push(
              new FormGroup({
                serialNo: new FormControl(bill.serialNo, []),
                productId: new FormControl(bill.productId, []),
                productDescription: new FormControl(bill.productDesc, []),
                quantity: new FormControl(bill.pcsQty, []),
                price: new FormControl(bill.unitPrice, []),//unitPrice
                discount: new FormControl(bill.discount, []),
                vat: new FormControl(bill.vat, []),
                tax: new FormControl(bill.tax, []),
                netAmount: new FormControl(netAmount, []),
                transId: new FormControl(bill.transId, []),
                uniqueQty: new FormControl(bill.uniqueQty, []),
                unitId: new FormControl(bill.unitId, []),
                total: new FormControl(totalAmount, []),
                billNatureId: new FormControl(bill.billNatureId, []),
                purchaseSLNO: new FormControl(bill.purchaseSLNO, []),
                expiredDate: new FormControl(bill.expiredDate, []),
                expiredDateNgb: new FormControl(this.dateService.getYyyymmddToNgbDate(bill.expiredDate), [])
              })
            );
            this.finalTotalQty += bill.pcsQty;
            this.finalTotalAmount += totalAmount;
            this.finalNetAmount += netAmount;
            this.invoiceForm.controls.netPayable.setValue(this.finalNetAmount);
            this.costAddDeduct()
          })
        }
        this.modalService.dismissAll();
      })
  }
  getbillingAccounts() {
    //bill Type 1 for sales
    this.salesPurchaseService.getBillingAccounts(1, this.compId, 1).subscribe((response: any) => {
      if (response) {
        if (response.status) {
          this.billingAccounts = response.result as any[];
          this.billingAccounts.forEach(c => {
            this.BillingAccountsForm.push(
              new FormGroup({
                id: new FormControl(c.id, [Validators.required]),
                accountId: new FormControl(c.accountId, []),
                accountName: new FormControl(c.accountName, []),
                addDeduct: new FormControl(c.addDeduct, []),
                addDeductValue: new FormControl(c.addDeductValue, []),
                billType: new FormControl(c.billType, []),
                amount: new FormControl(0, []),
              })
            )
          })
        } else {
          this.billingAccounts = [];
        }
      }
    })
  }
  termAndConditionLoad(template) {
    this.modalService.open(template, { size: 'lg', windowClass: 'modal-xl' })
  }
  getTermAndCondition(terms: any) {
  }
  onChangeQty() {
    let totalDiscountAmount = 0;
    this.productsFormArr.controls.forEach(frmGroup => {
      let unitPrice = Number(frmGroup.get('price').value);
      let unitQty = Number(frmGroup.get('uniqueQty').value);
      let totalAmount = unitPrice * unitQty;
      let discount = Number(frmGroup.get('discount').value);
      let vat = Number(frmGroup.get('vat').value);
      let tax = Number(frmGroup.get('tax').value);
      let disCountAmount = totalAmount * discount * 0.01;
      this.totalDisCount = this.totalDisCount + discount;

      frmGroup.patchValue({
        total: totalAmount.toFixed(3),
        netAmount: (totalAmount - disCountAmount) + (totalAmount - disCountAmount) * vat * 0.01 + (totalAmount - disCountAmount) * tax * 0.01,
      })
      let amount = Number(frmGroup.get('netAmount').value);
      this.totalQuantity += unitQty;
      this.totalAmount += unitQty * unitPrice;
      this.totalNetAmount += amount;
      totalDiscountAmount += (unitPrice * unitQty) * discount * 0.01;
      this.totalVatAmount += ((unitPrice * unitQty) - (unitPrice * unitQty) * discount * 0.01) * vat * 0.01;
      this.totalTaxAmount += ((unitPrice * unitQty) - (unitPrice * unitQty) * discount * 0.01) * tax * 0.01
      this.invoiceForm.patchValue({
        totalDiscount: totalDiscountAmount,
        totalVat: this.totalVatAmount,
        taxAmount: this.totalTaxAmount,
        totalAmount: this.totalAmount.toFixed(3),
        totalNetAmount: this.totalNetAmount,
        vatRate: vat,
        taxRate: tax,
        discountRate: discount
      })
    })
  }
  payModeStatus() {
    let totalCost = Number(this.formVal.totalCost);
    let paidAmount = Number(this.formVal.paidAmount);
    let payableAmount = totalCost - paidAmount;
    if (payableAmount <= 0) {
      this.invoiceForm.patchValue({ paymentType: PaymentType.Cash });
    }
    if (payableAmount > 0) {
      this.invoiceForm.patchValue({ paymentType: PaymentType.Due });
    }
  }

  saveInvoice() {
    this.isSubmitted = true;
    if (this.invoiceForm.invalid) {
      this.toasterService.error('Invalid Submission');
      return;
    }
    this.isSaving = true;
    this.onChangeQty();
    this.BillingAccountsForm.controls.forEach(item => {
      let accountName = item.value.accountName;
      switch (accountName) {
        case "Other Deduction":
          this.f.miscDeduct.patchValue(item.value.amount);
          break
        case "Misc Income":
          this.f.miscAdd.patchValue(item.value.amount);
          break
        case "Transport Cost":
          this.f.transportCost.patchValue(item.value.amount);
          break
        case "Labour Cost":
          this.f.labourCost.patchValue(item.value.amount);
          break
          break
        case "Other Addition":
          this.f.otherAddition.patchValue(item.value.amount);
          break
        default:
          "Test";
      }
    })
    let simpleInvoice = new SimpleInvoice();
    simpleInvoice = this.formVal;
    simpleInvoice.products = (this.productsFormArr.value as any[]).filter(p => p.productId > 0)
    this.salesPurchaseService.saveSimpleInvoice(simpleInvoice).subscribe((response: any) => {
      if (response.status) {
        this.transId = response.transId
        this.toasterService.success(response.result);
        this.reset();
      }
      else {
        this.toasterService.error(response.result);
      }
      this.isSaving = false;
      this.isSubmitted = false;
    }, err => {
      this.isSaving = false;
      this.isSubmitted = false;
      this.toasterService.error(err.message)
    })
  }
  remove(index: number) {
    this.productsFormArr.removeAt(index);
  }
  resetProductForm() {
    this.product.productId = null;
    this.product.productDescription = null;
    this.product.name = null;
    this.product.price = null;
    this.product.quantity = null;
    this.product.vat = null;
    this.product.discount = null;
    this.product.tax = null;
    this.product.netAmount = null;
  }


  removeRow(index: number) {
    this.BillingAccountsForm.removeAt(index);
  }
  get f() {
    return this.invoiceForm.controls;
  }
  get formVal() {
    return this.invoiceForm.value;
  }
  clear() {

  }
  reset() {
    this.restrictForEdit = false;
    this.invoiceForm.reset;
    this.createForm();
    this.getVoucherNo(this.invoiceTypeKey, new Date().toLocaleDateString(), this.compId)
    this.productsFormArr = this.fb.array([]);
    this.BillingAccountsForm = this.fb.array([]);
    this.isLoadFromChallan = false;
  }
  onPrint() {
    // if (this.transId != null && this.transId != 0) {
    //   this.isExporting = true;
    //   this.reportId = this.reports.length > 0 ? this.reports[0].reportId : null;
    //   this.reportService.getCommercialReportForRpt({
    //     ReportId: this.reportId,
    //     ExportType: this.exportType,
    //     trmasterid: this.transId,
    //     CompId: this.formVal.compId,
    //     BranchId: this.formVal.branchId
    //   }).subscribe((file) => {
    //     this.isExporting = false;
    //     if (file) {
    //       this.reportService.openFileWindow(file)
    //     }
    //   }, (err: HttpErrorResponse) => {
    //     this.isExporting = false;
    //     this.toasterService.error(err.error, 'An unexpected Error occured');
    //   })
    // } else { return; }
  }
}
