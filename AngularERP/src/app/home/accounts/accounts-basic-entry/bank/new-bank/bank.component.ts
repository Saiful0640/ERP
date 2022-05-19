import { LowerGroupType } from './../../../../../shared/lookup';
import { AccountingBasicEntryService } from './../../../../../services/accounting/accounting-basic-entry.service';
import {AccountChart} from '../../../../../models/accounting/basic-entry/bank/AccountChart'
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup ,Validators} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../../../services/auth.service';
import { GroupAccountModel } from '../../../../../models/accounting/basic-entry/group-account-model';
import { GroupAccountSelectListComponent } from '../../../../../shared/components/group-account-select-list/group-account-select-list.component';
import { ReportModel } from '../../../../../models/settings/app-settings/report-model';
import { HttpErrorResponse } from '@angular/common/http';
// import { ReportService } from '../../../../../services/report.service';
import { AccountChartService } from '../../../../../services/accounting/AccountChartService';


@Component({
  selector: 'app-new-bank',
  templateUrl: './bank.component.html',
  styleUrls: ['./bank.component.scss']
})
export class NewBankComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private accChartService:AccountChartService,
    private toasterService:ToastrService,
    private modalService:NgbModal,
    // private reportService: ReportService
  ) { }

  bankForm:FormGroup;
  bankModel:AccountChart[]=[];
  btnStatus:string="Save";
  compID:number;
  compId:number;
  branchId:number;
  lowerGroupId:number=LowerGroupType.Bank;
  isSubmit=false;
  isSave:boolean=false;
  accountId:number;
  lstBranchName:any[]=[];
  groupAccountmodel:GroupAccountModel[]=[];
  @ViewChild(GroupAccountSelectListComponent ,{read: false}) hello: GroupAccountSelectListComponent ;

  ngAfterViewInit() {
  }
  ngOnInit() {
    this.compID = AuthService.CompanyId
    this.createForm();
    this.getAllBranchName();
    this.getAllAccountChartBasicEntry();

  }
  getAllAccountChartBasicEntry(){
    this.accChartService.getAllAccountChart().subscribe((response:any)=>{
      if(response){
       this.accountId=Math.max.apply(null,response.map(function(o) { return o.accountId; }))+1;//Number(Math.max(response.map(o => o.accountId))?Math.max(response.map(o => o.accountId)):0)+1;
       this.bankForm.patchValue({accountId:this.accountId});
      }
    })
  }
  modalServOpen(event:any){
    this.modalService.open(event,{size: 'lg', windowClass: 'modal-xl'})

  }
  onNewAccGroupAdd(item:any){
    this.groupAccountmodel=item;
    this.ngAfterViewInit();
  }
  branchIdChange(id:any){
    this.bankForm.patchValue({
      branchId:id.id
    })

  }
  onCurrencySelect(currency:any){
    if(currency !=null){
      this.bankForm.patchValue({
        currencyId:currency.idenNo
      })
    }

  }
  getBankByID(bankInfo:AccountChart){

    this.bankForm.patchValue(bankInfo);
    console.log(bankInfo);
    this.btnStatus="Update";
    this.updateBank();
  }
  confirmSave(event:any){

    this.isSubmit=true;
    if(this.bankForm.invalid){
      this.modalService.dismissAll();
      this.isSave=false;
     this.toasterService.error("Please fill the all required fields","Invalid submission");
     return;
   }else{
    this.isSave=true;
    this.modalService.open(event)
   }

  }

  getAllBranchName(){
    const paramobj={
      compId:this.compId,
      iD:0,
      name:''
    }
    this.accChartService.getAllBranchName().subscribe((response:any)=>{
     if(response){
         this.lstBranchName=response;
      }
      else{
        this.lstBranchName=[];
      }
    })
  }
saveBank(isDismiss){
  if(isDismiss){
    this.isSave=false;
  }else{
  let bankInfo=new AccountChart();
  bankInfo=this.bankForm.value;
  this.accChartService.saveAccChart(bankInfo).subscribe((response:any)=>{
    if(response){
      this.modalService.dismissAll();
      this.toasterService.success("Saved Success!");
      this.reset();
    }else
    {
      this.toasterService.error("Faild!")
      this.modalService.dismissAll();
      this.isSave=false;
    }
 },(error:any)=>{
  this.toasterService.error(error.error,"Error!")
  this.modalService.dismissAll();
  this.isSave=false;
}
 )
}
}
updateBank(){

  this.accChartService.updateAccChart(this.bankForm.value).subscribe((response:any)=>{
    if(response){
      this.modalService.dismissAll();
      this.toasterService.success("Saved Success!");
      this.reset();
    }else
    {
      this.toasterService.error("Faild!")
      this.modalService.dismissAll();
      this.isSave=false;
    }
 },(error:any)=>{
  this.toasterService.error(error.error,"Error!")
  this.modalService.dismissAll();
  this.isSave=false;
}
 )

}




reset(){
  this.isSubmit=false;
  this.isSave=false;
  this.bankForm.reset();
  this.createForm();
  this.btnStatus="Save";
  this.getAllAccountChartBasicEntry();
  // this.getAllBank();
}
  createForm(){
    this.bankForm=this.formBuilder.group({
    id:[0,[]],
    branchIdselect:[,[]],
    lowerGroupId:[this.lowerGroupId,[]],
    accountId:[this.accountId,[]],
    accountName:[,[Validators.required]],
    aliasName:[,[]],
    openningBalance:[0,[]],
    currencyId:[1,[]],
    accType:[,[]],
    address:[,[]],
    mobileNo:[,[]],
    phoneNo:[,[]],
    email:[,[Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    isCostCenter:[,[]],
    isSubledger:[,[]],
    isBillbyBill:[,[]],
    isActive:[1,[]],
    isBranch:[0,[]],
    balanceType:[,[]],
    depriciationRate:[0,[]],
    accountGroupId:[1,[]],
    branchId:[1,[]],
    compId:[this.compID,[]],
    creditLimit:[0,[]],
    creditDays:[0,[]],
    accountNo:[,[Validators.required]],
    groupAccountID :[1,[]],
    currencyRate:[0,[]],
    country:[0,[]],
    tIN:[,[]],
    bIN:[,[]],
    proprietorName:[,[]]
    })
  }
  get f(){
    return this.bankForm.controls;
  }

}
