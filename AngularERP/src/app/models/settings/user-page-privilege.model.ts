export class UserPagePrivilegeModel{
  id:number;
  userId:number;
  pageId:number;
  name:string;
  pageRoutePath:string;
  isAssigned:boolean;
  createable:boolean;
  editable:boolean;
  deleteable:boolean;
  compId:number;
  assignedBy:number;
  serialNo:number;
}
