import { Chart } from 'chart.js';
import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { AccountingReportsService } from '../../../services/accounting/accounting-reports.service';
import { AuthService } from '../../../services/auth.service';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { AccDashboardRptType } from '../../../shared/lookup';

@Component({
  selector: 'app-accounts-dashboard',
  templateUrl: './accounts-dashboard.component.html',
  styleUrls: ['./accounts-dashboard.component.scss']
})
export class AccountsDashboardComponent implements OnInit {
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
    this.getAccountDashboard();
   this.startDate = this.dateService.getDateToYyyymmdd(new Date());
    this.endDate = this.dateService.getDateToYyyymmdd(new Date());
    // this.getAssetsVSLiability();
    // this.getIncomeVSExpendeture();
  }

  getAccountDashboard(){
    this.accRptService.getAccountDashboard(this.compId).subscribe((response:any)=>{
      if(response.status){
        this.lstdashboard=response.result;
        let payable=response.result.map(res=>res.payable)
        let profit=response.result.map(res=>res.profit)
        let rceiveablele=response.result.map(res=>res.rceiveablele)
        let cashandBank=response.result.map(res=>res.cashandBank)
        let cashandBankp=Math.abs(cashandBank);
        let payablep=Math.abs(payable);
        let rceiveablelep=Math.abs(rceiveablele);
        this.chart=new Chart('canvas',{
          type:'pie',
          data:{
            labels:['Payable','CashandBank','Receivable'],
            datasets:[{
                data: [payable,cashandBank,rceiveablele],
              backgroundColor: ["#f86c6b", "#077dcc","#8e5ea2"],

            }]
          },
          options: {
            title: {
              display: true,
              text: 'Account Transaction Pie-Chart',
              fontWeight: "bold",
              fontSize: 18,
            },
            legend:{
              display:false
            }
          }
        });
        this.horizontalbar=new Chart('horizontalBar-char',{
          type:'bar',
          data:{

            labels:['Receivable','Payable','Profit',],
            datasets:[{
                data: [rceiveablelep,payablep,cashandBankp ],
                backgroundColor: ["#8e5ea2","#f86c6b", "#008080"],
                // fill:false,
                // borderColor: "#8e5ea2"

            }]
          },
          options: {
            title: {
              display: true,
              text: 'Account Transaction Bar-Char',
              fontWeight: "bold",
              fontSize: 18,
            },

            legend:{
              display:false
            },
            scales:{
              axes: [
                {
                  fontColor:'#008080',
                  fontSize:'16px'
                },
              ],
            }
          }
        });

      }

    })
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
  GetDashboardDetails(){
    this.isopen=true;
    this.dash=1;
    this.accRptService.getDashboardDetails(this.compId,this.dash).subscribe((response:any)=>{
    this.listofdetails=response.result;

    })

  }
  GetDashboardDetails2(){
    this.isopen=true;
    this.dash=2;
    this.accRptService.getDashboardDetails(this.compId,this.dash).subscribe((response:any)=>{
    this.listofdetails=response.result;

    })

  }
  GetDashboardDetails3(){
    this.isopen=true;
    this.dash=3;
    this.accRptService.getDashboardDetails(this.compId,this.dash).subscribe((response:any)=>{
    this.listofdetails=response.result;

    })
  }
  GetDashboardDetails4(){
    this.isopen=true;
    this.dash=4;
    this.accRptService.getDashboardDetails(this.compId,this.dash).subscribe((response:any)=>{
    this.listofdetails=response.result;

    })
  }

}
