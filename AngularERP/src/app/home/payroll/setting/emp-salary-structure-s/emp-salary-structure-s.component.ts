import { AuthService } from './../../../../services/auth.service';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CenterServiceNameService } from '../../../../services/center-service-name.service';
import { PayrollServiceService } from '../../../../services/payroll/payroll-service.service';

@Component({
  selector: 'app-emp-salary-structure-s',
  templateUrl: './emp-salary-structure-s.component.html',
  styleUrls: ['./emp-salary-structure-s.component.scss']
})
export class EmpSalaryStructureSComponent implements OnInit {
  slaryStructureFrom: FormGroup;
  additionArForm: FormArray;
  detuctionArForm: FormArray;
  moduleID: number;
  hrModuleID:number=30;
  compId: number;
  serviceName: any[] = [];
  enrolment: any[] = []
  btnStatus = "Save";
  isSubmit: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private centerService: CenterServiceNameService,
    private payrollService: PayrollServiceService
  ) {
    this.additionArForm = this.formBuilder.array([]);
    this.detuctionArForm = this.formBuilder.array([])
  }

  ngOnInit() {
    this.compId = AuthService.CompanyId;
    this.moduleID = AuthService.CurrentModuleId;
    this.createForm();
  }
  onSelectEmp(emp: any) {
    if (emp) {
      this.slaryStructureFrom.patchValue({ memberCode: emp.memberCode, memberId: emp.memberId });
      this.getEnrolmentDetails(emp.memberId)
    }
    else {
      return;
    }
  }
  getEnrolmentDetails(memberId: number) {
    if (memberId == 0 || memberId === undefined || memberId == null) {
      return;
    }
    else {
      this.payrollService.getEnrolment(memberId, this.compId, this.moduleID).subscribe((response: any) => {
        if (response.status) {
          this.btnStatus='Update';
          this.enrolment = response.result as any[];
          console.log(this.enrolment);
          this.slaryStructureFrom.patchValue({
            grossSalary: this.enrolment[0].grossSalary,
            incrimentAmount: this.enrolment[0].incrimentAmount,
            paymentMethod: this.enrolment[0].paymentMethod,
            bankId: this.enrolment[0].bankID,
            branchName: this.enrolment[0].branchName,
            accountName: this.enrolment[0].accountName,
            accountNo: this.enrolment[0].accountNo,
            paymentType: this.enrolment[0].paymentType,
            paymentAmount: this.enrolment[0].paymentAmount,
            id:this.enrolment[0].id,
          });
          let additionAr = this.enrolment.filter(c => c.addDeduct == 1);
          let detuctionAr = this.enrolment.filter(c => c.addDeduct == -1)
          this.additionArForm = this.formBuilder.array([]);
          let grossSalary = this.enrolment[0].grossSalary;

          additionAr.forEach(items => {
            this.additionArForm.push(
              new FormGroup({
                id: new FormControl(null, []),
                detailsID: new FormControl(0, []),
                memberID: new FormControl(this.f.memberId.value, []),
                moduleId: new FormControl(this.moduleID, []),
                compId: new FormControl(this.compId, []),
                serviceAccountID: new FormControl(items.serviceAccountID, []),
                serviceName: new FormControl(items.serviceName, []),
                amount: new FormControl(items.amount, []),
                stuRollNo: new FormControl(null, []),
                isActive: new FormControl(1, []),
                activeDate: new FormControl(null, []),
                accountId: new FormControl(null, []),
                processType: new FormControl(items.processType, [])
              })
            )
          })
          this.detuctionArForm = this.formBuilder.array([]);
          detuctionAr.forEach(items => {
            this.detuctionArForm.push(
              new FormGroup({
                id: new FormControl(null, []),
                detailsID: new FormControl(0, []),
                memberID: new FormControl(this.f.memberId.value, []),
                moduleId: new FormControl(this.moduleID, []),
                compId: new FormControl(this.compId, []),
                serviceAccountID: new FormControl(items.serviceAccountID, []),
                serviceName: new FormControl(items.serviceName, []),
                amount: new FormControl(items.amount, []),
                stuRollNo: new FormControl(null, []),
                isActive: new FormControl(1, []),
                activeDate: new FormControl(null, []),
                accountId: new FormControl(null, []),
                processType: new FormControl(items.processType, [])
              })
            )
          })
        }
        else {
          return;
        }
      })
    }
  }
  createForm() {
    this.slaryStructureFrom = this.formBuilder.group({
      id:[,[]],
      moduleId: [this.moduleID, []],
      compId: [this.compId, []],
      memberCode: [[]],
      memberId: [[]],
      grossSalary: [[]],
      incrimentAmount: [0, []],
      paymentMethod: [0, []],
      paymentType: [0, []],
      bankId: [0,[]],
      branchName: [0,[]],
      accountName: [0,[]],
      accountNo: [0,[]],
      paymentAmount: [0,[]],
      totalSalary: [0,[]]
    })
  }
  addIncriment() {
    let grossAmount = this.f.grossSalary.value;
    let incrimentAmount = this.f.incrimentAmount.value;
    let totalSalary = 0;
    totalSalary = (grossAmount + incrimentAmount);
    this.slaryStructureFrom.controls.totalSalary.setValue(totalSalary);
  }
  saveData() {
    this.isSubmit = true;
    if (this.slaryStructureFrom.invalid) {
      this.toastr.error("Please all the required fields")
      return;
    }
    const salaryObj = {
      enrolment: this.slaryStructureFrom.value,
      addition: this.additionArForm.value.filter(item => item.serviceAccountID != null),
      deduction: this.detuctionArForm.value.filter(item => item.serviceAccountID != null ),
    }
    this.payrollService.saveEnrolment(salaryObj).subscribe((res: any) => {
      if (res.status) {
        this.toastr.success(res.result, "Success!")
        this.btnStatus='Save';
      } else {
        this.toastr.error(res.status, "Failed!")
      }
      this.reset();
    })
  }
  getAllServiceName() {
    if (this.f.incrimentAmount.value == 0 || this.f.incrimentAmount.value == '' || this.f.incrimentAmount.value == null) {
      this.slaryStructureFrom.controls.totalSalary.setValue(this.f.grossSalary.value);
    }
    this.centerService.getAllServiceName(this.compId, this.moduleID).subscribe((response: any) => {
      if (response.status) {
        this.serviceName=response.result as any[];
        console.log(this.serviceName);
        let additionAr = this.serviceName.filter(c => c.addDeduct == 1);
        let detuctionAr = this.serviceName.filter(c => c.addDeduct == -1)
        this.additionArForm = this.formBuilder.array([]);
        let grossSalary = this.f.totalSalary.value;
        additionAr.forEach(items => {
          this.additionArForm.push(
            new FormGroup({
              id: new FormControl(null, []),
              detailsID: new FormControl(0, []),
              memberID: new FormControl(this.f.memberId.value, []),
              moduleId: new FormControl(this.moduleID, []),
              compId: new FormControl(this.compId, []),
              serviceAccountID: new FormControl(items.id, []),
              serviceName: new FormControl(items.serviceName, []),
              amount: new FormControl((grossSalary * items.unitPrice) / 100, []),
              stuRollNo: new FormControl(null, []),
              isActive: new FormControl(1, []),
              activeDate: new FormControl(null, []),
              accountId: new FormControl(null, []),
              processType: new FormControl(items.serviceTypeID, [])
            })
          )
        })
        this.detuctionArForm = this.formBuilder.array([]);
        detuctionAr.forEach(items => {
          this.detuctionArForm.push(
            new FormGroup({
              id: new FormControl(null, []),
              detailsID: new FormControl(0, []),
              memberID: new FormControl(this.f.memberId.value, []),
              moduleId: new FormControl(this.moduleID, []),
              compId: new FormControl(this.compId, []),
              serviceAccountID: new FormControl(items.id, []),
              serviceName: new FormControl(items.serviceName, []),
              amount: new FormControl((grossSalary * items.unitPrice) / 100, []),
              stuRollNo: new FormControl(null, []),
              isActive: new FormControl(1, []),
              activeDate: new FormControl(null, []),
              accountId: new FormControl(null, []),
              processType: new FormControl(items.serviceTypeID, [])
            })
          )
        })

      } else {
        this.serviceName = [];
      }
    })
  }
  reset() {
    this.btnStatus = "Save";
    this.slaryStructureFrom.reset();
    this.createForm();
    this.additionArForm = this.formBuilder.array([]);
    this.detuctionArForm = this.formBuilder.array([]);
  }
  get f() {
    return this.slaryStructureFrom.controls;
  }
  get formVal() {
    return this.slaryStructureFrom.value;
  }
}
