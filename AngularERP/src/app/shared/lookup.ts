import { AuthService } from "../services/auth.service";

export enum ChallanType {
  Delivery=1,
  Receive=2,
  DeliveryReturn=3,
  ReceiveReturn=4,
  Transfer=5,
  Menufecturing=6,
}
export enum InvoiceType {
  Sales = 7,
  SalesReturn = 8,
  Purchase = 10,
  PurchaseReturn = 11,
}
export enum ProductUnitType {
  Default,
  ChallanUnit,
  BillUnit
}
export enum OrderType {
  Sales = 7,
  Purchase = 10
}
export enum ModuleType {
  Accounting = 1,
  Association =AuthService.CurrentModuleId,
  HRM = 12,
  Tenant = 15,
  Website = 46,
  School = 17
}
export enum OrderStatus {
  Drafted = -1,
  Pending=0,
  Checked=1,
  Verify=2,
  Approved=3,
  Rejected=4

}
export enum PartyType {
  Association = 60,
  Tenant = 61,
  School = 62,
  HRAndPayroll=63
}

export enum LowerGroupType {
  Customer = 3,
  Supplier = 4,
  Bank = 94,
  Assets = 152
}
export enum GroupAccountType {
  Customer = 5,
  Supplier = 1,
}
export enum BuyerSuplierType {
  Buyer = 0,
  Supplier = 1,
  other = 2
}
export enum TransType{
  Sales = 1,
  Purchase = 2,
  SalesReturn  =3,
  PurchaseReturn = 4,
  CashTransaction=11,
  BankTransaction=12,
  Adjustment=13,
  ExportLCVoucher=14,
  PaymentAndReceiptTransactionEntry=15,
  AssociationRecieptEntry = 21,
  PaymentEntry = 22,
  AssociationBillProcess = 20,
  TenantBillProcess = 23,
  TenantReceiptEntry = 24,
  SchoolBillProcess = 25,
  UniversalVoucherEntry = 26,
  BusBDTransaction=27,
  TripAdjustEntry=28
}
export enum UserType{
  SuperAdmin=1,
  ClientAdmin,
  Manager,
  User
}
export enum ReportLedgerType{
  Ledger=1,
  SubledgerLedger,
  CostCenterLedger,FC
}
export enum ProvisionType{

  ProvissionCollectionComponent = 1,
  ProvisionPayCollectionComponent = -1
}

export enum AccDashboardRptType{
  AssetsVSLiability=1,
  IncomeVSExpendeture
}

export enum DuesPayReceive{

receivable=2,
payble=1
}

export enum DuesPayType{
  DuesMonitoringComponent=1,
  DuesReceivableMonitorComponent=2
}

export enum PaymentType{
  Due=0,
  MobileBanking=4,
  Cash = 5,
  Cheque = 6,
  Card = 27,
  Installment = 28
}
