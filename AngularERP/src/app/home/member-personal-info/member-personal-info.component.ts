import { id } from '@swimlane/ngx-datatable/release/utils';
import { Maritalstatus } from './../../models/hr/basic-entry/maritalstatus';
import { Religion } from './../../models/hr/basic-entry/religion';
import { BloodGroup } from './../../models/hr/basic-entry/blood-group';
import { Gender } from './../../models/hr/basic-entry/gender';
import { ActivatedRoute } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
// import { ReportService } from './../../services/report.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { MemberPersonalInfo } from '../../models/member-personal-info';
import { AuthService } from '../../services/auth.service';
import { MemberPersonalInfoService } from '../../services/member-personal-info.service';
import { SettingService } from '../../services/settings/Setting.service';
import { NgbDateCustomParserFormatter } from '../../shared/dateformat';
import { ReportModel } from '../../models/settings/app-settings/report-model';
import { Helper } from '../../shared/helper';

@Component({
  selector: 'app-member-personal-info',
  templateUrl: './member-personal-info.component.html',
  styleUrls: ['./member-personal-info.component.scss']
})
export class MemberPersonalInfoComponent implements OnInit {
 title:string;
// @Input() moduleId:number;
@Input() labelname:string;

  constructor(
    private formBuilder: FormBuilder,
    private settingSevice: SettingService,
    private toasterService: ToastrService,
    private memberPersonalInfoService: MemberPersonalInfoService,
    public dateFormatter: NgbDateCustomParserFormatter,
    private modalService: NgbModal,
    // private reportService:ReportService,
    public route:ActivatedRoute
  ) { }
  memPersonalInfoForm: FormGroup;
  genders: Gender[] =[];
  bloodGroups: BloodGroup[] = [];
  relagions: Religion[] = [];
  maritialStatuses: Maritalstatus[] = [];
  //upzilas: Upzila[]=[];
  locationTable: string = "Location";
  isSubmitted: boolean = false;
  CompID: number;
  branchId: number;
  userId: number;
  moduleId:number;
  compId:number;
  btnStatus = 'Save';
  memberId:number;
  memberPersonalInfo:MemberPersonalInfo;
  //print
  exportType:string='pdf';
  pageId:number;
  reports:ReportModel[]=[];
  reportId:number;
  @Input() childModuleId:number;
  isExporting:boolean=false;
  locationId:number;
  DetailsID:number;
  CriteriaID:number;
  isSameThana:boolean;
  allSame:boolean;

  /* routeInfo = { pageId: 0 }; */
  ngOnInit() {
    this.compId = AuthService.CompanyId;
    this.userId = AuthService.UserId;
    this.moduleId=AuthService.CurrentModuleId;
    this.createform();
    this.getAllGender();
    this.getAllBloodGroup();
    this.getAllMaritalStatus();
    this.getAllReligion();

  }
  getAllGender(){
    this.settingSevice.getAllGender().subscribe((response: any)=>{
      if(response){
        console.log(response);
        this.genders=response;
      }
    })
  }
  getAllBloodGroup(){
    this.settingSevice.getAllBloodGroup().subscribe((response: any)=>{
      if(response){
        this.bloodGroups=response;
      }
    })
  }
  getAllMaritalStatus(){
    this.settingSevice.getAllMaritalStatus().subscribe((response: any)=>{
      if(response){
        this.maritialStatuses=response;
      }
    })
  }
  getAllReligion(){
    this.settingSevice.getAllReligion().subscribe((response: any)=>{
      if(response){
        this.relagions=response;
      }
    })
  }
  // getAllUpzila(){
  //   this.settingSevice.getAllUpzila().subscribe((response: any)=>{
  //     if(response){
  //       this.upzilas=response;
  //     }
  //   })
  // }
  onSelectPresentThana(thana: any) {
    if (thana == null) {
      this.memPersonalInfoForm.patchValue({
        thanaID: null,
        presentUpazila: null,
        presentDistrict: null
      })
      return;
    }
    this.memPersonalInfoForm.patchValue({
      thanaID: thana.id,
      presentUpazila: thana.upazilaname,
      presentDistrict: thana.districtname
    })
    // this.getAllThanaByThanaId(this.f.thanaID.value)
  }
  onSelectPermanentThana(thana: any) {
    if (thana == null) {
      this.memPersonalInfoForm.patchValue({
        thanaID: null,
        permanetUpazila: null,
        permanetDistrict: null
      })
      return;
    }
    this.memPersonalInfoForm.patchValue({
      permanentThanaID: thana.id,
      permanetUpazila: thana.upazilaname,
      permanetDistrict: thana.districtname,
     // isSameThana: 0
    })
  }
  getAllPresentThanaByThanaId(thanaId: number) {
    this.settingSevice.getAllThanaByThanaId(thanaId).subscribe((response: any) => {
      if (response.status) {
        let thanaInfo = response.result;
        this.memPersonalInfoForm.patchValue({
          thanaID: thanaId,
          presentUpazila: thanaInfo.upazilaName,
          presentDistrict: thanaInfo.districtName
        })
      }
    })
  }
  getAllThanaByThanaId(thanaId: number) {
    this.settingSevice.getAllThanaByThanaId(thanaId).subscribe((response: any) => {
      if (response.status) {
        let thanaInfo = response.result;
        this.memPersonalInfoForm.patchValue({
          permanentThanaID: thanaId,
          permanetUpazila: thanaInfo.upazilaName,
          permanetDistrict: thanaInfo.districtName
        })
      }
    })
  }
  onSameSelect() {
    if (this.isSameThana) {
      this.getAllThanaByThanaId(this.f.thanaID.value)
    } else {
      this.memPersonalInfoForm.patchValue({
        permanentThanaID: null,
        permanetUpazila: null,
        permanetDistrict: null
      })
    }
  }
  onSameAddressSelect() {
    if (this.allSame) {
      this.f.permanentAddress.patchValue(this.f.presentAddress.value)
    } else {
      this.memPersonalInfoForm.patchValue({
        permanentAddress: null,

      })
    }
  }
  saveMember() {
    this.isSubmitted = true;
    // if (this.memPersonalInfoForm.invalid) {
    //   this.toasterService.error("Please fill the all required fields", "Invalid submission");
    //   return;
    // }
   // console.log(this.memPersonalInfoForm.controls.dateOfBirthNgb.value);
    //this.memPersonalInfoForm.controls.dateOfBirth.setValue(this.dateFormatter.//getNgbDateToYyyymmdd(this.memPersonalInfoForm.controls.dateOfBirthNgb.value))
    this.memberPersonalInfoService.saveMemberInfo(this.memPersonalInfoForm.value).subscribe((response: any) => {
      if (response) {
        this.toasterService.success("Success!");
        this.memberId=response.memberId;
        // if(this.moduleId !=30){
        //   this.modalServOpen(event)
        // }

      } else {
        this.toasterService.error("Failed!")
      }
      this.reset();
    })
  }
getMemberInfoByMemberCode(){
this.memberPersonalInfoService.getMemberInfoByMemberCode(this.memPersonalInfoForm.controls.memberCode.value,this.compId,this.moduleId).subscribe((reasult: any) => {
  if (reasult.status) {
    this.memberPersonalInfo=reasult.result as MemberPersonalInfo;
  } else {
    this.toasterService.error("No Data Found!")
  }
  this.reset();
  })
  }
  modalServOpen(event: any) {
    this.modalService.open(event, { size: 'lg', windowClass: 'my-class' })

  }
  getMemberByID(assMembers: any) {
    console.log("member",assMembers);
    this.memPersonalInfoForm.patchValue(assMembers);
    this.btnStatus = "Update";
    console.log(assMembers.dateOfBirth);
    this.memPersonalInfoForm.controls.dateOfBirthNgb.setValue(this.dateFormatter.getYyyymmddToNgbDate(assMembers.dateOfBirth))
    // if (assMembers.thanaID > 0) {
    //   this.getAllPresentThanaByThanaId(assMembers.thanaID)
    //   this.getAllThanaByThanaId(assMembers.permanentThanaID)
    // }
  }
  reset() {
    this.isSubmitted = false;
    this.btnStatus = 'Save'
    this.createform();
    this.memPersonalInfoForm.controls['dateOfBirth'].setValue(this.dateFormatter.getDateToYyyymmdd(new Date()));
    this.memPersonalInfoForm.controls['dateOfBirthNgb'].setValue(this.dateFormatter.getYyyymmddToNgbDate(this.f.dateOfBirth.value))
    document.getElementById('pictureFileName').innerText = 'Choose file...'
  }

 createform(){
   this.memPersonalInfoForm=this.formBuilder.group({
    id:[0,[]],
    memberCode:[,[Validators.required]],
    memberName:[,[Validators.required]],
    fathersName:[,[]],
    mothersName:[,[]],
    spousName:[,[]],
    dateOfBirth:[this.dateFormatter.getDateToYyyymmdd(new Date()),[]],
    dateOfBirthNgb:[,[]],
    genderID:[,[]],
    bloodGroupID:[,[]],
    religionID:[,[]],
    maritialStatusID:[,[]],
    mobileNo:[,[]],
    email:[,[]],
    nationalityID:[,[]],
    thanaID:[,[]],
    permanentThanaID:[,[]],
    presentAddress:[,[]],
    permanentAddress:[,[]],
    compId:[this.CompID,[]],
    moduleID:[this.moduleId,[]],
    userID:[this.userId,[]],
    remarks:[,[]],
    picture:[null,[]],
    presentUpazila:[,[]],
    presentDistrict:[,[]],
    permanetUpazila:[,[]],
    permanetDistrict:[,[]],
    status:[1,[]]
   })
 }
 //for print
getReportInfo() {
    // this.reportService.getReports(this.compId, this.childModuleId, this.pageId)
    //   .subscribe(response => {
    //     if (response.status) {
    //       this.reports = response.result as ReportModel[];

    //     }
    //   }, err => {
    //     this.toasterService.error('Report Info not found');
    //     console.error(err);
    //   })
  }

  onPrint(){
      //  this.isExporting = true;
      //  alert(this.reportId)
      //     this.reportId = this.reports.length > 0 ? this.reports[0].reportId : null;
      //     this.reportService.getCommercialReportForRpt({
      //       ReportId: this.reportId,
      //       ExportType: this.exportType,
      //       CompID: this.compId,
      //       ModuleID:this.moduleId,
      //       LocationId:this.locationId,
      //       DetailsID:this.DetailsID,
      //       CriteriaID:this.CriteriaID

      //     }).subscribe((file) => {
      //       this.isExporting = false;
      //       if (file) {
      //         this.reportService.openFileWindow(file)
      //       }
      //     }, (err: HttpErrorResponse) => {
      //       this.isExporting = false;
      //       this.toasterService.error(err.error,'An unexpected Error occured');
      //     })
        }
get f(){
  return this.memPersonalInfoForm.controls;
}
get formVal(){
  return this.memPersonalInfoForm.value;
}
}
