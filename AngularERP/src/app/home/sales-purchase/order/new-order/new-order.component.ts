import { HttpErrorResponse } from '@angular/common/http';
// import { ReportService } from './../../../../services/report.service';
import { ReportModel } from './../../../../models/settings/app-settings/report-model';
import { CustomerLocation } from './../../../../models/sales-purchase/customer-location.model';
import { OrderStatus } from './../../../../shared/lookup';
import { AuthService } from '../../../../services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SalesPurchaseService } from '../../../../services/sales-purchase/sales-purchase.service';
import { NgbDateCustomParserFormatter } from '../../../../shared/dateformat';
import { OrderType } from '../../../../shared/lookup';
import { ProductUnitModel } from '../../../../models/sales-purchase/Product-Unit-Model';
import { Helper } from '../../../../shared/helper';
import { Customer } from '../../../../models/sales-purchase/customer.model';
import { SettingService } from '../../../../services/settings/Setting.service';

@Component({
  selector: 'app-new-order',
  templateUrl: './new-order.component.html',
  styleUrls: ['./new-order.component.scss','../../../../../vendor/libs/angular2-ladda/angular2-ladda.scss']
})
export class NewOrderComponent implements OnInit {
  compId: number = 1;
  userId: number;
  branchId: number;
  type: number;
  products:ProductUnitModel[];
  //Nasrin
  reportId: number;
  pageId: number;
  childModuleId: number = 20;
  isExporting: boolean = false;
  exportType: string = 'pdf';
  reports: ReportModel[] = [];
  //End
  orderForm: FormGroup;
  companyType:number;
  productListForm: FormArray;
  totalVatAmount: number = 0;
  totalDisCount = 0;
  disCountAmount: number = 0;
  disCountRate: number = 0;
  totalQuantity: number = 0;
  totalAmount: number = 0
  totalNetAmount: number = 0;
  currentStatus:OrderStatus = OrderStatus.Drafted;
  isSubmitted:boolean = false;
  userApproveLevel:any = {};
  disabled:boolean = false;
  @Input() isVwFromMobile:boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    public dateService: NgbDateCustomParserFormatter,
    private toasterService: ToastrService,
    private salesPurchaseService: SalesPurchaseService,
    // private reportService: ReportService,
    private settingsService:SettingService
  ) {
    this.productListForm = this.formBuilder.array([]);
  }

  ngOnInit() {
    if(this.isVwFromMobile){
      document.getElementById('newOrderPage').classList.remove('card')
    }
    this.compId = AuthService.CompanyId;
    this.userId = AuthService.UserId;
    this.branchId = AuthService.BranchId;
    this.pageId = AuthService.CurrentPageId;
    this.companyType=AuthService.CompanyType;
    this.createForm();
    // if(this.companyType==2 || this.currentStatus>0){
    //   this.disabled=true;
    // }
    // else{
    //   this.disabled=false;
    // }
    for (let i = 0; i < 6; i++) {
      this.addRow();
    }
    // this.getNextOrderNo();
    if(AuthService.TempVal){
      this.onEdit(AuthService.TempVal);
    }
    // this.getReportInfo();
    Helper.focusNgSelect('ngSelectParty');
    // this.getUserAppoveLevel();
  }

  getNextOrderNo() {
    if (!this.formVal.orderType) {
      return this.orderForm.patchValue({
        orderNo: null
      })
    }
    this.salesPurchaseService.getNextOrderNo(this.compId, this.formVal.orderType, this.formVal.orderDate)
      .subscribe((response: any) => {
        if (response.status) {
          this.orderForm.patchValue({
            orderNo: response.result
          })
        } else {
          this.orderForm.patchValue({
            orderNo: null
          })
        }
      })
  }
  onSelectProduct(product, index: number) {
    if(product==null){
      Helper.focusTextField('qty' + index)
    }
    if (product) {
      this.productListForm.controls[index].patchValue({
        productId:product.id,
        unitId: product.billUnitId,
        factor: product.billUnitFactor ? product.billUnitFactor : 1,
        vat: product.vatrate,
        unitPrice: product.salePrice,
        boxConv: product.boxConv
      })
    } else {
      this.productListForm.controls[index].patchValue({
        productId:null,
        unitId: null,
        factor: null,
        vat: null,
        boxConv:null
      })
      Helper.focusTextField('qty' + index)
    }
    Helper.focusTextField('qty' + index)
  }
  onSelectCustomer(customer: Customer){
    Helper.focusTextField('productSearchBtnId' + '0');
  }
  onSelectUnit(unit, index: number) {
    if (unit) {
      this.productListForm.controls[index].patchValue({
        unitId: unit.id,
        factor: unit.unitFactor ? unit.unitFactor : 1
      })
    } else {
      this.productListForm.controls[index].patchValue({
        unitId: null,
        factor: null
      })
    }
  }

  onChangeDiscRate(index) {
    let discount = Number(this.productListForm.value[index]["discount"]);
    if (discount > 100 || discount < 0) {
      this.productListForm.controls[index].patchValue({
        discount: 0
      })
    }
  }
  onChangeVatRate(index) {
    let vat = Number(this.productListForm.value[index]["vat"]);
    if (vat > 100 || vat < 0) {
      this.productListForm.controls[index].patchValue({
        vat: 0
      })
    }
  }

  onChangeQty(rowIndex: number) {
    let unitPrice = this.productListForm.value[rowIndex]["unitPrice"]
    let unitQty = this.productListForm.value[rowIndex]["unitQty"]
    let uniqueQty = unitQty * Number(this.productListForm.value[rowIndex]["factor"])
    let totalAmount = unitPrice * unitQty;
    let discount = this.productListForm.value[rowIndex]["discount"]
    let vat = this.productListForm.value[rowIndex]["vat"]
    let disCountAmount = totalAmount * discount * 0.01;
    this.totalDisCount = this.totalDisCount + discount;
    this.productListForm.controls[rowIndex].patchValue({
      total: totalAmount,
      discountAmt: disCountAmount,
      netAmount: (totalAmount - disCountAmount) + (totalAmount - disCountAmount) * vat * 0.01,
    })
    let totalDiscountAmount = 0;
    this.totalVatAmount = 0;
    this.totalQuantity = 0;
    this.totalAmount = 0;
    this.totalNetAmount = 0;
    this.productListForm.controls.forEach(frmGroup => {
      let uniqueQty = Number(frmGroup.get('uniqueQty').value);
      let unitQty = Number(frmGroup.get('unitQty').value);
      let unitPrice = Number(frmGroup.get('unitPrice').value);
      let amount = Number(frmGroup.get('netAmount').value);
      let discount = Number(frmGroup.get('discount').value);
      let vat = Number(frmGroup.get('vat').value);
      this.totalQuantity += unitQty;
      this.totalAmount += uniqueQty * unitPrice;
      this.totalNetAmount += amount;
      totalDiscountAmount += (unitPrice * uniqueQty) * discount * 0.01;
      this.totalVatAmount += ((unitPrice * uniqueQty) - (unitPrice * uniqueQty) * discount * 0.01) * vat * 0.01;
    })
    this.orderForm.patchValue({
      discountAmount: totalDiscountAmount,
      vatAmount: this.totalVatAmount,
      totalAmount: this.totalAmount,
      netAmount: this.totalNetAmount,
      vatRate: vat,
      discountRate: discount
    })
    this.updateNetPayable();
  }
  saveOrder() {
    this.isSubmitted = true;
    this.salesPurchaseService.saveOrder({
      master: this.formVal,
      details: (this.productListForm.value as any[]).filter(p=>p.productId && Number(p.unitQty)>0)
    }).subscribe((response: any) => {
        if (response.status) {
          this.toasterService.success(response.result,'Ordered Successfully.');
          this.onPrint(response.orderId);
          this.reset();
        } else {
          this.toasterService.error(response.result,'Failed to order.');
        }
        this.isSubmitted = false;
      },err=>{
        this.toasterService.error(err.message,'Unexpected error!');
        this.isSubmitted = false;
      })
  }
  onEdit(id:number){
    AuthService.TempVal = null;
    this.salesPurchaseService.getOrderById(id,this.compId)
    .subscribe((response:any)=>{
      if(response.status){
        this.productListForm = this.formBuilder.array([]);
        this.orderForm.patchValue(response.result);
        this.currentStatus = response.result.status;
        let total = 0;
        (response.result.details as any[]).forEach(product => {
          let row = this.getNewRow();
          row.patchValue(product)
          row.patchValue({
            total: Number(product.uniqueQty)*Number(product.unitPrice)
          })
          total+=Number(row.value.total);
          this.productListForm.push(row);
        });
        this.orderForm.patchValue({totalAmount:total})
        // this.onPrint(this.f.orderId.value)
      }
    })
  }
  createForm() {
    this.orderForm = this.formBuilder.group({
      bankBranch: [, []],
      billContactNo: [, []],
      billTo: [, []],
      billAddress: [, []],
      branchId: [this.branchId, []],
      checkedNarration:[,[]],
      chequeNo: [, []],
      chequeDate: [, []],
      userId: [this.userId, []],
      compId: [this.compId, []],
      currencyRate: [1.00, []],
      deliveryQty: [0, []],
      discountAmount: [, []],
      discountRate: [, []],
      netAmount: [, []],
      netPayable: [0, []],
      narration: [, []],
      otherAddition: [, []],
      otherDeduction: [, []],
      orderDate: [new Date().toLocaleString(), []],
      orderId: [, []],
      orderNo: [, [Validators.required]],
      orderType: [OrderType.Sales, []],
      paidAmount: [, []],
      partyId: [, [Validators.required]],
      rejectedNarration: [, []],
      refNo: [, []],
      status: [0, []],
      totalAmount: [, []],
      vatAmount: [, []],
      vatRate: [, []],

      creditLimit:[0,[]],
      balance:[0,[]]
    })
  }
  addRow() {
    this.productListForm.push(this.getNewRow())
  }
  getNewRow():FormGroup{
    return new FormGroup({
      id:new FormControl(null,[]),
      orderId: new FormControl(null, []),
      productId: new FormControl(null, [Validators.required]),
      unitId: new FormControl(null, []),
      unitQty: new FormControl(null, []),
      pcsQty: new FormControl(null, []),
      unitPrice: new FormControl(null, []),
      discount: new FormControl(null, []),
      discountAmt: new FormControl(null, []),
      vat: new FormControl(null, []),
      netAmount: new FormControl(0, []),
      branchId: new FormControl(this.branchId, []),
      compId: new FormControl(this.compId, [Validators.required]),
      uniqueQty: new FormControl(null, []),
      factor: new FormControl(null, []),
      boxConv: new FormControl(null, []),
      uniquePrice: new FormControl(null, []),
      forfeiture: new FormControl(null, []),

      total: new FormControl(0.00, [])
    })
  }
  updateNetPayable() {
    let netAmount = Number(this.formVal.netAmount);
    let paidAmount = Number(this.formVal.paidAmount);
    let miscAdd = Number(this.formVal.otherAddition);
    let missdeduct = Number(this.formVal.otherDeduction);
    let payableAmount = netAmount - paidAmount - missdeduct + miscAdd;
    this.orderForm.patchValue({ netPayable: payableAmount });

  }
  removeRow(index: number) {
    let perRowQty = this.productListForm.value[index]["unitQty"];
    let netAmount = Number(this.orderForm.get('netAmount').value) - Number(this.productListForm.value[index]["netAmount"]);
    let totalAmt = Number(this.orderForm.get('totalAmount').value) - Number(this.productListForm.value[index]["total"]);
    let discount = Number(this.orderForm.get('discountAmount').value) - Number(this.productListForm.value[index]["discountAmt"]);
    let vat = Number(this.orderForm.get('vatAmount').value) - this.productListForm.value[index]["vat"];
    this.totalQuantity -= perRowQty;

    this.orderForm.patchValue({
      totalAmount:totalAmt,
      netAmount: netAmount,
      vatAmount: vat,
      discountAmount: discount
    })
    this.productListForm.removeAt(index);
    this.updateNetPayable();
  }
  onChangeProductQty(rowIndex) {
    let unitQty = this.productListForm.value[rowIndex]["unitQty"]
    let factor = this.productListForm.value[rowIndex]["factor"]
    this.productListForm.controls[rowIndex].patchValue({
      uniqueQty: unitQty / factor
    })
  }
  getProductVal(index, key, val) {
    return this.productListForm.controls[index].get(key).value;
  }
  setProductVal(index, key, value) {
    this.productListForm.controls[index].get(key).patchValue(value);
  }
  get f() {
    return this.orderForm.controls;
  }
  get formVal() {
    return this.orderForm.value;
  }
  onTabKeyDown(event: KeyboardEvent, rowIndex: number) {
    if (event.key == 'Tab' && !event.shiftKey) {
      if (rowIndex === (this.productListForm.length - 1) || !this.productListForm.controls[rowIndex].get('productId').value) {
        Helper.focusTextField('otherAddition');
        event.preventDefault();
      } else {
        Helper.focusTextField('productSearchBtnId' + (rowIndex + 1));
        event.preventDefault();
      }
    }
    if (event.key == 'Tab' && event.shiftKey) {
      Helper.focusTextField('otherAddition');
      event.preventDefault();
    }
    if (event.key == 'Enter') {
      this.addRow();
      Helper.focusTextField('productSearchBtnId' + (rowIndex + 1));
      event.preventDefault();
    }
  }
  onEnterOrTabKeyDownForNgSelect(event: KeyboardEvent,  elementId: string){
    if (event.key == 'Enter' || event.key=='Tab') {
      Helper.focusNgSelect(elementId);
      event.preventDefault();
    }
  }
  onEnterOrTabKeyDown(event: KeyboardEvent,  elementId: string) {
    if (event.key == 'Enter' || event.key=='Tab' ) {
      Helper.focusTextField(elementId);
      event.preventDefault();
    }
  }
  onEnterKeyDown(event: KeyboardEvent, rowIndex: number, elementId: string) {
    if (event.key == 'Enter') {
      Helper.focusTextField(elementId + rowIndex);
      event.preventDefault();
    }
  }
  onBlurNarration(event:KeyboardEvent){
    if(event.key=='Tab'){
      event.preventDefault();
      Helper.focusTextField('btnSave');
    }
  }
  onBlurPaidAmount(event:KeyboardEvent){
    if(event.key=='Tab' || event.key=='Enter'){
      event.preventDefault();
      Helper.focusTextField('txtBillTo');
    }
  }
  onBlurSaveBtn(event:MouseEvent){
    Helper.focusNgSelect('ngSelectParty');
  }
  onChecked(isChecked){
    if(isChecked){
      this.orderForm.patchValue({
        status: OrderStatus.Checked,
        checkedBy:this.userId
      })
    }else{
      this.orderForm.patchValue({
        status: OrderStatus.Pending,
        checkedBy:null
      })
    }
  }
  onApprove(isChecked){
    let el = document.getElementById('approveStatus')
    if(isChecked){
      this.orderForm.patchValue({
        status: OrderStatus.Approved,
        approvedBy:this.userId
      })
    }else{
      this.orderForm.patchValue({
        status: OrderStatus.Checked,
        approvedBy:null
      })
    }
  }
  onReject(isChecked){
    if(isChecked){
      this.orderForm.patchValue({
        status: OrderStatus.Rejected,
        rejectedBy:this.userId
      })
    }else{
      this.orderForm.patchValue({
        status: OrderStatus.Checked,
        rejectedBy:null
      })
    }
  }
  reset(){
    this.totalVatAmount = 0;
    this.totalDisCount = 0;
    this.disCountAmount = 0;
    this.disCountRate = 0;
    this.totalQuantity = 0;
    this.totalAmount = 0
    this.totalNetAmount = 0;
    this.currentStatus = OrderStatus.Drafted;
    this.createForm();
    this.productListForm = this.formBuilder.array([]);
    for (let i = 0; i < 3; i++) {
      this.addRow();
    }
    this.getNextOrderNo();
    this.isSubmitted = false;
  }
  selectAddress(location:CustomerLocation){
    if(location){
      this.orderForm.patchValue({
        partyId:location.accountId,
        partyName:location.formatedName,
        billAddress:location.customerAddress
      })
    }
    }
//Nasrin
getReportInfo() {
  // this.reportService.getReports(this.compId, this.childModuleId, this.pageId)
  //   .subscribe(response => {
  //     if (response.status) {
  //       this.reports = response.result as ReportModel[];

  //     }
  //   }, err => {
  //     this.toasterService.error('Report Info not found');
  //     console.error(err);
  //   })
}
    onPrint(orderId:number) {
      //CreatedBy Nasrin
      // if (orderId != null && orderId != 0) {
      //   this.isExporting = true;
      //   this.reportId = this.reports.length > 0 ? this.reports[0].reportId : null;
      //   this.reportService.getCommercialReportForRpt({
      //     ReportId: this.reportId,
      //     ExportType: this.exportType,
      //     OrderId: orderId,
      //     CompId: this.formVal.compId,
      //     BranchId: this.formVal.branchId
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

    getUserAppoveLevel(){
      this.settingsService.getUserApprovalLevel(this.userId,this.compId,AuthService.CurrentModuleId)
      .subscribe((response:any)=>{
        if(response.status && response.result){
          this.userApproveLevel = response.result;
        }
      })
    }
}
