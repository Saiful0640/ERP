import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { SalesPurchaseService } from '../../../services/sales-purchase/sales-purchase.service';

@Component({
  selector: 'app-origin-select-list',
  template:  `<ng-select
  [(ngModel)]="originId"
  name="originId"
  (change)="onSelect($event)"
  [items]="origins"
  bindLabel="originName"
  bindValue="id"
  placeholder="Select Origin">
  </ng-select>`,
})
export class OriginSelectListComponent implements OnInit {

  constructor (private service:SalesPurchaseService){}

  @Input() originId:number;
  @Output() onChange=new EventEmitter<any>()
  origins:any[]=[];
  compId:number;
  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.getAllOrigin();

  }

  onSelect(origin:any){
    if(origin==null){
      this.onChange.emit({Id:null, originName:null});
      return;
    }
    this.onChange.emit(origin);
  }
  getAllOrigin(){
    this.service.getAllOrigin(this.compId).subscribe((result:any[])=>{
      if(result){
        this.origins=result;
      }else{
        this.origins=[];
      }
    },err=>{
      console.error(err)
    })
  }
}
