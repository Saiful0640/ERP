import { ProvisionCollectionModel } from './../../models/accounting/transaction/provision-collection-model';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Voucher } from '../../models/accounting/transaction/voucher.model';
import { ReturnStatement } from '@angular/compiler';
import { TransMasterModel } from '../../models/accounting/transaction/trans-master-model';
import { map } from 'rxjs/operators';
import { url } from 'inspector';
import { TransactionMasterAcc } from '../../models/accounting/transaction/transaction-master-acc.model';
import { TransactionDetailsAcc } from '../../models/accounting/transaction/transaction-details-acc.model';
import { TransactionSubledger } from '../../models/accounting/transaction/transaction-subledger.model';
import { TransactionCostcenter } from '../../models/accounting/transaction/transaction-costcenter.model';
@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  constructor(
    private http:HttpClient
  ) { }

  //////////////// Cash Transaction Voucher//////////////
  // getAllVoucherType(){
  //   return this.http.get(environment.apiUrl+"/transaction/getAllVoucherType");
  // }
  getAllCashVoucherType(voucherName:string,compId:number){
    return this.http.get(environment.apiUrl+"/transaction/getAllCashVoucherType/voucherName/"+voucherName+"/compId/"+compId);
  }

  getVoucherNo(voucherType:string,voucherDate:any,compId:number){
     const paramObj = new HttpParams()
     .set('voucherType', voucherType)
     .set('voucherDate', voucherDate)
     .set('compID', compId.toString())
    return this.http.get(environment.apiUrl+'/transaction/getVoucherNo', {params:paramObj} );
   }
  ////////Get all transactionList//
  getTransactionList(voucherType:string,fromDate:any,toDate:any, compId:number,branchId:number){
    const paramObj = new HttpParams()
    .set('voucherType', voucherType)
    .set('fromDate', fromDate)
    .set('toDate',toDate)
    .set('compID', compId.toString())
    .set('branchId',branchId.toString())
   return this.http.get(environment.apiUrl+'/transaction/getTransactionList', {params:paramObj} );
  }


  getTransactionListForBusBd(voucherType:string,fromDate:any,toDate:any, compId:number){
    const paramObj = new HttpParams()
    .set('voucherType', voucherType)
    .set('fromDate', fromDate)
    .set('toDate',toDate)
    .set('compID', compId.toString())
   return this.http.get(environment.apiUrl+'/transaction/GetTransactionListForBusBD', {params:paramObj} );
  }
  getTransactionListForBusBdApproved(voucherType:string,fromDate:any,toDate:any, compId:number, appType:number){
    const paramObj = new HttpParams()
    .set('voucherType', voucherType)
    .set('fromDate', fromDate)
    .set('toDate',toDate)
    .set('compID', compId.toString())
    .set('appType',appType.toString())
   return this.http.get(environment.apiUrl+'/transaction/GetTransactionListForBusBDApproved', {params:paramObj} );
  }

 

  getTransMasterListByTransID(compId:number,transID?:number){
    return this.http.get(environment.apiUrl +'/transaction/getAllTransMasterAccByTransId/compId/'+compId+'/TransId/'+transID )
  }
  ///Get TransactionList By TransId
  getTransactionListByTransID(transID:number,branchId:number,compId:number){
    return this.http.get(environment.apiUrl +'/transaction/getTransactionListByTransID/transID/'+transID+'/branchId/'+branchId+'/compId/'+compId )
  }
  getTransDetailsLisByTransIdForUniversal(transID:number,compId:number){
    return this.http.get(environment.apiUrl +'/transaction/GetTransDetailsLisByTransIdForUniversal/transID/'+transID+'/compId/'+compId )
  }

   getCashTransactionBalance(lowergroupId:number,accountId:number,compId:number){
    return this.http.get(environment.apiUrl+'/transaction/getCashTransactionBalance/lowerGID/'+lowergroupId+'/accountId/'+accountId+'/compID/'+ compId );
   }
   getSubLedgerAndAccountName(compId:number,accountID?:number){
    return this.http.get(environment.apiUrl+'/transaction/getAllCashTransactionAccountName/compId/'+compId+'/accountId/'+accountID );
   }
   saveCashTransaction(cashTrans:TransMasterModel){
    return this.http.post(environment.apiUrl+'/transaction/saveCashTransaction',cashTrans );
   }
////for Spring boot
   saveTransMasterAcc(cashTrans:TransactionMasterAcc){
    return this.http.post(environment.apiUrl+'/basicEntry/SaveTransMasterAcc',cashTrans );
   }
   ////for Spring boot
   saveTransDetailsAcc(transDetails:TransactionDetailsAcc){
    return this.http.post(environment.apiUrl+'/transDetail/SaveTransDetailAcc',transDetails );
   }
    ////for Spring boot
   saveTransSubledger(transSubledger:TransactionSubledger){
    return this.http.post(environment.apiUrl+'/basicEntry/SaveTransSubledger',transSubledger );
   }
 ////for Spring boot
   saveTransCostCenter(transCostCenter:TransactionCostcenter){
    return this.http.post(environment.apiUrl+'/basicEntry/SaveTransCostCenter',transCostCenter );
   }

///Bank Transaction
    getChequeNo(accountId:number,companyId:number){
      return this.http.get(environment.apiUrl+'/transaction/getChequeNo/accountId/'+accountId+'/companyId/'+companyId);

    }
    //for Spring Boot
    getChequeNoNew(){
      return this.http.get(environment.apiUrl+'/basicEntry/getAllChequeBook');
    }
    saveBankTransaction(bankTrans:TransMasterModel){
      return this.http.post(environment.apiUrl+'/transaction/saveBankTransaction',bankTrans );
     }
//JournalEntry
saveJournalEntry(jrnal:TransMasterModel){
  return this.http.post(environment.apiUrl+'/transaction/saveJournalEntry',jrnal );
 }
 getJournalListByTransID(transID:number,branchId:number,compId:number){
  return this.http.get(environment.apiUrl +'/transaction/getJournalListByTransID/transID/'+transID+'/branchId/'+branchId+'/compId/'+compId )
}
  ///ReceiptEntry
  getBillByBillForPayment(partyType:number,partyId:number,compId:number){
    return this.http.get(environment.apiUrl +'/transaction/getBillByBillForPayment/partyType/'+partyType+'/partyId/'+partyId+'/compId/'+compId ).pipe(
      map((items:any[])=>{
        let values:any[]=[];
        items.forEach(item=>{
          values.push({
            ...item,
            formatInvoiceNo: 'Invoice# '+item.voucherNo.toString()
          })
        })
        return values;
      })
    )

  }
  saveReceiptTransaction(receiptTrans:TransMasterModel){
    return this.http.post(environment.apiUrl+'/transaction/saveReceiptTransaction',receiptTrans );
   }


   ///Delete Or Alter Bill/VoucherNo
   deleteTransactionByTransId(object){
    return this.http.post(environment.apiUrl+'/transaction/deleteTransactionByTransId',object );
   }
   alterTransactionVoucherNo(object){
    return this.http.post(environment.apiUrl+'/transaction/alterTransactionVoucherNo',object );
   }


   //PaymentEntry
   getOtherRefListForChequePrint(companyId:number){
    return this.http.get(environment.apiUrl+'/transaction/getOtherRefListForChequeToPrint/'+companyId);
  }
  savePaymentAndReceiveTransaction(payment){
    return this.http.post(environment.apiUrl+'/transaction/savePaymentAndReceiveTransaction',payment );
   }
   saveUniversalVoucherEntry(unVoucher){
    return this.http.post(environment.apiUrl+'/transaction/saveUniversalVoucherEntry',unVoucher );
   }
 //SearchTransactionList
 searchTransactionList(searchParam){
  return this.http.post(environment.apiUrl+'/transaction/searchTransactionList',searchParam );
 }
 getPaymentOrReceiptListByTransId(transID:number,companyId:number){
  return this.http.get(environment.apiUrl+'/transaction/GetPaymentOrReceiptListByTransId/transID/'+transID+'/compId/'+companyId);
}
 getProvisionDueCollection(comId:number,paytype:number,id:number=0){
  return this.http.get(environment.apiUrl+'/transaction/getCollection/comId/'+comId+'/paytype/'+paytype+'/id/'+id);
}
/* getProvisionDueCollection(){
  return this.http.get(environment.apiUrl+'/transaction/getCollection');
} */
postProvisionDueCollection(collect:ProvisionCollectionModel){
  return this.http.post(environment.apiUrl+'/transaction/saveCollection',collect);
}

// Asset Blocking
alterTaransactionBlocking(object)
{
  return this.http.post(environment.apiUrl +'/transaction/AlterTransactionBlocking', object)
}
alterTrnasUnblocking(object)
{
  return this.http.post(environment.apiUrl +'/transaction/AlterTransactionUnBlocking', object)
}

//////BusBD
getRegistrationNo(compId:number){
  return this.http.get(environment.apiUrl+'/transaction/getRegistrationNo/'+compId);
}
GetBusCoach(){
  return this.http.get(environment.apiUrl+'/transaction/getBusCoach/');
}
getAllCounter(compId:number){
  return this.http.get(environment.apiUrl+'/transaction/getAllCounter/'+compId);
}
getAllCoach(compId:number){
  return this.http.get(environment.apiUrl+'/transaction/getAllCoach/'+compId);
}
getAllRoute(compId:number){
  return this.http.get(environment.apiUrl+'/transaction/getAllRoute/'+compId);
}
getTripNo(compId:number,busId:number){
  return this.http.get(environment.apiUrl+`/transaction/getTripNo/${compId}/${busId}`);
}
getSchedule(schuduleDate:any,registrationNo:string){
  return this.http.get(environment.apiUrl+`/transaction/getSchedule/${schuduleDate}/${registrationNo}`);
}
getSales(schuduleDate:any,registrationNo:string,scheduleName:string){
  return this.http.get(environment.apiUrl+`/transaction/getSales/${schuduleDate}/${registrationNo}/${scheduleName}`);
}
getBusRegistrationAndSchudule(registrationNo:string,scheduleDate:string,compId:number){
  return this.http.get(environment.apiUrl+`/transaction/getBusRegistrationAndSchedule/${registrationNo}/${scheduleDate}/${compId}`);
}
getBusRegistrationAndSchuduleByTripId(compId:number,tripId:number,busId:number){
  return this.http.get(environment.apiUrl+`/transaction/getBusRegistrationAndScheduleByTripId/${compId}/${tripId}/${busId}`);
}
getBusScheduleTransactionListByTransId(compId:number,tripId:number){
  return this.http.get(environment.apiUrl+`/transaction/getBusScheduleTransactionListByTransId/${compId}/${tripId}`);
}

getBusRegistrationAndSchuduleList(compId:number){
  return this.http.get(environment.apiUrl+`/transaction/getBusRegistrationAndScheduleList/${compId}`);
}
saveBusRegistrationAndSchedule(busReg){
  return  this.http.post(environment.apiUrl+'/transaction/saveRegAndSchedule',busReg)
 }
 deleteBusRegistrationAndSchedule(busReg){
  return  this.http.post(environment.apiUrl+'/transaction/deleteRegAndSchedule',busReg)
 }
 saveCounter(scheduleDate:string,compId:number){
  return  this.http.get(environment.apiUrl+`/transaction/SaveCounter/${scheduleDate}/${compId}`)
 }
saveBusBDTransaction(busBdTrans){
  return this.http.post(environment.apiUrl+'/transaction/saveBusBDTransaction',busBdTrans );
 }
 getScheduleAndRegistrations(compId:number){
  return this.http.get(environment.apiUrl+`/transaction/getScheduleAndRegistrations/${compId}`);
 }
 getScheduleAndRegistrationsForDelete(compId:number){
  return this.http.get(environment.apiUrl+`/transaction/GetScheduleAndRegistrationsForDelete/${compId}`);
 }
 getEmploymentByDesignation(compId:number,emplyeeType:number){
  return this.http.get(environment.apiUrl+`/transaction/getEmploymentByDesignation/${compId}/${emplyeeType}`);
 }
 deleteScheduleSetupByID(id:number){
  return this.http.get(environment.apiUrl+'/transaction/deleteScheduleSetupByID/'+id);
}

 /// for String Boot
 getAllTransactionDetails(){
  return this.http.get(environment.apiUrl+'/transDetail/getAllTransDetailAcc');
}
 /// for String Boot
getAllTransactionMaster(){
  return this.http.get(environment.apiUrl+'/basicEntry/getAllTransMasterAcc');
}


}
