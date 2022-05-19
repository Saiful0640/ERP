import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SettingService } from '../../../services/settings/Setting.service';

@Component({
  selector: 'app-thana-select-list',
  template:  `<ng-select
  [(ngModel)]="thanaId"
  name="thanaId"
  (change)="onSelect($event)"
  [items]="thanaList"
  [ngClass]="{'is-invalid':isInValid}"
  bindLabel="thananame"
  bindValue="id"
  style="width:150px"
  placeholder="Select Thana">
  </ng-select>`,
  styleUrls: []
})
export class ThanaSelectListComponent implements OnInit {

  constructor( private settingService:SettingService) { }
  @Input() thanaId:number;
  @Input() isInValid:boolean = false;
  @Output() onChange=new EventEmitter<any[]>();
  thanaList:[]=[];
  ngOnInit() {
    this.getAllThanaList();
  }
  onSelect(gender:any){
    if(gender==null){
      this.onChange.emit();
      return;
    }
    this.onChange.emit(gender);
  }
 getAllThanaList(){
   this.settingService.getAllThanaList().subscribe((response:any)=>{
     if(response){
       this.thanaList =response;
     }else{
       this.thanaList=[];
     }
   })
 }
}
