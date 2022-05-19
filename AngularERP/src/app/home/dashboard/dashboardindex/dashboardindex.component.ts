import { Template } from '@angular/compiler/src/render3/r3_ast';
import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { AccountingReportsService } from '../../../services/accounting/accounting-reports.service';
import { AuthService } from '../../../services/auth.service';
import { AccDashboardRptType } from '../../../shared/lookup';
import { Chart } from 'chart.js';
import { NgbDateCustomParserFormatter } from '../../../shared/dateformat';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SalesPurchaseService } from '../../../services/sales-purchase/sales-purchase.service';
@Component({
  selector: 'app-dashboardindex',
  templateUrl: './dashboardindex.component.html',
  styleUrls: ['./dashboardindex.component.scss']
})
export class DashboardindexComponent implements OnInit {
  public mymath:Math;
  compId: number;
  startDate: string;
  dashbordmodalname:string;
  endDate: string;
  cashandbank:any;
  dash:number;
  chart:any;
  dastype:number=1;
  lstprojectdashboard:any[]=[];
  lstprojectdashtest:any[]=[];
  projectdashboardtype:number=1;
  monthYear:string='';
  moduleId:number;
  dashboardModel:any[]=[];
  dashboardModell:any[]=[];
  dashboardModelll:any[]=[];
  isOpen:boolean=false;
  salesdashboard:any[]=[];
  lstdashboarddetails:any[]=[];
  lstdashboardcategory:any[]=[];
  Charts:any;
  cityname:any[]=[];
  cityvalue:any[]=[];
  lstdashboardbycity:[]=[]
  backcolor:any[]=["#008080", "#077dcc","#548CFF","#557C55","#35589A","#541212","#BAABDA","#FABB51","#041C32","#04293A","#461111","#0B4619"];
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
    private dateService:NgbDateCustomParserFormatter,
    public modalService: NgbModal,
    private salesPurchaseService:SalesPurchaseService,


  ) { }

  ngOnInit() {
    this.appService.pageTitle = 'Accounting'
    this.compId =AuthService.CompanyId;
    this.getSalesDashboardByCity();
    this.getAccountDashboard();
    this.getProjectDashboard();
   this.startDate = this.dateService.getDateToYyyymmdd(new Date());
    this.endDate = this.dateService.getDateToYyyymmdd(new Date());
    // this.getAssetsVSLiability();
    // this.getIncomeVSExpendeture();
  }

  getProjectDashboard(){
    const paramobj={
      compId:this.compId,
      categoryProduction:this.projectdashboardtype
    }
    this.salesPurchaseService.getProjectDashboard(paramobj).subscribe((response:any)=>{
      this.lstprojectdashtest=response.result;
    })
  }
  getProjectDashboard2(){
    this.projectdashboardtype=2;
    const paramobj={
      compId:this.compId,
      categoryProduction:this.projectdashboardtype
    }
    this.salesPurchaseService.getProjectDashboard(paramobj).subscribe((response:any)=>{
      this.lstprojectdashboard=response.result;
    })
  }
  getProjectDashboard3(){
    this.projectdashboardtype=3;
    const paramobj={
      compId:this.compId,
      categoryProduction:this.projectdashboardtype
    }
    this.salesPurchaseService.getProjectDashboard(paramobj).subscribe((response:any)=>{
      this.lstprojectdashboard=response.result;
    })
  }
  getProjectDashboard4(){
    this.projectdashboardtype=4;
    const paramobj={
      compId:this.compId,
      categoryProduction:this.projectdashboardtype
    }
    this.salesPurchaseService.getProjectDashboard(paramobj).subscribe((response:any)=>{
      this.lstprojectdashboard=response.result;
    })
  }
  getSalesDashboardByCity(){
    const paramobj={
      compId:this.compId,
      dastype:this.dastype,
      monthYear:this.monthYear
    }
    this.salesPurchaseService.getSalesDashboardByCityDetais(paramobj).subscribe((response:any)=>{
      this.lstdashboardbycity=response.result;
      this.cityname=response.result.map(p=>p.name);
      this.cityvalue=response.result.map(p=>p.amount);
      this.Charts=new Chart('doughnut-chart',{
        type:'doughnut',
        data:{
          labels:this.cityname,
          datasets:[{
              data: this.cityvalue,
            backgroundColor:this.backcolor,

          }]
        },
        options: {
          title: {
            display: true,
            text: 'Sales & Distribution',
            fontWeight: "bold",
            fontSize: 18,
          },
          legend:{
            display:false
          }
        }
      });
    })
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
  onChangeDate(template){
    this.assetsVsliabilityReports = [];
    this.incomeVSexpendetureReports = [];
    this.getAssetsVSLiability();
    this.getIncomeVSExpendeture();
    this.modalService.open(template,{size: 'lg', windowClass: 'my-class'})
  }
  onChangeDate1(templates){
    this.lstdashboarddetails = [];
    this.getAssetsVSLiabilityy();
    this.GetAllCategoryByDate();
    this.modalService.open(templates,{size: 'lg', windowClass: 'my-class'})
  }
  GetAllCategoryByDate(){
    this.isOpen=true;
    this.salesPurchaseService.GetAllCategoryByDate(this.compId, this.startDate, this.endDate)
      .subscribe((response: any) => {
        if (response.status) {
          this.lstdashboardcategory = response.result;
        } else {
          this.lstdashboardcategory = [];
        }
      })
  }
  getAssetsVSLiabilityy() {
    this.isOpen=true;
    this.salesPurchaseService.getsalesDashboardReport(this.compId, this.startDate, this.endDate)
      .subscribe((response: any) => {
        if (response.status) {
          this.lstdashboarddetails = response.result;
        } else {
          this.lstdashboarddetails = [];
        }
      })
  }
  public random(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }
  viewPopUp(template){
    this.modalService.open(template,{size: 'lg', windowClass: 'my-class'})
  }
  projectPopUp(template){
    this.modalService.open(template,{size: 'lg', windowClass: 'my-class'})
  }
  GetDashboardDetails(){
    this.isopen=true;
    this.dash=1;
    this.dashbordmodalname='Total Cash & Bank';
    this.accRptService.getDashboardDetails(this.compId,this.dash).subscribe((response:any)=>{
    this.listofdetails=response.result;

    })

  }
  GetDashboardDetails2(){
    this.isopen=true;
    this.dash=2;
    this.dashbordmodalname='Total Receive Amount';
    this.accRptService.getDashboardDetails(this.compId,this.dash).subscribe((response:any)=>{
    this.listofdetails=response.result;

    })

  }
  GetDashboardDetails3(){
    this.isopen=true;
    this.dash=3;
    this.dashbordmodalname='Total Payable Amount';
    this.accRptService.getDashboardDetails(this.compId,this.dash).subscribe((response:any)=>{
    this.listofdetails=response.result;

    })
  }
  GetDashboardDetails4(){
    this.isopen=true;
    this.dash=4;
    this.dashbordmodalname=' Profit Amount';
    this.accRptService.getDashboardDetails(this.compId,this.dash).subscribe((response:any)=>{
    this.listofdetails=response.result;

    })
  }

}
