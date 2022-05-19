import { group } from 'console';
import { otherReference } from './../../../../../models/accounting/basic-entry/chart-of-account/other-reference-model';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../../../../services/auth.service';
import { AccountingReportsService } from '../../../../../services/accounting/accounting-reports.service';
import { AccountingBasicEntryService } from '../../../../../services/accounting/accounting-basic-entry.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-others',
  templateUrl: './others.component.html',
  styleUrls: ['./others.component.scss']
})
export class OthersComponent implements OnInit {

  otherRefForm:FormGroup;
  compID:number;
  groupId:number;
  btnStatus="Save";
  otherRefModel:otherReference[]=[];
  isSubmit:boolean=false;
  showTable:boolean=false;
  subledgers:any[]=[];
  isSaving:boolean=false;

  constructor(
    private accReportService:AccountingReportsService,
    private otherRefService:AccountingBasicEntryService,
    private formBuilder:FormBuilder,
    private toastr:ToastrService
    ) { }

  ngOnInit() {
    this.compID=AuthService.CompanyId;
    this.createForm();
    this.getAllSubledger();
    this.getAllOthers();

  }
//==========================Get All Subledger===================//
  getAllSubledger(){
    this.accReportService.getSubLedgerList(this.compID).subscribe((response:any)=>{
      if(response.status){
         this.subledgers=response.result;
      }else
       {
       this.subledgers=[];
        }
        })
  }
  //====================Get All Other Ref.================//
  getAllOthers(){
this.otherRefService.getOtherReferences(this.compID).subscribe((res:any)=>{
if(res.status){
  this.otherRefModel=res.result;
}
else{
  this.otherRefModel=[];
}
})
  }
//======================Save Other Reference==============//
  saveOthersref(){
    this.isSubmit=true;
    this.isSaving=true;
    if(this.otherRefForm.invalid){
      this.toastr.error("Please fill the all require fields","Invalid submission");
      this.isSaving=false;
      return;
    }
    let othersref=new otherReference();
    othersref=this.otherRefForm.value;
    if(this.f.isCheque.value==true){
      othersref.isCheque=1;
    }else{
      othersref.isCheque=0;
    }
    this.otherRefService.postOtherRef(othersref).subscribe((res:any)=>{
      if(res.status){
        this.toastr.success(res.message,"Saved Successfully");
        this.reset();
      }
      else{
        this.toastr.error(res.message,"Faild!");
        this.isSaving=false;
        // this.reset();
        // this.getAllOthers();
      }
    },(error:any)=>{
      this.toastr.error(error.error,"Error!");
      this.isSaving=false;
      //this.reset();
    }
    )

  }
//====================Edit Others Ref.===============//
   edit(othersID:number){
    let others=this.otherRefModel.find(o=>o.othersID==othersID);
   this.otherRefForm.patchValue(others);
   this.btnStatus="Update";
   this.getAllOthers();
  }

  //==================Reset Others======================//
  reset(){
    this.isSubmit=false;
    this.isSaving=false;
    this.otherRefForm.reset();
    this.createForm();
    this.btnStatus="Save";
    this.getAllOthers();
  }
//=========================Create Form===================//
  createForm(){
    this.otherRefForm=this.formBuilder.group({
      othersID:[0,[]],
      othersReferenceName:[,[Validators.required]],
      compId:[this.compID,[]],
      groupID:[,[Validators.required]],
      isCheque:[1,[]]
    })
  }
  get f(){
    return this.otherRefForm.controls;
  }




  /* changeRefName(otherSRef:otherReference){
this.otherRefForm.patchValue(otherSRef);
  }
  otherRefSave(saveModal){

  } */



}
