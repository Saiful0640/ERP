import { StoreStartAndEndDate } from './../models/store-start-and-end-date';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AppStore } from '../models/app-store.model';
import { UserPagePrivilegeModel } from '../models/settings/user-page-privilege.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private static appStore: AppStore = new AppStore();
  constructor(private http: HttpClient, private router: Router) { }

  public static isAuthenticated(): boolean {
    try {
     // this.appStore.token = this.Token;
      this.appStore.token='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJVc2VySWQiOiIxIiwiVXNlck5hbWUiOiJzYSIsIlBhc3N3b3JkIjoiMTIzIiwiVXNlclR5cGVJZCI6IjEiLCJCcmFuY2hJZCI6IjEiLCJFbXBJZCI6IjEiLCJDb21wSWQiOiIxIiwiQ29tcE5hbWUiOiJEZW1vIENvbXAiLCJDbGllbnROYW1lIjoiRGVtb24gQ2xpZW50IiwiQ2xpZW50SWQiOiIxIiwiaHR0cDovL3NjaGVtYXMubWljcm9zb2Z0LmNvbS93cy8yMDA4LzA2L2lkZW50aXR5L2NsYWltcy9yb2xlIjoiQWRtaW4iLCJleHAiOjE2NDY0NTE2MjksImlzcyI6Imh0dHA6Ly9sb2NhbGhvc3Q6MzAwMS8iLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjQyMDAvIn0.mDMbsq1uroNLkp5C2Dpa61vDSYttw_pUyaM9VRTC5so'
      console.log(this.appStore.token)
      let payload = JSON.parse(window.atob(this.appStore.token.split('.')[1]));
      console.log(payload,"Payload")
      let tokenExp = payload['exp'];
      let currentTimeSpan = (new Date().getTime()) / 1000;
      let isValidToken = (tokenExp - currentTimeSpan) > 0;
      if (isValidToken) {
        this.UserId = Number(payload["UserId"]);
        this.LoginId = payload["UserName"];
        this.LoginPassword = payload["Password"];
        this.UserTypeId = Number(payload["UserTypeId"]);
        this.EmpId = Number(payload["EmpId"]);
        // this.CompanyId = Number(payload["CompId"]);
        // this.CompanyName = payload["CompName"];
        this.ClientId = Number(payload["ClientId"]);
        this.ClientName = payload["ClientName"];
        return true;
      } else {
        return false;
      }
    }
    catch (err) {
      return false;
    }
  }

  public static isLocked(): boolean {

    let isLocked = null;
    const remember = localStorage.getItem('remember');
    if (remember && remember === 'true') {
      isLocked = localStorage.getItem('locked');
    } else {
      isLocked = sessionStorage.getItem('locked');
    }

    return isLocked === 'true';
  }

  public login(credentials) {
    const email = credentials.email;
    const password = credentials.password;
    const tokenUrl = environment.apiUrl + '/token';
    const data = 'username=' + email + '&password=' + password + '&grant_type=password';
    const header = new HttpHeaders({ 'Content-Type': 'application/x-www-urlencoded', 'No-Auth': 'True' });
    return this.http.post(tokenUrl, data, { headers: header });
  }

  public retrieve(email: string) {
    const retrieveUrl = environment.apiUrl + '/retrieve';
    const body = new HttpParams().set('email', email);
    return this.http.post(retrieveUrl, body);
  }
  public static set IsRemembered(remembereStatus) {
    localStorage.setItem('isRemembered', remembereStatus.toString())
  }
  public static get IsRemembered(): boolean {
    return localStorage.getItem('isRemembered') == 'true';
  }
  public static set ClientName(clientName) {
    //AuthService.IsRemembered ? localStorage.setItem('clientId', clientId.toString()) : sessionStorage.setItem('clientId', clientId.toString());
    this.appStore.clientName = clientName;
  }
  public static set ClientId(clientId) {
    //AuthService.IsRemembered ? localStorage.setItem('clientId', clientId.toString()) : sessionStorage.setItem('clientId', clientId.toString());
    this.appStore.clientId = clientId;
  }
  public static get ClientId(): number {
    //return Number((AuthService.IsRemembered ? localStorage.getItem('clientId') : sessionStorage.getItem('clientId')));
    return this.appStore.clientId;
  }
  public static set CompanyId(companyId) {
   AuthService.IsRemembered ? localStorage.setItem('compId', companyId.toString()) : sessionStorage.setItem('compId', companyId.toString());
    // this.appStore.companyId = companyId;
  }
  public static get CompanyId(): number {
 return Number(AuthService.IsRemembered ? localStorage.getItem('compId') : sessionStorage.getItem('compId'));

    //  return this.appStore.companyId;
  }
  public static set CompanyName(compName) {
     AuthService.IsRemembered ? localStorage.setItem('companyName', compName.toString()) : sessionStorage.setItem('companyName', compName.toString());

    // this.appStore.compName = compName;
  }
  public static get CompanyName() {
    return AuthService.IsRemembered ? localStorage.getItem('companyName') : sessionStorage.getItem('companyName');
    // return this.appStore.compName

  }
  public static set BranchId(branchId) {
    AuthService.IsRemembered ? localStorage.setItem('branchId', branchId.toString()) : sessionStorage.setItem('branchId', branchId.toString());
    // this.appStore.branchId = branchId;
  }
  public static get BranchId(): number {
    return Number(AuthService.IsRemembered ? localStorage.getItem('branchId') : sessionStorage.getItem('branchId'));
    // return this.appStore.branchId;
  }
  public static set UserId(userId) {
    //AuthService.IsRemembered ? localStorage.setItem('userId', userId.toString()) : sessionStorage.setItem('userId', userId.toString());
    this.appStore.userId = userId;
  }
  public static get UserId(): number {
    //return Number(AuthService.IsRemembered ? localStorage.getItem('userId') : sessionStorage.getItem('userId'));
    return this.appStore.userId;
  }
  public static set UserTypeId(userTypeId) {
    //AuthService.IsRemembered ? localStorage.setItem('userTypeId', userTypeId.toString()) : sessionStorage.setItem('userTypeId', userTypeId.toString());
    this.appStore.userTypeId = userTypeId;
  }
  public static get UserTypeId(): number {
    //return Number(AuthService.IsRemembered ? localStorage.getItem('userTypeId') : sessionStorage.getItem('userTypeId'));
    return this.appStore.userTypeId
  }
  public static set UserRoleId(userRoleId) {
    //AuthService.IsRemembered ? localStorage.setItem('userTypeId', userTypeId.toString()) : sessionStorage.setItem('userTypeId', userTypeId.toString());
    this.appStore.userRoleId = userRoleId;
  }
  public static get UserRoleId(): number {
    //return Number(AuthService.IsRemembered ? localStorage.getItem('userRoleId') : sessionStorage.getItem('userRoleId'));
    return this.appStore.userRoleId
  }
  public static set EmpId(empId) {
    //AuthService.IsRemembered ? localStorage.setItem('userTypeId', userTypeId.toString()) : sessionStorage.setItem('userTypeId', userTypeId.toString());
    this.appStore.empId = empId;
  }
  public static get EmpId(): number {
    //return Number(AuthService.IsRemembered ? localStorage.getItem('userTypeId') : sessionStorage.getItem('userTypeId'));
    return this.appStore.empId
  }
  public static set Token(token) {
    AuthService.IsRemembered ? localStorage.setItem('token', token.toString()) : sessionStorage.setItem('token', token.toString());
  }
  public static get Token() {
    return AuthService.IsRemembered ? localStorage.getItem('token') : sessionStorage.getItem('token');
  }
  public static set LoginId(userName) {
    //AuthService.IsRemembered ? localStorage.setItem('loginId', btoa(userName)) : sessionStorage.setItem('loginId', btoa(userName));
    this.appStore.userName = userName;
  }
  public static get LoginId() {
    //return AuthService.IsRemembered ? atob(localStorage.getItem('loginId')) : atob(sessionStorage.getItem('loginId'));
    return this.appStore.userName;
  }
  public static set LoginPassword(loginPassword) {
    //AuthService.IsRemembered ? localStorage.setItem('loginPassword', btoa(loginPassword)) : sessionStorage.setItem('loginPassword', btoa(loginPassword));
    this.appStore.password = loginPassword;
  }
  public static get LoginPassword() {
    // AuthService.IsRemembered ? atob(localStorage.getItem('loginPassword')) : atob(sessionStorage.getItem('loginPassword'));
    return this.appStore.password;
  }
  public static set CurrentModuleId(moduleId) {
    this.appStore.currentModuleId=moduleId;
  }
  public static get CurrentModuleId() {
    return this.appStore.currentModuleId;
  }
  public static set CurrentPageId(pageId) {
    this.appStore.currentPageId=pageId;
  }
  public static get CurrentPageId() {
    return this.appStore.currentPageId;
  }
  public static set ActiveModuleRoute(routePath) {
    AuthService.IsRemembered ? localStorage.setItem('activeModuleRoutePath', routePath.toString()) : sessionStorage.setItem('activeModuleRoutePath', routePath.toString());
  }
  public static get ActiveModuleRoutePath() {
    return AuthService.IsRemembered ? localStorage.getItem('activeModuleRoutePath') : sessionStorage.getItem('activeModuleRoutePath');
  }
  public static set ActiveSubModuleRoute(routePath) {
    AuthService.IsRemembered ? localStorage.setItem('activeSubModuleRoutePath', routePath.toString()) : sessionStorage.setItem('activeSubModuleRoutePath', routePath.toString());
  }
  public static get ActiveSubModuleRoute() {
    return AuthService.IsRemembered ? localStorage.getItem('activeSubModuleRoutePath') : sessionStorage.getItem('activeSubModuleRoutePath');
  }
  public static set ActivePageRoute(routePath) {
    AuthService.IsRemembered ? localStorage.setItem('activePageRoutePath', routePath.toString()) : sessionStorage.setItem('activePageRoutePath', routePath.toString());
  }
  public static get ActivePageRoute() {
    return AuthService.IsRemembered ? localStorage.getItem('activePageRoutePath') : sessionStorage.getItem('activePageRoutePath');
  }
  public static set TempVal(value) {
    this.appStore.tempVal = value;
  }
  public static get SaleInvoiceSearchDate() {
    return this.appStore.tempVal;
  }
  public static set SaleInvoiceSearchDate(value) {
    this.appStore.tempVal = value;
  }
  public static get SaleInvoiceSearchDateNgb() {
    return this.appStore.tempVal;
  }
  public static set SaleInvoiceSearchDateNgb(value) {
    this.appStore.tempVal = value;
  }
  public static get TempVal() {
    return this.appStore.tempVal;
  }
  public static set PageAuthInfo(pageAuthInfo: UserPagePrivilegeModel) {
    this.appStore.currentPageAuthInfo = pageAuthInfo;
  }
  public static get PageAuthInfo() {
    return this.appStore.currentPageAuthInfo;
  }
  public static set StoredDateAuthInfo(StoredDateAuthInfo: StoreStartAndEndDate) {
    this.appStore.storedStartAndEndDate = StoredDateAuthInfo;
  }
  public static get StoredDateAuthInfo() {
    return this.appStore.storedStartAndEndDate;
  }
/// public static set CompanyName(compName) {
  //AuthService.IsRemembered ? localStorage.setItem('companyName', compName.toString()) : sessionStorage.setItem('companyName', compName.toString());

  // this.appStore.compName = compName;
//}
//public static get CompanyName() {
 // return AuthService.IsRemembered ? localStorage.getItem('companyName') : sessionStorage.getItem('companyName');
  // return this.appStore.compName

//}

  public static set CompanyType(companyType) {
    AuthService.IsRemembered ? localStorage.setItem('companyType', companyType.toString()) : sessionStorage.setItem('companyType', companyType.toString());
    //this.appStore.companyType = companyType;
  }
  public static get CompanyType(): number {
    return Number(AuthService.IsRemembered ? localStorage.getItem('companyType') : sessionStorage.getItem('companyType'));
    //return this.appStore.companyType
  }
}
