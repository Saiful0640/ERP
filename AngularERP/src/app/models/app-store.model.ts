import { UserPagePrivilegeModel } from "./settings/user-page-privilege.model";
import { StoreStartAndEndDate } from "./store-start-and-end-date";

export class AppStore{
  clientId:number;
  companyId:number;
  branchId:number;
  userId:number;
  empId:number;
  userTypeId:number;
  userRoleId:number;
  companyType:number;
  roleName:string;
  empCode:string;
  empName:string;
  token:string;
  clientName:string;
  tempVal:any;
  isRemembered:boolean;
  userName:string;
  compName:string;
  password:string;
  currentModuleId:number;
  currentPageId:number;
  currentPageAuthInfo:UserPagePrivilegeModel;
  storedStartAndEndDate:StoreStartAndEndDate;

  SaleInvoiceSearchDateNgb:any;
  SaleInvoiceSearchDate:any;
}
