import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SalesPurchaseService } from '../../../services/sales-purchase/sales-purchase.service';

@Component({
  selector: 'app-color-select-list',
  template:  `<ng-select
  [(ngModel)]="colorId"
  name="colorId"
  (change)="onSelect($event)"
  [items]="colors"
  bindLabel="name"
  bindValue="id"
  placeholder="Select Color">
  </ng-select>`,
})
export class ColorSelectListComponent implements OnInit {

  constructor (private service:SalesPurchaseService){}

  @Input() colorId:number;
  @Output() onChange=new EventEmitter<any>()
  colors:any[]=[];
  compId:number;
  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.getAllColor();

  }

  onSelect(color:any){
    if(color==null){
      this.onChange.emit({id:null, name:null});
      return;
    }
    this.onChange.emit(color);
  }
  getAllColor(){
    this.service.getAllColor(this.compId).subscribe((colors:any[])=>{
      console.log(colors);
      if(colors){
        this.colors=colors;
      }else{
        this.colors=[];
      }
    })
  }

}
