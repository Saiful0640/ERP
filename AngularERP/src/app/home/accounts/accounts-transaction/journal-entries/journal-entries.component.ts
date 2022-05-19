import { AuthService } from './../../../../services/auth.service';
import { AccountingBasicEntryService } from './../../../../services/accounting/accounting-basic-entry.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { TransactionService } from './../../../../services/accounting/transaction.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl, Validators } from '@angular/forms';
import { TransDetailsModel } from '../../../../models/accounting/transaction/trans-details-model';
import { TransMasterModel } from '../../../../models/accounting/transaction/trans-master-model';
import { NgbDateCustomParserFormatter } from '../../../../shared/dateformat';
import { TransSubledgerModel } from '../../../../models/accounting/transaction/trans-subledger-model';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { CriteriaCenterService } from '../../../../services/criteria-center.service';
import { Helper } from '../../../../shared/helper';
import { AccountChartService } from '../../../../services/accounting/AccountChartService';
import { AccountChart } from '../../../../models/accounting/basic-entry/bank/AccountChart';
import { SettingService } from '../../../../services/settings/Setting.service';
import { Financialyear } from '../../../../models/settings/financialyear.modal';
import { TransactionMasterAcc } from '../../../../models/accounting/transaction/transaction-master-acc.model';
import { TransactionDetailsAcc } from '../../../../models/accounting/transaction/transaction-details-acc.model';
import { TransactionSubledger } from '../../../../models/accounting/transaction/transaction-subledger.model';
import { TransactionCostcenter } from '../../../../models/accounting/transaction/transaction-costcenter.model';
import { ChequeBookView } from '../../../../models/accounting/bank/cheque-book-view.model';
import { ChequeBook } from '../../../../models/accounting/basic-entry/bank/cheque-book.model';
import { TransType } from '../../../../shared/lookup';

@Component({
  selector: 'app-journal-entries',
  templateUrl: './journal-entries.component.html',
  styleUrls: ['./journal-entries.component.scss']
})
export class JournalEntriesComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private journalService:TransactionService,
    private dateFormatter:NgbDateCustomParserFormatter,
    private modalService:NgbModal,
    private toasterService:ToastrService,
    private route:ActivatedRoute,
    private bankService:AccountChartService,
    private settingService:SettingService,
    private router:Router,
    private chartOfAccountService:AccountingBasicEntryService,
    private criteriaService:CriteriaCenterService,
  ) {
    this._journalForm=this.formBuilder.array([]);
   }
  journalForm:FormGroup;
  _journalForm:FormArray;
  compID:number;
  branchID:number;
  userId:number;
  totalAmount:number=0;
  totalCredit:number=0;
   accountName:string;
   debitValue:number=0;
   creditValue:number=0;
   btnStatus:string="Save";
   isSubmit:boolean=false;
   isSaveClick:boolean=false;
   formatVoucherNo:string;
   chequeNoShowModel:any[]=[];
   transType:number=TransType.Adjustment;
   bankList:any[]=[];
   transCostCenterModel:any[]=[];
   transSubledgerModel:any[]=[];
  accountId:number;
  isCostCenter:number;
  moduleId:number;
  subLedgerEvent:any;
  costCenterEvent:any;
   /////
   financialModal:Financialyear[]=[];
   voucherNo:number=0;
   transId:number;
   chequeNoId:number;

  ngOnInit() {
    this.compID=AuthService.CompanyId;
    this.branchID=AuthService.BranchId;
    this.userId=AuthService.UserId;
    this.moduleId=AuthService.CurrentModuleId;
    this.createForm();
    this.getBankByLowerID();
    this.onSelectedVocherNo(null);
    this.addRow();
    this.addRow();
  }
  ///Voucher No Text Box
  onSelectedVocherNo(voucherDate:any){
    let voucherd=voucherDate==null?this.dateFormatter.getDateToYyyymmdd((new Date)):voucherDate;
    this.settingService.getAllFinancialYear().subscribe((response:any)=>{
      if(response){
       this.financialModal=response;
       let financialYear=this.financialModal.filter(x=>{return x.sfYear<=voucherd && x.efYear>=voucherd && x.compId==this.compID});  
       if(this.financialModal.length>0){
        this.journalService.getAllTransactionMaster().subscribe((response:any)=>{
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
              this.formatVoucherNo=financialYear[0].yearName+'-'+'JO'+'-'+this.voucherNo;
            this.journalForm.patchValue({
              transId:this.transId,
              voucherNo:this.voucherNo,
               yearID:financialYear[0].id,
               formateVoucherNo:this.formatVoucherNo
             });
             console.log(this.journalForm.value)
          }
        })
       }
     
      }else{
        this.financialModal=[];
      }
    })   
  }

  //// chequeNo textBox
  getBankByLowerID(){
    this.bankService.getAllAccountChart().subscribe((response:any)=>{
      if(response){
        /////Filtering by this.compId,this.lowerGroupId,this.branchID
       //  this.bankList =response.result;
        this.bankList = (response as AccountChart[]).filter(x=>x.lowerGroupId==94).map(item=>{
         item.accountName=item.accountName+"--"+item.aliasName
         return item;
       });
       
      }else{
        this.bankList=[];
      }
    })
  }
  getChequeNo(){
    var filter=this._journalForm.value.filter(item=>item.accountId !=null );
    let index=filter.length;
    let lastAccountId=this._journalForm.controls[index-1].get('accountId').value;
    console.log(lastAccountId)
    let bankInfo=this.bankList.filter(c=>c.accountId==lastAccountId);
    if(bankInfo.length >0 ){
      this.journalService.getChequeNoNew().subscribe((response:any)=>{
        if(response){
          //bankID,this.compID
          this.chequeNoShowModel=response.filter(c=>{return c.accountId==lastAccountId && c.used==false && c.rejected==false}) ;
        }else{
          this.chequeNoShowModel=[];
        }
      })
    }else{
      this.chequeNoShowModel=[];
    }
  }

  onChequeNoSelect(chequeInfo:ChequeBook){
    this.journalForm.patchValue({
      chequeNo:chequeInfo.chequeNo,      
    })
    this.chequeNoId=chequeInfo.id;
    console.log(chequeInfo,this.f.chequeNo.value)
  }
   //// Account Name, Amount, Subledger,CostCenter TextBox
   onChangeAccountId(accountList:AccountChart,rowIndex:number){
    if(accountList){
    this._journalForm.controls[rowIndex].patchValue({
      accountId:accountList.accountId,
      accountName:accountList.accountName,
       isCostCenter:accountList.isCostCenter
    });
    this.getAllSubledger(accountList.accountId,rowIndex);
    this.accountId=accountList.accountId;
    this.accountName=accountList.accountName;
    this.getChequeNo();
        if(this.totalAmount>this.totalCredit){
          if(rowIndex !=0){
          this._journalForm.controls[rowIndex].patchValue({
            credit: this.totalAmount-this.totalCredit
         });
         this.totalAmount =0;
         this.totalCredit =0;
         this._journalForm.controls.forEach(frmGroup=>{
           let tDebit=Number(frmGroup.get('debit').value);
           let tCredit=Number(frmGroup.get('credit').value);
           this.totalAmount+=tDebit;
           this.totalCredit+=tCredit;
           });
        }
         Helper.focusTextField('credit'+rowIndex);
        }else{
          if(rowIndex !=0){
          this._journalForm.controls[rowIndex].patchValue({
            debit: this.totalCredit-this.totalAmount
         });
         this.totalAmount =0;
         this.totalCredit =0;
         this._journalForm.controls.forEach(frmGroup=>{
           let tDebit=Number(frmGroup.get('debit').value);
           let tCredit=Number(frmGroup.get('credit').value);
           this.totalAmount+=tDebit;
           this.totalCredit+=tCredit;
           });
        }
         Helper.focusTextField('debit'+rowIndex);
        }
      }
  }

   ////subledger template/////////
   subledgerItem(data:TransSubledgerModel,rowIndex:number){
     if(data !=null){
    this._journalForm.controls[rowIndex].patchValue(
     {
      subItem:data.subledgerItem
     });
    }else{return;}
  }
  getAllSubledger(accountId:number,rowIndex:number){
    if(accountId !=null){
      this.chartOfAccountService.getSubledgers().subscribe((response:any)=>{
        if(response){
          this.transSubledgerModel=response.filter(c=>c.accountId==accountId);
          if( this.transSubledgerModel.length >0){
            this._journalForm.controls[rowIndex].patchValue(
              {
               subItem:this.transSubledgerModel
              })
              // this.getReplaceElement('subledger'+rowIndex);
           }else{
            this._journalForm.controls[rowIndex].patchValue(
              {
               subItem:[]
              })
              // this.getElement('subledger'+rowIndex)
           }
        }else
        {
          this._journalForm.controls[rowIndex].patchValue(
            {
             subItem:[]
            })
            // this.getElement('subledger'+rowIndex)

        }
      })
    }else{
      return;
    }
  }
  onSelectSubledger(sub:any,rowIndex:number){
    if(sub !=null ){
    this._journalForm.controls[rowIndex].patchValue(
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
    if(data !=null ){
    this._journalForm.controls[rowIndex].patchValue(
      {
        costCenItem:data.costCenterItem
      });
    }else{return;}

  }
  getListOfCostCenter(isCostCenter:number,rowIndex:number) {
    if(isCostCenter ==1){
      this.criteriaService.getCriteriaCenterNew().subscribe((response: any) => {
        if (response) {
          //this.moduleId,this.compID
          this.transCostCenterModel = response;
        if( this.transCostCenterModel.length >0){
          this._journalForm.controls[rowIndex].patchValue(
            {
              costCenItem: this.transCostCenterModel
            })
            // this.getReplaceElement('costCenter'+rowIndex)
          }else{
            this._journalForm.controls[rowIndex].patchValue(
              {
                costCenItem: []
              })
              // this.getElement('costCenter'+rowIndex)
        }
        }
        else {
          this._journalForm.controls[rowIndex].patchValue(
            {
              costCenItem: []
            })
            // this.getElement('costCenter'+rowIndex)
        }
    })
  }else{
    this.transCostCenterModel = [];
    return;
  }
}
  onSelectCostCenter(cost:any,rowIndex:number){
    if(cost !=null){
    this._journalForm.controls[rowIndex].patchValue(
      {
       detailsId:cost.detailsId
      })
      Helper.focusNgSelect('accountHead'+(rowIndex+1));
    }else{return;}
  }
  createSubNewItem(event:any,rowIndex:number){
    if(event !=null){
      this.modalService.open(event,{size: 'lg', windowClass: 'my-classS'});
       if(this.subLedgerEvent !=null){
        if(this._journalForm.controls[rowIndex].get('isCostCenter').value==1){
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
    if(event !=null || event !=""){
    this.modalService.open(event,{size: 'lg', windowClass: 'my-class'});
  }else{return;}
  }
////Debit credit textbox controls
creditAmountControl(i:number){
  let credit=this._journalForm.controls[i].get('credit').value;
  this.totalAmount =0;
  this.totalCredit =0;
  this._journalForm.controls.forEach(frmGroup=>{
  let tDebit=Number(frmGroup.get('debit').value);
  let tCredit=Number(frmGroup.get('credit').value);
  this.totalAmount+=tDebit;
  this.totalCredit+=tCredit;
  });
   this.f.totalAmount.patchValue(this.totalAmount);
  if(credit > 0 ){
  this._journalForm.controls[i].patchValue({
    debit:0
 });
 }
 else{
  this._journalForm.controls[i].patchValue({
    credit:0
  });
 }
}
debitAmountControl(i:number,elementName:string){
   let debit=this._journalForm.controls[i].get('debit').value;
   let credit=this._journalForm.controls[i].get('credit').value;
   if(elementName==('debit'+i)){
    this._journalForm.controls[i].patchValue({
      credit:0
    });
   }else{
    this._journalForm.controls[i].patchValue({
      debit:0
   });
   }
  this.totalAmount =0;
  this.totalCredit =0;
  this._journalForm.controls.forEach(frmGroup=>{
  let tDebit=Number(frmGroup.get('debit').value);
  let tCredit=Number(frmGroup.get('credit').value);
  this.totalAmount+=tDebit;
  this.totalCredit+=tCredit;
  });
   this.f.totalAmount.patchValue(this.totalAmount);

}


saveTransaction(){
  this.isSubmit=true;
  // if (this.cashTransactionForm.invalid) {
  //   this.toasterService.error("Please fill the all required fields","Invalid submission");
  //   return;
  // }
  this.isSaveClick = true;
  let journalTrans=new TransactionMasterAcc(); 
  this.journalForm.patchValue({
    partyId:this._journalForm.controls[this._journalForm.length-1].get('accountId').value,
    refAccountId:this._journalForm.controls[this._journalForm.length-1].get('accountId').value
  })
  this.journalService.getAllTransactionDetails().subscribe((response:any)=>{
    let transDetails =response.filter(c=>{return c.accountId==this.f.partyId.value && c.compId==this.compID })
    if(transDetails.length>0){
      this.journalForm.patchValue({
        presentBalance:transDetails.map(item => item.amount).reduce((prev, curr) => prev + curr, 0)
      });
    }else{
      this.journalForm.patchValue({                  
        presentBalance:0
      });
    }
  })
  journalTrans=this.journalForm.value;
  if(this.f.totalAmount.value == this.totalCredit){
  var filterDetails=this._journalForm.value.filter(item=>item.accountId !=null );    
  let transactionDetails:TransactionDetailsAcc[]=[];
  transactionDetails=filterDetails.map(x=>{
    x.transId=this.transId,
    x.compId=this.compID,
    x.amount=x.debit>0?x.debit:x.credit * -1
    return x;
  })
  // cashTrans.transDetails =filterDetails;
  if(this._journalForm.length>0 && filterDetails.length>0){
 this.journalService.saveTransMasterAcc(journalTrans).subscribe((response:any)=>{
    if(response){
          ///Multiple TransDetailsAcc
        for(let i=0;filterDetails.length>i;i++){
          this.journalService.saveTransDetailsAcc(transactionDetails[i]).subscribe((response:any)=>{
              if(response){   
                this.toasterService.success("Saved Details")    ;  
                console.log(journalTrans.chequeNo,"cq")  
                if(journalTrans.chequeNo !=null ){
                  let chequeInfo=new ChequeBookView();
                  chequeInfo.id=this.chequeNoId;
                  chequeInfo.accountId=journalTrans.partyId;
                  chequeInfo.chequeNo=Number(journalTrans.chequeNo);
                  chequeInfo.compId=this.compID;
                  chequeInfo.used=true;
                  chequeInfo.rejected=false;
                  chequeInfo.recivedDate=journalTrans.chequeDate;
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
                if(filterDetails[i].subItem.length >0 ){
                  let subledgerItem= filterDetails[i].subItem.filter(c=>c.amount>0)  
                  if(subledgerItem.length>0){
                    let transSubledger:TransactionSubledger[]=[];
                    transSubledger= subledgerItem.map(sb=>{                  
                      sb.transId =this.transId,
                      sb.accountId =transactionDetails[i].accountId,
                      sb.amount=sb.debit>0?sb.debit:sb.credit * -1,
                      sb.compId =this.compID
                      return sb
                    })    
                    for(let sbi=0;subledgerItem.length>sbi;sbi++){
                      this.journalService.saveTransSubledger(transSubledger[sbi]).subscribe((response:any)=>{
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
                        cst.amount=cst.debit>0?cst.debit:cst.credit * -1
                        return cst
                      })    
                      for(let csti=0;costCenterItem.length>csti;csti++){
                        this.journalService.saveTransCostCenter(transCostCenter[csti]).subscribe((response:any)=>{
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

    }else{
      this.toasterService.error(response.message,"Faild!");
    }
    this.reset();
    this.isSaveClick = false;
    this.isSubmit = false;
  }, err => {
    this.isSaveClick = false;
    this.isSubmit = false;
    this.toasterService.error(err.message,"error")
  });
   }else{
  this.toasterService.error("Please fill Account Head And Amount","Invalid submission");

  this.isSubmit=false;
  this.isSaveClick = false;
  this.addRow();
}
  }
  else{
      this.isSubmit=false;
      this.isSaveClick=false;
        this.modalService.dismissAll();
        this.toasterService.warning("Total Debit value and Total Credit is not same value");
      }
}
getJournalListByTransID(transactionListModel:TransMasterModel){
  this.btnStatus="Update";
  this.totalCredit=0;
  this.journalService.getJournalListByTransID(transactionListModel.transId,this.branchID,this.compID).subscribe((response:TransDetailsModel[])=>{
    if(response){
      let transDetail=response as TransDetailsModel[];
          this.journalForm.patchValue({
            voucherNo:transactionListModel.voucherNo,
            formatVoucherNo:transactionListModel.formatVoucherNo,
            yearID:transactionListModel.yearID,
            voucherDateNgb:this.dateFormatter.getYyyymmddToNgbDate(transactionListModel.voucherDate),
            voucherDate:this.dateFormatter.getYyyymmddToDate(transactionListModel.voucherDate).toLocaleDateString(),
            totalAmount:transactionListModel.totalAmount,
            refNo:transactionListModel.refNo,
            narration:transactionListModel.narration,
            transId:transactionListModel.transId,
            partyId:transactionListModel.partyId,
            refAccountId:transactionListModel.refAccountId,
            chequeNo:transactionListModel.chequeNo,
            chequeDateNgb:this.dateFormatter.getYyyymmddToNgbDate(transactionListModel.chequeDate),
            chequeDate:this.dateFormatter.getYyyymmddToDate(transactionListModel.chequeDate).toLocaleDateString(),
          });
          this.isCostCenter=transactionListModel.isCostCenter;
               ////this code for voucherNo Textbox Show
               this.formatVoucherNo=transactionListModel.formatVoucherNo;
       this.accountName=transactionListModel.accountName;
        this._journalForm=this.formBuilder.array([]);
          transDetail.forEach(item=>{
            this._journalForm.push(
              new FormGroup({
                id:new FormControl(item.id,[]),
          accountId:new FormControl(item.accountId,[Validators.required]),
          subledgerId:new FormControl(item.subledgerId,[]),
          detailsId:new FormControl(item.detailsID,[]),
          debit:new FormControl(item.debit,[Validators.required]),
          credit:new FormControl(item.credit,[Validators.required]),
          taxId :new FormControl(0,[]),
          isAdditional :new FormControl(item.isAdditional,[]),
          specificChequeNo:new FormControl(item.specificChequeNo,[]),
          conRate :new FormControl(item.conRate,[]),
          subItem:new FormControl(item.subItem,[]),
          costCenItem:new FormControl(item.costCenItem,[])
              })
              );
              // if(item.subItem.length>0){
              //   let index=Number(transDetail.findIndex(c=>c.subItem==item.subItem));
              //   var element=document.getElementById('subledger'+index);
              //  element.style.width=element.style.width.replace('230px','170px');
              // //  this.ngAfterViewInit();

              // }
              // if(item.costCenItem.length>0){
              //   let index=Number(transDetail.findIndex(c=>c.costCenItem==item.costCenItem));
              //   var element=document.getElementById('costCenter'+index);
              //  element.style.width=element.style.width.replace('230px','170px');
              // //  this.ngAfterViewInit();

              // }
            });
            this._journalForm.controls.forEach(frmGroup=>{
            //  let tDebit=Number(frmGroup.get('debit').value);
              let tCredit=Number(frmGroup.get('credit').value);
             // this.totalAmount+=tDebit;
              this.totalCredit+=tCredit;
              });

             //  this.f.totalAmount.patchValue(this.totalAmount);
    }
  });
}

reset(){
  this.isSubmit=false;
  this.isSaveClick=false;
   this.journalForm.reset();
   this._journalForm=this.formBuilder.array([]);
   this.createForm();
   this.totalAmount=0;
   this.totalCredit=0;
   this.journalForm.controls['voucherDate'].setValue((new Date).toLocaleDateString());
   this.journalForm.controls['voucherDateNgb'].setValue(this.dateFormatter.getCurrentNgbDate());
      this.journalForm.controls['chequeDate'].setValue((new Date).toLocaleDateString());
   this.journalForm.controls['chequeDateNgb'].setValue(this.dateFormatter.getCurrentNgbDate());
   this.onSelectedVocherNo(null);
   this.chequeNoShowModel=[];
   this.addRow();
   this.addRow();
   this.btnStatus="Save";
   this.transCostCenterModel = [];
   this.transSubledgerModel=[];
}
  createForm(){
    this.journalForm=this.formBuilder.group({
      id :[0,[]],
      transId:[this.transId,[]],
      partyId:[,[]],
      voucherNo :[this.voucherNo,[]],
      voucherDate :[this.dateFormatter.getDateToYyyymmdd(new Date()) ,[Validators.required]],
      voucherDateNgb:[,[]],
      voucherType :['JournalEntry',[Validators.required]],
      refAccountId:[,[]],
      yearID:[,[]],
      transType :[this.transType,[]],
      totalAmount :[0,[]],
      refNo :[,[]],
      narration :[,[]],
      bankBranch:[null,[]],
      chequeNo :[,[]],
      chequeDate :[this.dateFormatter.getDateToYyyymmdd(new Date()),[]],
      chequeDateNgb :[,[]],
      netPayable:[0,[]],
      compId :[this.compID,[]],
      branchId :[this.branchID,[]],
      userId:[this.userId,[]],
      accountName:[null,[]],
      presentBalance:[,[]],
      formateVoucherNo:[this.formatVoucherNo,[]]
    });
  }

  addRow() {
        this._journalForm.push(
      new FormGroup({
        id:new FormControl(0,[]),
        accountId:new FormControl(null,[Validators.required]),
        transId:new FormControl(0,[]),
        accountName:new FormControl(null,[]),
        subledgerId:new FormControl(null,[]),
        detailsId:new FormControl(null,[]),
        amount:new FormControl(0,[]),
        compId :new FormControl(this.compID,[]),
        debit:new FormControl(null,[]),
        credit:new FormControl(null,[]),
        taxId :new FormControl(0,[]),      
        subItem:new FormControl([],[]),
        costCenItem:new FormControl([],[])
      })
    );
  }

removeRow(index:number){
  let tDebit=this._journalForm.value[index]["debit"];
  let tCredit=this._journalForm.value[index]["credit"];
  this.totalAmount -=tDebit;
  this.totalCredit -=tCredit;
  this.f.totalAmount.patchValue(this.totalAmount);
  this._journalForm.removeAt(index);
}

  get f(){
    return this.journalForm.controls;
  }

  get formVal() {
    return this.journalForm.value;
  }
  getJournalVal(i,key){
    return this._journalForm.controls[i].get(key).value;
  }
  onEnterKeyPress(event:KeyboardEvent,rowIndex:number){
    if(event.key=='Enter' || event.key=='Tab'){
      if(this._journalForm.controls[rowIndex].get('accountId').value !=null  ){
      if(this._journalForm.controls[rowIndex].get('subItem').value.length>0){
        Helper.focusTextField('subPlus'+rowIndex);
        event.preventDefault();
      }else if(this._journalForm.controls[rowIndex].get('costCenItem').value.length>0){
        Helper.focusTextField('costPlus'+rowIndex);
        // Helper.focusNgSelect('costCenter'+rowIndex);
        event.preventDefault();
      }else if(this._journalForm.controls.length == (rowIndex+1)){
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
