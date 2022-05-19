import { AuthService } from './../../../services/auth.service';
import { BasicEntryService } from '../../../services/hr/basicEntry.service';
import { BasicEntryModel } from '../../../models/hr/basicEntry.model';
import { Pagination } from '../../paginate';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';

@Component({
  selector: 'app-department-select-list',
  template: `<ng-select
  [(ngModel)]="setDeptId"
  name="setDeptId"
  (change)="onSelect($event)"
  [items]="_departments"
  bindLabel="description"
  bindValue="id"
  placeholder="Select Department"
  [disabled]="disabled"
  [id]="focusId">
  </ng-select>`,
  styleUrls: ['../../../../vendor/libs/ng-select/ng-select.scss']
})
export class DepartmentSelectListComponent extends Pagination implements OnInit {

  @Input() _departments:BasicEntryModel[]=[];
  @Input() setDeptId:any;
  @Input() focusId:string;
  @Input() disabled:boolean = false;
  @Output() onChange = new EventEmitter<BasicEntryModel>();
  compId:number;

  constructor(
    private basicService:BasicEntryService
  ) {
    super();
   }
  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.getAllDepartment();
  }

  onSelect(dept:any){
    if(dept==null){
      this.onChange.emit(new BasicEntryModel());
      return;
    }
    this.onChange.emit(dept);
  }
  getAllDepartment(){
    this.basicService.getAllDepartment(this.compId).subscribe((result:any)=>{
    if(result){
   this._departments=result as BasicEntryModel[];
    }
    else{
      return;
    }
    })
  }
}
