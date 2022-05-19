import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { SalesPurchaseService } from '../../../services/sales-purchase/sales-purchase.service';

@Component({
  selector: 'app-brand-select-list',
  template:  `<ng-select
  [(ngModel)]="brandId"
  name="brandId"
  (change)="onSelect($event)"
  [items]="brands"
  bindLabel="name"
  bindValue="id"
  placeholder="Select Brand">
  </ng-select>`,
})
export class BrandSelectListComponent implements OnInit {

  constructor (private service:SalesPurchaseService){}

  @Input() brandId:number;
  @Output() onChange=new EventEmitter<any>()
  brands:any[]=[];
  compId:number;
  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.getAllBrand();

  }

  onSelect(brand:any){
    if(brand==null){
      this.onChange.emit({id:null, name:null});
      return;
    }
    this.onChange.emit(brand);
  }
  getAllBrand(){
    this.service.getAllBrand(this.compId).subscribe((category:any[])=>{
      if(category){
        this.brands=category;
      }else{
        this.brands=[];
      }
    })
  }

}
