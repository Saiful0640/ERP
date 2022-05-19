import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../../../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EmpGenInfoService } from '../../../../services/hr/empGenInfo.service';
import { NgbDateCustomParserFormatter } from '../../../../shared/dateformat';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Gender } from '../../../../models/hr/basic-entry/gender';
import { SettingService } from '../../../../services/settings/Setting.service';
import { BloodGroup } from '../../../../models/hr/basic-entry/blood-group';
import { Maritalstatus } from '../../../../models/hr/basic-entry/maritalstatus';

@Component({
  selector: 'app-family-info',
  templateUrl: './family-info.component.html',
  styleUrls: ['./family-info.component.scss']
})
export class FamilyInfoComponent implements OnInit {
  familyInfoForm: FormGroup;
  familyMembers: any[];
  occupations: any[];
  nationalities: any[];
  genders: Gender[] =[];
  bloodGroups: BloodGroup[] = [];
  maritialStatuses: Maritalstatus[] = [];
  compId: number;
  moduleId: number;
  userId: number;
  idforDelete: number;
  btnStatus: string = 'Save';
  isSubmitted: boolean = false;
  relationships:any[]=[];
  constructor(
    private formBuilder: FormBuilder,
    private EmpInfoService: EmpGenInfoService,
    private toaster: ToastrService,
    private modalService: NgbModal,
    private dateformat: NgbDateCustomParserFormatter,
    private settingSevice: SettingService,
  ) { }

  ngOnInit() {
    this.compId = AuthService.CompanyId;
    this.userId = AuthService.UserId;
    this.moduleId = AuthService.CurrentModuleId;
    this.createForm();
    this.getAllRelationship();
    this.getAllGender();
    this.getAllBloodGroup();
    this.getAllMaritalStatus();
    this.getAllNationality();
    this.getAllOccupations();
  }
  
  getAllRelationship(){
    this.EmpInfoService.getAllRelationship().subscribe((response:any)=>{
      if(response){
        console.log(response)
        this.relationships=response;
      }
    })
  }
  getAllGender(){
    this.settingSevice.getAllGender().subscribe((response: any)=>{
      if(response){
        console.log(response);
        this.genders=response;
      }
    })
  }
  getAllOccupations(){
    this.EmpInfoService.getAllOccupation().subscribe((response:any)=>{
      if(response){
        console.log(response)
        this.occupations=response;
      }
    })
  }
  getAllNationality(){
    this.EmpInfoService.getAllNationality().subscribe((response: any)=>{
      if(response){
        console.log(response);
        this.nationalities=response;
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
  onSubmit(){
    if(this.btnStatus=="Save"){
      this.save();
    }else{
      this.update();
    }
  }
  save() {
    if (this.familyInfoForm.invalid) {
      this.toaster.warning("fill required Fields");
      return;
    }
    else {
      console.log(this.familyInfoForm.value);
      this.EmpInfoService.saveFamilyInfo(this.familyInfoForm.value).subscribe((result: any) => {
        if (result) {
          this.toaster.success("Success");
          this.reset();
        }
        else {
          this.toaster.error("Error");
        }
      })
    }
  }
  update() {   
      console.log(this.familyInfoForm.value);
      this.EmpInfoService.updateFamilyInfo(this.familyInfoForm.value).subscribe((result: any) => {
        if (result) {
          this.toaster.success("Success");
          this.reset();
        }
        else {
          this.toaster.error("Error");
        }
      })
  }
  getFamilyMemberByMemberCode(member) {
    console.log(member,"memberGenInfo",member.memberCode)
    if (member) {
      this.createForm();
      this.btnStatus = "Save";
      this.familyInfoForm.patchValue({
        memberCode:member.memberCode,
        memberName:member.memberName,

      })
      this.EmpInfoService.getAllFamilyMemberByMemberCode(member.memberCode).subscribe((reasult: any) => {
        if (reasult) {
          console.log(reasult,"memberFamilyInfo")
          this.familyMembers = reasult;
        }
        else {
          this.familyMembers = []
          return;
        }
      })
    }
    else {
      return;
    }
  }
  getById(id: number) { 
    this.EmpInfoService.familyMembergetById(id).subscribe((result: any) => {
      if (result) {
        let familyMember = result;
        this.btnStatus = 'Update'
        this.familyInfoForm.controls.ngbDateOfBirth.setValue(this.dateformat.getYyyymmddToNgbDate(familyMember.dateOfBirth));
        this.familyInfoForm.patchValue(familyMember);
        console.log(familyMember)

      }
    })
  }
  createForm() {
    this.familyInfoForm = this.formBuilder.group({
      id: [, []],
      memberCode: [, []],
      memberName: [, []],
      relationship: [, []],
      fMemberName: [, []],
      dateOfBirth: [, []],
      ngbDateOfBirth: [, []],
      placeOfBirth: [, []],
      genderId: [, []],
      bloodGroupId: [, []],
      maritialStatusId: [, []],
      occupationId: [, []],
      countryId: [, []],
      nationalityId: [, []],
      passportNo: [, []],
      picture: [, []],
      mobileNo: [, []],
      email: [, []],
      isNominee: [-1, []],
      percentage: [, []],
      compId: [this.compId, []],
      comType: [1, []],
      moduleId: [this.moduleId, []],
      modifiedBy: [this.userId, []]
    })
  }

  delete(memberId: number, modal: any) {
    this.idforDelete = memberId;
    this.modalService.open(modal);
  }

  confirmRemoveFamilyMember() {
    this.EmpInfoService.deleteFamilyMember(this.idforDelete).subscribe((result: any) => {
      if (result) {
        this.toaster.error("Deleted");
        this.modalService.dismissAll();
        this.getFamilyMemberByMemberCode(this.familyInfoForm.controls.memberCode.value);
      }
      else {
        this.toaster.error(result.reasult, "Failed")
      }
    })
  }
  cancel() {
    this.modalService.dismissAll();
  }
  get f() {
    return this.familyInfoForm.controls;
  }
  get formVal() {
    return this.familyInfoForm.value;
  }
  reset() {
    this.isSubmitted = false;
    this.btnStatus = 'Save';
    this.createForm();
    this.familyMembers = []
  }

}
