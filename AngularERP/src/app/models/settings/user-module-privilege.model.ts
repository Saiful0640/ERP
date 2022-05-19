import { UserPagePrivilegeModel } from "./user-page-privilege.model";

export class UserModulePrivilegeModel{
  id:number;
  moduleId:number;
  name:string;
  moduleRoutePath:string;
  parentModuleId:number;
  isAssigned:boolean;
  isParent:boolean;
  compId:number;
  serialNo:number;
  subModules:UserModulePrivilegeModel[];
  pages:UserPagePrivilegeModel[];
}
