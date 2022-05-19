import { AuthService } from './../../../services/auth.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SalesPurchaseService } from '../../../services/sales-purchase/sales-purchase.service';
import { OrderStatus, OrderType } from '../../lookup';
import { Helper } from '../../helper';

@Component({
  selector: 'app-order-list-modal',
  templateUrl: './order-list-modal.component.html',
  styleUrls: ['./order-list-modal.component.scss']
})
export class OrderListModalComponent implements OnInit {
  @Input() orderType = null;
  @Input() orderNo=null;
  @Input() partyId = null;
  @Input() pageId = null;
  @Input() orderStatus = [OrderStatus.Pending, OrderStatus.Checked];
  @Input() loadForChallan: boolean = false;
  @Input() loadForBill: boolean = false;
  @Output() onSelectOrder = new EventEmitter<any>();
  compId: number;
  userId: number;
  searchObj = {
    partyId: null,
    orderType: null,
    status: null,
    fromDate: new Date().toLocaleDateString(),
    toDate: new Date().toLocaleDateString(),
    compId: AuthService.CompanyId,
    orderNo:'',
    userId:AuthService.UserId,
    anyDate:false
  }
  orderTypes: any[] = [];
  orders: any[] = [];
  filterorders: any[] = [];

  isLoading: boolean = false;

  constructor(
    private salePurchaseService: SalesPurchaseService,
    private toaster: ToastrService,
    private modalService: NgbModal,
    // private datePite:DatePipe
  ) { }
  ngOnInit() {
    this.orderTypes = [
      { orderType: OrderType.Sales, typeName: OrderType[OrderType.Sales] },
      { orderType: OrderType.Purchase, typeName: OrderType[OrderType.Purchase] }
    ]
    this.userId=AuthService.UserId;
    this.searchObj.partyId = this.partyId;
    this.searchObj.orderType = this.orderType;
    this.searchObj.status = this.orderStatus;
    this.searchOrders();
  }

  onCheckStatus(isChecked, value: OrderStatus) {
    if (isChecked) {
      this.searchObj.status.push(Number(value))
    } else {
      this.searchObj.status.splice(this.searchObj.status.indexOf(Number(value)), 1);
    }
    this.searchOrders();
  }

  // onSelect(costCenter:any){
  //   if(costCenter==null){
  //     this.onChange.emit({detailsID:null,detailsCaption:null});
  //     return;
  //   }
  //   this.onChange.emit(costCenter);
  // }

  // SelectChange(cost:any){
  //   if(cost==null){
  //     this.onSelectOrder.emit({orderNo:null});
  //     return;
  //   }
  //   this.onSelectOrder.emit(cost);

  // }

  onSearch(event) {
    if (event) {
      this.orders = this.filterorders.filter(p =>
        (p.orderNo.toLowerCase().match(event.toLowerCase()))
      )
      this.orders = this.orders
      console.log(this.orders)
    }
    else {
      this.orders = this.filterorders;
    }
  }
  searchOrders() {
    this.isLoading = true;
    this.orders = [];
    if(this.pageId==70){
      this.salePurchaseService.getDeleveryOrder(this.searchObj)
      .subscribe((response: any) => {
        if (response.status) {
          this.orders = response.result as any[];
          this.filterorders = response.result as any[];


        } else {
          this.orders = [];
        }
        this.isLoading = false;
      }, err => {
        this.orders = [];
        this.toaster.error('An error occured.');
        this.isLoading = false;
      })
    }
    else{
      this.salePurchaseService.getOrder(this.searchObj)
      .subscribe((response: any) => {
        if (response.status) {
          this.orders = response.result as any[];
          this.filterorders=response.result as any[];

        } else {
          this.orders = [];
        }
        this.isLoading = false;
      }, err => {
        this.orders = [];
        this.toaster.error('An error occured.');
        this.isLoading = false;
      })
    }
  }

  onSelect(orderId:any) {
    this.onSelectOrder.emit(orderId);
    this.modalService.dismissAll();
  }
  closeModal() {
    this.modalService.dismissAll();
  }

}
