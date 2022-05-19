import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Helper } from '../../helper';
import { ToastrService } from 'ngx-toastr';
import { AccountingBasicEntryService } from '../../../services/accounting/accounting-basic-entry.service';



@Component({
  selector: 'app-subledger-template',
  templateUrl: './subledger-template.component.html',
  styleUrls: ['./subledger-template.component.scss']
})
export class SubledgerTemplateComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private modalService:NgbModal,
    private toasterSer:ToastrService,
    private accountBasicEntryService:AccountingBasicEntryService
  ) {
    this._transSubledgerForm=this.formBuilder.array([]);
  }

  @Input() accountId:number;
  @Input() transID:number;
  @Input() accountName:string;
   @Input() totalAmount:number=0;
  @Input() modalItem:any;
  @Output() selectEvent = new EventEmitter<any>();
  _transSubledgerForm:FormArray;
  transSubledgerForm:FormGroup;
  subwidth:number;
  compId:number;
  sum:number=0;
  groupId:number;
  isCheque:number=0;
  otherReferencesModel:any[]=[];
  // totalAmount:number;
  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.createForm();  
     this.addRow();  
    if(this.modalItem.filter(c=>c.amount).length >0){
      this.getAllSubledgerByID();
    }
  }

  onSelectSeubledgerName(subledger:any,rowIndex:number){
    if(subledger !=null){
    this._transSubledgerForm.controls[rowIndex].patchValue({
      subledgerId:subledger.id,
      subledgerName:subledger.subledgerName
    });
    let tmt=0;
    let serpluseAmt=0;
     this._transSubledgerForm.controls.forEach(frmGroup=>{
       let tAmount=Number(frmGroup.get('amount').value);
       tmt +=tAmount;
      //  serpluseAmt=this.totalAmount-tmt;
       });
      //  this._transSubledgerForm.controls[rowIndex].get('amount').patchValue(serpluseAmt)
     Helper.focusTextField('subamount'+rowIndex);

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
          othersID:new FormControl(item.othersID,[])
         })
      );
    });
     this.sum=0;
     this._transSubledgerForm.controls.forEach(frmGroup=>{
      let tAmount=Number(frmGroup.get('amount').value);
      this.sum +=tAmount;
      });
    this.f.totalAmount.patchValue(this.sum);
  }

  getTotalAmount(){
    this.sum =0;
  this._transSubledgerForm.controls.forEach(frmGroup=>{
  let tAmount=Number(frmGroup.get('amount').value);
  // let serpluseAmt=this.totalAmount-tAmount
  this.sum +=tAmount;
  });
   this.f.totalAmount.patchValue(this.sum);
  }

  savetransSubledger(){
    this.getTotalAmount();
       if(this.f.totalAmount.value==this.totalAmount || this.totalAmount==0){
      let model=this.transSubledgerForm.value;
       var filter=this._transSubledgerForm.value.filter(item=>item.subledgerId !=null && item.amount >0);
       model.subledgerItem =filter;
       this.selectEvent.emit(model);
       this.cancel();
     }
     else{
     this.toasterSer.error("Total Amount and Total Subledger Amount is not equal");
       var filter=this._transSubledgerForm.value.filter(item=>item.subledgerId !=null && item.amount >0);
       this._transSubledgerForm=this.formBuilder.array([]) ;
       filter.forEach(item => {
         this._transSubledgerForm.push(
           new FormGroup({
            subledgerId:new FormControl(item.subledgerId,[]),
            subledgerName:new FormControl(item.subledgerName,[]),
            amount:new FormControl(Math.abs(item.amount),[]),
            othersID:new FormControl(item.othersID,[])
           })
        );
      });
      this.getTotalAmount();
      this.addRow();
    }
  }
  reset(){
    this.transSubledgerForm.reset();
    this.addRow();
  }


  createForm(){
    this.transSubledgerForm=this.formBuilder.group({
      subledgerId  :[0,[]],
      transId  :[this.transID,[]],
      accountId  :[this.accountId,[]],
      totalAmount:[this.sum,[]],
    });
  }
  addRow() {
    this._transSubledgerForm.push(
      new FormGroup({
        subledgerId:new FormControl(null,[]),
        subledgerName:new FormControl(null,[]),
              amount:new FormControl(null,[])      })
    );
  }

  removeRow(index:number){
    let tAmount=this._transSubledgerForm.value[index]["amount"];
    this.sum -=tAmount;
    this.f.totalAmount.patchValue(this.sum);
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
