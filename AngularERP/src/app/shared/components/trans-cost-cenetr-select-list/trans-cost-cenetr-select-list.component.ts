import { AuthService } from './../../../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnInit, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { CriteriaCenterService } from '../../../services/criteria-center.service';

@Component({
  selector: 'app-trans-cost-cenetr-select-list',
  template: `
  <!-- <div class=" input-group"> -->
    <ng-select
  [(ngModel)]="transCostCenterID"
  name="transCostCenterID"
  (change)="onSelect($event)"
  [items]="transCostCenterModel"
  bindLabel="detailsCaption"
  bindValue="id"
  [id]="idForTabIndex"
  [ngStyle]="{'width.px':costWidth}"
  placeholder="Select CostCenter">
  </ng-select>

  `,
  styleUrls: []
})
export class TransCostCenetrSelectListComponent implements OnInit,OnChanges {

  constructor(
    private criteriaService:CriteriaCenterService,
    private modalService:NgbModal
  ) { }
  transCostCenterModel:any[]=[];
  @Input() costWidth:number=180;
  @Input() idForTabIndex:string;
  @Input() moduleId:number;
  @Input() isCostCenter:number;
  @Input() modalName:any;
  @Input() transCostCenterID:number;
  @Output() onChange=new EventEmitter<any>();
  compId:number;

  ngOnInit() {
    this.compId=AuthService.CompanyId;
   this.getListOfCostCenter()
  }
  ngOnChanges(){
    this.compId=AuthService.CompanyId;
      this.getListOfCostCenter()
      }

  onSelect(costCenter:any){
    if(costCenter==null){
      this.onChange.emit({id:null,detailsCaption:null});
      return;
    }
    this.onChange.emit(costCenter);
  }
  getListOfCostCenter() {
    //if(this.isCostCenter ==1){
      this.criteriaService.getAllCriteriaCenterNew().subscribe((response: any) => {
        if (response) {
          ///this.moduleId,this.compId
          this.transCostCenterModel = response;
        }
        else {
          this.transCostCenterModel = [];
        }
      })
   // }
  //  else{
  //       this.transCostCenterModel = [];
  //       return;
  //    }
  }

  createNewItem(){
    this.modalService.open(this.modalName)
  }

}
