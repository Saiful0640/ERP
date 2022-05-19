import { Pagination } from './../../paginate';
import { BasicEntryService } from './../../../services/hr/basicEntry.service';
import { BasicEntryModel } from './../../../models/hr/basicEntry.model';
import { Component, Input, OnInit, Output, OnChanges, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-location-select-list',
  template: `<ng-select
  [(ngModel)] = "setLocationId" name = "setLocationId" (change) = "onselect($event)" bindLabel="description"
  bindValue="id"
  [items] = "location"
  placeholder="Select Location"
  [disabled]="disabled" >
  </ng-select>`,
  styleUrls: ['../../../../vendor/libs/ng-select/ng-select.scss']
})
export class LocationSelectListComponent extends Pagination implements OnInit {

  location:BasicEntryModel[]=[];
  @Input() setLocationId:any;
  @Input() disabled:boolean = false;
  @Output() onChange = new EventEmitter<BasicEntryModel>();

  constructor(
    private basicService: BasicEntryService
  ) {
    super();
  }

  ngOnInit() {
    this.getAllLocation();
  }

  onselect(lct:any){
    if(lct == null){
      this.onChange.emit(new BasicEntryModel());
      return;
    }
    this.onChange.emit(lct);
  }
  getAllLocation(){
    this.basicService.getAllLocation().subscribe((result:any)=>{
      if(result){
        this.location = result as BasicEntryModel[];
      }
    })
  }
}
