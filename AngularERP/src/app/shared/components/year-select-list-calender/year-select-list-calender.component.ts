import { AuthService } from '../../../services/auth.service';
import { YearModel } from '../../../models/settings/year/year.model';
import { Pagination } from '../../paginate';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { SettingService } from '../../../services/settings/Setting.service';

@Component({
  selector: 'app-year-select-calender-list',
  template: `<ng-select
  [(ngModel)]="setYearId"
  [(ngModel)]="yearType"
  name="setYearId"
  (change)="onSelect($event)"
  [items]="_year"
  bindLabel="yearName"
  bindValue="id"
  placeholder="Select Year"
  [disabled]="disabled">
  </ng-select>`,
  styleUrls: ['../../../../vendor/libs/ng-select/ng-select.scss']
})
export class YearSelectListComponent extends Pagination implements OnInit {
  compId:number;
  _year:YearModel[]=[];
  @Input() setYearId:any;
  @Input() yearType:any;
  @Input() disabled:boolean = false;
  @Output() onChange = new EventEmitter<YearModel>();
  constructor(
    private settingService:SettingService
  ) {
    super();
   }
  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.getAllYears();
  }

  onSelect(year:any){
    if(year==null){
      this.onChange.emit(new YearModel());
      return;
    }
    this.onChange.emit(year);
  }
  getAllYears(){
    this.settingService.getAllYear().subscribe((result:any)=>{
    if(result){
   this._year =result as YearModel[];
    }
    })
  }
}
