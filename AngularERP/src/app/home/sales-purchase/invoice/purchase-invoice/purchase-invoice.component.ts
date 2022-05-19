
import { CustomerLocation } from './../../../../models/sales-purchase/customer-location.model';
import { AuthService } from './../../../../services/auth.service';
import { PaymentType, TransType } from './../../../../shared/lookup';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SalesPurchaseService } from '../../../../services/sales-purchase/sales-purchase.service';
import { ApiResponse } from '../../../../models/api-response';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MoneyReceiptModel } from '../../../../models/sales-purchase/money-receipt-mode';
import { ProductViewModel } from '../../../../models/sales-purchase/product-view-model';
import { TransactionService } from '../../../../services/accounting/transaction.service';
import { NgbDateCustomParserFormatter } from '../../../../shared/dateformat';
import { ChallanType, InvoiceType, ProductUnitType } from '../../../../shared/lookup';
import { AppService } from '../../../../app.service';
import { Helper } from '../../../../shared/helper';
// import { ReportService } from '../../../../services/report.service';
import { ReportModel } from '../../../../models/settings/app-settings/report-model';
import { Customer } from '../../../../models/sales-purchase/customer.model';
import { AppCollectionService } from '../../../../services/app-collection.service';

@Component({
  selector: 'app-purchase-invoice',
  templateUrl: './purchase-invoice.component.html',
  styleUrls: ['./purchase-invoice.component.scss',
    '../../../../../vendor/libs/ng-select/ng-select.scss',
    '../../../../../vendor/libs/angular2-ladda/angular2-ladda.scss'
  ]
})
export class PurchaseInvoiceComponent implements OnInit {
  compId: number;
  selectedItemId:number;
  userId: number;
  CustomerType:number=2;
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
  challanType: ChallanType = ChallanType.Receive;
  invoiceTypeKey: string;
  isSaving: boolean = false;
  isSubmitted: boolean = false;
  restrictForEdit:boolean = false;
  isLoadFromChallan:boolean = false;
  isLoadFromOrder:boolean = false;
  transId:number;
  invoiceRptInfo:ReportModel[]=[];
  isPrinting:boolean = false;
  searchLevel:number=2;//
  moduleId:number=20
  mobileBankTypes: { name: string }[] = [];
  keyEvent:KeyboardEvent;
  products: any[] = [];
  compType:number;
  constructor(
    private formBuilder: FormBuilder,
    private toasterService: ToastrService,
    private dateService: NgbDateCustomParserFormatter,
    private salesPurchaseService: SalesPurchaseService,
    private transactionService: TransactionService,
    public modalService: NgbModal,
    private appService:AppService,
    // private rptService:ReportService,

    private appCollection: AppCollectionService) {
    this.ProductForm = this.formBuilder.array([]);
  }
  ngOnInit() {
    this.appService.pageTitle = 'Purchase Invoice'
    this.compId = AuthService.CompanyId;
    this.userId = AuthService.UserId;
    this.branchId = AuthService.BranchId;
    this.compType = AuthService.CompanyType;
    this.invoiceTypeKey = this.salesPurchaseService.getInvoiceTypeKey(InvoiceType.Purchase)
    this.createFrorm();
    this.getAllMoneyReceipt();
    // this.addRow();
    // this.addRow();
    // this.addRow();
    this.getVoucherNo(this.invoiceTypeKey, new Date().toLocaleDateString(), this.compId)
    this.getReportInfo();
    this.mobileBankTypes = this.appCollection.getMobileBankingType();
    this.getProducts();
    if(this.compType==1){
      for (let i = 0; i < 1; i++) {
        this.addRow();
      }
    }
    else{
      for (let i = 0; i < 2; i++) {
        this.addRow();
      }
    }
  }
  getVoucherNo(voucherType, voucherDate, compnayId) {
    this.transactionService.getVoucherNo(voucherType, voucherDate, compnayId)
      .subscribe((response: any) => {
        if (response) {
          this.invoiceForm.patchValue({
            voucherNo: response.voucherNo,
            voucherNoView: response.formatVoucherNo,
            yearID:response.financialYearID
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
  getProducts() {
    let partyId=0;
    this.salesPurchaseService.getProducts(this.compId,0,partyId).subscribe((response: any) => {
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
  onSelectCustomer(customer:Customer){
    if(customer){
      this.invoiceForm.patchValue({
        partyId:customer.accountId,
        partyName:customer.formattedName,
        billTo:customer.formattedName,
        billAddress:customer.deliveryAddress,
        billContactNo:customer.billContactNo
      })
      Helper.focusNgSelect('product0')
    }
  }
  onSelectAddress(location:CustomerLocation){
if(location){
  this.invoiceForm.patchValue({
    partyId:location.accountId,
    billTo:location.formatedName,
    billAddress:location.customerAddress
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
  onEnterOrTabKeyDownForNgSelect(event: KeyboardEvent,  elementId: string){
    if (event.key == 'Enter' || event.key=='Tab') {
      Helper.focusNgSelect(elementId);
      event.preventDefault();
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
    if(tr==null){return;}
    if (product == null || product.id==null) {
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
      Helper.focusTextField('txtTransportCost' )
      return;
    }
    else {
      tr.classList.remove('border-danger')
      this.salesPurchaseService.getProductUnit(product.id,this.compId, ProductUnitType.BillUnit).subscribe((response: ApiResponse) => {
        if (response.status) {
          let units = response.result as any[];
          const productInfo = units.length>1?units[1]:units[0];
          this.ProductForm.controls[rowIndex].patchValue({
            productId: product.id,
            productDesc: product.description,
            unitId: productInfo?productInfo.unitId:null,
            // unitPrice: product.salePrice,
            vat: product.vatrate,
            // discount:product.discountRate,
            unitFactor: productInfo?productInfo.factor:null
          })
        }
      })
    }
    Helper.focusTextField('qty'+rowIndex)
  }
  onChangeProductQty(rowIndex) {
    let unitQty = Number(this.ProductForm.value[rowIndex]["unitQty"]);
    let factor = Number(this.ProductForm.value[rowIndex]["unitFactor"]);
    this.ProductForm.controls[rowIndex].patchValue({
      uniqueQty: unitQty/factor
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
    try{
      this.isSubmitted = true;
    if (this.invoiceForm.invalid) {
      this.toasterService.error('Invalid Submission');
      return;
    }
    this.isSaving = true;
    const paramObj = {
      transaction: this.formVal,
      billMaster: (this.ProductForm.value as any[]).filter(p=>p.productId && Number(p.unitQty)>0),
      invoiceType: InvoiceType.Purchase,
      isBillFromChallan:this.isLoadFromChallan,
      // challanType:this.inventoryService.getChallanTypeKey(ChallanType.Receive),
      selectedChallanId:this.formVal.selectedChallanId
    }
    this.salesPurchaseService.saveInvoice(paramObj).subscribe((response: any) => {
      if (response.status) {
        this.transId = response.transId;
        this.toasterService.success(response.result);
        this.resetForSave();

      }
      else {
        this.toasterService.error(response.result);
      }
      this.isSubmitted = false;
      this.isSaving = false;
    }, err => {
      this.isSubmitted = false;
      this.isSaving = false;
      this.toasterService.error(err.message)
    })
    }
    catch(error){
    }
  }
  edit(transId) {
    this.isLoadFromChallan = false;
    this.salesPurchaseService.getInvoiceByTransId(transId, this.compId,TransType.Purchase)
      .subscribe((response: any) => {
        if (response.status) {
          this.transId = transId;
          const transaction = response.result.transaction;
          this.invoiceForm.patchValue(transaction);
          this.invoiceForm.patchValue({
            voucherNoView: this.invoiceTypeKey+(transaction.voucherDate as string).substring(2,4)+'-'+(transaction.voucherDate as string).substring(4,6)+'-'+(transaction.voucherNo.toString()).padStart(5,'0'),
            voucherDateNgb:this.dateService.getYyyymmddToNgbDate(transaction.voucherDate as string)
          })
          this.ProductForm = this.formBuilder.array([]);
          this.totalQuantity = 0; this.totalNetAmount = 0;
          (response.result.billMaster as any[]).forEach(bill => {
            let form = this.newProductForm()
            form.patchValue(bill);
            form.patchValue({ total: Number(form.value.unitPrice) * Number(form.value.unitQty),isProductSelectable:false,billNatureId: TransType.Purchase })
            this.ProductForm.push(form);
            this.totalQuantity += bill.unitQty;
            this.totalNetAmount += bill.netAmount;
          })
        }
        this.modalService.dismissAll();
        Helper.focusTextField('txtTransportCost')
      })
  }
  loadChallan(template){
    if(this.formVal.partyName){
      this.modalService.open(template,{size: 'lg', windowClass: 'my-class'})
    }else{
      this.toasterService.warning('Select party to search party\'s challan','No Party Found!');
    }
  }
  onSelectChallan(selectedChallanId){
    this.isLoadFromChallan = true;
    if(selectedChallanId){
      this.salesPurchaseService.getBillFromChallan(selectedChallanId,this.formVal.partyId,this.compId).subscribe((response:any)=>{
        if(response.status && (response.result as any[]).length>0){
          this.restrictForEdit = true;
          this.invoiceForm.patchValue({
            selectedChallanId:selectedChallanId
          })
          this.ProductForm = this.formBuilder.array([]);
          this.totalQuantity = 0; this.totalNetAmount = 0;
          let totalVatAmount=0, totalAmount=0;
          (response.result as any[]).forEach(bill => {
            let form = this.newProductForm()
            form.patchValue(bill)
            form.patchValue({
              unitQty: Number(bill.unitQty),
              uniqueQty: Number(bill.uniqueQty),
              uniquePrice: Number(bill.uniquePrice),
              total: Number(bill.unitQty)*Number(bill.unitPrice),
              netAmount: Number(bill.unitQty)*Number(bill.unitPrice),
              billNatureId:TransType.Purchase
            })
            this.ProductForm.push(form);
            this.totalQuantity+=Number(bill.unitQty);
            this.totalNetAmount+=Number(bill.netAmount)
            totalVatAmount+=Number(form.value.total)*0.01*Number(bill.vat)
            totalAmount+=Number(Number(bill.unitQty)*Number(bill.unitPrice))
          })
          this.invoiceForm.patchValue({
            discountAmount: 0,
            vatAmount: totalVatAmount,
            totalAmount: totalAmount.toFixed(3),
            totalNetAmount: this.totalNetAmount,
            vatRate: 0,
            discountRate: 0,
            netPayable:totalAmount.toFixed(3)
          })
        }
      })
    }
  }
  loadOrder(orderTemplate){
    this.modalService.open(orderTemplate,{size:'lg',windowClass:'my-class'})
  }
  onSelectOrder(orderId){
    if(orderId){
      this.salesPurchaseService.getOrderById(orderId, this.compId)
      .subscribe((response:any)=>{
        if(response.status){
          this.isLoadFromOrder = true;
          this.invoiceForm.patchValue(response.result);
          this.ProductForm = this.formBuilder.array([]);
          let totalAmount = 0;
          this.totalNetAmount = 0;
          (response.result.details as any[]).forEach(orderedProduct=>{
            let formGroup = this.newProductForm();
            formGroup.patchValue(orderedProduct);
            totalAmount+=Number(orderedProduct.unitQty)*Number(orderedProduct.unitPrice)
            this.totalNetAmount+=Number(orderedProduct.netAmount)
            formGroup.patchValue({
              orderAutoId: orderedProduct.id,
              total: Number(orderedProduct.unitQty)*Number(orderedProduct.unitPrice),
              unitFactor:orderedProduct.factor
            })
            this.ProductForm.push(formGroup);
            this.invoiceForm.patchValue({
              totalAmount:totalAmount.toFixed(3),
              userId:this.userId
            })
          })
        }
      })
    }
  }
  onEnterKeyDownforQty(event: KeyboardEvent, rowIndex: number, elementId: string) {
    if (event.key == 'Enter') {
      Helper.focusTextField('unitQty' + rowIndex);
      event.preventDefault();
    }

    if(event.key=='ArrowDown'){
      Helper.focusTextField('qty'+(rowIndex+1))
      event.preventDefault();
    }
    if(event.key=='ArrowUp'){
      if(rowIndex==0){
        Helper.focusTextField('qty'+rowIndex);
        event.preventDefault();
      }
      else{
        Helper.focusTextField('qty'+(rowIndex-1));
        event.preventDefault();
      }
    }
    if(event.key=='ArrowLeft'){
      Helper.focusNgSelect('product'+rowIndex);
      event.preventDefault();
    }
    if(event.key=='ArrowRight'){
      Helper.focusTextField('unitQty'+rowIndex);
      event.preventDefault();
    }
  }
  onEnterKeyDownforunitQty(event:KeyboardEvent,rowIndex:number,elementId:string){
    if(event.key=='Enter'){
      Helper.focusTextField('discount'+rowIndex);
      event.preventDefault();
    }

    if(event.key=='ArrowUp'){
      if(rowIndex==0){
        Helper.focusTextField('unitQty'+rowIndex);
        event.preventDefault();
      }
      else{
        Helper.focusTextField('unitQty'+(rowIndex-1));
        event.preventDefault();
      }
    }
    if(event.key=='ArrowDown'){
      Helper.focusTextField('unitQty'+(rowIndex+1));
      event.preventDefault();
    }
    if(event.key=='ArrowRight'){

      Helper.focusTextField('discount'+rowIndex);
      event.preventDefault();
    }
    if(event.key=='ArrowLeft'){
      Helper.focusTextField('qty'+rowIndex);
      event.preventDefault();
    }

  }
  onEnterKeyDownforunitvat(event:KeyboardEvent,rowIndex:number,elementId:string){
    if(event.key=='Enter'){
      Helper.focusTextField('discount'+rowIndex);
      event.preventDefault();
    }

    if(event.key=='ArrowUp'){
      if(rowIndex==0){
        Helper.focusTextField('unitQty'+rowIndex);
        event.preventDefault();
      }
      else{
        Helper.focusTextField('unitQty'+(rowIndex-1));
        event.preventDefault();
      }
    }
    if(event.key=='ArrowDown'){
      Helper.focusTextField('unitQty'+(rowIndex+1));
      event.preventDefault();
    }
    if(event.key=='ArrowRight'){

      Helper.focusTextField('discount'+rowIndex);
      event.preventDefault();
    }
    if(event.key=='ArrowLeft'){
      Helper.focusTextField('qty'+rowIndex);
      event.preventDefault();
    }

  }
  onSelectVoucherDate(vdate:any){
    if(vdate !=null){
      this.invoiceForm.patchValue({
        voucherDate:vdate
      })
    }
  }
  createFrorm() {
    this.invoiceForm = this.formBuilder.group({
      transId: [, []],
      partyId: [, [Validators.required]],
      partyName:['',[]],
      voucherNo: [, []],
      voucherNoView: [, []],
      voucherDate: [this.dateService.getDateToYyyymmdd(new Date()), []],
      voucherDateNgb:[,[]],
      voucherType: [this.invoiceTypeKey, []],
      refAccountId: [InvoiceType.Purchase, []],
      isPosted: [, []],
      voucherTypeId: [7, []],
      moneyReceiptId: [, []],
      transType: [TransType.Purchase, []],
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
      discountRate: [0, [Validators.min(0), Validators.max(100)]],
      discountAmount: [0., []],
      vatRate: [0, []],
      vatAmount: [0, []],
      netPayable: [0, []],
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
      selectedChallanId:[,[]],
      challanType:[,[]]
    })
  }
  addRow() {
    this.ProductForm.push(this.newProductForm())
  }
  newProductForm() {
    return new FormGroup({
      productId: new FormControl(null, []),
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
      unitQty: new FormControl(null, []),
      pcsQty: new FormControl(0, []),
      uniqueQty: new FormControl(null, []),
      discount: new FormControl(null, []),
      disCountAmount: new FormControl(null, []),
      total: new FormControl(null, []),
      netAmount: new FormControl(null, []),
      branchId:new FormControl(this.branchId,[]),
      compId: new FormControl(this.compId, []),
      billNatureId: new FormControl(2, []),
      returnedQty: new FormControl(null, []),
      challanQty: new FormControl(null, []),
      transId:new FormControl(null,[]),
      transType:new FormControl(TransType.Purchase,[]),
      orderId:new FormControl(null,[]),
      orderAutoId:new FormControl(null,[]),
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
    this.updateNetPayable();
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
  resetForSave(){
    this.restrictForEdit = false;
    let voucherDate=this.formVal['voucherDate'];
    let voucherDateNgb=this.formVal['voucherDateNgb'];
    this.invoiceForm.reset();
    this.createFrorm();
    this.f['voucherDate'].setValue(voucherDate);
    this.f['voucherDateNgb'].setValue(voucherDateNgb);
    this.getVoucherNo(this.invoiceTypeKey, new Date().toLocaleDateString(), this.compId)
    this.ProductForm = this.formBuilder.array([])
    if(this.compType!=1){

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
    this.totalAmount = 0
    this.totalNetAmount = 0;
    this.isLoadFromChallan = false;
    this.isLoadFromOrder = false;
    this.isSaving = false;
    this.isSubmitted = false;
  }
  reset() {
    this.restrictForEdit = false;
    this.invoiceForm.reset();
    this.createFrorm();
    // this.invoiceForm.controls['voucherDate'].setValue((new Date).toLocaleDateString());
    this.invoiceForm.controls['voucherDateNgb'].setValue(this.dateService.getYyyymmddToNgbDate(this.f['voucherDate'].value))
    this.getVoucherNo(this.invoiceTypeKey, new Date().toLocaleDateString(), this.compId)
    this.ProductForm = this.formBuilder.array([])
    if(this.compType!=1){

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
    this.totalAmount = 0
    this.totalNetAmount = 0;
    this.isLoadFromChallan = false;
    this.isLoadFromOrder = false;
    this.isSaving = false;
    this.isSubmitted = false;
  }

  onEnterOrTabKeyDown(event: KeyboardEvent,  elementId: string) {
    if (event.key == 'Enter' || event.key=='Tab' ) {
      Helper.focusTextField(elementId);
      event.preventDefault();
    }
  }

  onTabKeyDown(event:KeyboardEvent,rowIndex){
    if (event.key == 'Tab' || event.key=='Enter' && !event.shiftKey) {
      if (rowIndex === (this.ProductForm.length - 1) ||!this.ProductForm.controls[rowIndex].get('unitQty').value) {
        Helper.focusTextField('txtBillTo');
        event.preventDefault();
      }
       else {
         if(this.compType==1){
          Helper.focusNgSelect('product' + (rowIndex + 1));
          event.preventDefault();
         }
         else{
           this.addRow();
          Helper.focusNgSelect('product' + (rowIndex + 1));
          event.preventDefault();
         }

      }
    }
    if(event.key=='ArrowDown'){
      Helper.focusTextField('vat'+(rowIndex+1));
      event.preventDefault();
    }
    if(event.key=='ArrowUp'){
      if(rowIndex==0){

        Helper.focusTextField('vat'+rowIndex);
        event.preventDefault();
      }
      else{

        Helper.focusTextField('vat'+(rowIndex-1));
        event.preventDefault();
      }
    }
    if(event.key=='ArrowLeft'){
      Helper.focusTextField('discount'+rowIndex)
    }
    if (event.key == 'Tab' && event.shiftKey) {
      Helper.focusTextField('txtBillTo');
      event.preventDefault();
    }
    // if (event.key == 'Enter') {
    //   this.addRow();
    //   Helper.focusNgSelect('txtBillTo' + (rowIndex + 1));
    //   event.preventDefault();
    // }
  }
  getReportInfo() {
    // this.rptService.getReports(AuthService.CompanyId, AuthService.CurrentModuleId, AuthService.CurrentPageId)
    //   .subscribe(response => {
    //     if (response.status) {
    //       this.invoiceRptInfo = response.result as ReportModel[];
    //     }
    //   }, err => {
    //     this.toasterService.error('Report Info not found');
    //   })
  }
  onPrint(){
    // if(this.invoiceRptInfo.length==0){
    //   return this.toasterService.error('No Report file found.');
    // }
    // if(this.transId>0){
    //   this.isPrinting = true;
    //   this.rptService.getCommercialReportForRpt({
    //     TransId:this.transId,
    //     CompId:this.compId,
    //     CompanyID:this.compId,
    //     BranchId:this.branchId,
    //     ReportId:this.invoiceRptInfo[0].reportId,
    //     trmasterid:this.transId,
    //     ExportType:"pdf"
    //   }).subscribe((file:Blob)=>{
    //     this.rptService.openFileWindow(file)
    //     this.isPrinting = false;
    //   },err=>{
    //     this.isPrinting = false;
    //     this.toasterService.error(err.error,'ERROR!')
    //   })
    // }
  }

  onChangePaytype(event:any){
    debugger;
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
      Helper.focusTextField('btnPurchase')
    }else {
      this.invoiceForm.patchValue({payMode:PaymentType.Cash})
      Helper.focusTextField('btnPurchase')
    }
  }

  }
  onBlurPaytype(event:KeyboardEvent){
    debugger;
    if(event.key=='Enter'){
      if(this.f.payMode.value==PaymentType.Cash || this.f.payMode.value==PaymentType.Card ){
        Helper.focusTextField('btnPurchase')
        event.preventDefault();
        }
    }

  }
  onBlurNarration(event:KeyboardEvent){
    if(event.key=='Tab' || event.key=='Enter'){
      event.preventDefault();
      Helper.focusTextField('txtTransportCost');
    }
  }
  onBlurPurchaseBtn(event:MouseEvent){
    Helper.focusNgSelect('ngSelectParty');
  }
  onClickProductName(index:number){
    this.ProductForm.controls[index].patchValue({isProductSelectable:true});
  }
  onSelectPaymentDateByPAyMode(event:any){
    if(event){
     this.invoiceForm.patchValue({chequeDate:event})
      Helper.focusTextField('txtBillTo')
     }
   }
   onSelectBakingType(){
    Helper.focusTextField('mobile');
  }
  forFocustransport(event:KeyboardEvent, rowIndex: number){
    if(event.key=="Tab"){
      if(!this.ProductForm.controls[rowIndex].get('productId').value){
        Helper.focusTextField('txtBillTo');
        event.preventDefault();
      }
      else{
        Helper.focusTextField('qty'+rowIndex);
        event.preventDefault();
      }
    }
  }
  onAddNew(product){
    this.products.push(product);
  }

  onEnterKeyDownArrow(event: KeyboardEvent, rowIndex: number, elementId: string){
    if(event.key=='Enter'){
      if(this.compType==1){
        this.addRow();

        Helper.focusTextField('vat'+rowIndex);
        event.preventDefault();
      }
      else{

      Helper.focusTextField('vat'+rowIndex);
      event.preventDefault();
      }
    }
    if (event.key == 'ArrowDown') {
    Helper.focusTextField('discount'+(rowIndex+1));
     event.preventDefault();
   }
   if(event.key=='ArrowUp'){
     if(rowIndex==0){
      Helper.focusTextField('discount'+rowIndex);
     }
     else{
      Helper.focusTextField('discount'+(rowIndex-1));
     event.preventDefault();
     }
   }
   if(event.key=='ArrowRight'){
     Helper.focusTextField('vat'+rowIndex);
     event.preventDefault();
   }
   if(event.key=='ArrowLeft'){
     Helper.focusTextField('unitQty'+rowIndex);
     event.preventDefault();
   }
 }
}
