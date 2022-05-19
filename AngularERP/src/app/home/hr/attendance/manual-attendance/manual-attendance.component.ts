import { ToastrService } from 'ngx-toastr';
import { MenualAttendenceModel } from './../../../../models/hr/menualAttendance.model';
import { AttendanceService } from './../../../../services/hr/attendance.service';
import { AuthService } from './../../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { timeStamp } from 'console';

@Component({
  selector: 'app-manual-attendance',
  templateUrl: './manual-attendance.component.html',
  styleUrls: ['./manual-attendance.component.scss']
})
export class ManualAttendanceComponent implements OnInit {
  moduleId: number;
  compId: number;
  userId:number;
  menualAttendanceForm: FormGroup;
  attendanceList: FormArray;
  attendanceDetails: any[] = [];
  isSubmitted = false;
  constructor(
    private formBuilder: FormBuilder,
    private attendanceService: AttendanceService,
    private toaster:ToastrService
  ) {
    this.attendanceList = this.formBuilder.array([]);
  }

  ngOnInit() {
    this.moduleId = AuthService.CurrentModuleId;
    this.compId = AuthService.CompanyId;
    this.userId=AuthService.UserId;
    this.createForm();
  }
  save(){    
      for(let i=0;this.attendanceList.length>i;i++){
        let attendance=new MenualAttendenceModel();
    attendance.compID=this.compId;
    attendance.moduleID=this.moduleId;
    attendance.periodID=this.formVal.periodId;
    attendance.userID=this.userId;
    attendance.attendDay=this.attendanceList.value[i]['attendDay'];
    attendance.memberCode=this.attendanceList.value[i]['memberCode'];
    attendance.withPay=this.attendanceList.value[i]['withPay'];
    attendance.withoutPay=this.attendanceList.value[i]['withoutPay'];
    attendance.workingDay=this.attendanceList.value[i]['workingDay'];
    attendance.totalDay=this.attendanceList.value[i]['totalDay'];
        console.log(attendance)
        this.attendanceService.saveMenualAttendance(attendance).subscribe((response:any)=>{
          if(response){
           this.toaster.success("Save Successfully");
           this.reset();
          }else{
            this.toaster.error("fail to Save");
          }
        })
      }

    
  }
  attendentCalculation(i: number) {
    let totalDays = Number(this.attendanceList.controls[i].get('totalDay').value);
    let withoutPay = Number(this.attendanceList.controls[i].get('withoutPay').value);
    let withPay = Number(this.attendanceList.controls[i].get('withPay').value);
    let holiday = Number(this.attendanceList.controls[i].get('holiDay').value);
    let attendDay = totalDays - (withPay + withoutPay + holiday);
    this.attendanceList.controls[i].get('attendDay').patchValue(attendDay);
  }
  getAttendanceDetails() {
    this.isSubmitted = true;
    if(this.menualAttendanceForm.invalid){
    this.toaster.warning("Fill Period Field");
    }
    else{
    if(this.formVal.memberCode==null){
      this.menualAttendanceForm.controls.memberCode.setValue(null);
    }
    if(this.formVal.departmentId==null || this.formVal.departmentId==0){
      this.menualAttendanceForm.controls.departmentId.setValue(0);
    }
    if(this.formVal.designationId==null || this.formVal.designationId==0){
      this.menualAttendanceForm.controls.designationId.setValue(0);
    }
   
    this.attendanceService.getAttendanceByFilter(this.formVal.memberCode, this.formVal.departmentId, this.formVal.designationId, this.formVal.periodId).subscribe((response: any) => {
      if (response) {
        this.attendanceDetails = response;
        console.log(response)
        this.attendanceList = this.formBuilder.array([]);
        this.attendanceDetails.forEach(item => {
          this.attendanceList.push(
            new FormGroup({
              memberCode: new FormControl(item.memberCode, []),
              memberName: new FormControl(item.memberName, []),
              designation: new FormControl(item.designation, []),
              department: new FormControl(item.department, []),
              withPay: new FormControl(item.duration,[]),
              holiDay: new FormControl(item.holiDay, []),
              totalDay: new FormControl(item.totalDays, []),
              workingDay:new FormControl(item.workingDay,[]),
              withoutPay: new FormControl(item.withoutPay, []),
              attendDay: new FormControl(item.attendDay, []),
            })
          )
        })
      } else {
        this.attendanceDetails = [];
      }
    })
  }
}
  createForm() {
    this.menualAttendanceForm = this.formBuilder.group({
      memberCode: [, []],
      departmentId: [, []],
      designationId: [, []],
      periodId: [, [Validators.required]],
      compId: [this.compId, []],
      absent: [[]]
    })
  }
  get formVal() {
    return this.menualAttendanceForm.value;
  }
  get f() {
    return this.menualAttendanceForm.controls;
  }
  reset(){
    this.createForm();
    this.isSubmitted = false;
    this.attendanceDetails = [];
    this.attendanceList = this.formBuilder.array([]);
  }

}
