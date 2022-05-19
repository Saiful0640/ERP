import { AccountMidGroup } from './../../../../../models/accounting/basic-entry/chart-of-account/account-group/account-mid-group.model';
import { AccountingBasicEntryService } from './../../../../../services/accounting/accounting-basic-entry.service';

import {  ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AccountGroup } from '../../../../../models/accounting/basic-entry/chart-of-account/account-group/account-group.model';
import { AuthService } from '../../../../../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.scss']
})
export class NewGroupComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private groupService:AccountingBasicEntryService,
    private toasterService:ToastrService,
    private route:ActivatedRoute,
    private modalService:NgbModal,
    private accGrouptService:AccountingBasicEntryService,
  ) { }
  accGrouptSearch: AccountGroup = new AccountGroup();
  groupForm:FormGroup;
  btnStatus:string="Save";
  compId:number;
  showTable:boolean=false;
  accountGroup:AccountGroup[]=[];
  accountMidGroupModel:AccountMidGroup[]=[];
  isSubmit:boolean=false;
  isSaving:boolean=false;
  filteredAccGroup:AccountGroup[]=[];
  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.getAllAccountMidgroup();
    this.createForm();
    this.getAllAccountGroup();
  }
  getAllAccountGroup(){
   // if(this.midGroupId==null){this.midGroupId=0}
    this.accGrouptService.getAccountGroups().subscribe((response:any)=>{
      if(response){
        //this.compId,this.midGroupId
        this.accountGroup=response;
        console.log( this.accountGroup)
        this.filteredAccGroup = response;
      }else
      {
        this.accountGroup=[];
      }
    })
  }
  filterAccountGroup(groupName: string) {
    if(groupName != null ){
      let filterAg = this.accountGroup.filter(c => c.groupName.toLowerCase().match(groupName.toLowerCase()));
      this.filteredAccGroup=filterAg;
    }else{
    }
   }
  modalServOpen(event:any){
    this.modalService.open(event,{size: 'lg', windowClass: 'modal-xl'})

  }
  getAccountGroupByID(accountGroup:AccountGroup){
    this.groupForm.patchValue(accountGroup);
    this.btnStatus="Update";

  }
  getAllAccountMidgroup(){
    this.groupService.getAllAccountMidGroup().subscribe((response:any)=>{
      if(response){
        this.accountMidGroupModel=response;
      }else{
        this.accountMidGroupModel= [];
      }
    })
  }
  confirmSave(event:any){
    this.isSubmit=true;
    if(this.f['groupName'].invalid && this.f['midGroupId'].invalid){
      this.modalService.dismissAll();
     this.toasterService.error("Please fill the all required fields","Invalid submission");
     return;
   }else{
    this.modalService.open(event)
   }

  }
  onSubmit(){
    if(this.btnStatus=="Save"){
      this.saveGroup();
    }else{
      this.updateGroup();
    }
  }
  saveGroup(){
    this.isSubmit=true;
    if(this.groupForm.invalid ){
      // this.modalService.dismissAll();
     this.toasterService.error("Please fill the all required fields","Invalid submission");
     this.isSaving=false;
     return;
   }else{
    this.isSaving=true;
    this.groupService.creatccountLowerGroup(this.groupForm.value).subscribe((response:any)=>{
      if (response) {
        // this.modalService.dismissAll();
        this.toasterService.success( "Success!");
        this.reset();
      } else {
        this.toasterService.error("Failed!");
        // this.modalService.dismissAll();
        // this.reset();
        this.isSaving=false;
      }
    },(error:any)=>{
      this.toasterService.error(error.error,"Error!");
      this.isSaving=false;
      // this.modalService.dismissAll();
    }
    )
    }
  }
  updateGroup(){
    this.isSubmit=true;
  //   if(this.groupForm.invalid ){
  //     // this.modalService.dismissAll();
  //    this.toasterService.error("Please fill the all required fields","Invalid submission");
  //    this.isSaving=false;
  //    return;
  //  }else{
    this.isSaving=true;
    this.groupService.updateccountLowerGroup(this.groupForm.value).subscribe((response:any)=>{
      if (response) {
        // this.modalService.dismissAll();
        this.toasterService.success( "Success!");
        this.reset();
      } else {
        this.toasterService.error("Failed!");
        // this.modalService.dismissAll();
        // this.reset();
        this.isSaving=false;
      }
    },(error:any)=>{
      this.toasterService.error(error.error,"Error!");
      this.isSaving=false;
      // this.modalService.dismissAll();
    }
    )
   // }
  }

  reset(){
    this.isSubmit=false;
    this.groupForm.reset();
    this.btnStatus="Save";
    this.isSaving=false;
    this.createForm();
    this.getAllAccountGroup();
  }
  createForm(){
    this.groupForm=this.formBuilder.group({
         id:[0,[]],
      midGroupId:[,[Validators.required]],
      lowerGroupId:[0,[]],
      groupName :[,[Validators.required]],
      groupNameAlias :[,[]],
      amount :[,[]],
      accountType :[,[]],
      balanceType :[,[]],
      balancesheetCaption :[,[]],
      profitLossCaption :[,[]],
      fundFlowCaption :[,[]],
      compId :[this.compId,[]],

    })
  }
  get f(){
    return this.groupForm.controls;
  }

onSelectGrpName(grpName:AccountMidGroup){
if(grpName)
{
this.groupForm.patchValue({
  groupName:grpName.balanceSheetCaption
})
}
  }
}
