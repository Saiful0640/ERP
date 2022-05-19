import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Discount } from '../models/sales-purchase/discount.model';

@Injectable({
  providedIn: 'root'
})
export class SalesPurchaseDiscountService {

  constructor(private http:HttpClient) { }

 
  getAllDiscount(compId:number){
    return this.http.get(environment.apiUrl+'/salesPurchase/getDiscount/'+compId)
  }

  getAllDiscountForDIsSetting(disData){
    return this.http.post(environment.apiUrl+'/salesPurchase/GetDiscountForDIsSetting',disData)
  }
  saveDiscountSetting(discount:Discount){
    return this.http.post(environment.apiUrl+'/salesPurchase/saveDiscountSetting',discount)
  }
  getAllPaybleDues(compId:number,recivablepayble:number)
  {
return this.http.get(environment.apiUrl+'/salesPurchase/GetPaybleDues/compId/'+compId+'/recivablepayble/'+recivablepayble)
  }

}
