import { AuthService } from './../../../services/auth.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SettingService } from '../../../services/settings/Setting.service';

@Component({
  selector: 'app-basic-item-select-list',
  template:  `<ng-select
  [(ngModel)]="basicItemId"
  name="basicItemId"
  (change)="onSelect($event)"
  [items]="ItemList"
  [ngClass]="{'is-invalid':isInValid}"
  bindLabel="description"
  bindValue="id"
  style="width:200px"
  placeholder="Select Item">
  </ng-select>`,
  styleUrls: []
})
export class BasicItemSelectListComponent implements OnInit {

  constructor(
    private settingService:SettingService
  ) { }
  compId:number;
  @Input() basicItemId:number;
  @Input() tableName:string;
  @Input() isInValid:boolean = false;
  @Output() onChange=new EventEmitter<any>()
  ItemList:any[]=[];
  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.getAllBasicItem();
  }
  onSelect(gender:any){
    if(gender==null){
      this.onChange.emit({id:null, description:null});
      return;
    }
    this.onChange.emit(gender);
  }
 getAllBasicItem(){
   this.settingService.getAllBasicItem(this.tableName).subscribe((response:any)=>{
     if(response){
       this.ItemList =response;
     }else{
       this.ItemList=[];
     }
   })
 }


}
