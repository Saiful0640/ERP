import { NgbDateCustomParserFormatter } from './../../../../shared/dateformat';
import { AuthService } from './../../../../services/auth.service';
import { toDate } from '@angular/common/src/i18n/format_date';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { SalesPurchaseService } from '../../../../services/sales-purchase/sales-purchase.service';
import { SettingService } from '../../../../services/settings/Setting.service';
import { OrderStatus, OrderType } from '../../../../shared/lookup';
import { Helper } from '../../../../shared/helper';
import { PageAuthModel } from '../../../../models/settings/page-auth.model';
import { ApiResponse } from '../../../../models/api-response';

@Component({
  selector: 'app-order-list',
  templateUrl: './order-list.component.html',
  styleUrls: ['./order-list.component.scss']
})
export class OrderListComponent implements OnInit {
  @Input() orderType = null;
  @Input() partyId = null;
  // @Input() orderStatus = [OrderStatus.Pending, OrderStatus.Checked,OrderStatus.Verify,OrderStatus.Approved,OrderStatus.Rejected];
   orderStatus=[];
  @Input() loadForChallan: boolean = false;
  @Input() loadForBill: boolean = false;
  @Output() onSelectOrder:EventEmitter<any> = new EventEmitter<any>();
  @Input () pageId:number;
  @Input()title:string="Order List"
  compId: number;
  userID: number;
  searchObj = {
    partyId: -1,
    orderType: -1,
    status: [],
    fromDate: Helper.getLocalDateStr(),
    toDate: Helper.getLocalDateStr(),
    compId: AuthService.CompanyId,
    userID:AuthService.UserId,
    orderNo:'',
    anyDate:false
  }
  orderTypes: any[] = [];
  orders: any[] = [];
  isLoading: boolean = false;
   orStatus:any[]=[];
   companyType:number=AuthService.CompanyType;
   pageAuthInfo:PageAuthModel = new PageAuthModel();

   @Input() isVwFromMobile:boolean = false;
  constructor(
    private salePurchaseService: SalesPurchaseService,
    private toaster: ToastrService,
    private router: Router,
    private modalService: NgbModal,
    private settingService:SettingService,
    public datFormet:NgbDateCustomParserFormatter
  ) { }
  ngOnInit() {
    // if(this.isVwFromMobile){
    //   document.getElementById('listOrderPage').classList.remove('card')
    // }
    // AuthService.CurrentPageId = 61; //When page load from Mobile this page not load by routing. its in tab view
    // this.settingService.getPageAuthInfo(AuthService.UserId, AuthService.CurrentPageId)
    // .subscribe((res:ApiResponse)=>{
    //   if(res.status){
    //     this.pageAuthInfo = res.result as PageAuthModel;
    //     if(!this.pageAuthInfo.isAssigned){
    //       this.router.navigate(['forbidden']);
    //     }
    //   }
    // });
    // this.orderTypes = [
    //   { orderType: OrderType.Sales, typeName: OrderType[OrderType.Sales] },
    //   { orderType: OrderType.Purchase, typeName: OrderType[OrderType.Purchase] }
    // ]
    // this.searchObj.partyId = this.partyId;
    // this.searchObj.orderType = this.orderType;
    // this.companyType=AuthService.CompanyType;
    // this.getApprovalLevel();
  }
  getApprovalLevel(){
      this.settingService.getUserApprovalLevel(AuthService.UserId,AuthService.CompanyId,AuthService.CurrentModuleId)
      .subscribe((response:any)=>{
        if(response.status && response.result){
           let pending=false;
          let checked=response.result.canCheck;
          let verify=response.result.canVerify;
          let approve=response.result.canApprove;
          let rejected=response.result.canApprove;
          this.orStatus.push(pending,checked,verify,approve,rejected)
          if(approve){
          this.orderStatus.push(2,3,4);
          this.searchObj.status = this.orderStatus;
           this.searchOrders();
          }else if(verify){
            // for(let i=0;this.orStatus.length>i;i++){
            //   if(this.orStatus[i]==true){
            //       this.orderStatus.push(i-1)
            //   }
            // }
            this.orderStatus.push(0);
          this.searchObj.status = this.orderStatus;
           this.searchOrders();
          }else{
            this.orderStatus.push(-1)
            this.searchObj.status = this.orderStatus;
            this.searchOrders();
          }
        }else{
       this.orderStatus.push(-1)
       this.searchObj.status = this.orderStatus;
       this.searchOrders();
        }
      })
  }
  onCheckStatus(isChecked, value: OrderStatus) {
    if (isChecked) {
      this.searchObj.status.push(Number(value))
    } else {
      this.searchObj.status.splice(this.searchObj.status.indexOf(Number(value)), 1);
    }
     this.searchOrders();
  }

  searchOrders() {
    this.isLoading = true;
    this.orders = [];

    this.salePurchaseService.getOrder(this.searchObj)
      .subscribe((response: any) => {
        if (response.status) {
          this.orders = response.result as any[];
        } else {
          this.orders = [];
        }
        this.isLoading = false;
      }, err => {
        this.orders = [];
        this.toaster.error(err.error,'An error occured.');
        this.isLoading = false;
      })
  }

  onSelect(orderId) {
    if (this.loadForBill || this.loadForChallan) {
      this.onSelectOrder.emit(orderId);
    }
    else if(this.companyType==2) {
      AuthService.TempVal = orderId
      this.router.navigate(['/sales-purchase/order/order-s'])
    }
    else if(this.companyType==3) {
      AuthService.TempVal = orderId
      this.router.navigate(['/sales-purchase/order/order-safwan'])
    }
    else  {
      AuthService.TempVal = orderId
      this.router.navigate(['/sales-purchase/order/new-order'])
    }

    this.modalService.dismissAll();
  }

  closeModal() {
    this.modalService.dismissAll();
  }
//For Reports
/* onExportReport(reportModel:ReportModel){
  this.isExporting = true;
  console.log(reportModel)
  this.reportService.getCommercialReportForRpt({
        ReportId: reportModel.reportId,
        ExportType:reportModel.exportType,
        Between: this.between,
        StartDate: this.StartDate,
        EndDate: this.EndDate,
        And: this.and,
        CompID: this.compId,
        ModuleID:this.moduleId,
        PeriodId:this.periodID
  }).subscribe((file)=>{
    this.isExporting = false;
    if(file){
      this.reportService.openFileWindow(file)
    }
  },(err:HttpErrorResponse)=>{
    this.isExporting = false;
    this.toastrService.error('An unexpected Error occured','Error')
  })
} */
}
