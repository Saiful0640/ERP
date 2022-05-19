import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SalesPurchaseService } from '../../../services/sales-purchase/sales-purchase.service';

@Component({
  selector: 'app-product-model-select-list',
  template:  `<ng-select
  [(ngModel)]="modelId"
  name="modelId"
  (change)="onSelect($event)"
  [items]="allModel"
  bindLabel="name"
  bindValue="id"
  placeholder="Select Model">
  </ng-select>`
})
export class ProductModelSelectListComponent implements OnInit {

  constructor (private service:SalesPurchaseService){}

  @Input() modelId:number;
  @Output() onChange=new EventEmitter<any>()
  allModel:any[]=[];
  compId:number;
  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.getAllModel();

  }

  onSelect(model:any){
    if(model==null){
      this.onChange.emit({id:null, name:null});
      return;
    }
    this.onChange.emit(model);
  }
  getAllModel(){
    this.service.getAllProModel(this.compId).subscribe((model:any[])=>{
      if(model){
        this.allModel=model;
      }else{
        this.allModel=[];
      }
    })
  }

}
