import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SalesPurchaseService } from '../../../services/sales-purchase/sales-purchase.service';

@Component({
  selector: 'app-unit-select-list',
  template:  `<ng-select
  [(ngModel)]="unitId"
  name="unitId"
  (change)="onSelect($event)"
  [items]="allUnit"
  bindLabel="unitName"
  bindValue="unitId"
  [tabindex]="tabindex"
  [disabled]="disabled"
  placeholder="Select Unit">
  </ng-select>`
})
export class UnitSelectListComponent implements OnInit {


  constructor (private service:SalesPurchaseService){}

  @Input() unitId:number;
  @Input() tabindex:number=0;
  @Input() disabled:boolean = false;
  @Output() onChange=new EventEmitter<any>()
  allUnit:any[]=[];
  compId:number;
  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.getAllUnit();

  }

  onSelect(unit:any){
    if(unit==null){
      this.onChange.emit({id:null, name:null, unitFactor:null});
      return;
    }
    this.onChange.emit(unit);
  }
  getAllUnit(){
    this.service.getAllProUnit(this.compId).subscribe((unit:any[])=>{
      if(unit){
        this.allUnit=unit;
      }else{
        this.allUnit=[];
      }
    })
  }

}
