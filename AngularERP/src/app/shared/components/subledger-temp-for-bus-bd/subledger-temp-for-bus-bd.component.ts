import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { Helper } from '../../helper';

@Component({
  selector: 'app-subledger-temp-for-bus-bd',
  templateUrl: './subledger-temp-for-bus-bd.component.html',
  styleUrls: ['./subledger-temp-for-bus-bd.component.scss']
})
export class SubledgerTempForBusBdComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private modalService:NgbModal,
    private toasterSer:ToastrService

  ) {
    this._transSubledgerForm=this.formBuilder.array([]);
  }

  @Input() accountId:number;
  @Input() transID:number;
  @Input() accountName:string;
  // @Input() totalAmount:number;
  @Input() modalItem:any;
  @Output() selectEvent = new EventEmitter<any>();
  @Output() selectKeyboardEvent = new EventEmitter<any>();
  _transSubledgerForm:FormArray;
  transSubledgerForm:FormGroup;
  subwidth:number=500;
  compId:number;
  sum:number=0;
  totalQuantity:number=0;
  groupId:number;
  isCheque:number=0;
  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.createForm();
    this.addRow();
    this.addRow();
    this.addRow();
    this.addRow();
    if(this.modalItem.filter(c=>c.amount).length >0){
      this.getAllSubledgerByID();
    }
  }
  onSelectSeubledgerName(subledger:any,rowIndex:number){
    if(subledger !=null){
    this._transSubledgerForm.controls[rowIndex].patchValue({
      subledgerId:subledger.subledgerId,
      subledgerName:subledger.subledgerName
    });
    // let tmt=0;
    // let serpluseAmt=0;
    //  this._transSubledgerForm.controls.forEach(frmGroup=>{
    //    let tAmount=Number(frmGroup.get('amount').value);
    //    tmt +=tAmount;
    //   //  serpluseAmt=this.totalAmount-tmt;
    //    });
    //    this._transSubledgerForm.controls[rowIndex].get('amount').patchValue(serpluseAmt)
     Helper.focusTextField('subamount'+rowIndex);

  }else{
    return;
  }
  }
  onSelectOtherRef(othRef:any,rowIndex:number){
    if(othRef !=null){
      this._transSubledgerForm.controls[rowIndex].patchValue({
        othersID:othRef.othersID
      });
        this.addRow();
     Helper.focusNgSelect('ssubledger'+(rowIndex+1));
    }else{
      return;
    }
  }
 
  getAllSubledgerByID(){
    let subItemById=this.modalItem;
    this._transSubledgerForm=this.formBuilder.array([]) ;
     subItemById.forEach(item => {
       this._transSubledgerForm.push(
         new FormGroup({
          subledgerId:new FormControl(item.subledgerId,[]),
          subledgerName:new FormControl(item.subledgerName,[]),
          amount:new FormControl(Math.abs(item.amount),[]),
          quantity:new FormControl(item.quantity,[])
         })
      );
    });
    this.getTotalAmount();
    //  this.sum=0;
    //  this.totalQuantity=0;
    //  this._transSubledgerForm.controls.forEach(frmGroup=>{
    //   let tAmount=Number(frmGroup.get('amount').value);
    //   let tQty=Number(frmGroup.get('quantity').value)
    //   this.sum +=tAmount;
    //   this.totalQuantity +=tQty;
    //   });
    // this.f.totalAmount.patchValue(this.sum);
    // this.f.totalQuantity.patchValue(this.totalQuantity);
  }
  getTotalAmount(){
    this.totalQuantity=0;
    this.sum=0
     this._transSubledgerForm.controls.forEach(frmGroup=>{
      let tAmount=Number(frmGroup.get('amount').value);
      let tQty=Number(frmGroup.get('quantity').value)
      this.sum +=tAmount;
      this.totalQuantity +=tQty;
      });
    this.f.totalAmount.patchValue(this.sum);
    this.f.totalQuantity.patchValue(this.totalQuantity);
  }
  savetransSubledger(event:KeyboardEvent){
    console.log(event)
  if(event.key=='Enter' || event.type=='click' || event.key=='Tab' ){
    
    this.getTotalAmount();
   
      let model=this.transSubledgerForm.value;
       var filter=this._transSubledgerForm.value.filter(item=>item.subledgerId !=null && item.amount >0);
       model.subledgerItem =filter;
       this.selectEvent.emit(model);
       this.selectKeyboardEvent.emit(event)
       this.cancel();
  }
  }

  reset(){
    this.transSubledgerForm.reset();
    this.addRow();
    this.addRow();
    this.addRow();
    this.addRow();
  }


  createForm(){
    this.transSubledgerForm=this.formBuilder.group({
      subledgerId  :[0,[]],
      transId  :[this.transID,[]],
      accountId  :[this.accountId,[]],
      totalAmount:[,[]],
      createdBy :[,[]],
      totalQuantity:[,[]]
    });
  }
  addRow() {
    this._transSubledgerForm.push(
      new FormGroup({
        subledgerId:new FormControl(null,[]),
        subledgerName:new FormControl(null,[]),
              amount:new FormControl(null,[]),
              quantity:new FormControl(null,[])
      })
    );
  }
  onQuantityTabKeyDown(event:KeyboardEvent,rowIndex:number){
    if(event.key=='Enter' || event.key=='Tab'){      
      Helper.focusTextField('subamount'+rowIndex);
      event.preventDefault();   
    }
  }
  onTabKeyDown(event:KeyboardEvent,rowIndex:number){
    if(event.key=='Enter'){
      if(this._transSubledgerForm.controls[rowIndex].get('amount').value !=null && this._transSubledgerForm.controls[rowIndex].get('amount').value !=0){
        Helper.focusNgSelect('ssubledger'+(rowIndex+1));
        event.preventDefault();
      // }
     }else{
      Helper.focusTextField('okBtn') ;
      event.preventDefault();
        // this.savetransSubledger(event)
      }

    }
  }

  removeRow(index:number){
    let tAmount=this._transSubledgerForm.value[index]["amount"];
    let tqty=this._transSubledgerForm.value[index]["quantity"];
    this.sum -=tAmount;
    this.totalQuantity -=tqty;
    this.f.totalAmount.patchValue(this.sum);
    this.f.totalQuantity.patchValue(this.totalQuantity);
    this._transSubledgerForm.removeAt(index);
  }
  get f(){
    return this.transSubledgerForm.controls;
  }
  get fArr(){
    return this._transSubledgerForm.controls;
  }
  get formVal(){
    return this.transSubledgerForm.value;
  }
  cancel(){
    this.modalService.dismissAll();

  }
}
