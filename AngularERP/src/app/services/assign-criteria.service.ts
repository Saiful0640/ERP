import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AssignCriteriaService {

  constructor(private http:HttpClient) { }
  assignCriteriaByMemberId(assignedCriteria) {
    return this.http.post(environment.apiUrl + '/assignCriteria/assignCriteriaByMemberID', assignedCriteria);
  }
  //Spring Boot
  assignCriteriaByMemberIdNew(assignedCriteria) {
    return this.http.post(environment.apiUrl + '/payroll/SaveAssignCriteria', assignedCriteria);
  }
  assignMarketingCriteriaByEmployee(assignedCriteria) {
    return this.http.post(environment.apiUrl + '/assignCriteria/AssignMarketingCriteriaByEmployee', assignedCriteria);
  }
  getAssignedCriteria( compId: number,moduleId:number) {
    return this.http.get(environment.apiUrl + `/assignCriteria/getAssignedCriteriaByMember/${compId}/${moduleId}`)
  }
  getAssignedCriteriaAndPartyByDetailsId(compId: number,moduleId:number,detailsId:number) {
    return this.http.get(environment.apiUrl + `/assignCriteria/getAssignedCriteriaAndPartyByDetailsId/${compId}/${moduleId}/${detailsId}`)
  }
  getIndividualAssignCriteria(assignedCriteria:any) {
    return this.http.post(environment.apiUrl + '/assignCriteria/getIndividualAssignedCriteria', assignedCriteria);
  }
  //Spring boot
  getIndividualAssignCriteriaNew(ModuleID:number,DetailsID:number,MemberID:number) {
    return this.http.get(environment.apiUrl +'/payroll/UspGetIndividualsignCriteria/'+ModuleID+'/'+DetailsID+'/'+MemberID);
  }
  assignMarketingInactive(detailsID:number,memberID:number,moduleID:number,compID:number,isActive:number,activeDate:string){
    var param=new HttpParams()
    .set('DetailsID',detailsID.toString())
    .set('MemberID',memberID.toString())
    .set('ModuleID',moduleID.toString())
    .set('CompID',compID.toString())
    .set('IsActive',isActive.toString())
    .set('ActiveDate',activeDate)
    return this.http.get(environment.apiUrl+'/assignCriteria/assignMarketingInactive',{params:param})
  }
}
