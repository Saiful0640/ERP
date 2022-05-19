import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Customer } from '../../../../models/sales-purchase/customer.model';
import { AuthService } from '../../../../services/auth.service';
import { SalesPurchaseService } from '../../../../services/sales-purchase/sales-purchase.service';
import { NgbDateCustomParserFormatter } from '../../../../shared/dateformat';
import { Helper } from '../../../../shared/helper';

@Component({
  selector: 'app-pending-order',
  templateUrl: './pending-order.component.html',
  styleUrls: ['./pending-order.component.scss']
})
export class PendingOrderComponent implements OnInit {
  orderForm: FormGroup;
  compId: number = AuthService.CompanyId;
  branch: any[] = [];
  pendingOrder: any[] = [];
  filterPendingOrder: any[] = [];
  pendingChallan: any[] = [];
  isSubmit: boolean = false;
  restrictForEdit: boolean = false;
  isLoadFromOrder: boolean = false;

  constructor(
    private fb: FormBuilder,
    private salesPurchaseService: SalesPurchaseService,
    public dateformat: NgbDateCustomParserFormatter
  ) { }

  ngOnInit() {
    this.createForm();
    // this.getBranch();
    // if (this.compId == 92) {
    //   this.orderForm.controls.branchId.setValue(29);
    //   this.orderForm.controls.orderType.setValue(7);
    // }
    Helper.focusNgSelect('ngSelectParty');
  }

  getChallanByOrderId(item: any) {
    // if (item.orderId > 0) {
    //   this.inventoryService.getPendingChallanReport(item.orderId, this.compId, 2).subscribe((res: any) => {
    //     if (res.status) {
    //       this.pendingChallan = res.result as any[];
    //     } else {
    //       this.pendingChallan = [];
    //     }
    //   })

    // }
  }

  /* getPendingOrder(){
    this.salesPurchaseService.getPendingOrder(this.compId,this.f.partyId.value,this.f.startDate.value,this.f.endDate.value,this.f.branchId.value,this.f.typeId.value,this.f.isActive.value,).subscribe((response:any)=>{
      if(response.status){
        this.pendingOrder=response.result as any[];
        //this.filterPendingOrder=response.result as any[];
      }else
      {
        this.pendingOrder=[];
      }
    })
  } */

  onSearch(searchKey: string) {
    if (searchKey && searchKey != '') {
      this.filterPendingOrder = this.pendingOrder.filter(c =>
        this.isNull(c.aliasName).toLowerCase().match(searchKey.toLowerCase()) ||
        this.isNull(c.orderNo).toLowerCase().match(searchKey.toLowerCase())
      )
    } else {
      this.filterPendingOrder = this.pendingOrder;
    }
  }
  isNull(value) {
    return value ? value : '';
  }

  getPendingOrder() {
    if (this.formVal.partyId == null) {
      this.orderForm.controls.partyId.setValue(0);
    }
    this.orderForm.controls.startDate.setValue(this.dateformat.getNgbDateToYyyymmdd(this.orderForm.controls.startDateNgb.value))
    this.orderForm.controls.endDate.setValue(this.dateformat.getNgbDateToYyyymmdd(this.orderForm.controls.endDateNgb.value))
    this.salesPurchaseService.getPendingOrder(this.orderForm.value).subscribe((response: any) => {
      if (response.status) {
        this.pendingOrder = response.result as any[];
        this.filterPendingOrder = response.result as any[];
      } else {
        this.pendingOrder = [];
      }
    })
  }

  onSelectCheckBox(event: boolean) {
    if (event) {
      this.f.isActive.patchValue(1)
    } else {
      this.f.isActive.patchValue(0)
    }
  }

  onBlurSaleBtn(event: MouseEvent) {
    Helper.focusNgSelect('ngSelectParty');
  }

  onSelectCustomer(customer: Customer) {
    if (customer) {
      this.orderForm.patchValue({
        partyId: customer.accountId,
        partyName: customer.formattedName,
        billTo: customer.formattedName,
        billAddress: customer.deliveryAddress,
        billContactNo: customer.billContactNo
      })
      Helper.focusTextField('productSearchBtnId' + '0');
    }
  }

  getBranch() {
    // this.inventoryService.getBranch(this.compId).subscribe((response: any) => {
    //   if (response.status) {
    //     this.branch = response.result as any[];
    //   } else {
    //     this.branch = [];
    //   }
    // })
  }

  reset() {

    this.orderForm.reset();
    this.createForm();
    this.filterPendingOrder = [];
    this.pendingChallan = [];

  }

  createForm() {
    this.orderForm = this.fb.group({
      startDate: [, []],
      startDateNgb: [this.dateformat.getCurrentNgbDate(), []],
      endDate: [, []],
      endDateNgb: [this.dateformat.getCurrentNgbDate(), []],
      branchId: [, []],
      orderType: [0, []],
      partyId: [, []],
      isActive: [0, []],
      compId: [this.compId, []],
      //transId:[,[]],
    })
  }
  get f() {
    return this.orderForm.controls;
  }
  get formVal() {
    return this.orderForm.value;
  }
}
