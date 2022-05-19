export class TransBillByBillModel {
      id   :number;
	  transId :number;
	  accountId :number;
	  voucherTyp :string;
	  billDate :string;
	  billNo :number;
	  amount :number;
	  branchId :number;
	  compId :number;
	  appliedMode  :number;
	  billType :string;
	  voucherNo  : number;
	  formatInvoiceNo:string;
	  totalAmount  : number;
	  billTransId:number;
	  billByBillitem:TransBillByBillModel[];
    billTo:string;
    billContactNo:string
}
