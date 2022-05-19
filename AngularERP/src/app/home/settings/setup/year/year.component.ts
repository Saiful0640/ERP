import { YearType } from '../../../../models/settings/year/year-type.model';
import { NgbDateCustomParserFormatter } from '../../../../shared/dateformat';
import { YearModel } from '../../../../models/settings/year/year.model';
import { ToastrService } from 'ngx-toastr';
import { SettingService } from '../../../../services/settings/Setting.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-year',
  templateUrl: './year.component.html',
  styleUrls: ['./year.component.scss']
})
export class YearComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private yearService: SettingService,
    private toasterService: ToastrService,
    private dateFormate: NgbDateCustomParserFormatter
  ) { }

  yearForm: FormGroup
  compID: number;
  branchID: number;
  isActive: number;
  yearModel: YearModel[] = [];
  btnStatus = "Save";
  userID: number;
  isSubmit: boolean = false;

  ngOnInit() {
    this.compID = AuthService.CompanyId;
    this.userID = AuthService.UserId;
    this.branchID = AuthService.BranchId;
    this.isActive = 1;
    this.createForm();
    this.getAllYear();
  }
  getAllYear() {
    this.yearService.getAllYear().subscribe((response: any) => {
      if (response) {
        this.yearModel = response as YearModel[];
      }
      else {
        this.yearModel = [];
      }
    })
  }
  onSelectYearType(year: YearType) {
    this.yearForm.patchValue({
      yearTypeID: year.id
    })
    this.getAllYear();
  }
  getYearByID(id: number) {
    let year = new YearModel();
    year = this.yearModel.find(c => c.id == id);
    this.yearForm.patchValue(year);
    this.yearForm.patchValue({
      startDateNgb: this.dateFormate.getYyyymmddToNgbDate(year.startDate),
      endDateNgb: this.dateFormate.getYyyymmddToNgbDate(year.endDate)

    })
    this.btnStatus = "Update"
  }
  onActiveClick(isChecked){
    this.yearForm.patchValue({
      active: isChecked 
    })
  }
  onSubmit(){
    if(this.btnStatus=="Save"){
      this.saveYear();
    }else{
      this.updateYear();
    }
  }
  saveYear() {
    this.isSubmit = true;
    if (this.yearForm.invalid) {
      this.toasterService.error("Please fill the all required fields", "Invalid submission");
      return;
    } else {
      let yearInfo = new YearModel();
      yearInfo = this.yearForm.value;
    
      this.yearService.saveYear(yearInfo).subscribe((response: any) => {
        if (response) {
          this.toasterService.success( "Success!")

          this.getAllYear();
          this.reset();
        }else{
          this.toasterService.error( "Error!");
        }
      },(err:any)=>{
        this.toasterService.error(err.error, "Error!");
      })
    }
  }
  updateYear() {
    this.isSubmit = true;

      let yearInfo = new YearModel();
      yearInfo = this.yearForm.value;
    
      this.yearService.updateYear(yearInfo).subscribe((response: any) => {
        if (response) {
          this.toasterService.success( "Success!")

          this.getAllYear();
          this.reset();
        }else{
          this.toasterService.error( "Error!");
        }
      },(err:any)=>{
        this.toasterService.error(err.error, "Error!");
      })

  }

  reset() {
    this.isSubmit = false;
    this.yearForm.reset();
    this.createForm();
    this.btnStatus = "Save";
    this.yearModel = [];
  }

  createForm() {
    this.yearForm = this.formBuilder.group({
      id: [0, []],
      startDate: [, [Validators.required]],
      endDate: [, [Validators.required]],
      startDateNgb: [, [Validators.required]],
      endDateNgb: [, [Validators.required]],
      yearName: [, [Validators.required]],
      compId: [this.compID, []],
      active: [true, []],
      createdBy: [1, []]

    })
  }
  get f() {
    return this.yearForm.controls;
  }
}




