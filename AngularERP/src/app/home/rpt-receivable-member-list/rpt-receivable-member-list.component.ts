import { AuthService } from './../../services/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ReceiptAndPaymentService } from '../../services/receipt-and-payment.service';

@Component({
  selector: 'app-rpt-receivable-member-list',
  templateUrl: './rpt-receivable-member-list.component.html',
  styleUrls: ['./rpt-receivable-member-list.component.scss']
})
export class RptReceivableMemberListComponent implements OnInit {

  constructor( private formBuilder:FormBuilder,
    private receiptAndPaymentService:ReceiptAndPaymentService
    ) { }
  rptMemberReceivableListForm:FormGroup;
  compId:number;
  rtpReceivableMembers:any[]=[];
  moduleId:number;
  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.moduleId=AuthService.CurrentModuleId;
    this.createForm();
  }
  onSelectMemberInfo(memList:any){
    this.rptMemberReceivableListForm.patchValue({
      memberID:memList.id
    })
// this.onSelectMember(this.f.memberID.value)
  }
  getAllMemberReceivableListReport(){
    if(this.f.memberID.value ==null){this.f.memberID.patchValue(0)}
     this.receiptAndPaymentService.getRptReceivableMemberList(this.f.memberID.value,this.compId,this.moduleId).subscribe((response:any)=>{
      if(response.status){
        this.rtpReceivableMembers=response.result;
      }
      else{
        this.rtpReceivableMembers= [];
          }
    })
  }

  reset(){
    this.rptMemberReceivableListForm.reset();
    this.rtpReceivableMembers= [];
  }
  createForm(){
    this.rptMemberReceivableListForm=this.formBuilder.group({
      memberID:[,[]]
    })
  }

  get f(){
    return this.rptMemberReceivableListForm.controls
  }
}
