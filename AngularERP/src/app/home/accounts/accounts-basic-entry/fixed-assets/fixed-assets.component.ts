import { AccountingBasicEntryService } from './../../../../services/accounting/accounting-basic-entry.service';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../../../../services/auth.service';
import { AccountChart } from '../../../../models/accounting/basic-entry/bank/AccountChart';

@Component({
  selector: 'app-fixed-assets',
  templateUrl: './fixed-assets.component.html',
  styleUrls: ['./fixed-assets.component.scss']
})
export class FixedAssetsComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private accChartService:AccountingBasicEntryService,
    private toasterService:ToastrService,
    private modalService:NgbModal

  ) { }

  fixedAssetsForm:FormGroup;
  fixedAssetsModel:AccountChart[]=[];
  btnStatus:string="Save";
  compID:number;
  branchId:number;
  isSubmit=false;
  isSave=false;
  ngOnInit() {
    this.branchId=AuthService.BranchId;
    this.compID=AuthService.CompanyId;
    this.createForm();
    // this.getAllfixedAssets();
  }
  modalServOpen(event:any){
    this.modalService.open(event,{size: 'lg', windowClass: 'modal-xl'})

  }
  // getAllfixedAssets(){
  //   this.accChartService.getAllAccountChart(this.f.lowerGroupId.value,this.compID).subscribe((response:AccountChart[])=>{
  //     if(response){
  //       this.fixedAssetsModel=response as AccountChart[];
  //     }else
  //     {
  //       this.fixedAssetsModel=[];
  //     }
  //   })
  // }
  getfixedAssetsByID(fixedAssetsInfo:AccountChart){
    this.fixedAssetsForm.patchValue(fixedAssetsInfo);
    this.btnStatus="Update";
  }
  confirmSave(event:any){
    this.isSubmit=true;
    if(this.fixedAssetsForm.invalid){
      this.isSave=false;
     this.toasterService.error("Please fill the all required fields","Invalid submission");
     this.modalService.dismissAll();
     return;
   }else{
    this.isSave=true;
    this.modalService.open(event)
   }

  }
savefixedAssets(isDismis){
//   if(isDismis){this.isSave=false;
//   return;
//   }{
//   let fixedAssetsInfo=new AccountChart();
//   fixedAssetsInfo=this.fixedAssetsForm.value;
//   if(this.f.isSubledger.value==true ){
//     fixedAssetsInfo.isSubledger=1;
//   }else{
//     fixedAssetsInfo.isSubledger=0;
//   }
//   if(this.f.isCostCenter.value==true){
//     fixedAssetsInfo.isCostCenter=1;
//   }else{
//     fixedAssetsInfo.isCostCenter=0;
//   }
//   this.accChartService.saveAccountChartFixedAsset(fixedAssetsInfo).subscribe((response:any)=>{
//     if(response.status){
//       this.modalService.dismissAll();
//       this.toasterService.success(response.message,"Success!")
//       this.reset();
//     }else{

//       this.toasterService.error(response.message,"Faild!")
//       this.modalService.dismissAll();
//       this.isSave=false;
//     }
//  },(error:any)=>{
//   this.toasterService.error(error.error,"Failed!")
//   this.modalService.dismissAll();
//   this.isSave=false;
// }
//  )
// }
}

reset(){
  this.isSubmit=false;
  this.isSave=false;
  this.fixedAssetsForm.reset();
  this.createForm();
  this.btnStatus="Save";
  // this.getAllfixedAssets();
}
  createForm(){
    this.fixedAssetsForm=this.formBuilder.group({
    id:[0,[]],
    lowerGroupId:[152,[]],
    accountId:[,[]],
    accountName:[,[Validators.required]],
    aliasName:[,[]],
    openningBalance:[0,[]],
    currencyId:[1,[]],
    accType:[,[]],
    isCostCenter:[,[]],
    isSubledger:[,[]],
    isInventory:[,[]],
    isBillbyBill:[,[]],
    isActive:[1,[]],
    isBranch:[0,[]],
    balanceType:[,[]],
    depriciationRate:[0,[]],
    noteToHeadId:[,[]],
    accountGroupId:[0,[]],
    branchId:[this.branchId,[]],
    compId:[this.compID,[]],
    creditLimit:[0,[]],
    creditDays:[0,[]],
    groupAccountID :[0,[]],
    currencyRate:[1,[]]
    })
  }
  get f(){
    return this.fixedAssetsForm.controls;
  }
}
