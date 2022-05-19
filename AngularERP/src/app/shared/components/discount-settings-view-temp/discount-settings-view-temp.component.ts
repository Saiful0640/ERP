import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Discount } from '../../../models/sales-purchase/discount.model';
import { AuthService } from '../../../services/auth.service';
import { SalesPurchaseDiscountService } from '../../../services/sales-purchase-discount.service';

@Component({
  selector: 'app-discount-settings-view-temp',
  templateUrl: './discount-settings-view-temp.component.html',
  styleUrls: ['./discount-settings-view-temp.component.scss']
})
export class DiscountSettingsViewTempComponent implements OnInit {
 
  @Output() selectEvent = new EventEmitter<Discount>();
  compId:number;
  discountSearch: Discount = new Discount();
  discountSettingList:Discount[]=[];
  filterDiscountSettingList:Discount[]=[];
  constructor(
    private modalService:NgbModal,
    private discountSettingServic:SalesPurchaseDiscountService,
    private toastrServie:ToastrService
  ) { }

  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.getDiscountSettingList();
  }
  getDiscountSettingList(){
    this.discountSettingServic.getAllDiscount(this.compId).subscribe((response:any)=>{
      if(response.status){
        this.discountSettingList=response.result as Discount[];
        this.filterDiscountSettingList=response.result as Discount[];
      }else{
        this.discountSettingList=[];
      }
    },(err:any)=>{
      this.toastrServie.error(err.error,"Failed!")
    })
  }
  filterCommercialBasicEntryList(itemName: string) {
    if(itemName != null ){
      let filterAg = this.discountSettingList.filter(c =>c.itemName.toLowerCase().match(itemName.toLowerCase()));
      this.filterDiscountSettingList=filterAg;
    }else{
    }
   }
  onSelect(model: any) {
    this.selectEvent.emit(model);
    this.cancel();
  }

  cancel(){
    this.modalService.dismissAll();

  }

}
