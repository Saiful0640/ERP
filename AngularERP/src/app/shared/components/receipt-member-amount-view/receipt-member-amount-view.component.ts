import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../services/auth.service';
import { ReceiptAndPaymentService } from '../../../services/receipt-and-payment.service';

@Component({
  selector: 'app-receipt-member-amount-view',
  templateUrl: './receipt-member-amount-view.component.html',
  styleUrls: ['./receipt-member-amount-view.component.scss']
})
export class ReceiptMemberAmountViewComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private modalService: NgbModal  ,
    private receiptAndPaymentService:ReceiptAndPaymentService
  ) {
    this.receiptMemAmtArrayForm = this.formBuilder.array([]);
   }
  @Input() moduleId:number;
  @Input() memberId:number;
  memberListModel:any[]=[];
  filtermemberListModel:any[]=[];
  isCheckedItem: boolean = false;
  checkAll: boolean = false;
  receiptMemAmtForm:FormGroup;
  receiptMemAmtArrayForm: FormArray;
  totalAmount:number=0;
  compId:number;
  selectedPeriod: string[] = [];
  @Output() selectEvent = new EventEmitter<any>();
  ngOnInit() {
    this.compId=AuthService.CompanyId; 
    this.createForm();
    this.getMemeberReceiablelist();   
  }
  getTotalAmount(){
    this.totalAmount =0;
  this.memberListModel.forEach(c=>{
  let tAmount=Number(c.amount);
  this.totalAmount+=tAmount;
  })
   this.f.totalAmount.patchValue(this.totalAmount);
  }
  allCheckedItem(event) {
    if(event.target.checked){
    const checked = event.target.checked;
    this.memberListModel.forEach(item => item.isSelected = checked);  
    this.getTotalAmount();
  }else{
    const unChecked = event.target.unChecked;
    this.memberListModel.forEach(item => item.isSelected =unChecked );  
    this.totalAmount =0;  
     this.f.totalAmount.patchValue(this.totalAmount);
  }
  }
  getOnSelectedPeriod(periodId: any,amount:number, isSelect: any) {    
    if (isSelect) {
      this.selectedPeriod.push(periodId);      
      this.totalAmount+=amount;
      this.f.totalAmount.patchValue(this.totalAmount);
    } else {
      let index = this.selectedPeriod.findIndex(c => c == periodId);
      this.selectedPeriod.splice(index, 1);
      this.totalAmount-=amount;
      this.f.totalAmount.patchValue(this.totalAmount);
    }    
     this.receiptMemAmtForm.patchValue({
      periodID: this.selectedPeriod   
    }) 
}  
  onSearchClick( searchModal: any) {   
    this.modalService.open(searchModal, {size: 'lg', windowClass: 'modal-xl'});
  }
  getMemeberReceiablelist(){   
    this.receiptAndPaymentService.getMemeberReceiablelist(this.memberId,this.moduleId,this.compId).subscribe((response:any)=>{
      if(response.status){
        this.memberListModel= response.result ;
        // this.createReceiptMemAmtArrayForms(response.result) ;      
      }
    })
  }
  onSelect(){   
    this.selectEvent.emit( this.receiptMemAmtForm.value);   
    this.cancel();
  } 
  createForm(){
    this.receiptMemAmtForm=this.formBuilder.group({      
      totalAmount:[,[]],
      periodID:[[],[]]
    })
  } 
  get f(){
    return this.receiptMemAmtForm.controls;
  }
  cancel(){
    this.modalService.dismissAll();
  }
}
