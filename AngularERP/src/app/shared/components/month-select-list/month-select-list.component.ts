import { MonthModel } from './../../../models/settings/month.model';
import { Pagination } from '../../paginate';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { SettingService } from '../../../services/settings/Setting.service';

@Component({
  selector: 'app-month-select-list',
  template: `<ng-select
  [(ngModel)]="setMonthId"
  name="setMonthId"
  (change)="onSelect($event)"
  [items]="_months"
  bindLabel="monthName"
  bindValue="id"
  placeholder="Select Month"
  [disabled]="disabled">
  </ng-select>`,
  styleUrls: ['../../../../vendor/libs/ng-select/ng-select.scss']
})
export class MonthSelectListComponent extends Pagination implements OnInit {

  _months:MonthModel[]=[];
  @Input() setMonthId:any;
  @Input() disabled:boolean = false;
  @Output() onChange = new EventEmitter<MonthModel>();
  constructor(
    private settingService:SettingService
  ) {
    super();
   }
  ngOnInit() {
    this.getAllMonths();
  }

  onSelect(month:any){
    if(month==null){
      this.onChange.emit(new MonthModel());
      return;
    }
    this.onChange.emit(month);
  }
  getAllMonths(){
    this.settingService.getAllMonth().subscribe((result:any)=>{
    if(result){
   this._months =result as MonthModel[];
    }
    })
  }
}
