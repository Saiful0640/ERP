import { ToastrService } from 'ngx-toastr';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Component, OnInit, Input, Output, EventEmitter, ViewChild, AfterViewInit, ViewChildren, QueryList, ChangeDetectorRef } from '@angular/core';
import { TransCostcenterModel } from '../../../models/accounting/transaction/trans-costcenter-model';
import { AuthService } from '../../../services/auth.service';
import { Helper } from '../../helper';
import { TransCostCenetrSelectListComponent } from '../trans-cost-cenetr-select-list/trans-cost-cenetr-select-list.component';
import { NgSelectComponent } from '@ng-select/ng-select';

@Component({
  selector: 'app-costcenter-template',
  templateUrl: './costcenter-template.component.html',
  styleUrls: ['./costcenter-template.component.scss']
})
export class CostcenterTemplateComponent implements OnInit,AfterViewInit {

  constructor(
    private formBuilder:FormBuilder,
    private modalService:NgbModal,
    private toasterSer:ToastrService,
    private cdr: ChangeDetectorRef,
  ) {
    this._transCostCenterForm=this.formBuilder.array([])
  }
  @Input() accountID:number;
  @Input() isCostCenter:number;
  @Input() accountName:string;
  @Input() totalAmount:number=0;
  @Input() transID:number;
  @Input() modalItem:any;
  @Input() moduleId:number;
  @Output() selectEvent = new EventEmitter<TransCostcenterModel>();
  transCostCenterForm:FormGroup;
  _transCostCenterForm:FormArray;
  compId:number;
  costWidth:number;
   amount:number=0;
  @ViewChild(TransCostCenetrSelectListComponent) transCostCenetrSelectListComponent:TransCostCenetrSelectListComponent;
  @ViewChildren('data') data: QueryList<NgSelectComponent>;
  ngAfterViewInit(){

  }
  ngAfterViewChecked(){
    this.cdr.detectChanges();
  }
  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.createForm();
    // for(let i=0;i<7;i++){
      this.addRow();
    // }
    console.log("modal",this.modalItem);
    if(this.modalItem.filter(c=>c.amount).length >0){
      this.getAllCostCenterByID();
    }

  }

  getAllCostCenter(costCenterModel:any,rowIndex:number){
    if(costCenterModel !=null){
    this._transCostCenterForm.controls[rowIndex].patchValue({
      detailsId:costCenterModel.id,
      costCenterName:costCenterModel.detailsCaption,
    })
    let tmt=0;
     this._transCostCenterForm.controls.forEach(frmGroup=>{
       let tAmount=Number(frmGroup.get('amount').value);
       tmt +=tAmount;
       });
    Helper.focusTextField('costamount'+rowIndex);
  }
  }



  getAllCostCenterByID(){
     let costItemById=this.modalItem;
     this._transCostCenterForm=this.formBuilder.array([]) ;
     costItemById.forEach(item => {
        this._transCostCenterForm.push(
          new FormGroup({
            detailsId:new FormControl(item.detailsId,[]),
            detailsCaption:new FormControl(item.detailsCaption,[]),
           amount:new FormControl(Math.abs(item.amount),[])
          })
       )
     });
     this.amount=0;
     this._transCostCenterForm.controls.forEach(frmGroup=>{
      let tAmount=Number(frmGroup.get('amount').value);
      this.amount +=tAmount;
      });
     this.f.totalAmount.patchValue(this.amount);
   }

   getTotalAmount(){
    this.amount =0;
  this._transCostCenterForm.controls.forEach(frmGroup=>{
  let tAmount=Number(frmGroup.get('amount').value);
  this.amount +=tAmount;
  });
   this.f.totalAmount.patchValue(this.amount);
  }

  savetransCostCenter(){
      this.getTotalAmount();
     if(this.f.totalAmount.value==this.totalAmount || this.totalAmount ==0){
      let model=this.transCostCenterForm.value;
       var filter=this._transCostCenterForm.value.filter(item=>item.detailsId !=null && item.amount >0);
       model.costCenterItem =filter;
       this.selectEvent.emit(model);
       this.cancel();}
       else{
        this.toasterSer.error("Total Amount and Total Costcenter Amount is not equal");
          var filter=this._transCostCenterForm.value.filter(item=>item.detailsId !=null && item.amount >0);
          this._transCostCenterForm=this.formBuilder.array([]) ;
          filter.forEach(item => {
            this._transCostCenterForm.push(
              new FormGroup({
                 detailsId:new FormControl(item.detailsId,[]),
               detailsCaption:new FormControl(item.detailsCaption,[]),
               amount:new FormControl(Math.abs(item.amount),[])
              })
           );
         });
         this.getTotalAmount();
         this.addRow();
       }
  }

  reset(){
    this.transCostCenterForm.reset();
    this.addRow();
    this.addRow();
    this.addRow();
    this.addRow();
  }


  createForm(){
    this.transCostCenterForm=this.formBuilder.group({
      id :[,[]],
      transId  :[this.transID,[]],
      totalAmount:[this.amount,[]],
      accountId  :[this.accountID,[]]
    })
  }
  addRow() {
    this._transCostCenterForm.push(
      new FormGroup({
        detailsId:new FormControl(null,[]),
        detailsCaption:new FormControl(null,[]),
              amount:new FormControl(null,[])
      })
    )
  }
  addition() {
    this.amount =0;
    this._transCostCenterForm.controls.forEach(frmGroup=>{
    let tAmount=Number(frmGroup.get('amount').value);
    // let serpluseAmt=this.totalAmount-tAmount
    this.amount +=tAmount;
    });
     this.f.totalAmount.patchValue(this.amount);
  }

  removeRow(index:number){
    let tAmount=this._transCostCenterForm.value[index]["amount"];
    this.amount -=tAmount;
    this.f.totalAmount.patchValue(this.amount);
    this._transCostCenterForm.removeAt(index);

  }


  get formVal(){
    return this.transCostCenterForm.value;
  }
  get f(){
    return this.transCostCenterForm.controls;
  }
  cancel(){
    this.modalService.dismissAll();
  }
  
}
