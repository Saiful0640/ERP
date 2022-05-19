import { TransDetailsModel } from "./trans-details-model";

export class TransMasterModel {
	id  : number;
	transId  : number;
	partyId : number;
	voucherNo  : number;
	voucherDate   : string;
	voucherType   : string;
	refAccountId  : number;
	transType  : number;
	totalAmount  : number;
	refNo  : string;
	narration  : string;
	bankBranch  : string;
	chequeNo  : string;
	chequeDate  : string;
	userId  : number;
	netPayable  : number;
	branchId  : number;
	compId  : number;
	conRate  : number;
	yearID : number;
    lcType:number;
	transDetails:TransDetailsModel[];
	transMaster:TransMasterModel[];
	accountName:string;
	formatVoucherNo:string;
	financialYearID:number;
	debit: number;
	credit: number;
	balance:number;
	moduleID:number;
	isFc:number;
	isCostCenter:number;
	fromDate:string;
	//fromDate:any;
	toDate:string;
	//toDate:any;
	isSubledger:number;
	isBillByBill:number;
	isCostCeneter:number;
	approveStatus:number;
  tripID:number;
  payMode:number;
  billTo:string;
  appType:number

}
