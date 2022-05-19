import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ReportModel } from '../../../models/settings/app-settings/report-model';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-report-select-list',
  templateUrl: './report-select-list.component.html',
  styleUrls: ['./report-select-list.component.scss','../../../../vendor/libs/angular2-ladda/angular2-ladda.scss']
})
export class ReportSelectListComponent implements OnInit {
  @Input() moduleId:number;
  @Input() pageId:number;
  @Input() reports: ReportModel[] = [];
  @Input() isExporting: boolean = false;
  @Input() exportTypeWidth: string = '100px';
  @Input() reportTypeWidth: string = '250px';
  exportTypes: any[] = [];
  selectedReport: ReportModel;
  @Output() onClick = new EventEmitter<ReportModel>();
  @Output() onChangeReportType = new EventEmitter<ReportModel>();
  @Output() onChangeExportType = new EventEmitter<ReportModel>();
  constructor(
    // private reportService: ReportService,
    private toaster:ToastrService
  ) { }
  ngOnInit() {
    // this.exportTypes = this.reportService.exportTypes();
    this.selectedReport = new ReportModel();
    this.selectedReport.exportType = 'pdf';
    this.selectedReport.reportId = this.reports.length>0?this.reports[0].reportId:null;
    // this.getReportInfo();
  }
  // getReportInfo(){
  //   this.reportService.getReports(AuthService.CompanyId,this.moduleId,this.pageId)
  //   .subscribe(response=>{
  //     if(response.status){
  //        this.reports  = response.result as ReportModel[];
  //     }
  //   },err=>{
  //     this.toaster.error(err.error,'Report Info not found');

  //   })
  // }
  onExport() {
    if(!this.selectedReport.reportId){
      return this.toaster.error('Select a report type.')
    }
    if(!this.selectedReport.exportType){
      return this.toaster.error('Select export type.')
    }
    this.onClick.emit(this.selectedReport);
  }
  onChangeRptType(){
    this.onChangeReportType.emit(this.selectedReport);
  }
  onChangeExport(){
    this.onChangeExportType.emit(this.selectedReport);
  }

}
