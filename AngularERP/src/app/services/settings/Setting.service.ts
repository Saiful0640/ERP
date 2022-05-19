import { Module } from './../../models/settings/app-settings/app-module.model';
import { User } from '../../models/settings/user.model';
import { EmployeeCode } from '../../models/settings/employee-code.model';
import { Role } from '../../models/settings/role.model';
import { Company } from '../../models/settings/company.model';
import { Branch } from '../../models/settings/branch.model';
import { YearModel } from '../../models/settings/year/year.model';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { PeriodModel } from '../../models/hr/period.model';
import { UserType } from '../../shared/lookup';
import { environment } from '../../../environments/environment';
import { SettingParameterValueModal } from '../../models/settings/setting-parameter-value-modal.model';
import { Financialyear } from '../../models/settings/financialyear.modal';
import { BillingAccounts } from '../../models/settings/billing-accounts.model';
import { ImportFile } from '../../models/settings/import-file';
import { url } from 'inspector';
import { AssignModule } from '../../home/settings/assign/assign.module';

@Injectable({
  providedIn: 'root'
})
export class SettingService {

  constructor(
    private http: HttpClient
  ) { }
  /*Basic Item get(Gender,BloodGroup,MaritialStatus)*/
  getAllBasicItem(tableName: string) {
    return this.http.get(environment.apiUrl + '/settings/GetAllBasicItems' )
  }
  getAllGender() {
    return this.http.get(environment.apiUrl + '/settings/getAllGender' )
  }
  getAllBloodGroup() {
    return this.http.get(environment.apiUrl + '/settings/getAllBloodGroup' )
  }
  getAllReligion() {
    return this.http.get(environment.apiUrl + '/settings/getAllReligion' )
  }
  getAllMaritalStatus() {
    return this.http.get(environment.apiUrl + '/settings/getAllMaritalStatus' )
  }
  getAllUpzila(){
    return this.http.get(environment.apiUrl + '/settings/getAllUpzila' )
  }
  /*All Thana list*/
  getAllThanaList() {
    return this.http.get(environment.apiUrl + '/settings/GetThanaallinfo')
  }
  getAllThanaByThanaId(thanaId: number) {
    return this.http.get(environment.apiUrl + '/settings/getThanaByThanaId/' + thanaId)
  }
  /* #region  Year */
  getAllYearType(id: number=0) {
    return this.http.get(environment.apiUrl + '/settings/getAllYearType/' + id)
  }
  getAllYear() {
    return this.http.get(environment.apiUrl + '/settings/getAllYear')
  }
  getAllYearByComp(compId: number) {
    return this.http.get(environment.apiUrl + '/settings/GetAllYearByComp/compId/' + compId)
  }

  saveYear(year: YearModel) {
    return this.http.post(environment.apiUrl + '/settings/saveYear', year)
  }
  updateYear(year: YearModel) {
    return this.http.put(environment.apiUrl + '/settings/updateYear', year)
  }
  /* #endregion */

  /* #region  Branch */
  getAllBranch(compId: number, id: number=-1) {
    return this.http.get(environment.apiUrl + '/settings/getAllBranch/compId/' + compId + '/id/' + id)
  }
  getAllBranchByID(id: number) {
    return this.http.get(environment.apiUrl + '')
  }
  saveBranch(branch: Branch) {
    return this.http.post(environment.apiUrl + '/settings/saveBranch', branch)
  }
  getAllCriteriaType(compId:number,moduleId:number){
    return this.http.get(environment.apiUrl+'/settings/getAllCriteriaType/compId/'+compId+'/moduleId/'+moduleId)
  }
  /* #endregion */

  /* #region  Company */
  getAllBusinessType() {
    return this.http.get(environment.apiUrl + '/settings/getAllBusinessType')
  }
  getAllCompany() {
    return this.http.get(environment.apiUrl + `/settings/getAllCompany`);
  }
  getCompanyById(id:number) {
    return this.http.get(environment.apiUrl + `/settings/getOneCompany/`+id);
  }
  getCompanies(userId:number,userType:UserType,clientId: number) {
    return this.http.get(environment.apiUrl + `/settings/getCompanies/${userId}/${userType}/${clientId}`);
  }

  getCompanyType(){

    return this.http.get(environment.apiUrl+'/settings/getCompanyType/' )
  }
  saveCompany(company: Company) {
    return this.http.post(environment.apiUrl + '/settings/SaveCompany', company)
  }
  updateCompany(company: Company) {
    return this.http.put(environment.apiUrl + '/settings/updateCompany', company)
  }
  getCompIdName(clintId:number,compId:number,branchId:number){
    var param=new HttpParams()
    .set('clintId',clintId.toString())
    .set('compId',compId.toString())
    .set('branchId',branchId.toString())
  return this.http.get(environment.apiUrl+'/Settings/GetCompanyIdName/',{params:param})
  }
  /* #endregion */

  /* #region  User */
  getAllUserType() {
    return this.http.get(environment.apiUrl + '/settings/getAllUserType')
  }

  searchEmployee(empSearchKey: EmployeeCode) {
    return this.http.post(environment.apiUrl + '', empSearchKey);
  }
  getUsers(userType, clientId=-1,compId=-1,userId=-1,status=-1) {
    return this.http.get(environment.apiUrl + `/settings/GetUsers/${userType}/${clientId}/${compId}/${userId}/${status}`)
  }
  getAllUser() {
    return this.http.get(environment.apiUrl + `/settings/getAllUserInfo`)
  }
  saveUser(user: User) {
    return this.http.post(environment.apiUrl + '/settings/saveUserInfo', user)
  }
  updateUser(user: User) {
    return this.http.put(environment.apiUrl + '/settings/updateUserInfo', user)
  }
  saveRole(role){
    return this.http.post(environment.apiUrl + '/userRole/saveUserRole', role)
  }
  updateRole(role){
    return this.http.put(environment.apiUrl + '/userRole/updateUserRole', role)
  }
  getUserRole() {
    return this.http.get(environment.apiUrl + '/userRole/getAllUserRole');
  }
  login(userCredential) {
    return this.http.post(environment.apiUrl +'/settings/Login', userCredential)
  }
  saveUserApprovalLevel(userApprovalLevelObj){
    return this.http.post(environment.apiUrl+'/settings/saveUserApprovalLevel',userApprovalLevelObj);
  }
  getUserApprovalLevel(userId:number, companyId:number,moduleId:number){
    var param=new HttpParams()
    .set('userId',userId.toString())
    .set('companyId',companyId.toString())
    .set('moduleId',moduleId.toString())
    return this.http.get(environment.apiUrl+'/settings/getUserApprovalLevel',{params:param});
  }
  /* #endregion */

  /* #region  App Settings */
  saveAppModule(module:Module) {
    return this.http.post(environment.apiUrl + '/settings/SaveModules', module);
  }
  updateAppModule(module:Module) {
    return this.http.put(environment.apiUrl + '/settings/updateModules', module);
  }
  getApprovalLevelforrequsition(module) {
    return this.http.post(environment.apiUrl + '/settings/GetUserApprovalLevelforrequsition', module);
  }
  getAppModule(id: number = 0, loadAsTree = true) {
    return this.http.get(environment.apiUrl + `/settings/GetAppModule/${id}/${loadAsTree}`);
  }
  getAllModule() {
    return this.http.get(environment.apiUrl + `/settings/getAllModules`);
  }
  GetAssignedModule() {
    return this.http.get(environment.apiUrl+'/settings/getAllCompanyModules');
  }
  GetAssignedModuleByClient(compId:number,clientId:number) {
    let paramObj = new HttpParams()
      .set('compId', compId.toString())
      .set('clientId', clientId.toString());
    return this.http.get(environment.apiUrl+'/settings/GetAssignedModuleByClient', { params: paramObj });
  }
  getAppModuleByParentId(parentModuleId?: number) {
    return this.http.get(environment.apiUrl + '/settings/GetAppModuleByParentID/' + parentModuleId);
  }
  deleteAppModule(id: number) {
    return this.http.delete(environment.apiUrl + '/settings/DeleteModule' + id);
  }
  saveAppPage(page) {
    return this.http.post(environment.apiUrl + '/settings/SaveorUpdateAppPage', page);
  }
  getAppPage(id: number = 0) {
    return this.http.get(environment.apiUrl + '/settings/GetAppPage/' + id);
  }
  deleteAppPage(id: number) {
    return this.http.delete(environment.apiUrl + '/settings/DeletePage/' + id);
  }
  /* #endregion */

  /* #region  Assign */
  assignCompany(assignedCompany) {
    return this.http.post(environment.apiUrl + '/settings/AssignCompany', assignedCompany);
  }
  assignBranch(assignedBranch) {
    return this.http.post(environment.apiUrl + '/settings/AssignBranch', assignedBranch);
  }
  assignModule(companyModules: AssignModule) {
    console.log(companyModules)
    return this.http.post(environment.apiUrl + '/settings/SaveCompanyModules', companyModules);
  }
  assignPage(requestParam) {
    return this.http.post(environment.apiUrl + '/settings/AssignPage', requestParam);
  }
  getAssignedCompaniesForEdit(userId: number) {
    return this.http.get(environment.apiUrl + `/settings/GetAssignedCompaniesForEdit/${userId}`)
  }
  getAssignedBranchesForEdit(userId: number, companyId: number) {
    return this.http.get(environment.apiUrl + `/settings/GetAssignedBranchesForEdit/${userId}/${companyId}`)
  }
  getAssignedBranches(userId: number, companyId: number) {
    return this.http.get(environment.apiUrl + `/settings/GetAssignedBranches/${userId}/${companyId}`)
  }
  getModulesWithUserPrivilege(userId: number, companyId: number, moduleId = -1) {
    return this.http.get(environment.apiUrl + `/settings/GetModulesWithUserPrivilege/${userId}/${companyId}/${moduleId}`)
  }
  getPageAuthInfo(userId,pageId){
    return this.http.get(environment.apiUrl + `/settings/GetPageAuthInfo/${userId}/${pageId}`)
  }
  getModuleAuthInfo(compId,moduleId){
    return this.http.get(environment.apiUrl +`/settings/GetModuleAuthInfo/${compId}/${moduleId}`)
  }

  backupDatabase() {
    return this.http.get(environment.apiUrl + '/settings/backupDb');
  }

  downloadBackupFile(filePath) {
    return this.http.get(environment.apiUrl + `/settings/GetDbBackupFile/${filePath}`);
  }
  checkTodaysBackup() {
    return this.http.get(environment.apiUrl + '/settings/CheckTodaysBackup');
  }
  /* #endregion */

  /* #region  Year-Month */
  getAllMonth() {
    return this.http.get(environment.apiUrl + '/settings/GetAllMonth')
  }
  getAllYearByType(compId: number, yearType: number) {
    let paramObj = new HttpParams()
      .set('compId', compId.toString())
      .set('yearType', yearType.toString());
    return this.http.get(environment.apiUrl + '/settings/GetAllYearByType/', { params: paramObj })
  }
  getMonthByID(id: number) {
    let paramObj = new HttpParams()
      .set('id', id.toString())
    return this.http.get(environment.apiUrl + '/settings/getMonthByID/', { params: paramObj })
  }
  getYearByID(id: number) {
    let paramObj = new HttpParams()
      .set('id', id.toString())
    return this.http.get(environment.apiUrl + '/settings/getYearByID/', { params: paramObj })
  }
  /* #endregion */

  /* #region  Period */
  // savePeriod(period: PeriodModel) {
  //   return this.http.post(environment.apiUrl + '/BasicEnty/SavePeriod', period)
  // }
  // getAllPeriod(compId: number, moduleId: number) {
  //   let paramObj = new HttpParams()
  //       .set('id',id.toString())
  //   return this.http.get(environment.apiUrl+'/settings/getYearByID/',{params:paramObj})
  //   }
  /* #Period */
  savePeriod(period: PeriodModel) {
    return this.http.post(environment.apiUrl + '/basicEntry/savePeriod', period)
  }
  updatePeriod(period: PeriodModel) {
    return this.http.put(environment.apiUrl + '/basicEntry/updatePeriod', period)
  }
  getAllPeriod(compId: number, moduleId: number) {
    let paramObj = new HttpParams()
      .set('compId', compId.toString())
      .set('moduleId', moduleId.toString())
    return this.http.get(environment.apiUrl + '/BasicEnty/GeAllPeriod', { params: paramObj })
  }
  getAllPeriodNew() {
    return this.http.get(environment.apiUrl +'/basicEntry/getAllPeriod')
  }
  periodGetById(id: number,moduleId: number) {
    let paramObj = new HttpParams()
      .set('id', id.toString())
      .set('moduleId', moduleId.toString())
    return this.http.get(environment.apiUrl + '/BasicEnty/PeriodGetById/', { params: paramObj })
  }
  /*Member  Search */
  getAllMemberByModuleCompany(moduleId: number, compId: number) {
    let paramObj = new HttpParams()
      .set('moduleId', moduleId.toString())
      .set('compId', compId.toString())
    return this.http.get(environment.apiUrl + '/EmpGenInfo/getAllMemberListByModuleCompany/', { params: paramObj })
  }
  employmentGetAllMemberByModuleCompany(moduleId: number, compId: number) {
    let paramObj = new HttpParams()
      .set('moduleId', moduleId.toString())
      .set('compId', compId.toString())
    return this.http.get(environment.apiUrl + '/EmpGenInfo/employmentGetAllMemberListByModuleCompany/', { params: paramObj })
  }
  employmentGetAllMemberListByModuleCompanyy(user){
    return this.http.post(environment.apiUrl +'/EmpGenInfo/employmentGetAllMemberListByModuleCompanyy', user)
  }


  getSettingsDetail(){
   return this.http.get(environment.apiUrl +'/settings/GetAllDetails')
  }

  getSettValue(){
    return this.http.get(environment.apiUrl+'/settings/getSettingValue')
  }
  postSettValue(settingValue:SettingParameterValueModal){
    return this.http.post(environment.apiUrl + '/settings/saveSetValue',settingValue);
  }
  //#region Finanacial Year
  getAllFinancialYear(){
    return this.http.get(environment.apiUrl+'/settings/getAllFinancialYear')
  }
  saveFinancialYear(oyear:Financialyear){
    return this.http.post(environment.apiUrl+'/settings/SaveFinancialYear',oyear)
  }
  updateFinancialYear(oyear:Financialyear){
    return this.http.put(environment.apiUrl+'/settings/updateFinancialYear',oyear)
  }
  //#endregion
  getAllBillingAccounts(compId:number){
    return this.http.get(environment.apiUrl+'/settings/GetAllBillingAccounts/compId/'+compId)
  }

  saveBillingAccounts(billing:BillingAccounts){
    return this.http.post(environment.apiUrl+'/settings/saveBillingAccounts',billing)
  }
  getProductForProduction(categoryId:number,compId:number,categoryProduction:number,thicknes:any){
    let paramObj = new HttpParams()
    .set('CategoryId', categoryId.toString())
    .set('CompId', compId.toString())
    .set('CategoryProduction', categoryProduction.toString())
    .set('Thicknes', thicknes)
    return this.http.get(environment.apiUrl+'/settings/getProductsForProduction/',{params:paramObj})
  }
  getProductForFoamProduction(categoryId:number,compId:number,categoryProduction:number,thicknes:any){
    let paramObj = new HttpParams()
    .set('CategoryId', categoryId.toString())
    .set('CompId', compId.toString())
    .set('CategoryProduction', categoryProduction.toString())
    .set('Thicknes', thicknes)
    return this.http.get(environment.apiUrl+'/settings/getProductsForFoamProduction/',{params:paramObj})
  }
  getProductForFoam(compId:number){
    let paramObj = new HttpParams()
    .set('CompId', compId.toString())
    return this.http.get(environment.apiUrl+'/settings/getProductsForFoam/',{params:paramObj})
  }
  getRawMaterialsForEpe(CompId:number){
    let paramObj = new HttpParams()
    .set('CompId', CompId.toString())
    return this.http.get(environment.apiUrl+'/settings/getProductsEpeFoamRawMaterials/',{params:paramObj})
  }
  changePassword(userName:string, oldPassword:string, newPassword:string){
    return this.http.post(environment.apiUrl+'/settings/changePassword',
    {userName:userName, oldPassword:oldPassword, newPassword:newPassword}
    )
  }
  getStoredProcedure(){
    return this.http.get(environment.apiUrl+'/settings/getProcedure');
  }
  saveProcedure(procedure:any){
    return this.http.post(environment.apiUrl+'/settings/SaveProcedureInfo',procedure)
  }
  getAllProcedureInfo(id: number) {
    return this.http.get(environment.apiUrl + '/settings/GetAllProcedureInfo/compId/' + id);
  }
  importFileData(importModel:ImportFile){
    let formFiles = new FormData();
    for(let i=0; i<importModel.excelFiles.length; i++){
      formFiles.append('excelFile'+i, importModel.excelFiles[i], importModel.excelFiles[i].name);
    }
    return this.http.post(environment.apiUrl+'/settings/ImportFile', formFiles);
  }
  getActiveInactiveCaption() {
    return this.http.get(environment.apiUrl + '/settings/getActiveInactiveCaption');
  }
  getActiveInactiveList(compId: number,viewMode:number) {
    return this.http.get(environment.apiUrl + '/settings/getActiveInactiveList/compId/' + compId+'/viewMode/'+viewMode);
  }
  updateActiveInactiveInfo(activeData:any){
  return this.http.post(environment.apiUrl+'/settings/updateActiveInactiveInfo',activeData)
  }
//DeletyePage
getAllERP(){
  return this.http.get(environment.apiUrl+'/settings/GetAllERP')
}
 /*  getPageForDelete(compId,pageId){
    return this.http.get(environment.apiUrl + '/settings/GetAllDeletePage/CompId/'+compId+'/PageId/'+pageId)
  }
 */
  getPageForDelete(list){
    return this.http.post(environment.apiUrl + '/settings/GetAllDeletePage',list)
  }
  /* deleteDataByPageId(deleteId){
    return this.http.post(environment.apiUrl + '/settings/DeletDataByPageId',deleteId)
  } */

  deleteDataByPageId(compId,pageId,deleteId){
    return this.http.delete(environment.apiUrl + '/settings/DeletDataByPageId/CompId/'+compId+'/PageId/'+pageId+'/AutoID/' +deleteId)
  }
  getCriteriaByModuleId(moduleId:number){
    return this.http.get(environment.apiUrl+'/settings/getCriterias/moduleId/'+moduleId);
  }
  getModule(){
    return this.http.get(environment.apiUrl+'/settings/getModule');
  }
  saveCriteria(criteria:any){
    return this.http.post(environment.apiUrl+'/settings/SaveCriteria',criteria);
  }
  getPagesByModuleID(id:number){
    console.log(id);
    return this.http.get(environment.apiUrl + '/settings/GetPagesByModuleID/' + id);
  }

  GetChalanForDelete(startDate:string,endDate:string,compID: number, chalanNatureId: number, orderId:number) {
    let params=new HttpParams()
    .set('StartDate',startDate.toString())
    .set('EndDate',endDate.toString())
    .set('CompId',compID.toString())
    .set('ChalanNatureId',chalanNatureId.toString())
    .set('OrderId',orderId.toString())

    return this.http.get(environment.apiUrl + `/settings/GetChalanForDelete`,{params:params})
  }

  deleteChalan(chalanId:number,compID: number, chalanNatureId: number, orderId:number) {
    let params=new HttpParams()
    .set('ChalanId',chalanId.toString())
    .set('CompId',compID.toString())
    .set('ChalanNatureId',chalanNatureId.toString())
    .set('OrderId',orderId.toString())
    return this.http.get(environment.apiUrl + `/settings/deleteChalan`,{params:params})
  }

  // getUserEmployee(obj:any){
  //   console.log(obj)
  //   return this.http.post(environment.apiUrl + '/settings/getUserEmployee',obj)
  // }

  getUserEmployee(companyId: number, status:number) {
    return this.http.get(environment.apiUrl + '/settings/getUserEmployee/compId/'+companyId+'/status/'+status);
   }
   getTripDeleteList(compId: number, tripId:number,registrationNo:string) {
    return this.http.get(environment.apiUrl + '/settings/GetTripDeleteList/compId/'+compId+'/tripId/'+tripId+'/registrationNo/'+registrationNo);
   }
   deleteBusTrip(transId:number,tripId:number,compId:number,regiNo:string,type:number){
     let params=new HttpParams()
     .set("transId",transId.toString())
     .set("tripId",tripId.toString())
     .set("compId",compId.toString())
     .set("regiNo",regiNo)
     .set("type",type.toString())
    return this.http.delete(environment.apiUrl + '/settings/DeleteBusTrip',{params:params})
  }

  savecomplainBox(any:any){
    return this.http.post(environment.apiUrl+'/settings/SaveComplainBox',any);
  }

  getAllComplain(){
    return this.http.get(environment.apiUrl+'/settings/GetAllComplain');
  }

  getbyComplainId(complain:any){
    return this.http.post(environment.apiUrl+'/settings/GetByComplainId',complain);
  }

  saveBranchName(branch:any){
    return this.http.post(environment.apiUrl+'/settings/SaveBranchName',branch);
  }
  getAllBranchName(branch:any){
    return this.http.post(environment.apiUrl+'/settings/GetAllBranchName',branch);
  }
  saveGodwon(godwon:any){
    return this.http.post(environment.apiUrl + '/settings/SaveGodwon',godwon);
  }
  getAllGodwonwParrentId(godwon:any){
    return this.http.post(environment.apiUrl + '/settings/getAllGodwonwParrentId',godwon);
  }

}
