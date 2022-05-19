import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { MemberPersonalInfo } from '../models/member-personal-info';


@Injectable({
  providedIn: 'root'
})
export class MemberPersonalInfoService {

  constructor(private http:HttpClient) { }
  saveMemberInfo(memInfo:MemberPersonalInfo){
    return this.http.post(environment.apiUrl+'/employeeGeneral/saveempGenInfo',memInfo);
   }
   updateMemberInfo(memInfo:MemberPersonalInfo){
    return this.http.put(environment.apiUrl+'/employeeGeneral/updateempGenInfo',memInfo);
   }
  getAllMemberInfo(comId:number,moduleId?:number){
    return this.http.get(environment.apiUrl+'/employeeGeneral/getAllempGenInfo/ComId/'+comId+'/moduleId/'+moduleId);
   }
   getAllEmployeeInfo(){
    return this.http.get(environment.apiUrl+'/employeeGeneral/getAllempGenInfo');
   }
   getMemberInfoByMemberCode(memberCode:string,comId:number,moduleId:number){
    return this.http.get(environment.apiUrl+'/employeeGeneral/getAllMemberPersonalInfo/MemberCode/'+memberCode+'/ComId/'+comId+'/moduleId/'+moduleId);
   }
}
