
import { CustomerLocation } from './../../../../models/sales-purchase/customer-location.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './../../../../services/auth.service';
import { ApiResponse } from './../../../../models/api-response';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { SalesPurchaseService } from '../../../../services/sales-purchase/sales-purchase.service';
import { MoneyReceiptModel } from '../../../../models/sales-purchase/money-receipt-mode';
import { NgbDateCustomParserFormatter } from '../../../../shared/dateformat';
import { TransactionService } from '../../../../services/accounting/transaction.service';
import { ChallanType, InvoiceType, PaymentType, ProductUnitType, TransType } from '../../../../shared/lookup';
import { Helper } from '../../../../shared/helper';
import { Customer } from '../../../../models/sales-purchase/customer.model';
// import { ReportService } from '../../../../services/report.service';
import { ReportModel } from '../../../../models/settings/app-settings/report-model';
import { HttpErrorResponse } from '@angular/common/http';
import { AppCollectionService } from '../../../../services/app-collection.service';

@Component({
  selector: 'app-sales-invoice',
  templateUrl: './sales-invoice.component.html',
  styleUrls: ['./sales-invoice.component.scss',
    '../../../../../vendor/libs/angular2-ladda/angular2-ladda.scss',
    '../../../../../vendor/libs/ng-select/ng-select.scss'
  ]
})
export class SalesInvoiceComponent implements OnInit, AfterViewInit {
  compId: number;
  selectedItemId:number;
  CustomerType: number = 1;
  userId: number;
  branchId: number;
  totalDisCount = 0;
  disCountAmount: number = 0;
  disCountRate: number = 0;
  totalDiscountAmount: number = 0;
  totalVatAmount: number = 0;
  moneyReceipts: MoneyReceiptModel[] = [];
  totalQuantity: number = 0;
  totalAmount: number = 0
  totalNetAmount: number = 0;
  invoiceForm: FormGroup
  ProductForm: FormArray;
  challanType: ChallanType = ChallanType.Delivery;
  invoiceTypeKey: string;
  isSaving: boolean = false;
  isSubmitted: boolean = false;
  restrictForEdit: boolean = false;
  isLoadFromChallan: boolean = false;
  isLoadFromOrder: boolean = false;
  transId: number;
  partyId: number;
  searchLevel: number = 1;//for bill
  moduleId: number = 20;
  ///CreatedBy Nasrin
  reportId: number;
  pageId: number;
  childModuleId: number = 20;
  isExporting: boolean = false;
  exportType: string = 'pdf';
  reports: ReportModel[] = [];
  locations: CustomerLocation[] = [];
  filterlocations: any[] = [];
  mobileBankTypes: { name: string }[] = [];
  compType: number;
  products: any[] = [];
  challanIdShapla: { id: number }[] = [];
  /// Nasrin
  constructor(
    private formBuilder: FormBuilder,
    private toasterService: ToastrService,
    private dateService: NgbDateCustomParserFormatter,
    private salesPurchaseService: SalesPurchaseService,
    private transactionService: TransactionService,
    // private reportService: ReportService,
    public modalService: NgbModal,
    private services: SalesPurchaseService,
    private appCollection: AppCollectionService,
    private cdr: ChangeDetectorRef,
    private zone: NgZone,) {
    this.ProductForm = this.formBuilder.array([]);
  }
  ngAfterViewInit(): void {
    this.cdr.detectChanges();
  }
  ngOnInit() {
    this.compId = AuthService.CompanyId;
    this.compType = AuthService.CompanyType;
    this.userId = AuthService.UserId;
    this.branchId = AuthService.BranchId;
    this.pageId = AuthService.CurrentPageId;
    this.invoiceTypeKey = this.salesPurchaseService.getInvoiceTypeKey(InvoiceType.Sales)
    this.createFrorm();
    this.getAllMoneyReceipt();
    this.getProducts();
    if (this.compType == 1) {
      for (let i = 0; i < 1; i++) {
        this.addRow();
      }
    }
    else {
      for (let i = 0; i < 2; i++) {
        this.addRow();
      }
    }

    this.getVoucherNo(this.invoiceTypeKey, new Date().toLocaleDateString(), this.compId);
    this.getReportInfo();
    this.mobileBankTypes = this.appCollection.getMobileBankingType();
    Helper.focusNgSelect('ngSelectParty');
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
  changeVoucherNoByDate(date) {
     if(this.compType==1 && this.invoiceTypeKey=="SA"){
     this.getVoucherNo(this.invoiceTypeKey,date, this.compId);

    }
    // this.getVoucherNo(this.invoiceTypeKey, date, this.compId);
  }
  getProducts() {
    let partyId = 0;
    this.services.getProducts(this.compId, 0, partyId).subscribe((response: any) => {
      if (response.status) {
        (response.result as any[]).forEach(item => {
          item.name = item.name + (item.description ? (' - ' + item.description) : '');
        })
        this.products = response.result as any[];
        // this.filtered = response.result as any[];
      } else {
        this.products = [];
      }
    })
  }
  getReportInfo() {
    // this.reportService.getReports(this.compId, this.childModuleId, this.pageId)
    //   .subscribe(response => {
    //     if (response.status) {
    //       this.reports = response.result as ReportModel[];
    //     }
    //   }, err => {
    //     this.toasterService.warning(err.error,'Report Info not found');
    //   })
  }
  getVoucherNo(voucherType, voucherDate, compnayId) {
    this.transactionService.getVoucherNo(voucherType, voucherDate, compnayId)
      .subscribe((response: any) => {
        if (response) {
          this.invoiceForm.patchValue({
            voucherNo: response.voucherNo,
            voucherNoView: response.formatVoucherNo,
            yearID: response.financialYearID
          })
        }
      })
  }
  onSelectCustomer(customer: Customer) {
    console.log(customer);
    if (customer) {
      this.invoiceForm.patchValue({
        partyId: customer.accountId,
        partyName: customer.formattedName,
        billTo: customer.formattedName,
        billAddress: customer.deliveryAddress,
        billContactNo: customer.billContactNo,
        pertyCurrentBalance: customer.pertyCurrentBalance
      })
      Helper.focusNgSelect('product0');
      //Helper.focusTextField('productSearchBtnId' + '0');
    }
  }
  selectAddress(location: CustomerLocation) {
    if (location) {
      this.invoiceForm.patchValue({
        partyId: location.accountId,
        partyName: location.formatedName,
        billTo: location.formatedName,
        billAddress: location.customerAddress
      })
    }
  }
  onSelectSalesman(salesman) {
    if (salesman) {
      this.invoiceForm.patchValue({
        salesPersonEmpCode: salesman.empCode
      })
    }
    Helper.focusNgSelect('ngSelectPayType')
  }
  getAllMoneyReceipt() {
    this.salesPurchaseService.getAllMoneyReceipt(this.compId).subscribe((response: ApiResponse) => {
      if (response.status) {
        this.moneyReceipts = response.result as MoneyReceiptModel[];
      } else {
        this.moneyReceipts = [];
      }
    })
  }
  getProductInfo(product, rowIndex: number) {
    const tr = document.getElementById('tr' + rowIndex);
    if (tr == null) {
      return;
    }
    if (product == null || product.id == null) {
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
      Helper.focusTextField('txtTransportCost')
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
            // unitPrice: product.salePrice,
            vat: product.vatrate,
            // discount:product.discountRate,
            boxConv: product.boxConv,
            unitFactor: productInfo ? productInfo.factor : null
          })
          Helper.focusTextField('qty' + rowIndex)
        }
        else {
        }
      })
    }

  }
  onChangeProductQty(rowIndex) {
    let unitQty = Number(this.ProductForm.value[rowIndex]["unitQty"]);
    let factor = Number(this.ProductForm.value[rowIndex]["unitFactor"]);
    this.ProductForm.controls[rowIndex].patchValue({
      uniqueQty: unitQty / factor
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
    if (this.ProductForm.controls[rowIndex].get('productId').value == undefined) {
      return;
    }
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
  updateNetPayable() {
    let netAmount = this.totalNetAmount;
    let paidAmount = Number(this.formVal.paidAmount);
    let transportCost = Number(this.formVal.transportCost);
    let labourCost = Number(this.formVal.labourCost);
    let miscAdd = Number(this.formVal.otherAddition);
    let missdeduct = Number(this.formVal.otherDeduction);
    let payableAmount = netAmount - paidAmount - missdeduct + transportCost + labourCost + miscAdd;
    this.invoiceForm.patchValue({ netPayable: payableAmount.toString() });
    if (payableAmount <= 0) {
      this.invoiceForm.patchValue({ payMode: PaymentType.Cash });
    }
    if (payableAmount > 0) {
      this.invoiceForm.patchValue({ payMode: PaymentType.Due });
    }

  }

  saveInvoice() {

    if(this.transId){
    //For edit :Client doesn't want to print after update
      this.isSubmitted = true;
    if (this.invoiceForm.invalid && (this.compType == 1 && this.compId!=100)) {
      this.toasterService.error('Invalid Submission');
      return;
    }
    if (this.formVal.payMode == 5 || this.formVal.payMode == 27 || this.formVal.payMode == 0 || this.formVal.payMode == 28) {
      this.invoiceForm.controls.payMode.setValue(5);
    }
    this.isSaving = true;
    if (this.invoiceForm.controls.chequeDate.value == null) {
      this.checqDate();
    }
    const paramObj = {
      transaction: this.formVal,
      billMaster: (this.ProductForm.value as any[]).filter(p => p.productId && Number(p.unitQty) > 0),
      invoiceType: InvoiceType.Sales,
      isBillFromChallan: this.isLoadFromChallan,
      selectedChallanId: this.formVal.selectedChallanId
    }

    this.salesPurchaseService.saveInvoice(paramObj).subscribe((response: any) => {
      if (response.status) {
        this.transId = response.transId
        this.toasterService.success(response.result);
        this.resetForSave();
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
    else{
     //For Save
      this.isSubmitted = true;
      if (this.invoiceForm.invalid && (this.compType == 1 && this.compId!=100)) {
        this.toasterService.error('Invalid Submission');
        return;
      }
      if (this.formVal.payMode == 5 || this.formVal.payMode == 27 || this.formVal.payMode == 0 || this.formVal.payMode == 28) {
        this.invoiceForm.controls.payMode.setValue(5);
      }
      this.isSaving = true;
      if (this.invoiceForm.controls.chequeDate.value == null) {
        this.checqDate();
      }
      const paramObj = {
        transaction: this.formVal,
        billMaster: (this.ProductForm.value as any[]).filter(p => p.productId && Number(p.unitQty) > 0),
        invoiceType: InvoiceType.Sales,
        isBillFromChallan: this.isLoadFromChallan,
        //challanType: this.inventoryService.getChallanTypeKey(ChallanType.Delivery),
        selectedChallanId: this.formVal.selectedChallanId
      }
      this.salesPurchaseService.saveInvoice(paramObj).subscribe((response: any) => {
        if (response.status) {
          this.transId = response.transId
          this.toasterService.success(response.result);
          this.onPrint();
          this.resetForSave();
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

  }
  edit(transId) {
    console.log(transId)
    //debugger;
    this.isLoadFromChallan = false;

    this.salesPurchaseService.getInvoiceByTransId(transId, this.compId, TransType.Sales)
      .subscribe((response: any) => {
        if (response.status) {
          this.transId = transId;
          this.restrictForEdit = false;
          const transaction = response.result.transaction;
          this.invoiceForm.patchValue(transaction);
          this.invoiceForm.patchValue({
            voucherNoView: this.invoiceTypeKey + (transaction.voucherDate as string).substring(2, 4) + '-' + (transaction.voucherDate as string).substring(4, 6) + '-' + (transaction.voucherNo.toString()).padStart(5, '0'),
            voucherDateNgb: this.dateService.getYyyymmddToNgbDate(transaction.voucherDate as string)
          })
          this.ProductForm = this.formBuilder.array([]);
          this.totalQuantity = 0; this.totalNetAmount = 0;
          (response.result.billMaster as any[]).forEach(bill => {
            let form = this.newProductForm()
            form.patchValue(bill);
            form.patchValue({ total: Number(form.value.unitPrice) * Number(form.value.unitQty), isProductSelectable: false, billNatureId: TransType.Sales })
            this.ProductForm.push(form);
            this.totalQuantity += bill.unitQty;
            this.totalNetAmount += bill.netAmount;
          })
        }
        this.modalService.dismissAll();
      })
  }
  loadChallan(template) {
    //  if(this.compId==92){
    if (this.formVal.partyId) {
      this.modalService.open(template, { size: 'lg', windowClass: 'my-class' })
    } else {
      this.toasterService.warning('Select party to search party\'s challan', 'No Party Found!');
    }
    //  } else{this.modalService.open(template, { size: 'lg', windowClass: 'my-class' })}
  }

  onSelectChallan(selectedChallanId) {
    this.isLoadFromChallan = true;
    if (selectedChallanId) {
      this.salesPurchaseService.getBillFromChallan(selectedChallanId, this.formVal.partyId, this.compId).subscribe((response: any) => {
        if (response.status && (response.result as any[]).length > 0) {
          //this.restrictForEdit = true;//sir said it will editable
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
              total: Number(bill.unitQty) * Number(bill.unitPrice),
              netAmount: Number(bill.unitQty) * Number(bill.unitPrice),
              billNatureId: TransType.Sales
            })
            this.ProductForm.push(form);
            this.totalQuantity += Number(bill.unitQty);
            this.totalNetAmount += Number(bill.unitQty) * Number(bill.unitPrice)
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
      }, (err: any) => {
        this.toasterService.error(err.error, "Error!!")
      })
    }
  }
  loadOrder(orderTemplate) {
    this.modalService.open(orderTemplate, { size: 'lg', windowClass: 'my-class' })
  }
  onSelectOrder(orderId) {
    if (orderId) {
      this.salesPurchaseService.getOrderById(orderId, this.compId)
        .subscribe((response: any) => {
          if (response.status) {
            this.isLoadFromOrder = true;
            this.invoiceForm.patchValue(response.result);
            this.ProductForm = this.formBuilder.array([]);
            let totalAmount = 0;
            this.totalNetAmount = 0;
            (response.result.details as any[]).forEach(orderedProduct => {
              let formGroup = this.newProductForm();
              formGroup.patchValue(orderedProduct);
              totalAmount += Number(orderedProduct.unitQty) * Number(orderedProduct.unitPrice)
              this.totalNetAmount += Number(orderedProduct.netAmount)
              formGroup.patchValue({
                orderAutoId: orderedProduct.id,
                total: Number(orderedProduct.unitQty) * Number(orderedProduct.unitPrice),
                unitFactor: orderedProduct.factor,
                billNatureId: TransType.Sales
              })
              this.ProductForm.push(formGroup);
              this.invoiceForm.patchValue({
                totalAmount: totalAmount.toFixed(3),
                userId: this.userId
              })
            })
          }
        })
    }
  }
  createFrorm() {
    this.invoiceForm = this.formBuilder.group({
      transId: [, []],
      partyId: [, []],
      partyName: ['', []],
      voucherNo: [, []],
      voucherNoView: [, []],
      voucherDate: [this.dateService.getDateToYyyymmdd(new Date()), []],
      voucherDateNgb: [, []],
      voucherType: [this.invoiceTypeKey, []],
      refAccountId: [InvoiceType.Sales, []],
      isPosted: [, []],
      voucherTypeId: [6, []],
      moneyReceiptId: [, []],
      transType: [TransType.Sales, []],
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
      billContactNo: [null, [Validators.required]],
      bankBranch: [, []],
      chequeNo: [, []],
      chequeDate: [, []],
      empId: [, []],
      discountRate: [, [Validators.min(0), Validators.max(100)]],
      discountAmount: [0, []],
      vatRate: [, []],
      vatAmount: [0, []],
      netPayable: [0, []],
      userId: [this.userId, []],
      branchId: [this.branchId, []],
      compId: [this.compId, []],
      salesPersonEmpCode: [, [Validators.required]],
      modifiedBy: [, []],
      modifiedDate: [, []],
      createdDate: [, []],
      yearID: [, []],
      conRate: [, []],
      accountId: [, []],
      amount: [0, []],
      currencyRate: [1.000, []],
      selectedChallanId: [, []],
      challanType: [, []],
      pertyCurrentBalance: [, []]
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
      unitName: new FormControl(null, []),
      unitFactor: new FormControl(null, []),
      categoryId: new FormControl(null, []),
      productType: new FormControl(null, []),
      costPrice: new FormControl(null, []),
      unitPrice: new FormControl(null, []),
      vat: new FormControl(null, []),
      unitQty: new FormControl(null, [Validators.min(1)]),
      pcsQty: new FormControl(0, []),
      uniqueQty: new FormControl(null, []),
      discount: new FormControl(null, []),
      disCountAmount: new FormControl(null, []),
      total: new FormControl(null, []),
      netAmount: new FormControl(null, []),
      branchId: new FormControl(this.branchId, []),
      compId: new FormControl(this.compId, [Validators.required]),
      billNatureId: new FormControl(1, []),
      returnedQty: new FormControl(null, []),
      challanQty: new FormControl(null, []),
      transId: new FormControl(null, []),
      transType: new FormControl(TransType.Sales, []),
      orderId: new FormControl(null, []),
      orderAutoId: new FormControl(null, []),
      isProductSelectable: new FormControl(true, [])
    })
  }
  delete(challanId: number, modal: any) {
    this.selectedItemId = challanId;
    this.modalService.open(modal);
  }
  removeRow(index: number) {
    let deleteId=this.ProductForm.value[index]["id"];
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
    const challanObj = {
      id: deleteId,
      compId: this.compId,
    }
    this.salesPurchaseService.DeleteProductId(challanObj).subscribe((result:any)=>{
      if(result.status){
        this.toasterService.error(result.result);
      }
      else{
        this.toasterService.error(result.result);
      }


    },er=>{
      this.toasterService.error(er.error,"Failed To Update");
    })
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
  onSelectVoucherDate(vdate: any) {
    if (vdate != null) {
      this.invoiceForm.patchValue({
        voucherDate: vdate
      })
    }
  }
  resetForSave() {
    this.restrictForEdit = false;
    let voucherDate = this.formVal['voucherDate'];
    let voucherDateNgb = this.formVal['voucherDateNgb'];
    this.invoiceForm.reset();
    this.createFrorm();
    this.f['voucherDate'].setValue(voucherDate);
    this.f['voucherDateNgb'].setValue(voucherDateNgb);
    this.getVoucherNo(this.invoiceTypeKey, new Date().toLocaleDateString(), this.compId)
    this.ProductForm = this.formBuilder.array([])
    if (this.compType != 1) {

      this.addRow();
      this.addRow();
    }
    this.addRow();
    this.totalDisCount = 0;
    this.disCountAmount = 0;
    this.disCountRate = 0;
    this.totalDiscountAmount = 0;
    this.totalVatAmount = 0;
    this.totalQuantity = 0;
    this.totalAmount = 0;
    this.totalNetAmount = 0;
    this.isLoadFromChallan = false;
  }
  reset() {
    this.restrictForEdit = false;
    this.invoiceForm.reset();
    this.createFrorm();
    // this.invoiceForm.controls['voucherDate'].setValue((new Date).toLocaleDateString());
    this.invoiceForm.controls['voucherDateNgb'].setValue(this.dateService.getYyyymmddToNgbDate(this.f['voucherDate'].value))
    this.getVoucherNo(this.invoiceTypeKey, new Date().toLocaleDateString(), this.compId)
    this.ProductForm = this.formBuilder.array([])
    this.addRow();
    this.totalDisCount = 0;
    this.disCountAmount = 0;
    this.disCountRate = 0;
    this.totalDiscountAmount = 0;
    this.totalVatAmount = 0;
    this.totalQuantity = 0;
    this.totalAmount = 0;
    this.totalNetAmount = 0;
    this.isLoadFromChallan = false;
  }
  onTabKeyDown(event: KeyboardEvent, rowIndex: number) {
    debugger;
    if (event.key == 'Tab' || event.key == 'Enter') {
      if (!this.ProductForm.controls[rowIndex].get('unitQty').value) {
        Helper.focusTextField('txtBillTo');
        event.preventDefault();
      } else {
        if (rowIndex == this.ProductForm.controls.length - 1) {
          if (this.compType == 1) {

            Helper.focusNgSelect('product' + (rowIndex + 1));
            event.preventDefault()

          }
          else {

            this.addRow();
            Helper.focusNgSelect('product' + (rowIndex + 1));
            event.preventDefault();

          }

        } else {
          Helper.focusNgSelect('product' + (rowIndex + 1));
          event.preventDefault();
        }
      }
    }

    if (event.key == 'ArrowDown') {
      Helper.focusTextField('vat' + (rowIndex + 1));
      event.preventDefault();
    }
    if (event.key == 'ArrowUp') {
      if (rowIndex == 0) {
        Helper.focusTextField('vat' + rowIndex);
        event.preventDefault();
      }
      else {
        Helper.focusTextField('vat' + (rowIndex - 1));
        event.preventDefault();
      }
    }

    if (event.key == 'ArrowLeft') {
      Helper.focusTextField('disR' + rowIndex);
      event.preventDefault();
    }
  }
  onEnterKeyDown(event: KeyboardEvent, rowIndex: number, elementId: string) {
    if (event.key == 'Enter') {
      if (this.compType == 1) {
        this.addRow();

        Helper.focusTextField(elementId + rowIndex);
        event.preventDefault();
      }
      else {

        Helper.focusTextField(elementId + rowIndex);
        event.preventDefault();
      }
    }
    if (event.key == 'ArrowDown') {
      Helper.focusTextField('price' + (rowIndex + 1));
      event.preventDefault();
    }
    if (event.key == 'ArrowUp') {
      if (rowIndex == 0) {
        Helper.focusTextField('price' + rowIndex);
        event.preventDefault();
      }
      else {
        Helper.focusTextField('price' + (rowIndex - 1));
        event.preventDefault();
      }
    }

    if (event.key == 'ArrowRight') {
      Helper.focusTextField('disR' + rowIndex);
      event.preventDefault();
    }

    if (event.key == 'ArrowLeft') {
      Helper.focusTextField('qty' + rowIndex);
      event.preventDefault();
    }

  }
  onEnterKeyDownArrow(event: KeyboardEvent, rowIndex: number, elementId: string) {
    if (event.key == 'ArrowDown') {
      Helper.focusTextField('disR' + (rowIndex + 1));
      event.preventDefault();

    }
    if (event.key == 'ArrowUp') {
      if (rowIndex == 0) {
        Helper.focusTextField('disR' + rowIndex);
      }
      else {
        Helper.focusTextField('disR' + (rowIndex - 1));
        event.preventDefault();
      }
    }
    if (event.key == 'ArrowRight') {
      Helper.focusTextField('vat' + rowIndex);
      event.preventDefault();
    }
    if (event.key == 'ArrowLeft') {
      Helper.focusTextField('price' + rowIndex);
      event.preventDefault();
    }
  }

  onEnterKeyDownForQty(event: KeyboardEvent, rowIndex: number, elementId: string) {
    if (event.key == 'Enter') {
      if (this.compId == 57 || this.compId == 81 || this.compId == 100) {
        Helper.focusTextField('price' + rowIndex);
        event.preventDefault();
      }
      else {
        Helper.focusTextField(elementId + rowIndex);
        event.preventDefault();
      }
    }

    if (event.key == 'ArrowDown') {
      Helper.focusTextField('qty' + (rowIndex + 1));
      event.preventDefault();
    }
    if (event.key == 'ArrowUp') {
      if (rowIndex == 0) {

        Helper.focusTextField('qty' + rowIndex);
        event.preventDefault();
      }
      else {
        Helper.focusTextField('qty' + (rowIndex - 1));
        event.preventDefault();
      }

    }

    if (event.key == 'ArrowRight') {
      Helper.focusTextField('price' + rowIndex);
      event.preventDefault();
    }

    if (event.key == 'ArrowLeft') {
      Helper.focusNgSelect('product' + rowIndex)
      event.preventDefault();
    }
  }

  onPrintChln(){
    // if (this.transId != null && this.transId != 0) {
    //   this.isExporting = true;
    //   this.reportId = this.reports.length > 0 ? this.reports[0].reportId : null;
    //   this.reportService.getCommercialReportForRpt({
    //     ReportId: 2275,
    //     ExportType: this.exportType,
    //     trmasterid: this.transId,
    //     BillMode: 2,
    //     CompId: this.formVal.compId,
    //     BranchId: this.branchId
    //   }).subscribe((file) => {
    //     this.isExporting = false;
    //     if (file) {
    //       this.reportService.openFileWindow(file)
    //     }
    //   }, (err: HttpErrorResponse) => {
    //     this.isExporting = false;
    //     this.toasterService.error(err.error,'An unexpected Error occured')
    //   })
    // } else { return; }
  }

  onPrint() {
    //CreatedBy Nasrin
    // if (this.transId != null && this.transId != 0) {
    //   this.isExporting = true;
    //   this.reportId = this.reports.length > 0 ? this.reports[0].reportId : null;
    //   this.reportService.getCommercialReportForRpt({
    //     ReportId: this.reportId,
    //     ExportType: this.exportType,
    //     trmasterid: this.transId,
    //     BillMode: 1,
    //     CompId: this.formVal.compId,
    //     BranchId: this.branchId
    //   }).subscribe((file) => {
    //     this.isExporting = false;
    //     if (file) {
    //       this.reportService.openFileWindow(file)
    //     }
    //   }, (err: HttpErrorResponse) => {
    //     this.isExporting = false;
    //     this.toasterService.error(err.error,'An unexpected Error occured')
    //   })
    // } else { return; }
  }
  // Nasrin

  onSelectLocation(location: CustomerLocation) {
    if (location) {
      this.invoiceForm.patchValue({
        billAddress: location.customerAddress,
        billContactNo: location.mobileNo
      })
    }
    else {
      this.invoiceForm.patchValue({
        billAddress: ''
      })
    }
    this.modalService.dismissAll();
  }
  getLocationByPartyId(partyId, searchModal) {
    if (!partyId) {
      this.toasterService.warning('Select a party.', 'No Party Selected.');
      return;
    }
    this.salesPurchaseService.getAllLocationChart(this.compId, partyId).subscribe((res: CustomerLocation[]) => {
      if (res) {
        this.locations = res as CustomerLocation[];
        this.filterlocations = res as CustomerLocation[];
      }
      else {
        this.filterlocations = [];
      }
      this.modalService.open(searchModal);
    })
  }
  searchPartyLocation(searchKey: string) {
    if (searchKey) {
      this.filterlocations = this.locations.filter(l => Helper.coalesce
        (l.formatedName, '').toLowerCase().match(searchKey.toLowerCase()))
    }
    else {
      this.filterlocations = this.locations;
    }
  }
  cancel() {
    this.modalService.dismissAll();
  }
  onChangePaytype(event: any) {
    if (event.id == 5 || event.id == 27 || event.id == 0 || event.id == 28) {
      this.invoiceForm.controls.payMode.setValue(5);
    }
    if (event) {
      if (event.id == 4) {
        this.invoiceForm.patchValue({ payMode: PaymentType.MobileBanking })
        Helper.focusNgSelect('bkType')
      } else if (event.id == 0) {
        this.invoiceForm.patchValue({ payMode: PaymentType.Due })
        Helper.focusTextField('pDate')
      } else if (event.id == 6) {
        this.invoiceForm.patchValue({ payMode: PaymentType.Cheque })
        Helper.focusTextField('banks');
      } else if (event.id == 27) {
        this.invoiceForm.patchValue({ payMode: PaymentType.Card })
        Helper.focusTextField('btnPurchase')
      } else {
        this.invoiceForm.patchValue({ payMode: PaymentType.Cash })
        Helper.focusTextField('btnPurchase')
      }
    }

  }
  onBlurPaytype(event: any) {
    if (this.f.payMode.value == PaymentType.Cash || this.f.payMode.value == PaymentType.Card) {
      Helper.focusTextField('btnPurchase')
    }
  }
  onBlurNarration(event: KeyboardEvent) {
    if (event.key == 'Tab' || event.key == 'Enter') {
      Helper.focusTextField('txtTransportCost');
      event.preventDefault();

    }
  }
  onEnterOrTabKeyDown(event: KeyboardEvent, elementId: string) {
    if (event.key == 'Enter' || event.key == 'Tab') {
      Helper.focusTextField(elementId);
      event.preventDefault();
    }
  }
  onSelectBakingType() {
    Helper.focusTextField('mobile');
  }
  onEnterOrTabKeyDownForNgSelect(event: KeyboardEvent, elementId: string) {
    if (event.key == 'Enter' || event.key == 'Tab') {
      Helper.focusNgSelect(elementId);
      event.preventDefault();
    }
  }
  onFocusBtn(event) {
    // Helper.focusNgSelect('ngSelectParty');
    // event.preventDefault();
  }
  onBlurSaleBtn(event: MouseEvent) {
    Helper.focusNgSelect('ngSelectParty');
  }

  onClickProductName(index: number) {
    this.ProductForm.controls[index].patchValue({ isProductSelectable: true });
  }
  onSelectPaymentDateByPAyMode(event: any) {
    if (event) {
      this.invoiceForm.patchValue({ chequeDate: event })
      Helper.focusTextField('txtBillTo')
    }
  }
  checqDate() {
    let date = this.dateService.getCurrentNgbDate();
    let stringDate = this.dateService.getNgbDateToYyyymmdd(date);
    this.invoiceForm.patchValue({ chequeDate: stringDate })
  }

  onAddNew(product) {
    this.products.push(product);
  }

  onsalesBykeyDown(event: KeyboardEvent) {
    if (event.key == 'Tab' || event.key == 'Enter') {
      Helper.focusTextField('ngSelectPayType');

    }
  }
  forFocustransport(event: KeyboardEvent, rowIndex: number) {
    if (event.key == "Tab") {
      if (!this.ProductForm.controls[rowIndex].get('productId').value) {
        Helper.focusTextField('txtBillTo');
        event.preventDefault();
      }
      else {
        Helper.focusTextField('qty' + rowIndex);
        event.preventDefault();
      }
    }
  }
  onEnterKeyDown1(event: KeyboardEvent, rowIndex: number, elementId: string) {
    if (event.key == 'Enter') {
      if (this.compType == 1) {

        Helper.focusTextField(elementId + rowIndex);
        event.preventDefault();
      }
      else {

        Helper.focusTextField(elementId + rowIndex);
        event.preventDefault();
      }
    }
    if (event.key == 'ArrowDown') {
      Helper.focusTextField('price' + (rowIndex + 1));
      event.preventDefault();
    }
    if (event.key == 'ArrowUp') {
      if (rowIndex == 0) {
        Helper.focusTextField('price' + rowIndex);
        event.preventDefault();
      }
      else {
        Helper.focusTextField('price' + (rowIndex - 1));
        event.preventDefault();
      }
    }

    if (event.key == 'ArrowRight') {
      Helper.focusTextField('disR' + rowIndex);
      event.preventDefault();
    }

    if (event.key == 'ArrowLeft') {
      Helper.focusTextField('qty' + rowIndex);
      event.preventDefault();
    }

  }

}
