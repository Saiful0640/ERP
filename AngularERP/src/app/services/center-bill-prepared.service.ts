import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CenterBillPreparedService {

  constructor(private http:HttpClient) { }
  getServiceBillPreparedList(compId: number,moduleId:number,Type:number,PeriodId:number=0) {
    return this.http.get(environment.apiUrl + `/centerBillPrepared/getServiceBillPreparedList/${compId}/${moduleId}/${Type}/${PeriodId}`)
  }
  saveBillPrepared(bill:any){
    return this.http.post(environment.apiUrl+'/centerBillPrepared/saveBillPrepared',bill)
  }
  getCenterBillPrepared(billP:any) {
    return this.http.post(environment.apiUrl + '/centerBillPrepared/getCenterBillPrepared',billP);
    // return this.http.post(environment.apiUrl + `/centerBillPrepared/getCenterBillPrepared`,bils)
  }
/////=======Opening balance===============///////
  saveBalance(balance:any){
return this.http.post(environment.apiUrl +'/AssociationBasicEntry/SaveBalance',balance)
  }

  getOpeningBalance(compId: number,moduleId:number,periodId:number=0) {
    return this.http.get(environment.apiUrl + `/AssociationBasicEntry/GetOpeningBalanceList/${compId}/${moduleId}/${periodId}`)
    // return this.http.post(environment.apiUrl + `/centerBillPrepared/getCenterBillPrepared`,bils)
  }
  /// =============meter reading====================//
  getSaveMeterReading(meter:any){
    return this.http.post(environment.apiUrl+'/CenterBillPrepared/SaveMeterReading',meter)
  }
  //Individual Receipt Entry
  getBillPreparedListForIndividualReceiptEntry(indReceipt:any){
    return this.http.post(environment.apiUrl+'/centerBillPrepared/getBillPreparedListForIndividualReceiptEntry',indReceipt)
  }

  saveIndividualReceiptEntry(receipt:any){
    return this.http.post(environment.apiUrl +'/centerBillPrepared/saveIndividualReceiptEntry',receipt)
      }
        //All  Receipt Entry
   getBillPreparedListForAllReceiptEntry(indReceipt:any){
    return this.http.post(environment.apiUrl+'/centerBillPrepared/getBillPreparedListForAllReceiptEntry',indReceipt)
  }
  getBillPreparedReceiptListForEdit(moduleId:number,compId: number,TransId:number) {
    return this.http.get(environment.apiUrl + `/centerBillPrepared/getCenterBillPreparedReceiptEntryForEdit/${moduleId}/${compId}/${TransId}`)
  }
}
