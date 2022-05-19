import { NgbDateCustomParserFormatter } from './../../../../shared/dateformat';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './../../../../services/auth.service';
import { EmpGenInfoService } from './../../../../services/hr/empGenInfo.service';
import { ActionTypeModel } from './../../../../models/hr/actionType.model';
import { EmpTypeModel } from './../../../../models/hr/empType.model';
import { Component, OnInit } from '@angular/core';
import { SettingService } from '../../../../services/settings/Setting.service';
import { MemberSearchModel } from '../../../../models/settings/memberSearch.model';
import { LeaveService } from '../../../../services/hr/leave.service';
import { MemberPersonalInfoService } from '../../../../services/member-personal-info.service';

@Component({
  selector: 'app-employment-info',
  templateUrl: './employment-info.component.html',
  styleUrls: ['./employment-info.component.scss']
})
export class EmploymentInfoComponent implements OnInit {
  btnStatus: string = 'Save';
  compId: number;
  userId: number;
  moduleId: number;
  dateDiff: number = 0;
  employees: MemberSearchModel[] = [];
  empTypes: EmpTypeModel[] = [];
  actionTypes: ActionTypeModel[];
  leaveCategory:any[]=[];
  employmentInfoForm: FormGroup;
  isSubmitted: boolean = false;
  memberInfo:any[]=[] ;
  constructor(
    private empService: EmpGenInfoService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private dateformat: NgbDateCustomParserFormatter,
    private settingService: SettingService,
    private leaveService:LeaveService,
    private memPersonalService: MemberPersonalInfoService
  ) { }

  ngOnInit() {
    this.compId = AuthService.CompanyId;
    this.userId = AuthService.UserId;
    this.moduleId = AuthService.CurrentModuleId;
     this.getAllEmpTypes();
     this.getAllActionTypes();
    // this.getEmployees();
     this.createForm();
     this.getLeaveCategories();
    this.getAllAssMemberInfo();
  }
  getAllAssMemberInfo(){
    this.memPersonalService.getAllEmployeeInfo().subscribe((response:any)=>{
      if(response){
        console.log(response);
        this.memberInfo=response;

      }else
      {
        this.memberInfo=[];
      }
    })
  }
  save() {
    this.isSubmitted=true;
    if(this.employmentInfoForm.invalid){
      this.toastr.warning("Fill Required Fields");
    }
    else{

    this.empService.saveUpdateEmploymentInfo(this.employmentInfoForm.value).subscribe((result: any) => {
      if (result) {
        this.toastr.success("Success");
        this.reset();
      }
      else {
        this.toastr.error("Error");
      }
    })
  }}


  getEmployees() {
    this.settingService.employmentGetAllMemberByModuleCompany(this.moduleId, this.compId).subscribe((reasult: any) => {
      if (reasult) {
        this.employees = reasult.reasult as MemberSearchModel[];
      }
    })
  }
  onCngJoindate() {
    let ngbDate = this.dateformat.dateToNgbDate(this.employmentInfoForm.controls.joinDate.value);
    ngbDate.month = ngbDate.month + 6;
    if (ngbDate.month > 12) {
      ngbDate.month -= 12
      ngbDate.year += 1;
    }
    this.employmentInfoForm.patchValue({
      ngbConfirmationDate: ngbDate,
      ngbProConfirmationDate:ngbDate,
      ngbActionDate:ngbDate
    })
  }

  getAllEmpTypes() {
    this.empService.getAllEmpType().subscribe((result: any) => {
      if (result) {
        this.empTypes = result as EmpTypeModel[];
      } else {
        return;
      }
    })
  }
  getAllActionTypes() {
    this.empService.getAllActionType().subscribe((result: any) => {
      if (result) {
        console.log(result);
        this.actionTypes = result;
      } else {
        return;
      }
    })
  }

  getLeaveCategories(){
    this.leaveService.getLeaveCategory().subscribe((response:any)=>{
      if(response){
        this.leaveCategory=response;
      }else
      {
        this.leaveCategory=[];
      }
    })
  }
  getEmploymentInfoByMemberCode(empInfo: any) {
    if (empInfo == null || empInfo===undefined) {
      this.createForm();
      return;
    }
    else {
      console.log(empInfo.memberCode)
      this.employmentInfoForm.controls.memberCode.setValue(empInfo.memberCode);
      this.employmentInfoForm.controls.memberName.setValue(empInfo.memberName);
      this.employmentInfoForm.controls.memberID.setValue(empInfo.memberID);
      this.empService.getEmploymentInfoByMemberCodeNew(empInfo.memberCode).subscribe((reasult: any) => {
        if (reasult) {
          console.log(reasult);

          let employmentInfo = reasult[0];

         if(employmentInfo){
          this.btnStatus = 'Update';
          if (employmentInfo.joinDate == null) {
            this.employmentInfoForm.controls.ngbJoinDate.setValue(null);
          }
          else {
            this.employmentInfoForm.controls.ngbJoinDate.setValue(this.dateformat.getYyyymmddToNgbDate(employmentInfo.joinDate.toString()));
          }
          if (employmentInfo.confirmationDate == null) {
            this.employmentInfoForm.controls.confirmationDate.setValue(null);
          }
          else {
            this.employmentInfoForm.controls.ngbConfirmationDate.setValue(this.dateformat.getYyyymmddToNgbDate(employmentInfo.confirmationDate.toString()));
          }
          if (employmentInfo.proConfirmationDate == null) {
            this.employmentInfoForm.controls.proConfirmationDate.setValue(null);
          }
          else {
            this.employmentInfoForm.controls.ngbProConfirmationDate.setValue(this.dateformat.getYyyymmddToNgbDate(employmentInfo.proConfirmationDate.toString()));
          }
          if (employmentInfo.actionDate == null) {
            this.employmentInfoForm.controls.ngbActionDate.setValue(null);
          }
          else {
            this.employmentInfoForm.controls.ngbActionDate.setValue(this.dateformat.getYyyymmddToNgbDate(employmentInfo.actionDate.toString()));
          }
          this.employmentInfoForm.patchValue(employmentInfo);
          this.employmentInfoForm.controls.actionTypeId.setValue(employmentInfo.actionTypeId);
         }
        }
        else {
          this.createForm();
          this.employmentInfoForm.controls.memberCode.setValue(empInfo.memberCode);
          this.employmentInfoForm.controls.memberID.setValue(empInfo.memberId);
          this.btnStatus = "Save";
          return;
        }
      })
    }
  }


  get f() {
    return this.employmentInfoForm.controls;
  }

  get formVal() {
    return this.employmentInfoForm.value;
  }
  createForm() {
    this.employmentInfoForm = this.fb.group({
      id: [, []],
      memberCode: [, []],
      memberName:[,[]],
      joinDate: [, []],
      ngbJoinDate: [, []],
      departmentId: [, []],
      designationId: [, []],
      sectionId: [0, []],
      empTypeId: [, []],
      confirmationDate: [, []],
      ngbConfirmationDate: [, []],
      proConfirmationDate: [, []],
      ngbProConfirmationDate: [, []],
      jobDescription: [, []],
      jobLocationId: [, []],
      actionTypeId: [1, []],
      actionDate: [, []],
      ngbActionDate: [, []],
      compId: [this.compId, []],
      userId: [this.userId, []],
      moduleId: [this.moduleId, []],
      groupID: [, []],
      leaveID: [, []],
      reason: [, []],
      memberID:[,[]]
    })
  }

  reset() {
    this.btnStatus = 'Save';
    this.isSubmitted = false;
    this.createForm();
  }
}
