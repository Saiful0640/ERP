import { TransBillByBillModel } from "./trans-bill-by-bill-model";

export class TransDetailsModel {
     id : number;
     accountId : number;
     accountName : string;
     amount : number;
     taxId : number;
     isAdditional : number;
     specificChequeNo : number;
     lcDetailsID :number;
     quantity:number;
     lcNumber :string;
     abpNumber : string;
     debit: number;
     credit: number;
     subItem:any[];
     costCenItem:any[];
     billbyBillItem:TransBillByBillModel[];
     subledgerId : number;
     detailsID : number;
     invoiceNo:any[];
     conRate:number;
     fcAmount:number;
    isFc:number;
    subSubID:number;

}
