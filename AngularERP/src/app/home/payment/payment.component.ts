import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AccountChart } from '../../models/accounting/basic-entry/bank/AccountChart';
import { TransMasterModel } from '../../models/accounting/transaction/trans-master-model';
import { PeriodModel } from '../../models/hr/period.model';
import { AccountChartService } from '../../services/accounting/AccountChartService';
import { AccountingBasicEntryService } from '../../services/accounting/accounting-basic-entry.service';
import { TransactionService } from '../../services/accounting/transaction.service';
import { AuthService } from '../../services/auth.service';
import { ReceiptAndPaymentService } from '../../services/receipt-and-payment.service';
import { SettingService } from '../../services/settings/Setting.service';
import { NgbDateCustomParserFormatter } from '../../shared/dateformat';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {
  moduleId:number;
  @Input() title:string;
  @Input() partyId:number;
  @Input() transType:number;
  constructor(
      private formBuilder:FormBuilder,
      private transactionService:TransactionService,
      private chartOfAccountService:AccountChartService,
      private settingService:SettingService,
      private dateFormatter:NgbDateCustomParserFormatter,
      private modalService:NgbModal,
      private toasterService:ToastrService,
      private receiveAndPaymentService:ReceiptAndPaymentService
  ) { this.paymentArrayForm=this.formBuilder.array([]); }
      paymentForm:FormGroup;
      paymentArrayForm:FormArray;
      voucherName="PaymentEntry"
      branchID:number;
      compID:number;
      userId:number;
      chequeNoShowModel:TransMasterModel[]=[];
      billBybillAmount:TransMasterModel[]=[];
      totalAmount:number=0;
      btnStatus:string="Save";
      isSubmit:boolean=false;
      formatVoucherNo:string;
      partyType:number;
      allPeriods:any[]=[];
      accountCharModel:any[]=[];
      fromDate:any;
      toDate:any;
  ngOnInit() {
      this.compID=AuthService.CompanyId;
      this.branchID=AuthService.BranchId;
      this.userId=AuthService.UserId;
      this.moduleId=AuthService.CurrentModuleId;
      this.fromDate=(new Date).toLocaleDateString();
      this.toDate=(new Date).toLocaleDateString();
      this.createForm();
      this.onChangeAccountName();
      this.getPeriods();
      this.addRow();
  }
  onSelectVoucherType(voucher:any){
    if(voucher !=null){
      if(voucher =="CP"){
    this.paymentForm.patchValue({
      voucherType:voucher.prefixCode
    })
    this.onSelectedVocherNo();
  //   if(this.accountCharModel.length==1){
  //     Helper.focusTextField('vtdate');
  //   }else{
  //     Helper.focusNgSelect('accName');
  //   }
  //  }else{
  //    return;
    }else{
      this.f.presentBalance.setValue(null);
      this.f.accountId.setValue(null);
      this.paymentForm.patchValue({
        voucherType:voucher.prefixCode
      })
      this.onSelectedVocherNo();
    }
  }
  }
  onSelectedVocherNo(){
    this.transactionService.getVoucherNo(this.f.voucherType.value,this.f.voucherDate.value,this.compID).subscribe((response:TransMasterModel)=>{
      if(response){
        let voucherNoShow =response as TransMasterModel;
        if(voucherNoShow.financialYearID>0){
          this.paymentForm.patchValue({
            voucherNo:voucherNoShow.voucherNo,
            yearID:voucherNoShow.financialYearID
          })
         this.formatVoucherNo=voucherNoShow.formatVoucherNo;
        }
        else{
            alert("Financial Year Not Set")
            this.paymentForm.patchValue({voucherNo:null})
          }
      }
    })
  }
   //// chequeNo textBox
   getChequeNo(bankID:number){
    if(bankID == null){
     return;
    }else{
      this.transactionService.getChequeNo(bankID,this.compID).subscribe((response:any)=>{
        if(response.status){
          this.chequeNoShowModel=response.result ;
        }else{
          this.chequeNoShowModel=[];
        }
      })
    }
  }
//   onChangeAccountName(){
//     this.chartOfAccountService.getAllAccountChart(this.compID,1).subscribe((response:any)=>{
//       if(response.status){
//         this.accountCharModel =response.result;
//       }else{
//         this.accountCharModel=[];
//       }
//     })
//     this.onSelectedBalance(this.f.accountId.value);
// }
onChangeAccountName(){
  this.chartOfAccountService.getAllAccountChart().subscribe((response:any)=>{
    if(response.status){
      ///filtering to need by this.compID,1,this.branchID
      this.accountCharModel =response.result;
      let accChartInfo=this.accountCharModel[0];
      if(this.accountCharModel.length==1){
        this.paymentForm.patchValue({
          accountId:accChartInfo.accountId,
          accountName:accChartInfo.accountName
        })
        this.onSelectedBalance(accChartInfo.accountId);
      }
    }else{
      this.accountCharModel=[];
    }
  })
}
onSelectAccountName(accCharInfo:any){
if(accCharInfo !=null){
  this.paymentForm.patchValue({
    accountId:accCharInfo.accountId
  })
  this.onSelectedBalance(this.f.accountId.value);
  // Helper.focusTextField('vtdate');
 }
}
  ///Balance And AccountName Text Box
  onSelectedBalance(accountId:number){
    if(accountId==null ){return;}else{
      let lowerGroupId:number=0;
      if(this.f.voucherType.value=='CP'){
        lowerGroupId=1;
      }else{
        lowerGroupId=94;
        }
      ///Here lowerGroupId=1 ,AccountID=5 and companyID=3 because of get AccountName=cash Account
     this.transactionService.getCashTransactionBalance(lowerGroupId,accountId,this.compID).subscribe((response:any)=>{
      if(response.status){
        let accountChartBalanceModel = response.result ;
         this.paymentForm.patchValue({
            //  accountId:accountChartBalanceModel.accountId,
           presentBalance:accountChartBalanceModel.presentBalance
         })
       }
     })

    // else{
    //   this.transactionService.getCashTransactionBalance(94,this.f.accountId.value,this.compID).subscribe((response:AccountChart)=>{
    //     if(response){
    //       let accountChartBalanceModel = response as AccountChart;
    //       this.paymentForm.patchValue({
    //         accountId:accountChartBalanceModel.accountId,
    //         presentBalance:accountChartBalanceModel.presentBalance
    //       })
    //     }
    //   })
    // }
  }
 }
 //Start Date text box
 onSelectPeriod(periods:any){
   this.paymentForm.patchValue({
    periodID:periods.id
   })
 }
 //Get All Period For FindIndex
 getPeriods(){
  this.settingService.getAllPeriod(this.compID,this.moduleId).subscribe((result:any)=>{
    if(result){
      this.allPeriods=result as PeriodModel[];``
    }else{
      this.allPeriods=[];
    }
  })
  }
 getShowableAmount(){
  let installmemtShowableModel:any []=[];
   let totalAmount=this.f.totalAmount.value;
   let perInstallment=this.f.installAmount.value;
   let plastInstallment=totalAmount/perInstallment;
   let showableAmounts:any[]=[];
   let parts= plastInstallment.toString().split('.');
   let primeValue=parseInt(parts[0]);
   let desimalValue=parseInt(parts[1]);
   for(let i=0;i<primeValue;i++){
     let showableAmount=perInstallment;
      showableAmounts.push(showableAmount)
   }

   if(desimalValue >0){
    let lastInstallment=totalAmount-(perInstallment*primeValue)
    showableAmounts.push(lastInstallment)
   }
   let index = this.allPeriods.map(c => c.id ).sort();

   let passed = index.find(c=>c ==this.f.periodID.value);
   let indexOfPas=index.indexOf(passed);
   index.splice(0,indexOfPas)
  if(desimalValue >0){
    installmemtShowableModel=[];
    this.paymentArrayForm=this.formBuilder.array([]);
    console.log(index.length,primeValue);
    if(index.length>=(primeValue+1)){
    for(let i=0;i<(primeValue+1);i++){
      let pushableInfo={periodID:index[i],periodName:this.allPeriods.find(c=>c.id==index[i]).periodName, amount:showableAmounts[i]}
      installmemtShowableModel.push(pushableInfo);
    }
   installmemtShowableModel.forEach(item=>{
     this.paymentArrayForm.push(
       new FormGroup({
        periodID:new FormControl(item.periodID,[]),
        periodName:new FormControl(item.periodName,[]),
        amount:new FormControl(item.amount,[])
       })
     )
   })}else{
    this.toasterService.error("Period is less then Installment Number")
  }
  }else{
    installmemtShowableModel=[];
    this.paymentArrayForm=this.formBuilder.array([]);
    if(index.length>=primeValue){
    for(let i=0;i<primeValue;i++){
      let pushableInfo={periodID:index[i],periodName:this.allPeriods.find(c=>c.id==index[i]).periodName,amount:showableAmounts[i]}
      installmemtShowableModel.push(pushableInfo);
    }
    installmemtShowableModel.forEach(item=>{
      this.paymentArrayForm.push(
        new FormGroup({
         periodID:new FormControl(item.periodID,[]),
         periodName:new FormControl(item.periodName,[]),
         amount:new FormControl(item.amount,[])
        })
      )
    })}else{
      this.toasterService.error("Period is less then Installment Number")
    }
  }
 }
   //Balance Text Box
   onChangeAccountBankId(bankList:AccountChart){
    this.paymentForm.patchValue({
     accountId:bankList.accountId
    })
    this.onSelectedBalance(this.f.accountId.value);
    this.getChequeNo(this.f.accountId.value)
  }
    //// Pay To textbox
   onSelectMemberInfo(memList:any){
    this.paymentForm.patchValue({
      memberIDOrEmpCode:memList.id
    })
    }
    onSelectServiceHead(services:any){
      this.paymentForm.patchValue({
        serviceID:services.id
      })
    }
    ///////// Save Function//////////
confirmSave(event:any){
  this.isSubmit=true;
  this.modalService.dismissAll();
  if(this.paymentForm.invalid ){
    this.modalService.dismissAll();
   this.toasterService.error("Please fill the all required fields","Invalid submission");
   return;
 }else{
  this.modalService.open(event)
 }
}
saveTransaction(){
     let periodIDs:any[]=[];
     let amounts:any[]=[];
     this.paymentArrayForm.controls.forEach(frmGroup=>{
      let pdId=Number(frmGroup.get('periodID').value);
      let fAmounts=Number(frmGroup.get('amount').value)
      periodIDs.push(pdId);
      amounts.push(fAmounts)
      })
      this.f.periodIDs.patchValue(periodIDs);
      this.f.amounts.patchValue(amounts);
     console.log(this.paymentForm.value);
 this.receiveAndPaymentService.savePaymentTransaction(this.paymentForm.value).subscribe((response:any)=>{
    if(response.status){
      this.modalService.dismissAll();
      this.toasterService.success(response.message,"Success!")
      this.reset();
    }else{
      this.toasterService.error(response.message,"Faild!")
      this.modalService.dismissAll();
      this.reset();
    }
 },(error:any)=>{
  this.modalService.dismissAll();
  this.toasterService.error(error.error,"Failed!")
}
 )
}

getTransactionListByTransID(transactionListModel:TransMasterModel){
  this.btnStatus="Update";
  this.formatVoucherNo=null;
  // this.cashTransactionService.getTransactionListByTransID(transactionListModel.transId,this.branchID,this.compID).subscribe((response:TransDetailsModel[])=>{
  //   if(response){
  //     let transDetail=response as TransDetailsModel[];
  //     this.voucherNoShowModel=transactionListModel.transMaster;
  //         this.cashTransactionForm.patchValue({
  //           voucherNo:transactionListModel.voucherNo,
  //           yearID:transactionListModel.yearID,
  //           voucherDateNgb:this.dateFormatter.getYyyymmddToNgbDate(transactionListModel.voucherDate),
  //           voucherDate:this.dateFormatter.getYyyymmddToDate(transactionListModel.voucherDate).toLocaleDateString(),
  //           refNo:transactionListModel.refNo,
  //           totalAmount:transactionListModel.totalAmount,
  //           narration:transactionListModel.narration,
  //           transId:transactionListModel.transId,
  //           partyId:transactionListModel.partyId,
  //           refAccountId:transactionListModel.refAccountId,
  //         });
  //         this.fromDate=transactionListModel.fromDate;
  //         this.toDate=transactionListModel.toDate;
  //         this.isCostCenter=transactionListModel.isCostCenter;
  //         ////BalanceTexBox
  //         this.onSelectedBalance(transactionListModel.partyId);
  //           ////this code for voucherNo Textbox Show
  //           this.formatVoucherNo=transactionListModel.formatVoucherNo;
  //      this.accountName=transactionListModel.accountName;
  //       this._cashTransactionForm=this.formBuilder.array([]);
  //       // let index=0;
  //         transDetail.forEach(item=>{
  //           this._cashTransactionForm.push(
  //             new FormGroup({
  //               id:new FormControl(item.id,[]),
  //         accountId:new FormControl(item.accountId,[]),
  //         isCostCenter:new FormControl(transactionListModel.isCostCenter,[]),
  //         subledgerId:new FormControl(item.subledgerId,[]),
  //         detailsID:new FormControl(item.detailsID,[]),
  //         amount:new FormControl(item.amount,[]),
  //         taxId :new FormControl(0,[]),
  //         isAdditional :new FormControl(item.isAdditional,[]),
  //         specificChequeNo:new FormControl(item.specificChequeNo,[]),
  //         conRate :new FormControl(item.conRate,[]),
  //         subItem:new FormControl(item.subItem,[]),
  //         costCenItem:new FormControl(item.costCenItem,[])
  //             })
  //             );
  //             // if(item.subItem.length>0){
  //             //   this.getReplaceElement('subledger'+index);
  //             // }
  //             // if(item.costCenItem.length>0){
  //             //   this.getReplaceElement('costCenter'+index);
  //             // }
  //             // index+=1;
  //           });

  //        }
  //     });

  }
  createNewItem(event:any){
    if(event !=null){
      this.modalService.open(event,{size: 'lg', windowClass: 'my-class'})    ;
   }else{return;}
  }
    reset(){
      this.isSubmit=false;
      this.paymentForm.reset();
      this.paymentArrayForm=this.formBuilder.array([]);
      this.createForm();
      this.paymentForm.controls['voucherDate'].setValue((new Date).toLocaleDateString());
      this.paymentForm.controls['voucherDateNgb'].setValue(this.dateFormatter.getCurrentNgbDate())
      this.paymentForm.controls['chequeDate'].setValue((new Date).toLocaleDateString());
      this.paymentForm.controls['chequeDateNgb'].setValue(this.dateFormatter.getCurrentNgbDate())
      this.onSelectedVocherNo();
      this.getChequeNo(this.f.accountId.value);
     this.btnStatus="Save";
    }
  createForm(){
    this.paymentForm=this.formBuilder.group({
         partyId:[this.partyId,[]],
         accountId:[,[]],
         memberIDOrEmpCode:[,[]],
         voucherNo :[,[Validators.required]],
         voucherDate :[,[Validators.required]],
         voucherDateNgb:[,[]],
         voucherType :['CP',[Validators.required]],
          yearID:[,[]],
          transType :[this.transType,[]],
          totalAmount :[,[]],
          refNo :[null,[]],
          narration :[null,[]],
          chequeNo :[,[]],
         chequeDate :[null,[]],
         chequeDateNgb:[,[]],
         compId :[this.compID,[]],
         branchID :[this.branchID,[]],
         userId:[this.userId,[]],
         presentBalance:[,[]],
         periodID:[,[]],
         periodIDs:[[],[]],
         amounts:[[],[]],
         installAmount:[,[]],
         moduleID:[this.moduleId,[]],
         serviceID:[,[]]
      })
  }
  addRow() {
    this.paymentArrayForm.push(
    new FormGroup({
      periodID:new FormControl(null,[]),
      periodName:new FormControl(null,[]),
      amount:new FormControl(null,[])
    })
  )
}
removeRow(index:number){
  let tAmount=this.paymentArrayForm.value[index]["amount"];
  this.totalAmount -=tAmount;
  this.f.totalAmount.patchValue(this.totalAmount);
  this.paymentArrayForm.removeAt(index);
}
  get f(){
    return this.paymentForm.controls;
  }
}
