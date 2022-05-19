import { AuthService } from './../../../services/auth.service';
import { BasicEntryModel } from '../../../models/hr/basicEntry.model';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Pagination } from '../../paginate';
import { BasicEntryService } from '../../../services/hr/basicEntry.service';


@Component({
  selector: 'app-designation-select-list',
  template:`<ng-select
  [(ngModel)]="designationId"
  name="desigantionId"
  (change)="onSelect($event)"
  [items]="designationModel"
  bindLabel="description"
  bindValue="id"
  placeholder="Select">
  </ng-select>`,
  styleUrls: [ '../../../../vendor/libs/ng-select/ng-select.scss']
})
export class DesignationSelectListComponent extends Pagination implements OnInit {

  designationModel:BasicEntryModel[]=[];
  @Input() designationId:number;
  @Output() onChange = new EventEmitter<BasicEntryModel>();
  compId:number;
  constructor(
    private basicEntryService: BasicEntryService,
  ) {
    super();
   }
  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.getDesignation();
  }

  onSelect(designation:any){
    if(designation==null){
      this.onChange.emit(new BasicEntryModel());
      return;
    }
    this.onChange.emit(designation);
  }
  getDesignation() {
    this.basicEntryService.getAllDesignationNew().subscribe((result:any) => {
      if (result) {
        //this.compId
        this.designationModel = result as BasicEntryModel[];
        this.sortBy = 'paymentType';
        this.sortDesc = false;
      }
      else{
        return;
      }
    })
  }
}
