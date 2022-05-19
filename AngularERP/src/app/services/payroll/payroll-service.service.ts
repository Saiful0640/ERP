import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PayrollServiceService {

  constructor(private http:HttpClient) { }

  // getMonthlyAttendance(GroupID: number,CompID:number,SectionID:number=0) {
  //   return this.http.get(environment.apiUrl + '/payroll/getAllMonthlyAttendance/GroupID/'+GroupID+'/CompID/'+CompID+'/SectionID/'+SectionID)
  // }
  //spring boot
  saveMonthlyAttendance(monthlyAttedance:any){
    return this.http.post(environment.apiUrl+'/MonthlyAttendance/SaveMonthlyAttendance',monthlyAttedance)
  }
  getSalaryProcessMonthly(PeriodID:number,GroupID:number,SectionID:number,CompID:number) {
    return this.http.get(environment.apiUrl + '/payroll/GetMonthlySalary/PeriodID/'+PeriodID+'/GroupID/'+GroupID+'/SectionID/'+SectionID+'/CompID/'+CompID)
  }
  saveSalaryProcessMonthly(salary:any){
    return this.http.post(environment.apiUrl+'/payroll/SaveMonthlySalary',salary)
  }
  getNameAndCode(comId:number,moduleId?:number){
    return this.http.get(environment.apiUrl+'/payroll/GetNameAndCode/compId/'+comId+'/moduleId/'+moduleId);
   }
   getBonusProcess(comId:number,moduleId:number){
    return this.http.get(environment.apiUrl+'/payroll/getBonusProcess/compId/'+comId+'/moduleId/'+moduleId);
   }
   saveBonusProcess(bonus:any){
    return this.http.post(environment.apiUrl+'/payroll/saveBonusProcess',bonus)
  }
  saveEnrolment(enrolment:any){
    return this.http.post(environment.apiUrl+'/payroll/SaveSalaryStructure',enrolment)
  }
  getEnrolment(memberID:number,compID:number,moduleID:number){
    return this.http.get(environment.apiUrl+'/payroll/GetEnrolmentDetails/memberID/'+memberID+'/compId/'+compID+'/moduleId/'+moduleID);
   }
   ///spring boot
   getMonthlyAttendanceList(periodID:number,groupID:number,sectionID:number) {
    return this.http.get(environment.apiUrl + '/MonthlyAttendance/GetMonthlyAttendence/'+periodID+'/'+groupID+'/'+sectionID)
  }
    //springboot
  getAllEmploymentList(moduleid:number,groupid:number,sectionid:number) {
    return this.http.get(environment.apiUrl +'/MonthlyAttendance/getallemploymentInfoList/'+moduleid+'/'+groupid+'/'+sectionid)
  }
  //springboot
  getMonthlyAttendance(GroupID: number,SectionID:number) {
    return this.http.get(environment.apiUrl + '/payroll/GetMonthlyAttendanceSteel/'+GroupID+'/'+SectionID)
  }
  getMonthlyProcessedSalary(PeriodID:number,GroupID:number,SectionID:number,CompID:number) {
    return this.http.get(environment.apiUrl + '/payroll/GetMonthlyProcessedSalary/PeriodID/'+PeriodID+'/GroupID/'+GroupID+'/SectionID/'+SectionID+'/CompID/'+CompID)
  }
  deleteProcessedSalary(PeriodID:number,GroupID:number,SectionID:number,CompID:number) {
    return this.http.get(environment.apiUrl + '/payroll/DeleteProcessedSalary/PeriodID/'+PeriodID+'/GroupID/'+GroupID+'/SectionID/'+SectionID+'/CompID/'+CompID)
  }

  ////-----------Salary Head Setup

  getAllServiceHeadName(moduleId:number) {
    var param=new HttpParams()
        .set('moduleID',moduleId.toString())
    return this.http.get(environment.apiUrl + '/payroll/GetAllServiceHeadName/',{params:param})
  }
  getAllSalaryHeadSetting(compId:number) {
    var param=new HttpParams()
        .set('compId',compId.toString())
    return this.http.get(environment.apiUrl + '/payroll/GetAllSalaryHeadSetting/',{params:param})
  }

  salaryHeadSettingSaveUpdate(salaryHead:any){
    return this.http.post(environment.apiUrl+'/payroll/SalaryHeadSettingSaveUpdate',salaryHead)
  }
  salaryHeadSaveUpdate(salaryHead:any){
    return this.http.post(environment.apiUrl+'/payroll/SalaryHeadSaveUpdate',salaryHead)
  }
  getAllSalaryHeadName(moduleId:number) {
    var param=new HttpParams()
        .set('moduleID',moduleId.toString())
    return this.http.get(environment.apiUrl + '/payroll/GetAllSalaryHeadName/',{params:param})
  }
  getAllSalaryHeadNameNew() {
    return this.http.get(environment.apiUrl + '/payroll/GetAllSalaryHeadName')
  }
}
