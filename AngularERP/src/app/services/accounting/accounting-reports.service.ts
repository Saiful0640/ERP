import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { AccountingReportModel } from '../../models/accounting/reports/accounting-report-Model';
import { Injectable } from '@angular/core';
import { AccDashboardRptType } from '../../shared/lookup';

@Injectable({
  providedIn: 'root'
})
export class AccountingReportsService {

  constructor(private http: HttpClient) { }
  //Report For Chart of Account
  getDaybookForReport(daybook) {
    return this.http.get(environment.apiUrl + '/accountingdaybookreport/fromDate/'+"20220404"+'/toDate/'+"20220404"+'/voucherDate/'+"CashReceive"+'/accountId/'+1);
  }
  getSubledgerForReport(rptSubledgerChart: AccountingReportModel) {
    return this.http.post(environment.apiUrl + '/accountingReport/getAllSubledgerReport', rptSubledgerChart);
  }
  getAccountIdBySublegerId(subId: number, compID: number) {
    return this.http.get(environment.apiUrl + '/accountingReport/getAccountIdBySublegerId/subledgerId/' + subId + '/compId/' + compID);
  }
  getSubledgerSummaryForReport(rptSubledgerChart: AccountingReportModel) {
    return this.http.post(environment.apiUrl + '/accountingReport/getAllSubledgerSummaryReport', rptSubledgerChart);
  }
  getTrialBalDetailForReport(rptTrialBalanceDetails: AccountingReportModel) {
    return this.http.post(environment.apiUrl + '/accountingReport/getTrialBalDetailForReport', rptTrialBalanceDetails);
  }
  getTrialBalGroupForReport(rptTrialBalanceGroup: AccountingReportModel) {
    return this.http.post(environment.apiUrl + '/accountingReport/getTrialBalGroupForReport', rptTrialBalanceGroup);
  }
  getCostCenterForReport(rptcostcenter: AccountingReportModel) {
    return this.http.post(environment.apiUrl + '/accountingReport/getAllCosterCenterReport', rptcostcenter);
  }
  getCostCenterSummaryForReport(rptCVostCenterSummary: AccountingReportModel) {
    return this.http.post(environment.apiUrl + '/accountingReport/getAllCostCenterSummaryReport', rptCVostCenterSummary);
  }
  getLedgerForReport(rptLedgerChart: AccountingReportModel) {
    return this.http.post(environment.apiUrl + '/accountingReport/getLedgerForReport', rptLedgerChart);
  }
  getSubLedgerList(compId: number) {
    return this.http.get(environment.apiUrl + '/accountingReport/getSubledgerListForRpt/' + compId);
  }
  getSubledgerDaybookForReport(rptSubDaybookChart: AccountingReportModel) {
    return this.http.post(environment.apiUrl + '/accountingReport/getSubledgerDaybookReport', rptSubDaybookChart);
  }
  getAccDashboardReport(compId:number, startDate:string, endDate:string, reportType:AccDashboardRptType) {
    var httpParam = new HttpParams()
    .append('compId',compId.toString())
    .append('startDate',startDate)
    .append('endDate',endDate)
    .append('reportType',reportType.toString())
    return this.http.get(environment.apiUrl + '/accountingReport/GetAccDashboardRpt', {params:httpParam});
  }
  //Get Report Type

  getReportType(){
    return this.http.get(environment.apiUrl+ '/accountingReport/GetReportType')
  }

  getAccountDashboard(compId: number) {
    return this.http.get(environment.apiUrl + '/accountingReport/AccountDashboards/' + compId);
  }
  getDashboardDetails(compId:number,dash:number){
    return this.http.get(environment.apiUrl+'/accountingReport/GetAllDetalsDashboard/compId/'+compId +'/dash/'+dash);
   }
}
