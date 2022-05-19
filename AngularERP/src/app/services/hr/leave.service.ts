import { environment } from './../../../environments/environment';
import { leaveEntryModel } from './../../models/hr/leaveEntry.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { LeaveType } from '../../models/hr/leavetype.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  constructor(
    private http: HttpClient
  ) { }

  saveLeaveType(lvType: LeaveType) {
    return this.http.post(environment.apiUrl + '/leaveType/SaveLeaveType', lvType);
  }
  updateLeaveType(lvType: LeaveType) {
    return this.http.put(environment.apiUrl + '/leaveType/updateLeaveType', lvType);
  }
  getAllLeaveTypeByGrade( ){
    return this.http.get(environment.apiUrl + '/leaveType/getAllLeaveType')
  }

  getLeaveTypeById(id: number) {   
    return this.http.get(environment.apiUrl + '/leaveType/getOneLeaveType/'+id)
  }
  deleteById(id: number) {
    var param = new HttpParams()
      .set("id", id.toString())
    return this.http.delete(environment.apiUrl + '/LeaveType/deleteLeaveById', { params: param })

  }

  //*********************Leave Entry********* */

  saveLeaveEntry(lvEnrty: leaveEntryModel) {
    return this.http.post(environment.apiUrl + '/basicEntry/SaveLeaveEntry', lvEnrty);
  }
  updateLeaveEntry(lvEnrty: leaveEntryModel) {
    return this.http.put(environment.apiUrl + '/basicEntry/updateLeaveEntry', lvEnrty);
  }
  getAllLeaveEntry( memberCode: string) {    
    return this.http.get(environment.apiUrl + '/LeaveEntry/GetLeaveInformationByMemberCode/'+memberCode)
  }
  getLeaveTypeByMemberCode(memberCode: string) {
       return this.http.get(environment.apiUrl + '/LeaveEntry/getAllLeaveByGender/'+memberCode)
  }
  getLeaveBalenceByMemberCode(memberCode: string, year: string) {
    return this.http.get(environment.apiUrl + '/LeaveEntry/GetLeaveBalanceByMemberCode/membercode/'+memberCode+'/leaveyear/'+year)
  }
  getLeaveByID(id: number) {
    return this.http.get(environment.apiUrl + '/basicEntry/getOneLeaveEntry/'+id)
  }


   getLeaveCategory(){
    return this.http.get(environment.apiUrl+'/leaveType/getAllLeaveSubCategory');
   }
   saveLeaveSubnCategory(levsubcat: any) {
    return this.http.post(environment.apiUrl + '/leaveType/SaveLeaveSubCategory', levsubcat);
  }
  updateLeaveSubnCategory(levsubcat: any) {
    return this.http.put(environment.apiUrl + '/leaveType/updateLeaveSubCategory', levsubcat);
  }
  getAllLeaveTypes(comId:number,moduleId?:number){
    return this.http.get(environment.apiUrl+'/leaveType/getAllLeaveTypes/compId/'+comId+'/moduleId/'+moduleId);
   }
   getLeaveSubCategoryById(id: number) {
    // var param = new HttpParams()
    //   .set("id", id.toString())
    return this.http.get(environment.apiUrl + '/leaveType/getOneLeaveSubCategory/'+id)
  }

}
