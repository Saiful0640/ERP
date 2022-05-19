import { NgbDateStruct } from "@ng-bootstrap/ng-bootstrap"

export class FamilyInfoModel{
  id:number
  memberCode:string
  relationship:number
  fMemberName:string
  dateOfBirth:string
  ngbDateOfBirth:NgbDateStruct
  placeOfBirth:string
  genderID:number
  bloodGroupID:number
  maritialStatusID:number
  occupationID:number
  countryID:number
  nationalityID:string
  passportNo:string
  picture:File
  mobileNo:string
  email:string
  isNominee:number
  percentage:number
  compId:number
  comType:number
  moduleId:number
  modifiedBy:number
}
