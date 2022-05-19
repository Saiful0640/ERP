import { Color } from './../../../models/color.model';
import { map } from 'rxjs/operators';
import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { AccountingReportsService } from '../../../services/accounting/accounting-reports.service';
import { AuthService } from '../../../services/auth.service';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { AccDashboardRptType } from '../../../shared/lookup';
import { Chart, registerables } from 'chart.js';
@Component({
  selector: 'app-accounts-index',
  templateUrl: './accounts-index.component.html',
  styleUrls: ['./accounts-index.component.scss']
})
export class AccountsIndexComponent implements OnInit {
public mymath:Math;
  compId: number;
  startDate: string;
  endDate: string;
  cashandbank:any;
  dash:number;
  chart:any;
  lstlist:any[]=['Payable','Profit','Receivable']
  horizontalbar:any;
  isopen:boolean=false;
  lstdashboard:any[]=[];
  listofdetails:any[]=[];
  assetsVsliabilityReports: any[] = [];
  incomeVSexpendetureReports: any[] = [];
  loadingAssestsRpt: boolean = false;
  loadingIncomeRpt: boolean = false;
  sumOfReport: {
    assets: number;
    liability: number;
    diffOfAssetsLiability: number;
    income: number;
    expendeture: number;
    diffOfIncomeExpendeture: 0,
  } = {
      assets: 0,
      liability: 0,
      diffOfAssetsLiability: 0,
      income: 0,
      expendeture: 0,
      diffOfIncomeExpendeture: 0,
    }

  constructor(
    private appService: AppService,
    private accRptService: AccountingReportsService,
    private dateService:NgbDateCustomParserFormatter
  ) { }

  ngOnInit() {
    this.appService.pageTitle = 'Accounting'
    this.compId =AuthService.CompanyId;
   this.startDate = this.dateService.getDateToYyyymmdd(new Date());
    this.endDate = this.dateService.getDateToYyyymmdd(new Date());
    // this.getAssetsVSLiability();
    // this.getIncomeVSExpendeture();
  }

  getAssetsVSLiability(rptType: AccDashboardRptType = AccDashboardRptType.AssetsVSLiability) {
    this.loadingAssestsRpt = true;
    this.accRptService.getAccDashboardReport(this.compId, this.startDate, this.endDate, rptType)
      .map((res: any) => {
        if (res.status) {
          (res.result as any[]).forEach(item => {
            this.sumOfReport.assets += item.value.assetsAmount;
            this.sumOfReport.liability += item.value.liabilityAmount;
            this.sumOfReport.diffOfAssetsLiability += (item.value.assetsAmount - item.value.liabilityAmount);
          })
        }
        return res;
      })
      .subscribe((response: any) => {
        if (response.status) {
          this.assetsVsliabilityReports = response.result as any[];
        } else {
          this.assetsVsliabilityReports = [];
        }
        this.loadingAssestsRpt = false;
      })
  }
  getIncomeVSExpendeture(rptType: AccDashboardRptType = AccDashboardRptType.IncomeVSExpendeture) {
    this.loadingIncomeRpt = true;
    this.accRptService.getAccDashboardReport(this.compId, this.startDate, this.endDate, rptType)
      .map((res: any) => {
        if (res.status) {
          (res.result as any[]).forEach(item => {
            this.sumOfReport.income += item.value.incomeAmount;
            this.sumOfReport.expendeture += item.value.expendetureAmount;
            this.sumOfReport.diffOfIncomeExpendeture += (item.value.incomeAmount - item.value.expendetureAmount);
          })
        }
        return res;
      })
      .subscribe((response: any) => {
        if (response.status) {
          this.incomeVSexpendetureReports = response.result as any[];
        } else {
          this.incomeVSexpendetureReports = [];
        }
        this.loadingIncomeRpt = false;
      })

  }
  onChangeDate(){
    this.assetsVsliabilityReports = [];
    this.incomeVSexpendetureReports = [];
    this.getAssetsVSLiability();
    this.getIncomeVSExpendeture();
  }



  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

}
