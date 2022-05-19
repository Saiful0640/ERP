import { Helper } from './../../../../shared/helper';
import { AccountingBasicEntryService } from './../../../../services/accounting/accounting-basic-entry.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateCustomParserFormatter } from './../../../../shared/dateformat';

import { VoucherType } from './../../../../models/accounting/transaction/voucher-type.model';
import { TransactionService } from './../../../../services/accounting/transaction.service';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, Input} from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TransMasterModel } from '../../../../models/accounting/transaction/trans-master-model';
import { TransDetailsModel } from '../../../../models/accounting/transaction/trans-details-model';
import { AuthService } from '../../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import {  TransType } from '../../../../shared/lookup';
import { CriteriaCenterService } from '../../../../services/criteria-center.service';
import { AccountChart } from '../../../../models/accounting/basic-entry/bank/AccountChart';
import { AccountChartService } from '../../../../services/accounting/AccountChartService';
import { Financialyear } from '../../../../models/settings/financialyear.modal';
import { SettingService } from '../../../../services/settings/Setting.service';
import { TransactionMasterAcc } from '../../../../models/accounting/transaction/transaction-master-acc.model';
import { TransactionDetailsAcc } from '../../../../models/accounting/transaction/transaction-details-acc.model';
import { TransactionSubledger } from '../../../../models/accounting/transaction/transaction-subledger.model';
import { TransactionCostcenter } from '../../../../models/accounting/transaction/transaction-costcenter.model';
@Component({
  selector: 'app-cash-transaction',
  templateUrl: './cash-transaction.component.html',
  styleUrls: ['./cash-transaction.component.scss']
})
export class CashTransactionComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private transactionService:TransactionService,
    private dateFormatter:NgbDateCustomParserFormatter,
    private chartOfAccountService:AccountingBasicEntryService,
    private AccountService:AccountChartService,
    private settingService:SettingService,
    private modalService:NgbModal,
    private toasterService:ToastrService,
    private criteriaService:CriteriaCenterService,
  ) {
    //console.log(this.route.getCurrentNavigation().extras.state);
    this._cashTransactionForm=this.formBuilder.array([]);
  }
  @Input() modalName:any;
  transId:number=0;
  cashTransactionForm:FormGroup;
  _cashTransactionForm:FormArray;
    branchID:number;
    compID:number;
    userId:number;
    moduleId:number;
    accountName:string;
    transactionListModel:TransMasterModel[]=[];
    totalAmount:number=0;
    btnStatus:string="Save";
    isSubmit:boolean=false;
    isSaving: boolean = false;
    formatVoucherNo:string;
    accountCharModel:AccountChart[]=[];
    transCostCenterModel:any[]=[];
    transSubledgerModel:TransactionSubledger[]=[];
    accountId:number;
    transType:number=TransType.CashTransaction;
    subLedgerEvent:any;
    costCenterEvent:any;
    /////
    financialModal:Financialyear[]=[];
    voucherNo:number=0;



  ngOnInit() {
    this.compID=AuthService.CompanyId;
    this.userId=AuthService.UserId;
    this.moduleId=AuthService.CurrentModuleId;
    this.createForm();
    this.onChangeAccountName();
    this.onSelectedVocherNo(null);
    this.addRow();
  }

  /////this is used for Spring boot
  onSelectedVocherNo(voucherDate:any){
    let voucherd=voucherDate==null?this.dateFormatter.getDateToYyyymmdd((new Date)):voucherDate;
      this.settingService.getAllFinancialYear().subscribe((response:any)=>{
        if(response){
         this.financialModal=response;
         let financialYear=this.financialModal.filter(x=>{return x.sfYear<=voucherd && x.efYear>=voucherd && x.compId==this.compID});
         if(this.financialModal.length>0){
          this.transactionService.getAllTransactionMaster().subscribe((response:any)=>{
            if(response){
                if(response.length>0){
                  let transMasterAccFilterByVoucherType=response.filter(c=>c.voucherType==this.f.voucherType.value)
                  if(transMasterAccFilterByVoucherType.length>0){

                  this.voucherNo = Math.max.apply(null,transMasterAccFilterByVoucherType.map(function(o) { return o.voucherNo; }))+1;
                  this.transId=Math.max.apply(null,transMasterAccFilterByVoucherType.map(function(o) { return o.transId; }))+1;
                  }else{
                    this.voucherNo = 1;
                  this.transId=1;
                  }
                }else{
                  this.voucherNo = 1;
                  this.transId=1;
                }
                this.formatVoucherNo=this.f.voucherType.value=="CashPayment"?financialYear[0].yearName+'-'+'CP'+'-'+this.voucherNo:financialYear[0].yearName+'-'+'CR'+'-'+this.voucherNo;
              this.cashTransactionForm.patchValue({
                transId:this.transId,
                voucherNo:this.voucherNo,
                 yearID:financialYear[0].id,
                 formateVoucherNo:this.formatVoucherNo
               });
            }
          })
         }

        }else{
          this.financialModal=[];
        }
      })
   }

  ///Balance And AccountName Text Box/////this is used for Spring boot
  onChangeAccountName(){
      this.AccountService.getAllAccountChart().subscribe((response:any)=>{
        if(response){
          ///filtering by this.compID,1,this.branchID
          this.accountCharModel =response.filter(c=>{return c.accountId==1 && c.compId==this.compID });
          console.log(this.accountCharModel)
          if(this.accountCharModel.length>0){
            this.cashTransactionForm.patchValue({
              partyId:this.accountCharModel[0].accountId,
              accountName:this.accountCharModel[0].accountName
            });
            this.transactionService.getAllTransactionDetails().subscribe((response:any)=>{
              let transDetails =response.filter(c=>{return c.accountId==this.accountCharModel[0].accountId && c.compId==this.compID })
              if(transDetails.length>0){
                this.cashTransactionForm.patchValue({
                  presentBalance:transDetails.map(item => item.amount).reduce((prev, curr) => prev + curr, 0),
                  refAccountId:this.accountCharModel[0].accountId
                });
              }else{
                this.cashTransactionForm.patchValue({
                  presentBalance:0,
                  refAccountId:this.accountCharModel[0].accountId
                });
              }
            })
          }

            // this.onSelectedBalance(accChartInfo.accountId);
        }else{
          this.accountCharModel=[];
        }
      });

  }


  onEnterKey(event:KeyboardEvent){
    if(event.key=='Enter' || event.key=='Tab'){
      event.stopImmediatePropagation;
      Helper.focusTextField('vtdate');
    }
  }
  onSelectVoucherDate(vdate:any){
    if(vdate !=null){
      this.cashTransactionForm.patchValue({
        voucherDate:vdate
      });
      // this.onSelectedVocherNo();
      Helper.focusNgSelect('accountHead'+0);
    }

  }
  //// Account Name, Amount, Subledger,CostCenter TextBox
  onChangeAccountId(accountList:any,rowIndex:number){
      if(accountList){
         this._cashTransactionForm.controls[rowIndex].patchValue({
        accountId:accountList.accountId,
        accountName:accountList.accountName
      });
     this.getAllSubledger(accountList.accountId,rowIndex);
     this.getListOfCostCenter(accountList.isCostCenter,rowIndex);
      this.accountId=accountList.accountId;
      this.accountName=accountList.accountName;
      Helper.focusTextField('amount'+rowIndex);
    }
  }
  ////subledger template/////////
  getAllSubledger(accountId:number,rowIndex:number){
    if(accountId !=null ){
      this.chartOfAccountService.getSubledgers().subscribe((response:any)=>{
        if(response){
          //this.compID,accountId
          this.transSubledgerModel=response.filter(c=>c.accountId==accountId);
           if( this.transSubledgerModel.length >0){
            this._cashTransactionForm.controls[rowIndex].patchValue(
              {
               subItem:this.transSubledgerModel
              });
           }else{
            this._cashTransactionForm.controls[rowIndex].patchValue(
              {
               subItem: []
              });
           }
        }else
        {
          this._cashTransactionForm.controls[rowIndex].patchValue(
            {
             subItem:[]
            });
            // this.getElement('subledger'+rowIndex);

        }
      });
    }else{
      return;
    }
  }
  subledgerItem(data:any,rowIndex:number){
    if(data !=null ){
    this._cashTransactionForm.controls[rowIndex].patchValue(
     {
      subItem:data.subledgerItem,
      amount:data.totalAmount
     });
    }else{return;}
  }

  onSelectSubledger(sub:any,rowIndex:number){
    if(sub !=null ){
      this._cashTransactionForm.controls[rowIndex].patchValue(
        {
         subledgerId:sub.subledgerId
        });
      Helper.focusTextField('costPlus'+rowIndex);
    } else{
      return;
    }
  }
  getTotalAmount(){
    this.totalAmount =0;
  this._cashTransactionForm.controls.forEach(frmGroup=>{
  let tAmount=Number(frmGroup.get('amount').value);
  this.totalAmount+=tAmount;
  });
   this.f.totalAmount.patchValue(this.totalAmount);
  }

  //////CostCenter template///////////
  costCenterItem(data:any,rowIndex:number){
    if(data !=null ){
    this._cashTransactionForm.controls[rowIndex].patchValue(
      {
        costCenItem:data.costCenterItem
      });
    }else{
      return;
    }
  }
  getListOfCostCenter(isCostCenter:number,rowIndex:number) {
    if(isCostCenter){
      this.criteriaService.getCriteriaCenterNew().subscribe((response: any) => {
        if (response) {
          //this.moduleId,this.compID
          this.transCostCenterModel = response;
           if( this.transCostCenterModel.length >0){
            this._cashTransactionForm.controls[rowIndex].patchValue(
              {
                costCenItem: this.transCostCenterModel
              });

          }else{
            this._cashTransactionForm.controls[rowIndex].patchValue(
              {
                costCenItem: []
              });
          }
        }
        else {
          this._cashTransactionForm.controls[rowIndex].patchValue(
            {
              costCenItem: []
            });
        }
      });
    }else{
      return;
    }
    }
  onSelectCostCenter(cost:any,rowIndex:number){
    if(cost !=null ){
    this._cashTransactionForm.controls[rowIndex].patchValue(
      {
       detailsId:cost.detailsId
      });
      Helper.focusNgSelect('accountHead'+(rowIndex+1));
    }else{
      return;
    }
  }

  //////////Modal Method////////////
  createSubNewItem(event:any,rowIndex:number){
    if(event !=null){
      this.modalService.open(event,{size: 'lg', windowClass: 'my-classS'});
       if(this.subLedgerEvent !=null){
        if(this._cashTransactionForm.controls[rowIndex].get('costCenItem').value.length>0){
          Helper.focusTextField('costPlus'+rowIndex);
          this.modalService.dismissAll();
          this.subLedgerEvent=null;
          //this.subLedgerEvent.preventDefault();
        }else{
          Helper.focusNgSelect('accountHead'+(rowIndex+1));
          this.modalService.dismissAll();
          this.subLedgerEvent=null;
        }
      }
    }
    else{return;}
  }
  createCostNewItem(event:any,rowIndex:number){
    if(event !=null){
        this.modalService.open(event,{size: 'lg', windowClass: 'my-classS'});
        if(this.costCenterEvent !=null){
            Helper.focusNgSelect('accountHead'+(rowIndex+1));
            this.modalService.dismissAll();
            this.costCenterEvent=null;
        }
     }else{return;}
  }
  createNewItem(event:any){
    if(event !=null){
      this.modalService.open(event,{size: 'lg', windowClass: 'my-class'})    ;
   }else{return;}
  }
///////// Save Function//////////
saveTransaction(){
  this.isSubmit=true;
  // if (this.cashTransactionForm.invalid) {
  //   this.toasterService.error("Please fill the all required fields","Invalid submission");
  //   return;
  // }
  this.isSaving = true;
  let cashTrans=new TransactionMasterAcc();
  cashTrans=this.cashTransactionForm.value;
  console.log(this._cashTransactionForm.value);
  var filterDetails=this._cashTransactionForm.value.filter(item=>item.accountId !=null && item.amount >0);
  let transactionDetails:TransactionDetailsAcc[]=[];
  transactionDetails=filterDetails.map(x=>{
    console.log(x)
    x.transId=this.transId,
    x.compId=this.compID,
    x.amount=this.f.voucherType.value=="CashPayment"?x.amount:x.amount * -1
    return x;
  })
  // cashTrans.transDetails =filterDetails;
  if(this._cashTransactionForm.length>0 && filterDetails.length>0){
 this.transactionService.saveTransMasterAcc(cashTrans).subscribe((response:any)=>{
    if(response){
          ///Multiple TransDetailsAcc
        for(let i=0;filterDetails.length>i;i++){
          this.transactionService.saveTransDetailsAcc(transactionDetails[i]).subscribe((response:any)=>{
              if(response){
                this.toasterService.success("Saved Details")    ;
                if(filterDetails[i].subItem.length >0 ){
                  let subledgerItem= filterDetails[i].subItem.filter(c=>c.amount>0)
                  if(subledgerItem.length>0){
                    let transSubledger:TransactionSubledger[]=[];
                    transSubledger= subledgerItem.map(sb=>{
                      sb.transId =this.transId,
                      sb.accountId =transactionDetails[i].accountId,
                      sb.amount=this.f.voucherType.value=="CashPayment"?sb.amount:sb.amount * -1,
                      sb.compId =this.compID
                      return sb
                    })
                    for(let sbi=0;subledgerItem.length>sbi;sbi++){
                      this.transactionService.saveTransSubledger(transSubledger[sbi]).subscribe((response:any)=>{
                          if(response){
                           this.toasterService.success("Saved Subledger")
                          }
                      })
                    }
                  }

                }
                if(filterDetails[i].costCenItem.length>0){
                    let costCenterItem=filterDetails[i].costCenItem.filter(c=>c.amount>0);
                    if(costCenterItem.length>0){
                      let transCostCenter:TransactionCostcenter[]=[];
                      transCostCenter=costCenterItem.map(cst=>{
                        cst.transId=this.transId,
                        cst.accountId=transactionDetails[i].accountId,
                        cst.costCenterId=cst.detailsId,
                        cst.compId=this.compID,
                        cst.amount=this.f.voucherType.value=="CashPayment"?cst.amount:cst.amount * -1
                        return cst
                      })
                      for(let csti=0;costCenterItem.length>csti;csti++){
                        this.transactionService.saveTransCostCenter(transCostCenter[csti]).subscribe((response:any)=>{
                            if(response){
                              this.toasterService.success("Saved CostCenter")
                            }
                        })
                      }
                    }
                }
              }
          })
        }

          ///Single TransDetailsAcc
          let transDetailsSingle=new TransactionDetailsAcc();
          transDetailsSingle.accountId=this.f.refAccountId.value;
          transDetailsSingle.transId=this.transId;
          transDetailsSingle.amount=this.f.voucherType.value=="CashPayment"?this.totalAmount * -1:this.totalAmount //this.totalAmount;
          transDetailsSingle.compId=this.compID;
          this.transactionService.saveTransDetailsAcc(transDetailsSingle).subscribe((response:any)=>{
            if(response){
              this.toasterService.success("Saved Details single")
            }
          })

    }else{
      this.toasterService.error(response.message,"Faild!");
    }
    this.reset();
    this.isSaving = false;
    this.isSubmit = false;
  }, err => {
    this.isSaving = false;
    this.isSubmit = false;
    this.toasterService.error(err.message,"error")
  });
}else{
  this.toasterService.error("Please fill Account Head And Amount","Invalid submission");

  this.isSubmit=false;
  this.isSaving = false;
  this.addRow();
}
}
onClose(isSaving:any){
  this.isSaving=isSaving;
  this.isSubmit=isSaving;
}
onBlurSaleBtn(event:MouseEvent){
  // console.log(Helper.focusNgSelect('accountHead'+0))
  Helper.focusNgSelect('accountHead'+0);
}

getTransactionListByTransID(transactionListModel:TransMasterModel){
  this.btnStatus="Update";
  this.formatVoucherNo=null;
  this.transactionService.getTransactionListByTransID(transactionListModel.transId,this.branchID,this.compID).subscribe((response:TransDetailsModel[])=>{
    if(response){
      let transDetail=response as TransDetailsModel[];
          this.cashTransactionForm.patchValue({
            voucherNo:transactionListModel.voucherNo,
            yearID:transactionListModel.yearID,
            voucherDateNgb:this.dateFormatter.getYyyymmddToNgbDate(transactionListModel.voucherDate),
            voucherDate:this.dateFormatter.getYyyymmddToDate(transactionListModel.voucherDate).toLocaleDateString(),
            refNo:transactionListModel.refNo,
            totalAmount:transactionListModel.totalAmount,
            narration:transactionListModel.narration,
            transId:transactionListModel.transId,
            partyId:transactionListModel.partyId,
            refAccountId:transactionListModel.refAccountId,
          });
            ////this code for voucherNo Textbox Show
            this.formatVoucherNo=transactionListModel.formatVoucherNo;
       this.accountName=transactionListModel.accountName;
        this._cashTransactionForm=this.formBuilder.array([]);
        // let index=0;
          transDetail.forEach(item=>{
            this._cashTransactionForm.push(
              new FormGroup({
                id:new FormControl(item.id,[]),
          accountId:new FormControl(item.accountId,[]),
          // transId:new FormControl(item.transId,[]),
          subledgerId:new FormControl(item.subledgerId,[]),
          detailsId:new FormControl(item.detailsID,[]),
          amount:new FormControl(item.amount,[]),
          taxId :new FormControl(0,[]),
          subItem:new FormControl(item.subItem,[]),
          costCenItem:new FormControl(item.costCenItem,[])
              })
              );
              // if(item.subItem.length>0){
              //   this.getReplaceElement('subledger'+index);
              // }
              // if(item.costCenItem.length>0){
              //   this.getReplaceElement('costCenter'+index);
              // }
              // index+=1;
            });

         }
      });

  }




  createForm(){
    this.cashTransactionForm=this.formBuilder.group({
      id :[0,[]],
      transId:[,[]],
      partyId:[,[Validators.required]],
      voucherDate :[this.dateFormatter.getDateToYyyymmdd((new Date)),[Validators.required]],
      voucherDateNgb:[,[]],
      voucherType :['CashPayment',[Validators.required]],
      refAccountId:[,[]],
      voucherNo :[,[]],
      yearID:[,[]],
      transType :[this.transType,[]],
      totalAmount :[,[]],
      refNo :[null,[]],
      narration :[null,[]],
      bankBranch:[null,[]],
      chequeNo :[,[]],
      chequeDate :[null,[]],
      netPayable:[0,[]],
      compId :[this.compID,[]],
      branchId :[this.branchID,[]],
      userId:[this.userId,[]],
      accountName:[,[]],
      presentBalance:[,[]],
      formateVoucherNo:[this.formatVoucherNo,[]]
    });
  }
    addRow() {
        this._cashTransactionForm.push(
        new FormGroup({
          id:new FormControl(0,[]),
          accountId:new FormControl(null,[]),
          transId:new FormControl(0,[]),
          accountName:new FormControl(null,[]),
          subledgerId:new FormControl(null,[]),
          detailsId:new FormControl(null,[]),
          amount:new FormControl(null,[]),
          taxId:new FormControl(0,[]),
          subItem:new FormControl([],[]),
          compId:new FormControl(this.compID,[]),
          costCenItem:new FormControl([],[])
        })
      );
  }


  removeRow(index:number){
    let tAmount=this._cashTransactionForm.value[index]["amount"];
    this.totalAmount -=tAmount;
    this.f.totalAmount.patchValue(this.totalAmount);
    this._cashTransactionForm.removeAt(index);
  }

  reset(){
    this.isSubmit=false;
    this.isSaving=false;
    this.cashTransactionForm.reset();
    this.createForm();
    this._cashTransactionForm=this.formBuilder.array([]);
    this.cashTransactionForm.controls['voucherDate'].setValue((new Date).toLocaleDateString());
    this.cashTransactionForm.controls['voucherDateNgb'].setValue(this.dateFormatter.getCurrentNgbDate());
    this.addRow();
    this.btnStatus="Save";
    this.onChangeAccountName();
    this.onSelectedVocherNo(null);
  }
  get f(){
    return this.cashTransactionForm.controls;
  }
  get formVal() {
    return this.cashTransactionForm.value;
  }
  get formValArr() {
    return this._cashTransactionForm.value;
  }
   onEnterKeyPress(event:KeyboardEvent,rowIndex:number){
    if(event.key=='Enter' || event.key=='Tab'){
      if(this._cashTransactionForm.controls[rowIndex].get('accountId').value !=null && this._cashTransactionForm.controls[rowIndex].get('amount').value >0 ){
      if(this._cashTransactionForm.controls[rowIndex].get('subItem').value.length >0){
        Helper.focusTextField('subPlus'+rowIndex);
        event.preventDefault();
      }else
      if(this._cashTransactionForm.controls[rowIndex].get('costCenItem').value.length >0){
        Helper.focusTextField('costPlus'+rowIndex);
        event.preventDefault();
      }else if(this._cashTransactionForm.controls.length == (rowIndex+1)){
        Helper.focusTextField('addItem'+rowIndex);
        event.preventDefault();
      }
      else{
        this.addRow();
        Helper.focusNgSelect('accountHead'+(rowIndex+1));
        event.preventDefault();
      }
     }else{
      Helper.focusTextField('narration');
      event.preventDefault();
    }
    }
  }
  onAddPress(event:KeyboardEvent,rowIndex:number){
    if(event.key=='Enter' || event.key=='Tab'){
       Helper.focusNgSelect('accountHead'+(rowIndex+1));
        event.preventDefault();

    }
  }

}
