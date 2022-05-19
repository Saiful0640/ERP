
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CostCenterModel } from './../../../../models/accounting/basic-entry/chart-of-account/cost-center.model';
import { Subledger } from './../../../../models/accounting/basic-entry/chart-of-account/subledger.model';
import { VoucherType } from './../../../../models/accounting/transaction/voucher-type.model';
import { TransactionService } from './../../../../services/accounting/transaction.service';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { TransMasterModel } from '../../../../models/accounting/transaction/trans-master-model';
import { ToastrService } from 'ngx-toastr';
import { TransDetailsModel } from '../../../../models/accounting/transaction/trans-details-model';
import { NgbDateCustomParserFormatter } from '../../../../shared/dateformat';
import { AuthService } from '../../../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TransType } from '../../../../shared/lookup';
import { AccountingBasicEntryService } from '../../../../services/accounting/accounting-basic-entry.service';
import { Helper } from '../../../../shared/helper';
import { CriteriaCenterService } from '../../../../services/criteria-center.service';
import { AccountChart } from '../../../../models/accounting/basic-entry/bank/AccountChart';
import { SettingService } from '../../../../services/settings/Setting.service';
import { Financialyear } from '../../../../models/settings/financialyear.modal';
import { AccountChartService } from '../../../../services/accounting/AccountChartService';
import { TransactionMasterAcc } from '../../../../models/accounting/transaction/transaction-master-acc.model';
import { TransactionDetailsAcc } from '../../../../models/accounting/transaction/transaction-details-acc.model';
import { TransactionSubledger } from '../../../../models/accounting/transaction/transaction-subledger.model';
import { TransactionCostcenter } from '../../../../models/accounting/transaction/transaction-costcenter.model';
import { ChequeBook } from '../../../../models/accounting/basic-entry/bank/cheque-book.model';
import { ChequeBookView } from '../../../../models/accounting/bank/cheque-book-view.model';

@Component({
  selector: 'app-bank-transaction',
  templateUrl: './bank-transaction.component.html',
  styleUrls: ['./bank-transaction.component.scss']
})
export class BankTransactionComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private transactionService:TransactionService,
    private modalService:NgbModal,
    private dateFormatter:NgbDateCustomParserFormatter,
    private toasterService:ToastrService,
    private settingService:SettingService,
    private chartOfAccountService:AccountingBasicEntryService,
    private criteriaService:CriteriaCenterService,
    private AccountService:AccountChartService,
    ) {
      this._bankTransactionForm=this.formBuilder.array([]);
    }
  bankTransactionForm:FormGroup;
  _bankTransactionForm:FormArray;
  voucherTypeModel:VoucherType[]=[];
  compID:number;
  branchID:number;
  chequeNoShowModel:TransMasterModel[]=[];
  transactionListModel:TransMasterModel[]=[];
  transCostCenterModel:any[]=[];
  transSubledgerModel:TransactionSubledger[]=[];
  accountCharModel:AccountChart[]=[];
  totalAmount:number=0;
  accountName:string;
  userId:number;
  btnStatus:string="Save";
  isSubmit:boolean=false;
  isSaving: boolean = false;
  formatVoucherNo:string;
  subLedgerEvent:any;
  costCenterEvent:any;
  accountId:number;
  transType:number=TransType.BankTransaction;
  moduleId:number;
  chequeNoId:number;
  /////
  financialModal:Financialyear[]=[];
  voucherNo:number=0;
  transId:number=0;
  ngOnInit() {
    this.branchID=AuthService.BranchId;
    this.compID=AuthService.CompanyId;
    this.userId=AuthService.UserId;
    this.moduleId=AuthService.CurrentModuleId;
    this.createForm();
    this.addRow();
    this.onSelectedVocherNo(null);
  }
  
     /////this is used for Spring boot
  onSelectedVocherNo(voucherDate:any){
    let voucherd=voucherDate==null?this.dateFormatter.getDateToYyyymmdd((new Date)):voucherDate;
      this.settingService.getAllFinancialYear().subscribe((response:any)=>{
        if(response){
         this.financialModal=response;
         let financialYear=this.financialModal.filter(x=>{return x.sfYear<=voucherd && x.efYear>=voucherd && x.compId==this.compID});  
         if(financialYear.length>0){
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
                this.formatVoucherNo=this.f.voucherType.value=="BankPayment"?financialYear[0].yearName+'-'+'BP'+'-'+this.voucherNo:financialYear[0].yearName+'-'+'BR'+'-'+this.voucherNo;
              this.bankTransactionForm.patchValue({
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
  // onSelectedVocherNo(){
  //   let monthOfFormatedVoucherNo:any
  //   let localDate  = new Date(this.f.voucherDate.value)
  //   let monthOfVoucherDate = (localDate.getMonth()+1).toString().padStart(2,'0');
  //   if(this.formatVoucherNo !=null){
  //     monthOfFormatedVoucherNo=this.formatVoucherNo.substr(5,2);
  //   }
  //   if(this.f.partyId.value!=null){
  //     Helper.focusNgSelect('chequeNo');
  //    }else{
  //      Helper.focusNgSelect('accName');
  //    }
  //   if(monthOfVoucherDate != monthOfFormatedVoucherNo){
  //   this.transactionService.getVoucherNo(this.f.voucherType.value,this.f.voucherDate.value,this.compID).subscribe((response:TransMasterModel)=>{
  //     if(response){
  //       let voucherNoShow =response as TransMasterModel;
  //       if(voucherNoShow.financialYearID>0){
  //         this.bankTransactionForm.patchValue({
  //           voucherNo:voucherNoShow.voucherNo,
  //           yearID:voucherNoShow.financialYearID
  //         })
  //         this.formatVoucherNo=voucherNoShow.formatVoucherNo;
  //       }
  //       else{
  //           alert("Financial Year Not Set")
  //           this.bankTransactionForm.patchValue({voucherNo:null})
  //         }
  //     }
  //   })
  //   }
  // }
  // onSelectedVocherNoByVoucherType(){
  //   this.transactionService.getVoucherNo(this.f.voucherType.value,this.f.voucherDate.value,this.compID).subscribe((response:TransMasterModel)=>{
  //     if(response){
  //       let voucherNoShow =response as TransMasterModel;
  //       if(voucherNoShow.financialYearID>0){
  //         this.bankTransactionForm.patchValue({
  //           voucherNo:voucherNoShow.voucherNo,
  //           yearID:voucherNoShow.financialYearID
  //         })
  //         this.formatVoucherNo=voucherNoShow.formatVoucherNo;
  //       }
  //       else{
  //           alert("Financial Year Not Set")
  //           this.bankTransactionForm.patchValue({voucherNo:null})
  //         }
  //     }
  //   })
  // }
  //Balance Text Box
  onChangeAccountBankId(bankList:AccountChart){
    console.log(bankList)
    if(bankList !=null || bankList.accountId>0){
    this.bankTransactionForm.patchValue({
     partyId:bankList.accountId,
     accountName:bankList.accountName
    })
    console.log(bankList.accountId,this.f.partyId.value)
    this.onSelectedBalance(this.f.partyId.value);
    this.getChequeNo(bankList.accountId);
    Helper.focusTextField('vtdate');
  }else{return;}
  }

  onSelectVoucherDate(vdate:any){
    if(vdate !=null){
      this.bankTransactionForm.patchValue({
        voucherDate:vdate
      })
      if(this.f.partyId.value!=null){
     Helper.focusNgSelect('chequeNo');
    }
    }
  }
  onChequeNoSelect(chequeInfo:ChequeBook){
    this.bankTransactionForm.patchValue({
      chequeNo:chequeInfo.chequeNo,      
    })
    this.chequeNoId=chequeInfo.id;
  Helper.focusNgSelect('accountHead'+0);
  }
  onSelectedBalance(accountId:number){    
    this.transactionService.getAllTransactionDetails().subscribe((response:any)=>{
      let transDetails =response.filter(c=>{return c.accountId==accountId && c.compId==this.compID })
      console.log(transDetails)
      if(transDetails.length>0){
        this.bankTransactionForm.patchValue({
          presentBalance:transDetails.map(item => item.amount).reduce((prev, curr) => prev + curr, 0),
          refAccountId:accountId
        });
      }else{
        this.bankTransactionForm.patchValue({                  
          presentBalance:0,
          refAccountId:accountId
        });
      }
    })
  }  
  onSelectedBalance1(accountId:number){
  this.AccountService.getAllAccountChart().subscribe((response:any)=>{
    if(response){
      ///filtering by this.compID,1,this.branchID
      this.accountCharModel =response.filter(c=>{return c.accountId==accountId && c.compId==this.compID });
      console.log(this.accountCharModel)
      if(this.accountCharModel.length>0){
        // this.bankTransactionForm.patchValue({
        //   partyId:this.accountCharModel[0].accountId,
        //   accountName:this.accountCharModel[0].accountName
        // });
        this.transactionService.getAllTransactionDetails().subscribe((response:any)=>{
          let transDetails =response.filter(c=>{return c.accountId==accountId && c.compId==this.compID })
          if(transDetails.length>0){
            this.bankTransactionForm.patchValue({
              presentBalance:transDetails.map(item => item.amount).reduce((prev, curr) => prev + curr, 0),
              refAccountId:accountId
            });
          }else{
            this.bankTransactionForm.patchValue({                  
              presentBalance:0,
              refAccountId:accountId
            });
          }
        })
      }
    }else{
      this.accountCharModel=[];
    }
  });

  }
  //// chequeNo textBox
  getChequeNo(bankID:number){
    if(bankID == null){
     return;
    }else{
      this.transactionService.getChequeNoNew().subscribe((response:any)=>{
        if(response){
          //bankID,this.compID
          this.chequeNoShowModel=response.filter(c=>{return c.accountId==bankID && c.used==false && c.rejected==false}) ;
        }else{
          this.chequeNoShowModel=[];
        }
      })
    }
  }
  //// Account Name, Amount, Subledger,CostCenter TextBox
   onChangeAccountId(accountList:any,rowIndex:number){
    if(accountList){
      this._bankTransactionForm.controls[rowIndex].patchValue({
        accountId:accountList.accountId,
        accountName:accountList.accountName,
        formateAccountName:accountList.formateAccountName
      })
      this.getAllSubledger(accountList.accountId,rowIndex);
      this.getListOfCostCenter(accountList.isCostCenter,rowIndex)
      this.accountId=accountList.accountId;
      this.accountName=accountList.accountName;
      Helper.focusTextField('amount'+rowIndex);
       }

    }

    ////subledger template/////////
    subledgerItem(data:any,rowIndex:number){
      if(data !=null ){
      this._bankTransactionForm.controls[rowIndex].patchValue(
       {
        subItem:data.subledgerItem,
        amount:data.totalAmount
       })
       this.getTotalAmount();
      }else{return;}
    }
    getAllSubledger(accountId:number,rowIndex:number){
      if(accountId !=null ){
        this.chartOfAccountService.getSubledgers().subscribe((response:any)=>{
          if(response){
            this.transSubledgerModel=response.filter(c=>c.accountId==accountId);
            if( this.transSubledgerModel.length >0){
              this._bankTransactionForm.controls[rowIndex].patchValue(
                {
                 subItem:this.transSubledgerModel
                });
             }else{
              this._bankTransactionForm.controls[rowIndex].patchValue(
                {
                 subItem:[]
                });
             }
          }else
          {
            this._bankTransactionForm.controls[rowIndex].patchValue(
              {
               subItem:[]
              })
          }
        })
      }else{
        return;
      }
    }
    onSelectSubledger(sub:any,rowIndex:number){
      if(sub !=null){
      this._bankTransactionForm.controls[rowIndex].patchValue(
        {
         subledgerId:sub.subledgerId
        })
        Helper.focusTextField('costPlus'+rowIndex);
      }else{return;}
    }
    onSubledgerPlusClick(event:KeyboardEvent){
      if(event.key=='Enter' || event.key=='Click'){
            this.subLedgerEvent=event;
        }
    }
    onCostCenterPlusClick(event:KeyboardEvent){
      if(event.key=='Enter' || event.key=='Click')
      {
        this.costCenterEvent=event;
      }
    }
  //////CostCenter template///////////
  costCenterItem(data:any,rowIndex:number){
    if(data !=null){
    this._bankTransactionForm.controls[rowIndex].patchValue(
      {
        costCenItem:data.costCenterItem
      })
    }else{return;}
  }
  getListOfCostCenter(isCostCenter:number,rowIndex:number) {
    if(isCostCenter ==1){
      this.criteriaService.getCriteriaCenterNew().subscribe((response: any) => {
        if (response) {
          //this.moduleId,this.compID
          this.transCostCenterModel = response;
       if( this.transCostCenterModel.length >0){
        this._bankTransactionForm.controls[rowIndex].patchValue(
          {
            costCenItem: this.transCostCenterModel
          })
          // this.getReplaceElement('costCenter'+rowIndex)
        }else{
          this._bankTransactionForm.controls[rowIndex].patchValue(
            {
              costCenItem:[]
            })
            // this.getElement('costCenter'+rowIndex)
      }
      }
      else {
        this._bankTransactionForm.controls[rowIndex].patchValue(
          {
            costCenItem:[]
          })
          // this.getElement('costCenter'+rowIndex)
      }
    })
  }else{
    this.transCostCenterModel = [];
        // this.costWidth=230;
    return;
  }
}
  onSelectCostCenter(cost:any,rowIndex:number){
    if(cost !=null){
    this._bankTransactionForm.controls[rowIndex].patchValue(
      {
       detailsId:cost.detailsId
      })
      Helper.focusNgSelect('accountHead'+(rowIndex+1));
    }else{return;}
  }
  getTotalAmount(){
    this.totalAmount =0;
  this._bankTransactionForm.controls.forEach(frmGroup=>{
  let tAmount=Number(frmGroup.get('amount').value);
  this.totalAmount+=tAmount;
  })
   this.f.totalAmount.patchValue(this.totalAmount);
  }
  //////////Modal Method////////////
  createSubNewItem(event:any,rowIndex:number){
    if(event !=null){
      this.modalService.open(event,{size: 'lg', windowClass: 'my-classS'});
       if(this.subLedgerEvent !=null){
        if(this._bankTransactionForm.controls[rowIndex].get('isCostCenter').value==1){
          Helper.focusTextField('costPlus'+rowIndex);
          this.modalService.dismissAll();
          this.subLedgerEvent=null;
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
    this.modalService.open(event,{size: 'lg', windowClass: 'my-class'})
  }else{return;}
  }
  ////Save Transaction
  
  saveTransaction(){
    this.isSubmit=true;
  //   if(this.bankTransactionForm.invalid){
  //    this.toastrService.error("Please fill the all required fields","Invalid submission");
  //    return;
  //  }
   this.isSaving = true;
    let bankTrans=new TransactionMasterAcc();
    bankTrans=this.bankTransactionForm.value;
    var filterDetails=this._bankTransactionForm.value.filter(item=>item.accountId !=null && item.amount >0);
    let transactionDetails:TransactionDetailsAcc[]=[];
    transactionDetails=filterDetails.map(x=>{
      console.log(x)
      x.transId=this.transId,
      x.compId=this.compID,
      x.amount=this.f.voucherType.value=="BankPayment"?x.amount:x.amount * -1
      return x;
    })
    console.log(bankTrans)
    if(this._bankTransactionForm.length>0 && filterDetails.length>0){
   this.transactionService.saveTransMasterAcc(bankTrans).subscribe((response:any)=>{
      if(response){
            ///Multiple TransDetailsAcc
            if(this.f.chequeNo.value !=null && this.f.voucherType.value=="BankPayment"){
              let chequeInfo=new ChequeBookView();
              chequeInfo.id=this.chequeNoId;
              chequeInfo.accountId=this.f.partyId.value;
              chequeInfo.chequeNo=this.f.chequeNo.value;;
              chequeInfo.compId=this.compID;
              chequeInfo.used=true;
              chequeInfo.rejected=false;
              chequeInfo.recivedDate=this.f.chequeDate.value;
              chequeInfo.rejectReason=null;
              chequeInfo.rejectedBy=this.userId;
              console.log(chequeInfo);
          this.chartOfAccountService.updateChequeBookNew(chequeInfo)
            .subscribe((response: any) => {
              if (response) {
                console.log(response)
                this.toasterService.success( "Cheque No Updated!");
              } else {
                this.toasterService.error( "Cheque No Updated Failed!");
              }
            })
            }
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
                        sb.amount=this.f.voucherType.value=="BankPayment"?sb.amount:sb.amount * -1,
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
                          cst.amount=this.f.voucherType.value=="BankPayment"?cst.amount:cst.amount * -1
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
            transDetailsSingle.amount=this.f.voucherType.value=="BankPayment"?this.totalAmount * -1:this.totalAmount //this.totalAmount;
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
   },(error:any)=>{
    this.toasterService.error(error.error,"Failed!")
    this.modalService.dismissAll();
    this.isSubmit=false;
    this.isSaving=false;
  }
   )}else{
    this.toasterService.error("Please fill Account Head And Amount","Invalid submission");
    // this.modalService.dismissAll();
    this.isSubmit=false;
    this.isSaving=false;
    this.addRow();
   }
  }

getTransactionListByTransID(transactionListModel:TransMasterModel){
  this.btnStatus="Update";
  this.transactionService.getTransactionListByTransID(transactionListModel.transId,this.branchID,this.compID).subscribe((response:TransDetailsModel[])=>{
    if(response){
      let transDetail=response as TransDetailsModel[];
          this.bankTransactionForm.patchValue({
            voucherNo:transactionListModel.voucherNo,
            // formatVoucherNo:transactionListModel.formatVoucherNo,
            yearID:transactionListModel.yearID,
            voucherDateNgb:this.dateFormatter.getYyyymmddToNgbDate(transactionListModel.voucherDate),
            voucherDate:this.dateFormatter.getYyyymmddToDate(transactionListModel.voucherDate).toLocaleDateString(),
            totalAmount:transactionListModel.totalAmount,
            chequeNo:transactionListModel.chequeNo,
            chequeDateNgb:this.dateFormatter.getYyyymmddToNgbDate(transactionListModel.chequeDate),
            chequeDate:this.dateFormatter.getYyyymmddToDate(transactionListModel.chequeDate).toLocaleDateString(),
            refNo:transactionListModel.refNo,
            narration:transactionListModel.narration,
            transId:transactionListModel.transId,
            partyId:transactionListModel.partyId,
            refAccountId:transactionListModel.refAccountId,
          })
            ////BalanceTexBox
            this.getChequeNo(transactionListModel.partyId)
            this.onSelectedBalance(transactionListModel.partyId)
     ////this code for voucherNo Textbox Show
       this.formatVoucherNo=transactionListModel.formatVoucherNo
       this.accountName=transactionListModel.accountName;
        this._bankTransactionForm=this.formBuilder.array([]);
          transDetail.forEach(item=>{
            this._bankTransactionForm.push(
              new FormGroup({
                id:new FormControl(item.id,[]),
          accountId:new FormControl(item.accountId,[Validators.required]),
          subledgerId:new FormControl(item.subledgerId,[]),
          detailsId:new FormControl(item.detailsID,[]),
          amount:new FormControl(item.amount,[Validators.required]),
          taxId :new FormControl(0,[]),
          isAdditional :new FormControl(item.isAdditional,[]),
          specificChequeNo:new FormControl(item.specificChequeNo,[]),
          conRate :new FormControl(item.conRate,[]),
          subItem:new FormControl(item.subItem,[]),
          costCenItem:new FormControl(item.costCenItem,[])
              })
              )
            })
          }
        })
      }
     

  reset(){
    this.isSubmit=false;
    this.isSaving=false;
    this.bankTransactionForm.reset();
   this._bankTransactionForm=this.formBuilder.array([]);
   this.createForm();
   this.bankTransactionForm.controls['voucherDate'].setValue((new Date).toLocaleDateString());
   this.bankTransactionForm.controls['voucherDateNgb'].setValue(this.dateFormatter.getCurrentNgbDate())
   this.bankTransactionForm.controls['chequeDate'].setValue((new Date).toLocaleDateString());
   this.bankTransactionForm.controls['chequeDateNgb'].setValue(this.dateFormatter.getCurrentNgbDate())
   this.onSelectedVocherNo(null);
 //  this.getChequeNo(this.f.partyId.value)
  this.chequeNoShowModel=[];
   this.addRow(); 
   this.transCostCenterModel = [];
   this.transSubledgerModel=[];
 }
  createForm(){
    this.bankTransactionForm=this.formBuilder.group({
      id :[0,[]],
      transId:[,[]],
      partyId:[,[Validators.required]],
      voucherType :['BankPayment',[Validators.required]],
      voucherDate :[this.dateFormatter.getDateToYyyymmdd(new Date()),[Validators.required]],
      voucherDateNgb:[,[]],
      refAccountId:[,[]],
      voucherNo :[this.voucherNo,[]],
      yearID:[,[]],
      transType :[this.transType,[]],
      totalAmount :[,[]],
      refNo :[,[]],
      narration :[,[]],
      bankBranch:[null,[]],
      chequeNo :[,[]],
      chequeDate :[this.dateFormatter.getDateToYyyymmdd(new Date()),[]],
      chequeDateNgb:[,[]],
      netPayable:[0,[]],
      compId :[this.compID,[]],
      branchId :[this.branchID,[]],
      userId:[this.userId,[]],
      accountName:[,[]],
      presentBalance:[,[]],
      formateVoucherNo:[this.formatVoucherNo,[]]
    })
  }
  addRow() {
        this._bankTransactionForm.push(
        new FormGroup({
          id:new FormControl(0,[]),
          accountId:new FormControl(null,[]),
          transId:new FormControl(0,[]),
          accountName:new FormControl(null,[]), 
          amount:new FormControl(null,[]),
          subledgerId:new FormControl(null,[]),
          detailsId:new FormControl(null,[]),
          taxId :new FormControl(0,[]),
          compId :new FormControl(this.compID,[]),
          subItem:new FormControl([],[]),
          costCenItem:new FormControl([],[])
        })
      )
    }

removeRow(index:number){
  let tAmount=this._bankTransactionForm.value[index]["amount"];
  this.totalAmount -=tAmount;
  this.f.totalAmount.patchValue(this.totalAmount);
  this._bankTransactionForm.removeAt(index);
}
  get f(){
    return this.bankTransactionForm.controls;
  }
  get formVal() {
    return this.bankTransactionForm.value;
  }
  onFocusBtn(event){
    // console.log(event)
  }
  onBlurSaleBtn(event:MouseEvent){
    // console.log(Helper.focusNgSelect('accountHead'+0))
    Helper.focusNgSelect('accountHead'+0);
  }
  onEnterKeyPress(event:KeyboardEvent,rowIndex:number){
    if(event.key=='Enter' || event.key=='Tab'){
      if(this._bankTransactionForm.controls[rowIndex].get('accountId').value !=null && this._bankTransactionForm.controls[rowIndex].get('amount').value >0 ){
        if(this._bankTransactionForm.controls[rowIndex].get('subItem').value.length >0){
        Helper.focusTextField('subPlus'+rowIndex);
        event.preventDefault();
      }else if(this._bankTransactionForm.controls[rowIndex].get('costCenItem').value.length >0){
        Helper.focusTextField('costPlus'+rowIndex);
        event.preventDefault();
      }else if(this._bankTransactionForm.controls.length == (rowIndex+1)){
        Helper.focusTextField('addItem'+rowIndex);
        event.preventDefault();
      }else{
        this.addRow();
        Helper.focusNgSelect('accountHead'+(rowIndex+1));
        event.preventDefault();
      }
    }else{
      Helper.focusTextField('btnSave');
      event.preventDefault();
    }
   }
  }
 
}
