import { AccountingBasicEntryService } from '../../../services/accounting/accounting-basic-entry.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountGroupTypeComponent } from '../account-group-type/account-group-type.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../services/auth.service';
import { AccountChart } from '../../../models/accounting/basic-entry/bank/AccountChart';
import { AccountChartService } from '../../../services/accounting/AccountChartService';

@Component({
  selector: 'app-ledger',
  templateUrl: './ledger.component.html',
  styleUrls: ['./ledger.component.scss']
})
export class NewLedgerComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private accChartService:AccountChartService,
    private toasterService:ToastrService,
    private modalService:NgbModal
  ) { }
  ledgerForm:FormGroup;
  accountGroupModel:AccountGroupTypeComponent[]=[];
  ledgerModel:AccountChart[]=[];
  btnStatus:string="Save";
  compID:number;
  isSubmit:boolean=false;
  isSave:boolean=false;
  userID:number;
  branchID:number;
  accountId:number;
  ShowTable:boolean=false;
  subLeadegerList:string[]=["Independ Subledger","Dependent Subledger"]
  ngOnInit() {
    this.branchID=AuthService.BranchId;
    this.compID=AuthService.CompanyId;
    this.getAllAccountChartBasicEntry();
    this.createForm();
  }
  getAllAccountChartBasicEntry(){
    this.accChartService.getAllAccountChart().subscribe((response:any)=>{
      if(response){
       this.accountId=Math.max.apply(null,response.map(function(o) { return o.accountId; }))+1;//Number(Math.max(response.map(o => o.accountId))?Math.max(response.map(o => o.accountId)):0)+1;
       this.ledgerForm.patchValue({accountId:this.accountId});
      }
    })
  }
  modalServOpen(event:any){
    this.modalService.open(event,{size: 'lg', windowClass: 'modal fade bd-example-modal-xl'})

  }
  onSelectAccountGroup(group:any){
    this.ledgerForm.patchValue({lowerGroupId:group.lowerGroupId});
    }


  getLedgerByID(ledger:any){
    this.ledgerForm.patchValue(ledger);
    if(ledger.subLeadeger==1){
      this.ledgerForm.patchValue({
        subLeadeger:"Independent Subledger"
      })
    }
    else if(ledger.subLeadeger==2){
      this.ledgerForm.patchValue({
        subLeadeger:"Dependent Subledger"
      })
    }
    else{
      this.ledgerForm.patchValue({
        subLeadeger:"No SubLedger Selected"
      })
    }
    this.btnStatus="Update";

  }
  onSelectCurrency(curency:any){
    this.ledgerForm.patchValue({currencyId:curency.idenNo});
    }

  confirmSave(event:any){
  //  this.isSubmit=true;
  //   if(this.ledgerForm.invalid){
  //     this.modalService.dismissAll();
  //     this.isSave=false;
  //    this.toasterService.error("Please fill the all required fields","Invalid submission");
  //    return;
  //  }else{
  //   this.isSave=true;
     this.modalService.open(event)
  //  }
}
subLedger(sublgdr){
  if(sublgdr){
    this.ledgerForm.patchValue({
      subLeadeger:sublgdr
    });
}
}
saveLedger(){

  let bankInfo=new AccountChart();
  bankInfo=this.ledgerForm.value;
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

reset(){
  this.isSave=false;
  this.isSubmit=false;
  this.ledgerForm.reset();
  this.createForm();
  this.getAllAccountChartBasicEntry();
  this.btnStatus="Save";

}
createForm(){
  this.ledgerForm=this.formBuilder.group({
    id:[0,[]],
    branchIdselect:[,[]],
    lowerGroupId:[,[]],
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
    proprietorName:[,[]],
    // subLeadeger:[,[]],
    // isInventory:[,[]],
    // isEmployee:[,[]]
  })
  }
  get f(){
    return this.ledgerForm.controls;
  }
  // onSelectHeadGroup(headGroups:HeadGroupName){
  //     this.ledgerForm.patchValue({
  //       headGroup:headGroups
  //    })
  //   }
}
