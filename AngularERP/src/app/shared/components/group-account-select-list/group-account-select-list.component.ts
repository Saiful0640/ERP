import { AccountingBasicEntryService } from './../../../services/accounting/accounting-basic-entry.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GroupAccountModel } from './../../../models/accounting/basic-entry/group-account-model';
import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { AccountChartService } from '../../../services/accounting/AccountChartService';

@Component({
  selector: 'app-group-account-select-list',
  template: `<div class="input-group">
    <h1>{{name}}</h1>
  <ng-select
  [(ngModel)]="groupAccID"
  name="groupAccID"
  (change)="onSelect($event)"
  [items]="groupAccountmodel"
  bindLabel="typeName"
  bindValue="id"
  style="width:200px"
  placeholder="Select Group Account">
  </ng-select>
  <div *ngIf="isPlusIconHide==false" class="input-group-append">
  <button  (click)="createNewItem()" class="input-group-text btn btn-info"
   type="button" tabindex="-1">
    <span class="fa fa-plus" style="cursor: pointer;"></span>
    </button>
  </div>
  </div>
  `,
  styleUrls: []
})
export class GroupAccountSelectListComponent implements OnInit {

  constructor(
    private accountChartService:AccountChartService,
    private modalService:NgbModal
  ) { }
  @Input() groupAccID:number;
  @Input() isPlusIconHide:boolean=false;
  @Input() lowerGroupID:number;
  @Output() onChange=new EventEmitter<GroupAccountModel>();
  groupAccountmodel:GroupAccountModel[]=[];
  @Input() name:string;
  @Input() id:number;
  compId:number;
 // lowerGrpID:number;
  ngOnInit() {
    //for Supplier list compID=3
    this.compId=1;
    this.getAllGroupAccount();
  }
  onSelect(groupAcc:any){
    if(groupAcc==null){
      this.onChange.emit(new GroupAccountModel());
      return;
    }
    this.onChange.emit(groupAcc);
  }

  getAllGroupAccount(){
    if(this.lowerGroupID==null){this.lowerGroupID=0}
    this.accountChartService.getAllGroupAccount().subscribe((response:any)=>{
      if(response){
        //filttaring kora lagbe
        //this.compId,this.lowerGroupID
      this.groupAccountmodel=response;
      }
      else{
        this.groupAccountmodel=[];
      }
    })
  }
  createNewItem(){
  }

}
