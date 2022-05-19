import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../../services/auth.service';
import { ApiResponse } from './../../../models/api-response';
import { TransactionService } from './../../../services/accounting/transaction.service';
import { VoucherType } from './../../../models/accounting/transaction/voucher-type.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-voucher-type-select-list',
  template:  `<ng-select
  [(ngModel)]="voucherTypeID"
  name="voucherTypeID"
  [ngClass]="{'is-invalid':isInValid}"
  (change)="onSelect($event)"
  (blur)="onBlur()"
  [items]="voucherTypeModel"
  bindLabel="voucharName"
  bindValue="prefixCode"
  searchable=true
  placeholder="Select Voucher Type" [id]="elementId" >
  </ng-select>`,
  styleUrls: []
})
export class VoucherTypeSelectListComponent implements OnInit {

  constructor(
    private voucherTypeService:TransactionService,
    private toasterService:ToastrService
  ) { }
  @Input() voucherTypeID:string;
  @Input() transType:string;
  @Input() isInValid:boolean = false;
  @Output() onChange=new EventEmitter<any>();
  @Output() onBlurClick=new EventEmitter<any>();
  voucherTypeModel:any[]=[];
  @Input() elementId:string ;
  compId:number;
  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.getAllVoucherType();
  }

  onSelect(vouchertype:any){
    if(vouchertype==null){
      this.onChange.emit(new VoucherType());
      return;
    }
    this.onChange.emit(vouchertype);
  }
  onBlur(){
    this.onBlurClick.emit();
  }
  getAllVoucherType(){
    this.voucherTypeService.getAllCashVoucherType(this.transType,this.compId).subscribe((response:any)=>{
      if(response.status){
        this.voucherTypeModel=response.result;
      }else{
        this.voucherTypeModel=[];
      }
    },(err:any)=>{
      this.toasterService.error(err.error,"Error!")
    })
  }


}
