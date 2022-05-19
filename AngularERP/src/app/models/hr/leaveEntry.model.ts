import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
export class leaveEntryModel{
  id:number
  memberCode:string
  aDate:NgbDateStruct
  sDate:NgbDateStruct
  eDate:NgbDateStruct
  duration:number
  categoryID:number
  reason:string
  compID:number
  userID:number
  moduleID:number
  appType:number
}
