import { AccountingBasicEntryService } from './../../../../../services/accounting/accounting-basic-entry.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NgbDateCustomParserFormatter } from '../../../../../shared/dateformat';
import { Subledger } from '../../../../../models/accounting/basic-entry/chart-of-account/subledger.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-sub-ledger',
  templateUrl: './sub-ledger.component.html',
  styleUrls: ['./sub-ledger.component.scss']
})
export class NewSubLedgerComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private dateFormate:NgbDateCustomParserFormatter,
    private chartOfAccountingService:AccountingBasicEntryService,
    private toasterService:ToastrService,
    private modalService:NgbModal,
    private route:ActivatedRoute
  ) { }

  subLedgerForm:FormGroup;
  compID:number;
  branchID:number;
  btnStatus="Save";
  subledgerModel:Subledger[]=[];
  isSubmit:boolean=false;
  isSave:boolean=false;
  showTable:boolean=false;
  ngOnInit() {
    this.compID=AuthService.CompanyId;
    this.branchID=AuthService.BranchId;
    this.createForm();
  }

  modalServOpen(event:any){
    this.modalService.open(event,{size: 'lg', windowClass: 'modal-xl'})

  }
getSubledgerByID(subLedger:Subledger){
  console.log(subLedger)
    this.subLedgerForm.patchValue(subLedger);
    this.btnStatus="Update";
}

onSubmit(){
  if(this.btnStatus=="Save"){
this.saveSubledger();
  }else{
    this.updateSubledger();
  }
}
 saveSubledger(){
   this.chartOfAccountingService.saveSubledger(this.subLedgerForm.value).subscribe((response:any)=>{
    if(response){
      this.modalService.dismissAll();
      this.toasterService.success("Success!")
      this.reset();
    }else{

      this.toasterService.error("Faild!")
      this.modalService.dismissAll();
      this.isSave=false;
    }
 },(error:any)=>{
  this.toasterService.error(error.error,"Failed!")
  this.modalService.dismissAll();
  this.isSave=false;
}
 )
    }
 updateSubledger(){
      this.chartOfAccountingService.updateSubledger(this.subLedgerForm.value).subscribe((response:any)=>{
       if(response){
         this.modalService.dismissAll();
         this.toasterService.success("Success!")
         this.reset();
       }else{

         this.toasterService.error("Faild!")
         this.modalService.dismissAll();
         this.isSave=false;
       }
    },(error:any)=>{
     this.toasterService.error(error.error,"Failed!")
     this.modalService.dismissAll();
     this.isSave=false;
   }
    )
       }


    reset(){
      this.isSubmit=false;
      this.isSave=false;
      this.subLedgerForm.reset();
      this.createForm();
      this.btnStatus="Save";
    }
  createForm(){
    this.subLedgerForm=this.formBuilder.group({
      id :[0,[]],
      subledgerName :[,[Validators.required]],
      aliasName :[null,[]],
      openingBalance :[0,[]],
      accountId :[,[Validators.required]],
      compId :[this.compID,[]],
      branchId :[this.branchID,[]],
      isActive:[1,[]],
      interestRate:[,[]]
    })
  }


  get f(){
    return this.subLedgerForm.controls;
  }
}
