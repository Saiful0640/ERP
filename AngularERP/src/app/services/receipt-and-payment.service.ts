import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ReceiptAndPaymentService {

  constructor(private http:HttpClient) { }
  ///ReceiptEntry
getBillByBillForPayment(partyType:number,partyId:number,compId:number){
  return this.http.get(environment.apiUrl +'/transaction/getBillByBillForPayment/partyType/'+partyType+'/partyId/'+partyId+'/compId/'+compId ).pipe(
    map((items:any)=>{
      let values:any[]=[];
      if(items.status){
      items.result.forEach(item=>{
        values.push({
          ...item,
          formatInvoiceNo: 'Invoice# '+item.voucherNo.toString()
        })
      })
      return values;
      }else{
        return values;
      }
    })
  )

}

getMemeberReceiablelist(memberId:number,moduleId:number,compId:number){
  return this.http.get(environment.apiUrl +'/receiptAndPayment/getMemeberReceiablelist/memberId/'+memberId+'/moduleId/'+moduleId+'/compId/'+compId );
}
saveReceiptTransaction(receiptTrans:any){
  return this.http.post(environment.apiUrl+'/receiptAndPayment/updateBillReceipt',receiptTrans );
 }
 ///
 savePaymentTransaction(receiptTrans:any){
  return this.http.post(environment.apiUrl+'/receiptAndPayment/savePayment',receiptTrans );
 }
 //Reports for Receipt bill
 getRptReceivableMemberList(memberId: number, compId: number,moduleId:number) {
  return this.http.get(environment.apiUrl + `/receiptAndPayment/getRptReceivableMemberList/${memberId}/${compId}/${moduleId}`)
}
}
