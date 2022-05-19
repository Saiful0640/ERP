import { AuthService } from './../../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PayrollServiceService } from '../../../../services/payroll/payroll-service.service';
import { Helper } from '../../../../shared/helper';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MemberPersonalInfoService } from '../../../../services/member-personal-info.service';
import { Monthlyattendence } from '../../../../models/payroll/monthlyattendence.model';

@Component({
  selector: 'app-monthly-attendence',
  templateUrl: './monthly-attendence.component.html',
  styleUrls: ['./monthly-attendence.component.scss']
})
export class MonthlyAttendenceComponent implements OnInit {
  moduleId: number=37;
  userId: number;
  formGroup: FormGroup;
  attendenceList: any[] = [];
  memberInfo: any[] = [];
  arrayForm: FormArray;
  compId: number;
  workDays: number;
  workingDays: number;
  btnStatus: string = 'Save';
  isSubmit: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private payrollService: PayrollServiceService,
    private memberPersonalInfoService:MemberPersonalInfoService,
    private toastr: ToastrService,
    public modalService: NgbModal,
  ) {
    this.arrayForm = this.formBuilder.array([]);
  }

  ngOnInit() {
    this.compId = AuthService.CompanyId;
    //this.moduleId = AuthService.CurrentModuleId;
    this.userId = AuthService.UserId;
    Helper.focusNgSelect('txtPeriodId');
    this.createForm();
    this.addRow();
    this.getMemberInfo();
    for (let i; i <= i + 1; i++) {
      this.presentDaysCalculation(i);
    }
  }
 
  getMemberInfo() {
    this.memberPersonalInfoService.getAllEmployeeInfo().subscribe((response: any) => {
      if (response) {
      //  this.compId, 30
        this.memberInfo = response.filter(c=>c.moduleID==30);
      } else {
        this.memberInfo = [];
      }
    })
  }
  onSeelctEmpName(emp,rowindex){
    if(emp){
      this.arrayForm.controls[rowindex].patchValue({
        empCode: emp.memberCode,
        empName: emp.memberName
      })}else{
        this.arrayForm.controls[rowindex].patchValue({
          empCode: null,
          empName: null
        })
      }
  }
  presentDaysCalculation(index: number) {
    debugger;
    let totalDays = 0;
    let absentDays = 0;
    let lateDays = 0;
    let leaveDays = 0;
    let tdaAbsentDays = 0;
    let tdaLeaveDays = 0;
    let tdatourDays = 0;
    let tdatotalDays = 0;
    let otHours = 0;
    let grossSalary = 0;
    let paymentAmount = 0;
    let paymentType = 0;
    let month = 0;
    let day = 0;
    let payableAmount = 0;
    totalDays = Number(this.detailsFormVal(index, 'workingDays'));
    absentDays = Number(this.detailsFormVal(index, 'absentDays'));
    lateDays = Number(this.detailsFormVal(index, 'lateDays'));
    leaveDays = Number(this.detailsFormVal(index, 'leaveDays'));
    this.arrayForm.controls[index].patchValue({
      tdaAbsentDays: absentDays,
      tdaLeaveDays: leaveDays
    })
    tdaAbsentDays = Number(this.detailsFormVal(index, 'tdaAbsentDays'));
    tdaLeaveDays = Number(this.detailsFormVal(index, 'tdaLeaveDays'));
    tdatourDays = Number(this.detailsFormVal(index, 'tourDays'));
    tdatotalDays = Number(this.detailsFormVal(index, 'tdaWorkingDays'));
    otHours = Number(this.detailsFormVal(index, 'overTimeHours'));
    grossSalary = Number(this.detailsFormVal(index, 'grossSalary'));
    paymentAmount = Number(this.detailsFormVal(index, 'paymentAmount'));
    paymentType = Number(this.detailsFormVal(index, 'paymentType'));
    month = this.f.pmWise.value;
    day = this.f.pdWise.value;
    let otAmount = (grossSalary / 240) * otHours
    let daysAfterAllDeduction = totalDays - (absentDays + lateDays)
    let tdaDaysAfterAllDeduction = tdatotalDays - (tdaAbsentDays + tdaLeaveDays + tdatourDays)
    if (paymentType == 2) {
      payableAmount = paymentAmount * tdaDaysAfterAllDeduction;
    } else if (paymentType == 3) {
      payableAmount = (paymentAmount / month) * tdaDaysAfterAllDeduction;
    }
    this.arrayForm.controls[index].patchValue({
      totalPressentDays: daysAfterAllDeduction,
      payableDays: tdaDaysAfterAllDeduction,
      overTimeAmount: otAmount.toFixed(2),
      payableAmount: payableAmount
    })
  }
  tdapresentDaysCalculation(index: number) {
    let tdaAbsentDays = 0;
    let tdaLeaveDays = 0;
    let tdatourDays = 0;
    let tdatotalDays = 0;
    let otHours = 0;
    let grossSalary = 0;
    let paymentAmount = 0;
    let paymentType = 0;
    let month = 0;
    let day = 0;
    let payableAmount = 0;
    let penalty = 0;
    let payableAmountAfterDeduct = 0;
    tdaAbsentDays = Number(this.detailsFormVal(index, 'tdaAbsentDays'));
    tdaLeaveDays = Number(this.detailsFormVal(index, 'tdaLeaveDays'));
    tdatourDays = Number(this.detailsFormVal(index, 'tourDays'));
    tdatotalDays = Number(this.detailsFormVal(index, 'tdaWorkingDays'));
    otHours = Number(this.detailsFormVal(index, 'overTimeHours'));
    grossSalary = Number(this.detailsFormVal(index, 'grossSalary'));
    paymentAmount = Number(this.detailsFormVal(index, 'paymentAmount'));
    paymentType = Number(this.detailsFormVal(index, 'paymentType'));
    penalty = Number(this.detailsFormVal(index, 'penalty'));
    month = this.f.pmWise.value;
    day = this.f.pdWise.value;
    let otAmount = (grossSalary / 240) * otHours
    let tdaDaysAfterAllDeduction = tdatotalDays - (tdaAbsentDays + tdaLeaveDays + tdatourDays)
    if (paymentType == 2) {
      payableAmount = paymentAmount * tdaDaysAfterAllDeduction;
    } else if (paymentType == 3) {
      payableAmount = (paymentAmount / month) * tdaDaysAfterAllDeduction;
    }
    payableAmountAfterDeduct = payableAmount - penalty;
    this.arrayForm.controls[index].patchValue({
      payableDays: tdaDaysAfterAllDeduction,
      overTimeAmount: otAmount.toFixed(2),
      payableAmount: payableAmountAfterDeduct.toFixed(2)
    })
  }
  onMonthDays(){
    for(let i=0;this.arrayForm.length>i;i++){
      this.arrayForm.controls[i].patchValue({
        workingDays: this.f.workDays.value,
        totalPressentDays: this.f.workDays.value
       
      })
    }
  }
   onpdwide(){
    for(let i=0;this.arrayForm.length>i;i++){
      this.arrayForm.controls[i].patchValue({
        tdaWorkingDays: this.f.pdWise.value,
        payableDays: this.f.pdWise.value
       
      })
    }
  }
  getMonthlyAttendance() {
    let sectionID: number;
    let groupId: number;
    let periodId:number;
    if (this.f.periodID.value == null) {
      periodId = 0;
    }
    else {
      periodId = this.f.periodID.value;
    }
    if (this.f.sectionID.value == null) {
      sectionID = 0;
    }
    else {
      sectionID = this.f.sectionID.value;
    }
    if (this.f.groupID.value == null) {
      groupId = 0;
    }
    else {
      groupId = this.f.groupID.value;
    }
    this.payrollService.getMonthlyAttendanceList(periodId, groupId, sectionID).subscribe((response: any) => {
      if (response) {        
        this.attendenceList = response as any[];
       if(this.attendenceList.length>0){
        this.btnStatus = 'Update';
        this.formGroup.patchValue({
          workDays: this.attendenceList[0].workingDays,
          pdWise: this.attendenceList[0].payableDays,
          pmWise: this.attendenceList[0].pmWise,
          comment: this.attendenceList[0].comment,
        })
        this.arrayForm = this.formBuilder.array([]);
        this.attendenceList.forEach(c => {
          this.arrayForm.push(
            new FormGroup({
              id: new FormControl(c.id, []),
              empCode: new FormControl(c.empCode, []),
              empName: new FormControl(c.empName, []),
              memberID: new FormControl(c.memberID, []),
              memberCode: new FormControl(c.empCode, []),
              memberName: new FormControl(c.empName, []),
              workingDays: new FormControl(c.workingDays, []),
              absentDays: new FormControl(c.absentDays, []),
              lateDays: new FormControl(c.lateDays, []),
              leaveDays: new FormControl(c.leaveDays, []),
              totalPressentDays: new FormControl(c.totalPressentDays, []),
              overTimeHours: new FormControl(c.overTimeHours, []),
              overTimeAmount: new FormControl(c.overTimeAmount, []),
              tdaWorkingDays: new FormControl(c.tdaWorkingDays, []),
              amount: new FormControl(c.amount, []),
              tdaAbsentDays: new FormControl(c.tdaAbsentDays, []),
              tdaLeaveDays: new FormControl(c.tdaLeaveDays, []),
              tourDays: new FormControl(c.tourDays, []),
              payableDays: new FormControl(c.payableDays, []),
              penalty: new FormControl(c.penalty, []),
              payableAmount: new FormControl(c.payableAmount, []),
              remarks: new FormControl(c.remarks, []),
              grossSalary: new FormControl(c.grossSalary),
              paymentAmount: new FormControl(c.paymentAmount),
              paymentType: new FormControl(c.paymentType),
            })
          )
        })
       }else{
        this.payrollService.getAllEmploymentList(20, groupId, sectionID).subscribe((payresponse: any) => {
            let allemploymentInfo=payresponse;
          this.arrayForm = this.formBuilder.array([]);
          allemploymentInfo.forEach(c => {
          this.arrayForm.push(
            new FormGroup({
              id: new FormControl(0, []),
              empCode: new FormControl(c.memberCode, []),
              empName: new FormControl(c.memberName, []),
              memberID: new FormControl(c.memberID, []),
              memberCode: new FormControl(c.memberCode, []),
              memberName: new FormControl(c.memberName, []),
              workingDays: new FormControl(this.f.workDays.value==null?0:this.f.workDays.value, []),
              absentDays: new FormControl(0, []),
              lateDays: new FormControl(0, []),
              leaveDays: new FormControl(0, []),
              totalPressentDays: new FormControl(this.f.workDays.value==null?0:this.f.workDays.value, []),
              overTimeHours: new FormControl(0, []),
              overTimeAmount: new FormControl(0, []),
              tdaWorkingDays: new FormControl(this.f.pdWise.value==null?0:this.f.pdWise.value, []),
              amount: new FormControl(0, []),
              tdaAbsentDays: new FormControl(0, []),
              tdaLeaveDays: new FormControl(0, []),
              tourDays: new FormControl(0, []),
              payableDays: new FormControl(this.f.pdWise.value==null?0:this.f.pdWise.value, []),
              penalty: new FormControl(0, []),
              payableAmount: new FormControl(0, []),
              remarks: new FormControl(0, []),
              grossSalary: new FormControl(0),
              paymentAmount: new FormControl(0),
              paymentType: new FormControl(0),
            })
          )
        })

        })


       
       }
      }
      
    })
  }
  addRow() {
    this.arrayForm.push(
      new FormGroup({
        id: new FormControl(0, []),
        empCode: new FormControl(null, []),
        empName: new FormControl(null, []),
        memberCode: new FormControl(null, []),
        memberName: new FormControl(null, []),
        memberID:new FormControl(null,[]),
        workingDays: new FormControl(null, []),
        absentDays: new FormControl(null, []),
        lateDays: new FormControl(null, []),
        leaveDays: new FormControl(null, []),
        totalPressentDays: new FormControl(null, []),
        overTimeHours: new FormControl(null, []),
        overTimeAmount: new FormControl(null, []),
        tdaWorkingDays: new FormControl(null, []),
        amount: new FormControl(null, []),
        tdaAbsentDays: new FormControl(null, []),
        tdaLeaveDays: new FormControl(null, []),
        tourDays: new FormControl(null, []),
        payableDays: new FormControl(null, []),
        penalty: new FormControl(null, []),
        payableAmount: new FormControl(null, []),
        remarks: new FormControl(null, []),
      })
    )
  }

  removeRow(index: number) {
    this.arrayForm.removeAt(index);
  }

  onSelectPeriod(periods: any) {
    this.formGroup.patchValue({
      periodID: periods.id
    })
    Helper.focusNgSelect('txtgroupId');
  }
  onSelectGroup(group: any) {
    this.formGroup.patchValue({
      groupId: group.id
    })
    Helper.focusNgSelect('txtSectionId');
  }
  onSelectSection(section: any) {
    this.formGroup.patchValue({
      sectionID: section.id
    })
    Helper.focusTextField('txtWorkDays');
  }

  saveData() {
         var filterMAtten=this.arrayForm.value.filter(item=>item.empCode!=null )
    if(filterMAtten.length>0){
      if (this.f.periodID.value==null){
        this.toastr.error("Please Select Period")
      }else{
        for(let i=0;filterMAtten.length>i;i++){
          let mattendence=new Monthlyattendence();
            mattendence.id=filterMAtten[i]['id'],
            mattendence.moduleID=this.moduleId,
            mattendence.compID=this.compId,
            mattendence.periodID=this.f.periodID.value,
            mattendence.groupID=this.f.groupID.value,
            mattendence.sectionID=this.f.sectionID.value,
            mattendence.empCode=filterMAtten[i]['empCode'],
            mattendence.memberID=filterMAtten[i]['memberID'],
            mattendence.workingDays=filterMAtten[i]['workingDays'],
            mattendence.absentDays=filterMAtten[i]['absentDays'],
            mattendence.lateDays=filterMAtten[i]['lateDays'],
            mattendence.leaveDays=filterMAtten[i]['leaveDays'],
            mattendence.totalPressentDays=filterMAtten[i]['totalPressentDays'],
            mattendence.overTimeHours=filterMAtten[i]['overTimeHours'],
            mattendence.overTimeAmount=filterMAtten[i]['overTimeAmount'],
            mattendence.tdaWorkingDays=filterMAtten[i]['tdaWorkingDays'],
            mattendence.tdaLeaveDays=filterMAtten[i]['tdaLeaveDays'],
            mattendence.tdaAbsentDays=filterMAtten[i]['tdaAbsentDays'],
            mattendence.tourDays=filterMAtten[i]['tourDays'],
            mattendence.payableDays=filterMAtten[i]['payableDays'],
            mattendence.penalty=filterMAtten[i]['penalty'],
            mattendence.payableAmount=filterMAtten[i]['payableAmount'],
            mattendence.remarks=filterMAtten[i]['remarks'],
            mattendence.comment=this.f.comment.value
            this.isSubmit = true;
            this.payrollService.saveMonthlyAttendance(mattendence).subscribe((response: any) => {
              if (response) {
                if (this.btnStatus == 'Save') {
                  this.toastr.success("Save Successfully");
                  this.reset();
                }
                else {
                  this.toastr.success("Update Successfully");
                  this.reset();
                }
              }
              else {
                this.toastr.error("fail to Save")
              }
            })
        }
      }
    }



  }


  reset() {
    this.btnStatus = "Save";
    this.createForm();
    this.arrayForm = this.formBuilder.array([]);
    this.addRow();
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      id: [0, []],
      compId: [this.compId, []],
      moduleID: [this.moduleId, []],
      userID: [this.userId, []],
      periodID: [, []],
      groupID: [, []],
      sectionID: [, []],
      workDays: [0, []],
      pdWise: [, []],
      pmWise: [, []],
      comment: [0, []],
      grossSalary: [, []],
      appType: [, []]
    })
  }
  get f() {
    return this.formGroup.controls;
  }
  get formVal() {
    return this.formGroup.value;
  }
  detailsFormVal(index, fieldName) {
    return this.arrayForm.controls[index].get(fieldName).value;
  }
  onEnterOrTabKeyDown(event: KeyboardEvent,  elementId: string) {
    if (event.key=='Tab' || event.key=='Enter' ) {
      Helper.focusTextField(elementId);
      event.preventDefault();
    }
  }

}
