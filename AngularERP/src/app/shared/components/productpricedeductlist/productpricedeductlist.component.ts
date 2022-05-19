import { SalesPurchaseService } from './../../../services/sales-purchase/sales-purchase.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-product-price-select-list',
  template:  `<ng-select
  [(ngModel)]="pTypeID"
  name="pTypeID"
  (change)="onSelect($event)"
  [items]="productprice"
  bindLabel="pType"
  bindValue="pTypeID"
  [id]="tabindex"
  [disabled]="disabled"
  placeholder="Select PType">
  </ng-select>`
})
export class ProductpricedeductlistComponent implements OnInit {
  @Input() pTypeID:number;
  @Input() tabindex:string;
  @Input() disabled:boolean = false;
  @Output() onChange=new EventEmitter<any>()

  productprice:any[]=[];

  constructor(private _service:SalesPurchaseService) { }

  ngOnInit() {
    this.getproductprice()
  }
  getproductprice(){
    this._service.getproductprice().subscribe((result:any)=>{
      if(result){
        this.productprice=result;
      }else{
        this.productprice=[];
      }
    })

  }
  onSelect(product:any){
    if(product==null){
      this.onChange.emit({pTypeID:null, pType:'', amount:null});
      return;
    }
    this.onChange.emit(product);
  }

}
