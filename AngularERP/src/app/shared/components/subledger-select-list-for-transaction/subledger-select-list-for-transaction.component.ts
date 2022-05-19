import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-subledger-select-list-for-transaction',
  templateUrl: './subledger-select-list-for-transaction.component.html',

})
export class SubledgerSelectListForTransactionComponent implements OnInit {
  @Input() sublegerId:number;
  @Input() idForTabIndex:string;
  @Input() IsDisabled:boolean=false;
  @Input() subledgerItems:any;
  @Input() modalName:any;  
  @Output() onChange=new EventEmitter<any>()

  companyId:number;
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
