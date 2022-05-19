import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TransBillByBillModel } from '../../models/accounting/transaction/trans-bill-by-bill-model';
import { AuthService } from '../../services/auth.service';
import { ReceiptAndPaymentService } from '../../services/receipt-and-payment.service';
import { NgbDateCustomParserFormatter } from '../../shared/dateformat';
import { Helper } from '../../shared/helper';

@Component({
  selector: 'app-receipt-entry-bill-amount-set',
  templateUrl: './receipt-entry-bill-amount-set.component.html',
  styleUrls: ['./receipt-entry-bill-amount-set.component.scss']
})
export class ReceiptEntryBillAmountSetComponent implements OnInit {
  @Input() modalItem:any;
  @Input() partyType: number;
  @Input() partyId: number;
  @Input() accountId:number;
  @Input() transID:number;
  @Input() accountName:string;
  @Input() totalAmount: number=0;
  @Output() selectEvent = new EventEmitter<any>();
  @Output() selectKeyboardEvent = new EventEmitter<any>();
  @Input() amount:number=0;
  @Input() chkamount:number=0;
  constructor(
    private formBuilder: FormBuilder,
    private receiptAndPaymentService: ReceiptAndPaymentService,
    private modalService: NgbModal,
    private dateService:NgbDateCustomParserFormatter,
    private toasterService:ToastrService
  ) {
    this.billAmtArr = this.formBuilder.array([]);
  }

  billBybillAmount: TransBillByBillModel[] = [];
  filterbillBybillAmount: TransBillByBillModel[] = [];
  compId: number;
  billAmtArr: FormArray;
  transbillForm:FormGroup;
  ngOnInit() {
    this.createForm();
    this.compId = AuthService.CompanyId;
    if(this.modalItem.filter(c=>c.amount).length >0){
      this.getAllCostCenterByID();
    }else{
      this.getTotalPartyIdAmount();
    }
  }
  getAllCostCenterByID(){
    let billbyBill=this.modalItem;
    this.billAmtArr=this.formBuilder.array([]) ;
    billbyBill.forEach(item => {
       this.billAmtArr.push(
         new FormGroup({
          formatInvoiceNo: new FormControl(item.formatInvoiceNo, []),
          transId: new FormControl(item.transId, []),
          totalAmount: new FormControl(item.amount, []),
          amount: new FormControl(item.amount, []),
          isActive:new FormControl(1,[])
         })
      )
    });
    this.amount=0;
    this.billAmtArr.controls.forEach(frmGroup=>{
     let tAmount=Number(frmGroup.get('amount').value);
     this.amount +=tAmount;
     });
     this.f.totalAmount.patchValue(this.amount);
  }
  onSubmit(event:KeyboardEvent) {
    if(event.key=='Enter'|| event.key=='Click'){
      let model:any
      var filter = this.billAmtArr.value.filter(item => item.amount != null && item.amount >0);
      model = filter;
      if(  this.totalAmount>0 && this.totalAmount==this.amount){
        this.selectEvent.emit(model);
        this.selectKeyboardEvent.emit(event)
        this.cancel();
      }else if(this.totalAmount==0){
        this.selectEvent.emit(null);
        this.selectKeyboardEvent.emit(event)
        this.cancel();
      }else if( this.totalAmount==0 ||  this.totalAmount==null){
        this.selectEvent.emit(model);
        this.selectKeyboardEvent.emit(event)
        this.cancel();
      }
      else{
        this.toasterService.error("Please check total Amount from Voucher is not equal than your given total");
        }
    }
  }

  getTotalPartyIdAmount() {
    if(this.partyId !=null){
    this.receiptAndPaymentService.getBillByBillForPayment(this.partyType, this.partyId, this.compId).subscribe((response: any) => {
      if (response) {
        console.log(response);
        this.billBybillAmount = response as TransBillByBillModel[];
        this.filterbillBybillAmount = response as TransBillByBillModel[];

        let bills = this.billBybillAmount;
        this.billAmtArr = this.formBuilder.array([]);
        bills.forEach(item => {
          this.billAmtArr.push(
            new FormGroup({
              formatInvoiceNo: new FormControl(item.formatInvoiceNo, []),
              transId: new FormControl(item.transId, []),
              billTo: new FormControl(item.billTo, []),
              billContactNo: new FormControl(item.billContactNo, []),
              billDate:new FormControl(item.billDate,[]),
              totalAmount: new FormControl(item.totalAmount, []),
              amount: new FormControl(null, []),
              isActive: new FormControl(0,[])
            })
          )
        })
      } else {
        this.billBybillAmount = [];
      }
    })
  }else{
    return;
  }
  }
  addition() {
    this.amount =0;
    this.billAmtArr.controls.forEach(frmGroup=>{
    let tAmount=Number(frmGroup.get('amount').value);
    // let serpluseAmt=this.totalAmount-tAmount
    this.amount +=tAmount;
    });
     this.f.totalAmount.patchValue(this.amount);
     
  }
getAmountIndex(rowIndex){
  console.log(rowIndex)
  this.billAmtArr.controls[rowIndex].get('isActive').patchValue(1);
}
  cancel() {
    this.modalService.dismissAll();
  }

  get f(){
    return this.transbillForm.controls;
  }
  createForm(){
    this.transbillForm=this.formBuilder.group({
      subledgerId  :[0,[]],
      transId  :[this.transID,[]],
      accountId  :[this.accountId,[]],
      totalAmount:[this.amount,[]],
      createdBy :[,[]],
      formatInvoiceNo:[,[]]
    });
  }

  onTabKeyDown(event:KeyboardEvent,rowIndex:number){
    if(event.key=='Enter' || event.key=='Tab'){

        // this.savetransSubledger(event)
        this.saveBilltoBillTrans(event);

    }
  }

  getTotalAmount(){
    this.amount =0;
  this.billAmtArr.controls.forEach(frmGroup=>{
  let tAmount=Number(frmGroup.get('amount').value);
  // let serpluseAmt=this.totalAmount-tAmount
  this.amount +=tAmount;
  });
   this.f.totalAmount.patchValue(this.amount);
  }

  saveOk(event){
    if(event){
      this.getTotalAmount();
      let model=this.transbillForm.value;
      if(this.totalAmount===null || this.totalAmount==0){
        this.f.totalAmount.value == this.totalAmount
        model=this.transbillForm.value;
        var filter=this.billAmtArr.value.filter(item=>item.formatInvoiceNo !=null && item.amount >0);
        model.onBillAmount=filter;
        this.selectEvent.emit(model);
        this.selectKeyboardEvent.emit(event)
        this.cancel();
      }

    }
  }

saveBilltoBillTrans(event:KeyboardEvent){
  if(event.key=='Enter' || event.key=='Click' || event.key=='Tab' ){
    this.getTotalAmount();
  let model=this.transbillForm.value;
  if(this.totalAmount===null || this.totalAmount==0){
    this.f.totalAmount.value == this.totalAmount
    model=this.transbillForm.value;
   var filter=this.billAmtArr.value.filter(item=>item.formatInvoiceNo !=null && item.amount >0);
    model.onBillAmount=filter;
   this.selectEvent.emit(model);
   this.selectKeyboardEvent.emit(event)
   this.cancel();
  }
  else if(this.f.totalAmount.value == this.totalAmount){
   model=this.transbillForm.value;
   var filter=this.billAmtArr.value.filter(item=>item.formatInvoiceNo !=null && item.amount >0);
  model.onBillAmount=filter;
   this.selectEvent.emit(model);
   this.selectKeyboardEvent.emit(event)
   this.cancel();
 }
 else{
  this.toasterService.error("Please Enter Proper Value According to Total Amount");
   var filter=this.billAmtArr.value.filter(item=>item.formatInvoiceNo !=null && item.amount >0);
     this.billAmtArr=this.formBuilder.array([]) ;
     filter.forEach(item => {
      this.billAmtArr.push(
        new FormGroup({
          formatInvoiceNo:new FormControl(item.formatInvoiceNo,[]),
         amount:new FormControl(Math.abs(item.amount),[])
        })
     )
   });
}
}
}

  savetransSubledger(event:KeyboardEvent){
    if(event.key=='Enter' || event.key=='Click' || event.key=='Tab' ){
      this.getTotalAmount();
        //  if(this.f.totalAmount.value==this.totalAmount){
        let model=this.transbillForm.value;
         var filter=this.billAmtArr.value.filter(item=>item.formatInvoiceNo !=null && item.amount >0);
         model.onBillAmount =filter;
         this.selectEvent.emit(model);
         this.selectKeyboardEvent.emit(event)
         this.cancel();
      // }else{
      //  this.toasterSer.error("Please Enter Proper Value According to Total Amount");
      //    var filter=this._transSubledgerForm.value.filter(item=>item.subledgerId !=null && item.amount >0);
      //    this._transSubledgerForm=this.formBuilder.array([]) ;
      //    filter.forEach(item => {
      //      this._transSubledgerForm.push(
      //        new FormGroup({
      //         subledgerId:new FormControl(item.subledgerId,[]),
      //         subledgerName:new FormControl(item.subledgerName,[]),
      //         amount:new FormControl(Math.abs(item.amount),[]),
      //         othersID:new FormControl(item.othersID,[])
      //        })
      //     );
      //   });
      //   this.addRow();
      // }
    }
    }

    searchbydate(event) {
      let ngbDate=this.dateService.dateToNgbDate(event);
      let stringDate=this.dateService.getNgbDateToYyyymmdd(ngbDate);
      this.billBybillAmount = this.filterbillBybillAmount.filter(p =>
        (
          p.billDate.toLowerCase().match(stringDate)
        )
      )
      let bills = this.billBybillAmount;
      this.billAmtArr = this.formBuilder.array([]);
      bills.forEach(item => {
        this.billAmtArr.push(
          new FormGroup({
            formatInvoiceNo: new FormControl(item.formatInvoiceNo, []),
            transId: new FormControl(item.transId, []),
            billTo: new FormControl(item.billTo, []),
            billContactNo: new FormControl(item.billContactNo, []),
            billDate:new FormControl(item.billDate,[]),
            totalAmount: new FormControl(item.totalAmount, []),
            amount: new FormControl(null, []),
            isActive: new FormControl(0,[])
          })
        )
      })

  }

    onSearch(event) {
      if (event) {
        this.billBybillAmount = this.filterbillBybillAmount.filter(p =>
          (
            p.formatInvoiceNo.toLowerCase().match(event.toLowerCase())||
            p.billContactNo.toLowerCase().match(event.toLowerCase()) ||
            p.billTo.toLowerCase().match(event.toLowerCase())
          )
        )
        let bills = this.billBybillAmount;
        this.billAmtArr = this.formBuilder.array([]);
        bills.forEach(item => {
          this.billAmtArr.push(
            new FormGroup({
              formatInvoiceNo: new FormControl(item.formatInvoiceNo, []),
              transId: new FormControl(item.transId, []),
              billTo: new FormControl(item.billTo, []),
              billContactNo: new FormControl(item.billContactNo, []),
              billDate:new FormControl(item.billDate,[]),
              totalAmount: new FormControl(item.totalAmount, []),
              amount: new FormControl(null, []),
              isActive: new FormControl(0,[])
            })
          )
        })
      }
      else {
        this.billBybillAmount = this.filterbillBybillAmount;
      }
    }


   // onSelectActiveInActive(event,rowIndex){
      /* if(event){
        console.log('event',event);
        //this.chkamount =0;
      this.billAmtArr.controls.forEach(frmGroup=>{
      let tAmount=Number(frmGroup.get[rowIndex]('totalAmount').value);
      //let chkamount=+tAmount;
      this.chkamount +=tAmount;
      this.f.totalAmount.patchValue( this.chkamount);
      console.log('amt', this.chkamount);
    });
     //this.f.totalAmount.patchValue(this.chkamount);

      }else{
        //this.chkamount =0;
      this.billAmtArr.controls.forEach(frmGroup=>{
      let tAmount=Number(frmGroup.get('totalAmount').value);
        //et chkamount =-tAmount;
        this.chkamount -=tAmount;
      this.f.totalAmount.patchValue(this.chkamount );
      console.log('amt',this.chkamount );
    });
     //this.f.totalAmount.patchValue(this.chkamount);
      } */
    //}
    onSelectActiveInActive(event,rowIndex){
      if(event){
         let tAmount=Number(this.billAmtArr.controls[rowIndex].get('totalAmount').value);
          this.billAmtArr.controls[rowIndex].get('amount').patchValue(tAmount);
         this.getTotalAmount();

      }
    }

  }

