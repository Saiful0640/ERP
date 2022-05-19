import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-costcenter-select-list-for-transaction',
  templateUrl: './costcenter-select-list-for-transaction.component.html',
  
})
export class CostcenterSelectListForTransactionComponent implements OnInit {
  @Input() costCenterId:number;
  @Input() IsDisabled:boolean=false;
  @Input()  isPlusActive:boolean=false;
  @Input() CostCenterItems:any;
  @Input() modalName:any;
  @Output() onChange=new EventEmitter<any>()
  @Input()  idforTabIndex:string;
  constructor(
    private modalService:NgbModal
  ) { }

  ngOnInit() {
    
  }
  onSelect(sulist:any){
    if(sulist==null){
      this.onChange.emit({id:null, name:null});
      return;
    }
    this.onChange.emit(sulist);
  }

  createNewItem(){
    this.modalService.open(this.modalName)
  }
 
}
