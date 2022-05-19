import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payroll-report',
  templateUrl: './payroll-report.component.html',
  styleUrls: ['./payroll-report.component.scss']
})
export class PayrollReportComponent implements OnInit {

  moduleId:number=37;
  childModuleId:number=40;
   pageId:number;
   title:string="Payroll Reports"
  constructor(

  ) { }
   ngOnInit() {

  }

}
