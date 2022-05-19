import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";
import {AccountChart} from '../../models/accounting/basic-entry/bank/AccountChart'

@Injectable({
  providedIn: 'root'
})
export class AccountChartService {

  constructor(private http:HttpClient) { }

  saveAccChart(acctchart:AccountChart){
    console.log(acctchart);
    return this.http.post(environment.apiUrl+'/accountchart/saveAccountChart',acctchart);
 }
 getAllBranchName(){

  return this.http.get(environment.apiUrl+'/accountchart/getAllBranch');

}
getAllCurrencies(){
  return this.http.get(environment.apiUrl+'/accountchart/getAllCurrencyList');
}

//.................
getAllGroupAccount(){
  //return this.http.get(environment.apiUrl+'/basicEntry/getAllGroupAccount/compID/'+compId+'/lwGID/'+lowerGroupID);
  return this.http.get(environment.apiUrl+'/accountchart/getAllGroupAccount');
}
getAllAccountChart(){
//  return this.http.get(environment.apiUrl+'/basicEntry/getAllAccountChart/compId/'+compId +'/recivablepayble/'+recivablepayble+'/branchID/'+branchID);
  return this.http.get(environment.apiUrl+'/accountchart/getAllAccountChart');
 }
 updateAccChart(accountchart: AccountChart){
   return this.http.put(environment.apiUrl+'/accountchart/updateAccountChart', accountchart);
 }
 //compId:number,recivablepayble:number,branchID:number
///Transaction Service


}
