import { id } from '@swimlane/ngx-datatable/release/utils';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { EmpSearchModel } from '../../../../models/hr/empSearch.model';
import { PeriodModel } from '../../../../models/hr/period.model';
import { ReportModel } from '../../../../models/settings/app-settings/report-model';
import { AuthService } from '../../../../services/auth.service';
// import { ReportService } from '../../../../services/report.service';
import { SettingService } from '../../../../services/settings/Setting.service';
import { NgbDateCustomParserFormatter } from '../../../../shared/dateformat';
import { Helper } from '../../../../shared/helper';

@Component({
  selector: 'app-hr-payroll-report',
  templateUrl: './hr-payroll-report.component.html',
  styleUrls: ['./hr-payroll-report.component.scss']
})
export class HrPayrollReportComponent implements OnInit {
  hrRptForm:FormGroup;
  employees:any[]=[];
  @Input() moduleId:number=37;
  @Input() childModuleId:number=36;
  compId:number;
  @Input ()pageId:number;
  @Input() title:string="HR Reports"
  isLoading:boolean;
  periodId:number;
  periodItem:PeriodModel[]=[];
  isSubmmited:boolean;
  reports:ReportModel[]=[];
  // exportTypes: any[] = this.rptService.exportTypes();
  reportId:number;
  constructor(private fb:FormBuilder,
  //  private rptService:ReportService ,
   private settingService:SettingService,
   private toastrService:ToastrService,
   private dateService:NgbDateCustomParserFormatter) { }

  ngOnInit() {
    this.compId=AuthService.CompanyId;
    // this.moduleId=AuthService.CurrentModuleId;
    this.pageId=AuthService.CurrentPageId;
   this.createForm();
   this.getEmployees();
   this.getAllPeriod();
   this.getReportInfo();
  }
  selectEmployee(emp:any){
    if(emp){
      this.hrRptForm.patchValue({
        memberCode:emp.memberCode
      })
    }
    else{
      this.hrRptForm.patchValue({
        memberCode:null
      })
    }
    }
    selectDept(dept){
      if(dept){
        this.hrRptForm.patchValue({
          departmentId:dept.id
        })
      }
      else{
        this.hrRptForm.patchValue({
          departmentId:null
        })
      }
    }
    getAllPeriod(){
      this.settingService.getAllPeriod(this.compId,this.moduleId).subscribe((result:any)=>{
        if(result){
          this.periodItem=result as PeriodModel[];
        }else{
          this.periodItem=[];
        }
      },(err:any)=>{
        this.toastrService.error(err.error,"Failed")
      })
      }
    getEmployees(){
      this.settingService.getAllMemberByModuleCompany(30,this.compId).subscribe((result:any)=>{
        if(result){
          this.employees = result.reasult as EmpSearchModel[];
        }
        this.isLoading = false;
      })
    }

    get f(){
      return this.hrRptForm.controls;
    }
    get formVal(){
      return this.hrRptForm.value;
    }
createForm(){
  this.hrRptForm=this.fb.group({
    id:[0,[]],
    memberCode:[,[]],
    reportId:[null,[Validators.required]],
    ExportType:['pdf',[]],
    groupID:[,[]],
    periodId:[,[]],
    SectionID:[,[]],
    Period:[,[]],
    Description:[,[]],
    StartDate:[this.dateService.getDateToYyyymmdd(new Date()),[]],
    EndDate:[this.dateService.getDateToYyyymmdd(new Date()),[]],
    departmentId:[,[]],
    designationId:[,[]],
  })
}
onSelectPeriod(period:any){
if(period){
  this.hrRptForm.patchValue({
    periodId:period.id,
    Period:period.periodName,
    StartDate:period.startDate,
    EndDate:period.endDate
  })
}
}
onSelectGroup(group:any){
if(group){
  this.hrRptForm.patchValue({
    groupID:group.id,
    Description:group.description
  })
}
}
getReportInfo() {

}

onExport() {

}
isInvalid(fieldName): boolean {
  return Helper.isInvalidControl(
    fieldName,
    this.hrRptForm,
    this.isSubmmited
  );
}
}
