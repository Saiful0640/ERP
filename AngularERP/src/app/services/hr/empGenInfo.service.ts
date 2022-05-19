import { EmpSearchModel } from './../../models/hr/empSearch.model';
import { FamilyInfoModel } from './../../models/hr/familyInfo.model';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable({
    providedIn: 'root'
  })
  export class EmpGenInfoService {

    constructor(private http: HttpClient) { }

    getAllRelationship(){
      return this.http.get(environment.apiUrl+'/EmpGenInfo/getAllRelationship')
    }
    getAllOccupation(){
      return this.http.get(environment.apiUrl+'/EmpGenInfo/getAllOccupation')
    }
    getAllNationality(){
      return this.http.get(environment.apiUrl+'/EmpGenInfo/getAllNationality')
    }
    saveEmpGenInfo(EmpGenInfo) {
        return this.http.post(environment.apiUrl + '/HR/SaveEmpGenInfo', EmpGenInfo)
      }
      saveFamilyInfo(EmpFamilyInfo){
      return this.http.post(environment.apiUrl+'/EmpGenInfo/SaveFamilyMemberInfo',EmpFamilyInfo)
      }
      updateFamilyInfo(EmpFamilyInfo){
        return this.http.put(environment.apiUrl+'/EmpGenInfo/updateFamilyMemberInfo',EmpFamilyInfo)
        }
      saveUpdateEmploymentInfo(employmentInfo:any){
        return this.http.post(environment.apiUrl+'/EmpInfo/SaveEmploymentInfo', employmentInfo)
      }
      getAllFamilyMemberByMemberCode(memberCode:string){       
        return this.http.get(environment.apiUrl+'/EmpGenInfo/GetAllFamilyInfoByMemberCode/'+memberCode)
      }

      familyMembergetById(id:number){
        return this.http.get(environment.apiUrl+'/EmpGenInfo/getOneFamilyMemberInfo/'+id)
      }
      deleteFamilyMember(id:number){
        var param=new HttpParams()
        .set('id',id.toString())
        return this.http.delete(environment.apiUrl+'/EmpGenInfo/deleteById/',{params:param})
      }
      getMemberCodename(memberCode:string){
      var param=new HttpParams()
      .set('MemberCode',memberCode)
      return this.http.get(environment.apiUrl+'/EmpGenInfo/getMemberCodeName',{params:param})
      }
      getAllEmpType(){
        return this.http.get(environment.apiUrl+'/BasicEnty/getAllEmpType')
      }
      getAllActionType(){
        return this.http.get(environment.apiUrl+'/BasicEnty/getAllActionType')
      }
      getEmploymentInfoByMemberCode(memberCode:string,moduleId:number,compId:number){
        var param=new HttpParams()
        .set('memberCode',memberCode)
        .set('moduleId',moduleId.toString())
        .set('compId',compId.toString())
        return this.http.get(environment.apiUrl+'/EmpGenInfo/employmentInfoByMemberCode',{params:param})
      }
      getEmploymentInfoByMemberCodeNew(memberCode:string){

        return this.http.get(environment.apiUrl+'/EmpInfo/getAllEmployeementInfoByMemberCode/'+memberCode)
      }
      empSearch(EmpSearchModel:EmpSearchModel){
         return this.http.post(environment.apiUrl+'/SearchMember/SearchEmployee',EmpSearchModel)
      }

  }
