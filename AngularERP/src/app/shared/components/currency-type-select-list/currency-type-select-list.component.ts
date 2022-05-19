import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CurrencyModel } from '../../../models/accounting/currency-model';

import { AccountChartService } from '../../../services/accounting/AccountChartService';

@Component({
  selector: 'app-currency-type-select-list',
  template:  `<ng-select
  [(ngModel)]="currencyId"
  name="currencyId"
  (change)="onSelect($event)"
  [items]="currencyList"
  [ngClass]="{'is-invalid':isInValid}"
  bindLabel="currencySign"
  bindValue="id"
  style="width:200px"
  placeholder="Select a Currency">
  </ng-select>`,
  styleUrls: []
})
export class CurrencyTypeSelectListComponent implements OnInit {

  constructor(
    private accountChartService:AccountChartService
  ) { }
  @Input() currencyId:number;
  @Input() isInValid:boolean = false;
  @Output() onChange=new EventEmitter<CurrencyModel>()
  currencyList:any[]=[];

  ngOnInit() {
    this.getCurrency();
  }
  onSelect(currency:any){
    if(currency==null){
      this.onChange.emit(new CurrencyModel());
      return;
    }
    this.onChange.emit(currency);
  }
  getCurrency(){
   this.accountChartService.getAllCurrencies().subscribe((response:any)=>{
     if(response){
       this.currencyList =response;
     }else{
       this.currencyList=[];
     }
   })
 }
}
