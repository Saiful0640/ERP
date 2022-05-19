import { ToastrService } from 'ngx-toastr';
// import { ReportService } from './../../../../services/report.service';
import { AuthService } from './../../../../services/auth.service';
import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReportModel } from '../../../../models/settings/app-settings/report-model';


@Component({
  selector: 'app-report-sales',
  templateUrl: './report-sales.component.html',
  styleUrls: ['./report-sales.component.scss']
})
export class ReportSalesComponent implements OnInit {
title:string="Sales Report";
moduleId:number=21
compId:number;
pageId:number=69;
ledgerType:number=6;

  constructor(private fb:FormBuilder,
    // private rptService:ReportService,
    private toastrService:ToastrService) { }

  ngOnInit() {

  }

}
