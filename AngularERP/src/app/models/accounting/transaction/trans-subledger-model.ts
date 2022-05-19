export class TransSubledgerModel {
    id  :number;
	transId  :number;
	accountId  :number;
	subledgerId  :number;
	amount  :number;
	totalAmount:number;
	createdBy :string;
	subledgerItem:TransSubledgerModel[];
}
