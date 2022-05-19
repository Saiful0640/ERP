import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../services/auth.service';
import { PayrollServiceService } from '../../../../services/payroll/payroll-service.service';
import { Helper } from '../../../../shared/helper';

@Component({
  selector: 'app-salary-process',
  templateUrl: './salary-process.component.html',
  styleUrls: ['./salary-process.component.scss']
})
export class SalaryProcessComponent implements OnInit {
  moduleId: number;
  formGroup: FormGroup;
  userID: number;
  arrayForm: FormArray;
  salaryProcess: any[] = [];
  memberInfo: any[] = [];
  compId: number;
  btnStatus: string = 'Save';
  isSubmit: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private payrollService: PayrollServiceService,
    private toastr: ToastrService,
  ) {
    this.arrayForm = this.formBuilder.array([]);
  }
  ngOnInit() {
    this.compId = AuthService.CompanyId;
    this.moduleId = AuthService.CurrentModuleId;
    this.userID = AuthService.UserId;
    this.createForm();
    this.getMemberInfo();
  }
  getMemberInfo() {
    this.payrollService.getNameAndCode(this.compId, 30).subscribe((response: any) => {
      if (response.status) {
        this.memberInfo = response.result;
      } else {
        this.memberInfo = [];
      }
    })
  }
  getTotalAdditionDeduction(index: number) {
    let totalAddition = 0;
    let totalDeduction = 0;
    let payableAmount = 0;
    let grossSalary = Number(this.detailsFormVal(index, 'grossSalary'));
    let tadaAmount = Number(this.detailsFormVal(index, 'tadaAmount'));
    let overTimeAmount = Number(this.detailsFormVal(index, 'overTimeAmount'));
    let meetingAmount = Number(this.detailsFormVal(index, 'meetingAmount'));
    let absentAmount = Number(this.detailsFormVal(index, 'absentDeductAmount'));
    let lateAmount = Number(this.detailsFormVal(index, 'lateDeductAmount'));
    let providentFund = Number(this.detailsFormVal(index, 'providentFund'));
    let loanAmount = Number(this.detailsFormVal(index, 'loanAmount'));
    let extentMobileAmount = Number(this.detailsFormVal(index, 'extentMobileBill'));
    let advanceAmount = Number(this.detailsFormVal(index, 'advanceAmount'));
    let fineAmount = Number(this.detailsFormVal(index, 'fine'));
    let stampAmount = Number(this.detailsFormVal(index, 'stampAmount'));
    let taxAmount = Number(this.detailsFormVal(index, 'incomeTax'));
    totalAddition = (grossSalary + overTimeAmount + tadaAmount + meetingAmount);
    totalDeduction = (extentMobileAmount + advanceAmount + fineAmount + taxAmount + absentAmount + lateAmount + providentFund + loanAmount + stampAmount);
    payableAmount = (totalAddition - totalDeduction)
    this.arrayForm.controls[index].patchValue({
      totalDeductAmount: totalDeduction,
      netPayment: payableAmount.toFixed(0)
    })
  }
  deleteSalary() {
    let sectionID: number;
    if (this.formGroup.controls.sectionID.value == null) {
      sectionID = 0;
    }
    else {
      sectionID = this.formGroup.controls.sectionID.value;
    }
    this.payrollService.deleteProcessedSalary(this.formGroup.controls.periodID.value,
      this.formGroup.controls.groupID.value,
      sectionID,
      this.compId).subscribe((response: any) => {
        if (response.status) {
          this.toastr.error("Deleted");
          this.reset();
        }
        else {
          return;
        }
      })
  }
  getSalaryProcess() {
    let sectionID: number;
    if (this.formGroup.controls.sectionID.value == null) {
      sectionID = 0;
    }
    else {
      sectionID = this.formGroup.controls.sectionID.value;
    }
    this.payrollService.getMonthlyProcessedSalary(this.formGroup.controls.periodID.value,
      this.formGroup.controls.groupID.value,
      sectionID,
      this.compId).subscribe((response: any) => {
        if (response.status) {
          this.btnStatus = 'Update';
          let salaryList = response.result as any[];
          this.formGroup.patchValue({
            narration: salaryList[0].narration,
            sectionID: salaryList[0].sectionID,
            groupID: salaryList[0].groupID,
          })
          this.arrayForm = this.formBuilder.array([]);
          salaryList.forEach(c => {
            this.arrayForm.push(
              new FormGroup({
                empCode: new FormControl(c.empCode, []),
                empName: new FormControl(c.empName, []),
                memberName: new FormControl(c.empName, []),
                memberID: new FormControl(c.memberID, []),
                grossSalary: new FormControl(c.grossSalary, []),
                workingDays: new FormControl(c.workingDays, []),
                absentDays: new FormControl(c.absentDays, []),
                totalPressent: new FormControl(c.totalPressent, []),
                lateDays: new FormControl(c.lateDays, []),
                leaveDays: new FormControl(c.leaveDays, []),
                tourDays: new FormControl(c.tourDays, []),
                overTimeHour: new FormControl(c.overTimeHour, []),
                overTimeAmount: new FormControl(c.overTimeAmount, []),
                tadaAmount: new FormControl(c.tadaAmount, []),
                meetingAmount: new FormControl(c.meetingAmount, []),
                absentDeductAmount: new FormControl(c.absentDeductAmount.toFixed(2), []),
                lateDeductAmount: new FormControl(c.lateDeductAmount.toFixed(2), []),
                providentFund: new FormControl(c.providentFund, []),
                stampAmount: new FormControl(c.stampAmount, []),
                loanAmount: new FormControl(c.loanAmount, []),
                extentMobileBill: new FormControl(c.extentMobileBill, []),
                advanceAmount: new FormControl(c.advanceAmount, []),
                fine: new FormControl(c.fine, []),
                incomeTax: new FormControl(c.incomeTax, []),
                totalDeductAmount: new FormControl(c.totalDeductAmount, []),
                netPayment: new FormControl(c.netPayment.toFixed(0), []),
                paymentMethod: new FormControl(c.paymentMethod, []),
              })
            )
          })
        }
        else {
          this.payrollService.getSalaryProcessMonthly(
            this.formGroup.controls.periodID.value,
            this.formGroup.controls.groupID.value,
            sectionID,
            this.compId
          ).subscribe((response: any) => {
            if (response.status) {
              let reasult = response.result as any[];
              this.arrayForm = this.formBuilder.array([]);
              reasult.forEach(c => {
                let stampAmount = 0;
                let totalAddition = 0;
                let totalDeduction = 0;
                let payableAmount = 0;
                let perdayWiseAmount = (c.grossSalary / c.workingDays);
                let absDeductionAmount = perdayWiseAmount * c.absentDays;
                let lateDeductionAmount = perdayWiseAmount * c.lateDays;
                if (c.paymentMethod == 2) {// 2 for cash payment
                  stampAmount = 10;
                }
                totalAddition = (c.grossSalary + c.overTimeAmount + c.payableAmount);
                totalDeduction = (c.incomeTax + absDeductionAmount + c.loanAmount + lateDeductionAmount + c.pf + stampAmount);
                payableAmount = (totalAddition - totalDeduction)
                this.arrayForm.push(
                  new FormGroup({
                    empCode: new FormControl(c.memberCode, []),
                    empName: new FormControl(c.memberName, []),
                    memberName: new FormControl(c.memberName, []),
                    memberID: new FormControl(c.memberID, []),
                    grossSalary: new FormControl(c.grossSalary, []),
                    workingDays: new FormControl(c.workingDays, []),
                    absentDays: new FormControl(c.absentDays, []),
                    totalPressent: new FormControl(c.totalPresentDays, []),
                    lateDays: new FormControl(c.lateDays, []),
                    leaveDays: new FormControl(c.leaveDays, []),
                    tourDays: new FormControl(c.tourDays, []),
                    overTimeHour: new FormControl(c.overTimeHours, []),
                    overTimeAmount: new FormControl(c.overTimeAmount, []),
                    tadaAmount: new FormControl(c.payableAmount, []),
                    meetingAmount: new FormControl(c.meetingAmount, []),
                    absentDeductAmount: new FormControl(absDeductionAmount.toFixed(2), []),
                    lateDeductAmount: new FormControl(lateDeductionAmount.toFixed(2), []),
                    providentFund: new FormControl(c.pf, []),
                    stampAmount: new FormControl(stampAmount, []),
                    loanAmount: new FormControl(c.loanAmount, []),
                    extentMobileBill: new FormControl(c.extentMobileBill, []),
                    advanceAmount: new FormControl(c.advanceAmount, []),
                    fine: new FormControl(c.fine, []),
                    incomeTax: new FormControl(c.incomeTax, []),
                    totalDeductAmount: new FormControl(totalDeduction, []),
                    totalAdditionAmount: new FormControl(null, []),
                    netPayment: new FormControl(payableAmount.toFixed(0), []),
                    paymentMethod: new FormControl(c.paymentMethod, []),
                  })
                )
              })
            }
            else {
              this.arrayForm = this.formBuilder.array([]);
            }
          })
        }
      })
  }

  saveData() {
    this.isSubmit = true;
    if (this.formGroup.invalid) {
      this.toastr.error("Please fill the required fields")
      return;
    }
    const salary = {
      salaryList: this.arrayForm.value,
      salaryDetails: this.formGroup.value
    }
    this.payrollService.saveSalaryProcessMonthly(salary).subscribe((response: any) => {
      if (response.status) {
        if (this.btnStatus == 'Save') {
          this.toastr.success("Save Successfully");
          this.reset();
        }
        else {
          this.toastr.success("Update Successfully");
          this.reset();
        }
      }
    }, (err: any) => {
      this.toastr.error(err.error, "Please fill the required fields")
      this.reset();
      this.isSubmit = false;
    })
  }

  addRow() {
    this.arrayForm.push(
      new FormGroup({
        empCode: new FormControl(null, []),
        empName: new FormControl(null, []),
        memberName: new FormControl(null, []),
        memberID: new FormControl(null, []),
        grossSalary: new FormControl(null, []),
        basic: new FormControl(null, []),
        houseRent: new FormControl(null, []),
        medical: new FormControl(null,[]),
        convance: new FormControl(null, []),
        workingDays: new FormControl(null, []),
        absentDays: new FormControl(null, []),
        totalPressent: new FormControl(null, []),
        lateDays: new FormControl(null, []),
        leaveDays: new FormControl(null, []),
        overTimeAmount: new FormControl(null, []),
        absentDeductAmount: new FormControl(null, []),
        loanAmount: new FormControl(null, []),
        advanceAmount: new FormControl(null, []),
        incomeTax: new FormControl(null, []),
        totalDeductAmount: new FormControl(null, []),
        totalAdditionAmount: new FormControl(null, []),
        netPayment: new FormControl(null, []),
        paymentMethod: new FormControl(null, []),
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
    Helper.focusNgSelect('txtDepartmentId');
  }
  onSelectGroup(group: any) {
    this.formGroup.patchValue({
      groupID: group.id
    })
    Helper.focusTextField('btnLoad');
  }
  onSelectDepartment(section: any) {
    this.formGroup.patchValue({
      departmentID: section.id
    })
    Helper.focusNgSelect('txtGroupId');
  }

  createForm() {
    this.formGroup = this.formBuilder.group({
      id: [0, []],
      compId: [this.compId, []],
      moduleId: [this.moduleId, []],
      periodID: [, []],
      groupID: [, []],
      sectionID: [, []],
      departmentID: [, []],
      narration: [, []],
      userID: [this.userID, []]
    })
  }
  reset() {
    this.btnStatus = "Save";
    this.createForm();
    this.arrayForm = this.formBuilder.array([]);
    this.addRow();
  }
  get f() {
    return this.formGroup.controls;
  }
  detailsFormVal(index, fieldName) {
    return this.arrayForm.controls[index].get(fieldName).value;
  }
}
