import { Chart } from 'chart.js';
import { map } from 'rxjs/operators';
import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../../../app.service';
import { AuthService } from '../../../services/auth.service';
import { SalesPurchaseService } from '../../../services/sales-purchase/sales-purchase.service';

@Component({
  selector: 'app-sales-purchase-index',
  templateUrl: './sales-purchase-index.component.html',
  styleUrls: ['./sales-purchase-index.component.scss']
})
export class SalesPurchaseIndexComponent implements OnInit {
  compId:number;
  dastype:number=1;
  monthYear:string='';
  moduleId:number;
  dashboardModel:any[]=[];
  dashboardModell:any[]=[];
  dashboardModelll:any[]=[];
  startDate: string;
  endDate: string;
  isOpen:boolean=false;
  salesdashboard:any[]=[];
  lstdashboarddetails:any[]=[];
  Charts:any;
  cityname:any[]=[];
  cityvalue:any[]=[];
  lstdashboardbycity:[]=[]
  backcolor:any[]=["#008080", "#077dcc","#548CFF","#557C55","#35589A","#541212","#BAABDA","#FABB51","#041C32","#04293A","#461111","#0B4619"];
  month:any[]=["January","February","March","April","May","June","July","August","September","October","November","December"]


  public innerWidth: any;
  @HostListener('window:load', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
    if(window.innerWidth<=768){
      this.router.navigate(['./sales-purchase/order-mbl-v']);
    }

  }

  constructor(
    private appService:AppService,
    private salesPurchaseService:SalesPurchaseService,
    private router:Router
    ) { }

  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.moduleId=AuthService.CurrentModuleId;
    this.month;
    //this.appService.pageTitle = 'Sales Purchase';
    this.onResize();
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
      this.Charts=new Chart('canvas',{
        type:'pie',
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
   getsalesDashboard(){
      this.salesPurchaseService.getSalesDashboard(this.compId).subscribe((response:any)=>{
        this.salesdashboard=response.result;

        let sales=response.result.map(p=>p.netSales);
        let collect=response.result.map(p=>p.collection);

        // this.Charts=new Chart('canvas',{
        //   type:'pie',
        //   data:{
        //     labels:['Sales','Collection'],
        //     datasets:[{
        //         data: [sales,collect],
        //       backgroundColor: ["#008080", "#077dcc"],

        //     }]
        //   },
        //   options: {
        //     title: {
        //       display: true,
        //       text: 'Sales & Distribution',
        //       fontWeight: "bold",
        //       fontSize: 18,
        //     },
        //     legend:{
        //       display:false
        //     }
        //   }
        // });
      })

   }

   getDashboard(){
    this.salesPurchaseService.getDashboardData(this.compId,0,this.moduleId,0).subscribe((response:any)=>{
      if(response.status){
        this.dashboardModel=response.result as any[];
        console.log(this.dashboardModel);
      }else{
        this.dashboardModel=[];
      }
    })
  }
  GetDashboardDetails(){
    this.isOpen=true;
    this.salesPurchaseService.getSalesDashboardDetais(this.compId).subscribe((response:any)=>{
      this.lstdashboarddetails=response.result;
    })

  }

  getDashboard2(){
    this.salesPurchaseService.getDashboardData(this.compId,0,this.moduleId,1).subscribe((response:any)=>{
      if(response.status){
        this.dashboardModell=response.result as any[];
        console.log(this.dashboardModell);
      }else{
        this.dashboardModell=[];
      }
    })
  }
  getDashboard3(){
    this.salesPurchaseService.getDashboardData(this.compId,0,this.moduleId,2).subscribe((response:any)=>{
      if(response.status){
        this.dashboardModelll=response.result as any[];
        console.log(this.dashboardModelll);
      }else{
        this.dashboardModelll=[];
      }
    })
  }
  onChangeDate(){
    this.lstdashboarddetails = [];
    this.getAssetsVSLiability();
  }
  getAssetsVSLiability() {
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
}
