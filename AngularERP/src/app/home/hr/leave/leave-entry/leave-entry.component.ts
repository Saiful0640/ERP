import { SettingService } from './../../../../services/settings/Setting.service';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LeaveService } from './../../../../services/hr/leave.service';
import { AuthService } from './../../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { NgbDateCustomParserFormatter } from '../../../../shared/dateformat';

@Component({
  selector: 'app-leave-entry',
  templateUrl: './leave-entry.component.html',
  styleUrls: ['./leave-entry.component.scss']
})
export class LeaveEntryComponent implements OnInit {
  moduleID: number;
  compId: number;
  userId: number;
  leaveCategories: any[];
  leaveCategoriesByMemberCode:any[]=[];
  leaveBalence: any[];
  leaveEntries: any[];
  years: any[];
  lventryForm: FormGroup;
  appType: number = 0;//Leave Apply Time
  btnStatus: string = "Save";
  enableMinus: boolean = true;
  constructor(
    private leaveService: LeaveService,
    private formBuilder: FormBuilder,
    private toaster: ToastrService,
    public dateformat: NgbDateCustomParserFormatter,
    private settingService: SettingService,
  ) { }

  ngOnInit() {
    this.compId = AuthService.CompanyId;
    this.userId = AuthService.UserId;
    this.moduleID = AuthService.CurrentModuleId;
    this.getLeaveCategories();
    this.createForm();
    this.getAllYear();
  }
  getLeaveCategories() {
    this.leaveService.getAllLeaveTypeByGrade().subscribe((result: any) => {
      if (result) {
        //1, this.moduleID, this.compId
        this.leaveCategories = result as any[];
      }
      else {
        return;
      }
    })
  }
onSubmit(){
  if(this.btnStatus=="Save"){
    this.saveLeaveEntry();
  }else{
    this.updateLeaveEntry();
  }
}
  saveLeaveEntry() {
    this.leaveService.saveLeaveEntry(this.lventryForm.value).subscribe((result: any) => {
      if (result) {
        this.toaster.success("Success");
        this.reset();
      }
      else {
        this.toaster.error("Error");
      }
    })
  }
  updateLeaveEntry() {
    this.leaveService.updateLeaveEntry(this.lventryForm.value).subscribe((result: any) => {
      if (result) {
        this.toaster.success("Success");
        this.reset();
      }
      else {
        this.toaster.error("Error");
      }
    })
  }
  getleaveTypeByMemberCode(memberCode: string) {
    this.leaveService.getLeaveTypeByMemberCode(memberCode).subscribe((reasult: any) => {
      if (reasult) {
        this.leaveCategoriesByMemberCode = reasult;
        this.lventryForm.patchValue({
          memberCode:memberCode
        })
      }
      else {
        this.leaveCategoriesByMemberCode;
      }
    })
  }
  onSelectYear(year){
    if(year){
      this.lventryForm.patchValue({
        currentYear:year.id
      })
     
      
     let yearID=(year.startDate).substring(0,4);
      this.getLeaveBalenceByMemberCode(this.formVal.memberCode,yearID)
    }
  }
  getLeaveBalenceByMemberCode(memberCode,yearId) {
    this.leaveService.getLeaveBalenceByMemberCode(memberCode,yearId).subscribe((response: any) => {
      if (response) {
        //, this.compId
        this.leaveBalence = response;
        console.log(response,"getLeaveBalenceByMemberCode")
      }
      else {
        this.leaveBalence = [];
      }
    })
  }

  getAllLeaveEntry(memberCode: string) {
    this.leaveService.getAllLeaveEntry(memberCode).subscribe((result: any) => {
      if (result) {
        //this.compId, , this.moduleID
        this.leaveEntries = result;
        console.log(result,"getAllLeaveEntry")
      } else {
        this.toaster.error(result)
      }
    })
  }
  getById(id: number) {
    this.leaveService.getLeaveByID(id).subscribe((reasult: any) => {
      if (reasult) {
        this.btnStatus = "Update";
        let leave = reasult;
        this.lventryForm.patchValue(leave);
        this.lventryForm.controls.aDateNgb.setValue(this.dateformat.getYyyymmddToNgbDate(leave.aDate));
        this.lventryForm.controls.sDateNgb.setValue(this.dateformat.getYyyymmddToNgbDate(leave.sDate));
        this.lventryForm.controls.eDateNgb.setValue(this.dateformat.getYyyymmddToNgbDate(leave.eDate));
        let yearID=(this.formVal.sDate).substring(0,4);
         this.getLeaveBalenceByMemberCode(this.formVal.memberCode,yearID)

      }
    })
  }

  createForm() {
    this.lventryForm = this.formBuilder.group({
      id: [, []],
      memberCode: [, []],
      aDate: [, []],
      aDateNgb: [, []],
      sDate: [, []],
      sDateNgb: [, []],
      eDate: [, []],
      yearId: [, []],
      eDateNgb: [, []],
      duration: [, []],
      categoryId: [, []],
      reason: [, []],
      compId: [this.compId, []],
      userId: [this.userId, []],
      moduleId: [this.moduleID, []],
      appType: [this.appType, []],
      currentYear: [new Date().getFullYear(), []]
    })

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
  dateDiff() {
    let sDate = this.dateformat.getYyyymmddToNgbDate(this.lventryForm.controls.sDate.value);
    let eDate = this.dateformat.getYyyymmddToNgbDate(this.lventryForm.controls.eDate.value);
    if (sDate == null || eDate == null) {
      return;
    }
    else {
      let datediff = this.dateformat.getDateDiff(sDate, eDate);
      this.lventryForm.controls.duration.setValue(datediff);
    }
  }
  minusDate() {
    let duration = this.formVal.duration;
    if (duration == null) {
      this.toaster.warning("Give Date First");
    }
    else {
      let minusDate = duration - .5;
      this.lventryForm.controls.duration.setValue(minusDate);
      this.enableMinus = false;
    }
  }
  get f() {
    return this.lventryForm.controls;
  }
  reset() {
    this.enableMinus = true;
    this.btnStatus = "Save";
    this.createForm();
    this.leaveEntries=[];
    this.leaveBalence=[];
    this.lventryForm.controls.aDateNgb.setValue('');
    this.lventryForm.controls.sDateNgb.setValue('');
    this.lventryForm.controls.eDateNgb.setValue('');
  }
  get formVal() {
    return this.lventryForm.value;
  }

}
