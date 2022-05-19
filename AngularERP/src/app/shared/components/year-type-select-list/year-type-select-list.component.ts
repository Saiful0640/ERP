import { SettingService } from '../../../services/settings/Setting.service';
import { ApiResponse } from './../../../models/api-response';
import { YearType } from './../../../models/settings/year/year-type.model';
import { YearModel } from './../../../models/settings/year/year.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-year-type-select-list',
  template: `<ng-select
  [(ngModel)]="yearId"
  name="yearId"
  (change)="onSelect($event)"
  [items]="yearTypeMode"
  bindLabel="typeName"
  bindValue="id"
  placeholder="Select Under Group">
  </ng-select>`,
  styleUrls: []
})
export class YearTypeSelectListComponent implements OnInit {

  constructor(
    private yeartypeService:SettingService
  ) { }
    @Input() yearId:number;
    @Output() onChange=new EventEmitter<YearType>();
    yearTypeMode:YearType[]=[];

  ngOnInit() {
    this.getAllYearType();
  }

  onSelect(yearType:any){
    if(yearType==null){
      this.onChange.emit(new YearType());
      return;
    }
    this.onChange.emit(yearType);

  }

  getAllYearType(){

    this.yeartypeService.getAllYearType().subscribe((response:any)=>{
      if(response.status){
        this.yearTypeMode=response.result as YearType[];
      }else{
        this.yearTypeMode=[];
      }
    })
  }

}
