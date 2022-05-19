export class ReceiptAndPaymentModel {
    id :number;
    transId :number;
    partyId :number;
    voucherNo :number;
    voucherDate :string;
    voucherType :string;
    refAccountId :number;
    transType :number;
    totalAmount :number;
    refNo :string;
    narration :string;
    bankBranch :string;
    chequeNo :string;
    chequeDate :string;
    userId :number;
    netPayable :number;
    branchId :number;
    compId :number;
    conRate :number;
    yearID :number;
    formatVoucherNo :string;
    accountName :string;
    debit :number;
    dredit :number;
    balance :number;
    moduleID :number;
    isFc :number;
    isCostCenter :number;
    fromDate :string;
    toDate :string;
  //DetailsPart
    accountId :number;
    amount :number;
    taxId :number;
    isAdditional :number;
    specificChequeNo :number;
    lcDetailsID :number;
    lcNumber :string;
    AabpNumber :string;
    fcAmount :number;
    subItem :any[];
    costCenItem :any[];
    billbyBillItem :any[];
    invoiceNo :number;
}
