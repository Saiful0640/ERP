import { AuthService } from './../../../services/auth.service';
import { BasicEntryService } from './../../../services/hr/basicEntry.service';
import { BasicEntryModel } from './../../../models/hr/basicEntry.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-group-select-list',
  template: `<ng-select [(ngModel)]="groupId"
  (change)="onSelect($event)"
  [items]="groupType"
  [id]="focusId"
  bindLabel="description"
  bindValue="id"
  [disabled]="disabled"
  placeholder="Select Group">
  </ng-select>`,
  styleUrls: []
})
export class GroupSlectListComponent implements OnInit {
  @Input() groupId:number;
  @Input() focusId:string;
  @Input() disabled:boolean=false;
  @Output() onChange=new EventEmitter<any>();
  compId:number;
  groupType:BasicEntryModel[]=[];

  constructor(private service:BasicEntryService) { }

  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.getGroup();
  }

  getGroup(){
    this.service.getAllGroupNew().subscribe((result:any)=>{
      if(result){
        this.groupType=result as BasicEntryModel[];
      }else{
        this.groupType=[];
      }
    })
  }

  onSelect(groupType) {
    if (groupType) {
      this.onChange.emit(groupType)
    } else {
      this.onChange.emit({
        id: null, description: null,
      })
    }
  }

}
