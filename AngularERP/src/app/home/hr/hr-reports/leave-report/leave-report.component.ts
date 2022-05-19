import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmpSearchModel } from '../../../../models/hr/empSearch.model';
import { ReportModel } from '../../../../models/settings/app-settings/report-model';
import { AuthService } from '../../../../services/auth.service';
import { MemberPersonalInfoService } from '../../../../services/member-personal-info.service';
import { ReportsService } from '../../../../services/reports.service';
import { SettingService } from '../../../../services/settings/Setting.service';

@Component({
  selector: 'app-leave-report',
  templateUrl: './leave-report.component.html',
  styleUrls: ['./leave-report.component.scss']
})
export class LeaveReportComponent implements OnInit {
  leaveRptForm:FormGroup;
  compId:number;
  yearTypeId:number=3;
  years:any[];
  moduleId:number;
  isLoading:boolean;
  employees:EmpSearchModel[]=[];
  constructor(private formBuilder:FormBuilder,
    private memberPersonalInfoService:MemberPersonalInfoService,
    private reportService: ReportsService,
    private settingService: SettingService,
    // private rptService:ReportService,
    private toastrService:ToastrService) { }

  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.moduleId=AuthService.CurrentModuleId;
    this.createForm();
    this.getAllYear();
    this.getEmployees();
  }
createForm(){
  this.leaveRptForm=this.formBuilder.group({
    ID:[,[]],
    compId:[this.compId],
    yearId: [, []],
    memberCode:[,[]]
  })
}
onSelectYear(years:any){

if(years){
  this.leaveRptForm.patchValue({
    yearId:years.id
  })

}

}
selectEmployee(emp:any){
if(emp){
  this.leaveRptForm.patchValue({
    memberCode:emp.memberCode
  })
}
else{
  this.leaveRptForm.patchValue({
    memberCode:null
  })
}
}
getEmployees(){
  this.memberPersonalInfoService.getAllEmployeeInfo().subscribe((result:any)=>{
    if(result){
      this.employees = result.filter(c=>c.moduleID==this.moduleId);
    }
    this.isLoading = false;
  })
}

get f(){
  return this.leaveRptForm.controls;
}
get formVal(){
  return this.leaveRptForm.value;
}
getAllYear(){
  this.settingService.getAllYear().subscribe((response:any)=>{
    if(response){
     this.years=response as any[];
     }
    else{
      return;
    }
  })
}

onPrint() {
  console.log(this.f.yearId.value,this.f.memberCode.value)
  this.reportService.getLeavePDFReport(this.f.yearId.value,this.f.memberCode.value).subscribe((x:any)=>{
    console.log(x)
    this.reportService.openFileWindow(x);
    console.log(x)
  })


}
}
