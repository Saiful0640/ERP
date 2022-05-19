import { LowerGroupType } from './../../shared/lookup';
import { ChequeBook } from './../../models/accounting/basic-entry/bank/cheque-book.model';
import { CostCenterModel } from './../../models/accounting/basic-entry/chart-of-account/cost-center.model';
import { Subledger } from './../../models/accounting/basic-entry/chart-of-account/subledger.model';
import { AccountGroup } from './../../models/accounting/basic-entry/chart-of-account/account-group/account-group.model';
import { GroupAccountModel } from './../../models/accounting/basic-entry/group-account-model';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { otherReference } from '../../models/accounting/basic-entry/chart-of-account/other-reference-model';
import { AccountChart } from '../../models/accounting/basic-entry/bank/AccountChart';
import { ChequeBookView } from '../../models/accounting/bank/cheque-book-view.model';

@Injectable({
  providedIn: 'root'
})
export class AccountingBasicEntryService {

  constructor(private http:HttpClient) { }


  //======================Chart Of Account===============================//
  /////////////////////////Account Chart Service/////////////////////
getAllHeadGroupName(){
  return this.http.get(environment.apiUrl+'/basicEntry/getAllGroupName');
 }


 getAllAccountChartForBusBd(compId:number){
  return this.http.get(environment.apiUrl+'/transaction/getAccountChartForBusBd/'+compId);
 }
 getOtherReferences(compId:number,groupId:number=0){
  return this.http.get(environment.apiUrl+'/basicEntry/getOtherReferences/compId/'+compId +'/groupId/'+groupId);
 }
 getOtherReferencesIsCheque(compId:number,isCheque:number){
  return this.http.get(environment.apiUrl+'/basicEntry/getOtherReferencesIsCheque/compId/'+compId +'/isCheque/'+isCheque);
 }


  getAccountById(compId:number,accountId:number){
    return this.http.get(environment.apiUrl+'/basicEntry/getAllAcountById/compId/'+compId +'/accountId/'+accountId);
   }
  saveAccountGroup(acctchart:GroupAccountModel){
    return this.http.post(environment.apiUrl+'/basicEntry/saveAccountGroup',acctchart);
 }

  saveAccChart(acctchart:AccountChart){
    return this.http.post(environment.apiUrl+'/basicEntry/saveAccountChart',acctchart);
 }
 saveAccountChartFixedAsset(acctchart:AccountChart){
  return this.http.post(environment.apiUrl+'/basicEntry/saveAccountChartFixedAsset',acctchart);
}

  /////////////////////Account Group//////////////////
//pore delete korbo
  saveAccountLowerGroup(acctGroup:AccountGroup){
    return this.http.post(environment.apiUrl+'/basicEntry/saveAccountLowerGroup',acctGroup);
  }
  creatccountLowerGroup(acctGroup:AccountGroup){
    return this.http.post(environment.apiUrl+'/basicEntry/saveAccountGroup',acctGroup);
  }
  updateccountLowerGroup(acctGroup:AccountGroup){
    return this.http.put(environment.apiUrl+'/basicEntry/updateaccountgroup',acctGroup);
  }

  getAllAccountGroup(compId:number,midGroupId:number=0){
    return this.http.get(environment.apiUrl+'/basicEntry/getAllAccountGroup/compId/'+compId+'/midGroupId/'+midGroupId);
  }

  getAccountGroups(){
    return this.http.get(environment.apiUrl+'/basicEntry/allaccountgroup');
  }
  getAllAccountMidGroup(){
    return this.http.get(environment.apiUrl+'/basicEntry/getAllMidGroup');
  }
///////////////////////Subledger//////////////

saveSubledger(subledger:Subledger){
  return this.http.post(environment.apiUrl+'/basicEntry/SaveSubledger',subledger);
}
updateSubledger(subledger:Subledger){
  return this.http.post(environment.apiUrl+'/basicEntry/updateSubledger',subledger);
}
getAllSubledger(compId:number, accountId:number=0){/////not usable method
  return this.http.get(environment.apiUrl+'/basicEntry/getAllSubledger/compId/'+compId+'/accountId/'+accountId);
}
getSubledgers(){
  return this.http.get(environment.apiUrl+'/basicEntry/getAllSubledger');
}
// getAllSubledgerByAccountName(compId:number, accountID:number){
//   return this.http.get(environment.apiUrl+'/basicEntry/getAllSubledgerByAccountID/compId/'+compId+'/accountID/'+accountID);
// }
getAllAccountName(compId:number){
  return this.http.get(environment.apiUrl+'/basicEntry/getAllAccountName/compId/'+compId);
}
getEmployeInfo(compId:number, branchId:number){
  return this.http.get(environment.apiUrl+'/basicEntry/GetEmployeInfo/compId/'+compId+'/branchId/'+branchId);
}
getAllAccountNameForReport(compId:number, id?:number){
  return this.http.get(environment.apiUrl+'/basicEntry/GetAllAccountNameForReport/compId/'+compId+'/id/'+id);
}

/* getAccountNameByTerritoryId(compId:number, type:number,territoryid:number){
  return this.http.get(environment.apiUrl+'/basicEntry/GetAccountNameByTerritoryId/compId/'+compId+'/territoryId/'+territoryid);
} */
///////////////////////Cost Center///////////////
saveCostCenter(costCenter:CostCenterModel){
  return this.http.post(environment.apiUrl+'/basicEntry/SaveCostCenter',costCenter);
}
getListOfCostCenter(compId:number){
  return this.http.get(environment.apiUrl+'/basicEntry/getListCostCenter/'+compId);
}
getListOfCostCenterCashTransaction(moduleId:number,compId:number){
  return this.http.get(environment.apiUrl+'/basicEntry/GetListCostCenterForCashTransaction/moduleId/'+moduleId+'/compId/'+compId);
}
getAllCostCenter(compId:number,id?:number){
  return this.http.get(environment.apiUrl+'/basicEntry/getAllCostCenter/compId/'+compId+'/id/'+id);
}
//==================================Bank Service ==================//
saveChequeBook(chequeBook:ChequeBook, firstPage:number, lastPage:number){
  const paramObj = new HttpParams()
  .set('firstPage', firstPage.toString())
  .set('lastPage', lastPage.toString())
  return this.http.post(environment.apiUrl+'/basicEntry/saveChequeBook',chequeBook, {params:paramObj});
}
//for spring Boot
saveChequeBookNew(chequeBook:ChequeBook){  
  return this.http.post(environment.apiUrl+'/basicEntry/SaveChequeBook',chequeBook);
}
//For Spring boot
updateChequeBookNew(chequeBook:ChequeBookView){
  console.log(chequeBook)
  return this.http.put(environment.apiUrl+'/basicEntry/updateChequeBook',chequeBook);
}
updateChequeBook(chequeBook:ChequeBook){
  return this.http.post(environment.apiUrl+'/basicEntry/saveChequeBook',chequeBook);
}
getBankByLowerGroupID(){
  return this.http.get(environment.apiUrl+'');
}
getAllChequeBook(acoountID:number,compId:number,id:number=0){
  return this.http.get(environment.apiUrl+'/basicEntry/getAllChequeBook/accID/'+acoountID+'/compID/'+compId+'/id/'+id);
}
//for Spring Boot///tt
getAllChequeBookNew(){
  return this.http.get(environment.apiUrl+'/basicEntry/getAllChequeBook');
}
getChequeBookByID(id:number){
  return this.http.get(environment.apiUrl+'');
}

//=====================================Others Reference==============================//
postOtherRef(otherRef:otherReference){
  return this.http.post(environment.apiUrl+'/basicEntry/saveOrUpdateOthers',otherRef);

}

// getlistOfOthersReference(compId:number){
//   return this.http.get(environment.apiUrl+'/basicEntry/GetAllOthersReference'+compId);
// }

/////Bus RegistrationNo From BusBD Url
// getBusRegistrationNo(){
//    return this.http.get(environment.busBDApiUrl);
//  }
getVoucherTypes(){
  return this.http.get(environment.apiUrl+'/basicEntry/GetVoucherTypes');
 }
 saveVoucherType(voucher:any){
   return this.http.post(environment.apiUrl+'/basicEntry/SaveVoucherType',voucher);
 }
 saveBudgetBook(budgetBook:any){
  return this.http.post(environment.apiUrl+'/basicEntry/SaveBudgetBook',budgetBook);
}
updateLowergroutype(type){
  return this.http.post(environment.apiUrl+'/basicEntry/updateLowerGroupType',type);
}

getAllBudgetBook(type:any){
  return this.http.post(environment.apiUrl+'/basicEntry/GetAllBudgetBook',type)
}
getAllBudgetBookById(type:any){
  return this.http.post(environment.apiUrl+'/basicEntry/GetAllBudgetBookById',type)
}
savePostDateChequeRegister(postDateCheque:any){
  return this.http.post(environment.apiUrl+'/basicEntry/SavePostDateChequePayment',postDateCheque);
}
getPostDateChequeRegister(compId:number,appType:number,payMode:number){
  return this.http.get(environment.apiUrl+'/basicEntry/GetPostDateChequePayment/compId/'+compId+'/appType/'+appType+'/payMode/'+payMode);
}
getPostDateChequeRegisterByID(id:number){
  return this.http.get(environment.apiUrl+'/basicEntry/getPostByID/Id/'+id);
}
getPayMode(){
  return this.http.get(environment.apiUrl+'/basicEntry/getPayMode/');
}
saveCheckHonour(id:number,type:number,voucherDate:string){
  var httParam=new HttpParams()
  .append('id',id.toString())
  .append('type',type.toString())
  .append('voucherDate',voucherDate)
  return this.http.get(environment.apiUrl+'/basicEntry/SaveChequeHonour/',{params:httParam});
}
saveBranchChart(chartAcc:any){
  return this.http.post(environment.apiUrl+'/basicEntry/saveBranchChart',chartAcc)
}
getAllBranchChart(compId:number,branchId:number,lowerGroupId:number){
  return this.http.get(environment.apiUrl+'/basicEntry/getBranchChartAcc/compId/'+compId+'/branchId/'+branchId+'/lowerGroupId/'+lowerGroupId)
}
getAllBranchName(branch:any){
  return this.http.post(environment.apiUrl+'/basicEntry/GetAllBranch',branch);
}

}
