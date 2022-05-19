import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { CustomerLocation } from '../../../../models/sales-purchase/customer-location.model';
import { Customer } from '../../../../models/sales-purchase/customer.model';
import { InvoiceProductModel } from '../../../../models/sales-purchase/invoice.model';
import { AuthService } from '../../../../services/auth.service';
import { SalesPurchaseService } from '../../../../services/sales-purchase/sales-purchase.service';
import { SettingService } from '../../../../services/settings/Setting.service';
import { NgbDateCustomParserFormatter } from '../../../../shared/dateformat';
import { Helper } from '../../../../shared/helper';
import { OrderStatus, OrderType } from '../../../../shared/lookup';

@Component({
  selector: 'app-delivery-order',
  templateUrl: './delivery-order.component.html',
  styleUrls: ['./delivery-order.component.scss']
})
export class DeliveryOrderComponent implements OnInit {
  deliveryOrderForm:FormGroup;
  currentStatus:OrderStatus=OrderStatus.Drafted;
  compId:number=AuthService.CompanyId;
  userId:number = AuthService.UserId;
  userApproveLevel:any = {};
  product: any;
  billNatureId: number = 1;//ForSale=1
  quantity: number;
  productsFormArr: FormArray;
  finalTotalQty: number = 0;
  finalTotalAmount: number = 0;
  finalNetAmount: number = 0;
  BillingAccountsForm: FormArray;
  btnStatus:string="Save";
  isConfirm:boolean = false;
  isSubmitted:boolean = false;

  constructor(
    private fb:FormBuilder,
    private salesPurchaseService:SalesPurchaseService,
    private settingsService:SettingService,
    private dateService: NgbDateCustomParserFormatter,
    private toasterService: ToastrService,
    public modalService:NgbModal
  ) { }

  ngOnInit() {
    this.createForm();
    Helper.focusNgSelect('ngSelectParty');
    //this.getNextOrderNo();
    // this.product = new InvoiceProductModel();
    // this.productsFormArr = this.fb.array([]);
    // this.BillingAccountsForm = this.fb.array([]);
  }

  saveOrder(){}

  confirmSave(event:any){
    /* this.isConfirm=true;
    if(event){
      this.modalService.open(event)
   } */
  }

  confirmSaveOrder(){}

  addProduct() {
    if (this.product.productId != null && this.formVal.qty != null ) {//&& this.formVal.costPrice(sajib remove it from if condition)
      let product = this.product;
      console.log(product);
      this.finalTotalQty += this.quantity;
      this.finalTotalAmount += this.deliveryOrderForm.controls.totalAmount.value;
      this.finalNetAmount += this.deliveryOrderForm.controls.productNetAmount.value;
      this.deliveryOrderForm.controls.netPayable.setValue(this.finalNetAmount.toFixed(3));
      //this.deliveryOrderForm.controls.totalCost.setValue(this.finalTotalAmount);
      //this.onDue();
      this.productsFormArr.push(new FormGroup({
        serialNo: new FormControl(product.id, [Validators.required]),
        productId: new FormControl(product.productId, [Validators.required]),
        productDescription: new FormControl(product.name, []),
        quantity: new FormControl(this.formVal.qty, []),
        price: new FormControl(this.formVal.costPrice, []),//unitPrice
        discount: new FormControl(this.formVal.discountRate, []),
        vat: new FormControl(this.formVal.vatRate, []),
        netAmount: new FormControl(this.formVal.productNetAmount, []),
        transId: new FormControl(0, []),
        uniqueQty: new FormControl(this.formVal.qty, []),
        unitId: new FormControl(product.unitId, []),
        total: new FormControl(this.formVal.qty * this.formVal.costPrice, []),
        billNatureId: new FormControl(this.billNatureId, []),
      }))
      //this.costAddDeduct();
      this.product.productId = null;
      this.deliveryOrderForm.controls.description.setValue(null);
      this.deliveryOrderForm.controls.qty.setValue(null);
      this.deliveryOrderForm.controls.costPrice.setValue(null);
      this.deliveryOrderForm.controls.discountRate.setValue(null);
      this.deliveryOrderForm.controls.vatRate.setValue(null);
      this.deliveryOrderForm.controls.totalAmount.setValue(null);
      this.deliveryOrderForm.controls.productNetAmount.setValue(null);
    } else {
      this.toasterService.error("Please Select Product & Enter Qty and Price");
    }
  }

  editProduct(productId: number, index: number) {
    let product = this.productsFormArr.controls.find(product => product.value.productId == productId).value;
    this.deliveryOrderForm.controls.description.setValue(product.productDescription);
    this.deliveryOrderForm.controls.qty.setValue(product.quantity);
    this.deliveryOrderForm.controls.costPrice.setValue(product.price);
    this.deliveryOrderForm.controls.discountRate.setValue(product.discount);
    this.deliveryOrderForm.controls.vatRate.setValue(product.vat);
    this.deliveryOrderForm.controls.totalAmount.setValue(product.total);
    this.deliveryOrderForm.controls.productNetAmount.setValue(product.netAmount);
    this.finalTotalQty -= product.quantity;
    this.finalTotalAmount -= product.total;
    this.finalNetAmount -= product.netAmount;
    this.product.productId = product.productId;
    this.deliveryOrderForm.controls.netPayable.setValue(this.finalNetAmount);
    this.costAddDeduct()
    this.productsFormArr.removeAt(index);

  }

  costAddDeduct() {
    let totalCost = Number(this.formVal.productNetAmount);
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
    this.f.productNetAmount.patchValue(totalAddDeductCost);

  }

  remove(index: number) {
    this.productsFormArr.removeAt(index);
  }

  clear(){}

  getNextOrderNo() {
    if (!this.formVal.orderType) {
      return this.deliveryOrderForm.patchValue({
        orderNo: null
      })
    }
    this.salesPurchaseService.getNextOrderNo(this.compId, this.formVal.orderType, this.formVal.orderDate)
      .subscribe((response: any) => {
        if (response.status) {
          this.deliveryOrderForm.patchValue({
            orderNo: response.result
          })
        } else {
          this.deliveryOrderForm.patchValue({
            orderNo: null
          })
        }
      })
  }

  onSelectCustomer(customer: Customer){
    this.salesPurchaseService.getPartyInformationById(customer.accountId,this.compId)
    .subscribe((response:any)=>{
      if(response.status){
        this.deliveryOrderForm.patchValue({
          commitionType:response.result.commissionType,
          territory:response.result.territory,
          tso:response.result.tso,
          cBalence:response.result.openningBalance,
          cLimit:response.result.creditLimit,
          partyId:customer.accountId,
          billTo:customer.formattedName,
          billAddress:customer.deliveryAddress,
          billContactNo:customer.billContactNo})
      }
    })

    Helper.focusTextField('productSearchBtnId' + '0');
  }

  selectAddress(location:CustomerLocation){
    if(location){
      this.deliveryOrderForm.patchValue({
        partyId:location.accountId,
        partyName:location.formatedName,
        billAddress:location.customerAddress
      })
    }
    }

  onBlurSaveBtn(event:MouseEvent){
    Helper.focusNgSelect('ngSelectParty');
  }

  getUserAppoveLevel(){
    this.settingsService.getUserApprovalLevel(this.userId,this.compId,AuthService.CurrentModuleId)
    .subscribe((response:any)=>{
      if(response.status && response.result){
        this.userApproveLevel = response.result;
      }
    })
  }

  onEnterOrTabKeyDown(event: KeyboardEvent,  elementId: string) {
    if (event.key == 'Enter' || event.key=='Tab' ) {
      Helper.focusTextField(elementId);
      event.preventDefault();
    }
  }

  onBlurNarration(event:KeyboardEvent){
    if(event.key=='Tab' ){
      event.preventDefault();
      Helper.focusTextField('btnSave');
    }
  }

  onBlurPaidAmount(event:KeyboardEvent){
    if(event.key=='Tab'||event.key=='Enter' ){
      event.preventDefault();
      Helper.focusTextField('billTo');
    }
  }

  updateNetPayable() {
    let netAmount = Number(this.formVal.netAmount);
    let paidAmount = Number(this.formVal.paidAmount);
    let miscAdd = Number(this.formVal.otherAddition);
    let missdeduct = Number(this.formVal.otherDeduction);
    let payableAmount = netAmount - paidAmount - missdeduct + miscAdd;
    this.deliveryOrderForm.patchValue({ netPayable: payableAmount });
  }

  onSelectPaymentType(type){
    if(type){
      this.deliveryOrderForm.patchValue({
        paymentType:type
      })
    }
  }

  onChangeAccountBankId(bank){
    if(bank){
      this.deliveryOrderForm.patchValue({
        bankId:bank.accountId
      })
    }
  }

  onChangeProduct(product: any) {
    if (product) {
      console.log(product);
      this.deliveryOrderForm.controls.description.setValue(product.description);
      this.deliveryOrderForm.controls.costPrice.setValue(product.costPrice);
      this.product.productId=product.productId;
      this.product=product;
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

  calculation() {
    let discount = this.deliveryOrderForm.controls.discountRate.value;
    let vat = this.deliveryOrderForm.controls.vatRate.value;
    //let tax = this.deliveryOrderForm.controls.taxRate.value;
    let qty = this.deliveryOrderForm.controls.qty.value;
    let uniqPrice = this.deliveryOrderForm.controls.costPrice.value;
    let totalAmount = qty * uniqPrice;
    let discountAmount = totalAmount * discount * 0.01;
    let grossAmount = totalAmount - discountAmount;
    let vatAmount = grossAmount * vat * 0.01;
    //let taxAmount = grossAmount * tax * 0.01;
    let productNetAmount = grossAmount + vatAmount;
    this.quantity = this.deliveryOrderForm.controls.qty.value;
    this.deliveryOrderForm.controls.totalAmount.setValue(totalAmount),
      this.deliveryOrderForm.controls.productNetAmount.setValue(productNetAmount)
  }

  reset(){
    this.btnStatus="Save"
    this.currentStatus = OrderStatus.Drafted;
    this.deliveryOrderForm.reset();
    this.createForm();
    this.productsFormArr = this.fb.array([]);
    this.BillingAccountsForm = this.fb.array([]);
    this.product= [];
    //this.deliveryOrderForm.controls['orderDate'].setValue((new Date).toLocaleDateString());
    this.deliveryOrderForm.controls['orderDateNgb'].setValue(this.dateService.getCurrentNgbDate());
    this.getNextOrderNo();
  }

  createForm(){
    this.deliveryOrderForm=this.fb.group({
      partyId:[,[Validators.required]],
      orderNo: [, [Validators.required]],
      orderDate: [Helper.getLocalDateStr(), []],
      orderDateNgb:[,[]],
      refNo: [, []],
      orderType: [OrderType.Sales, []],
      commitionType:[,[]],
      territory:[,[]],
      tso:[,[]],
      cBalence:[,[]],
      cLimit:[,[]],
      billTo: [, []],
      billAddress: [, []],
      billContactNo: [, []],
      narration: [, []],
      checkedNarration:[,[]],
      verifiedNarration:[,[]],
      managementNarration: [, []],
      otherAddition: [, []],
      otherDeduction: [, []],
      paidAmount: [, []],
      netAmount: [, []],
      netPayable: [0, []],
      paymentType:[,[]],
      bankId:[,[]],
      deposite:[0,[]],
      balance:[0,[]],
      creditLimit:[0,[]],
      description: [, []],
      qty: [, []],
      costPrice: [, []],
      discountRate: [, [Validators.min(0), Validators.max(100)]],
      vatRate: [, []],
      totalAmount: [0, []],
      productNetAmount: [, []],
      //totalCost: [, []],
    })
  }
  get f(){
    return this.deliveryOrderForm.controls;
  }
  get formVal(){
    return this.deliveryOrderForm.value;
  }

}
