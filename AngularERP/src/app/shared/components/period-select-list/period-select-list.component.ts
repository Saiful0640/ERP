import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PeriodModel } from '../../../models/hr/period.model';
import { AuthService } from '../../../services/auth.service';
import { SettingService } from '../../../services/settings/Setting.service';

@Component({
  selector: 'app-period-select-list',
  template:  `<ng-select
  [(ngModel)]="periodId"
  name="periodId"
  (change)="onSelect($event)"
  [items]="periodItems"
  [id]="focusId"
  bindLabel="periodName"
  bindValue="id"
  appendTo="body"
  style="style"
  placeholder="Select Periods">
  </ng-select>`
})
//Note:There was style="width:200px" in ng-select(changes style used as Input  Field)
export class PeriodSelectListComponent implements OnInit {

  constructor(private settingService:SettingService) { }
  @Input() periodId:number;
  @Input() moduleID:number;
  @Input() focusId:string;
  @Output() onChange=new EventEmitter<any>();
  @Input() style:string;
  periodItems:any[]=[];
  compId:number;
  ngOnInit() {
    this.compId=AuthService.CompanyId;
    // this.moduleID=AuthService.CurrentModuleId
    this.getPeriods();
  }

  onSelect(period:any){
    if(period==null){
      this.onChange.emit({id:null, periodName:null});
      return;
    }
    this.onChange.emit(period);
  }
  getPeriods(){
    this.settingService.getAllPeriodNew().subscribe((result:any)=>{
      if(result){
        //this.compId,this.moduleID
        this.periodItems=result as PeriodModel[];``
      }else{
        this.periodItems=[];
      }
    })
    }
}
