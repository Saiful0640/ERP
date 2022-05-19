import { ApplicationPageModel } from "./application-page.model";

export class ApplicationModuleModel {
     id : number;
     name : string;
     moduleRoutePath : string;
    parentModuleID : number;
     isParent:number;
     serialNo:number;
     pages : ApplicationPageModel[];
     subModules : ApplicationModuleModel[];
     parentModules : ApplicationModuleModel[];
}
