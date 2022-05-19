import { AccountingBasicEntryService } from './../../../../../services/accounting/accounting-basic-entry.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subledger } from '../../../../../models/accounting/basic-entry/chart-of-account/subledger.model';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-subledger-list-temp',
  templateUrl: './subledger-list-temp.component.html',
  styleUrls: ['./subledger-list-temp.component.scss']
})
export class SubledgerListTempComponent implements OnInit {
  @Input() accountId:number;
  @Output() selectEvent = new EventEmitter<Subledger>();
  compId:number;
  subledgerSearch: Subledger = new Subledger();
  Subledger:Subledger[]=[];
  filteredSubledger:Subledger[]=[];
  constructor(
    private modalService:NgbModal,
    private subledgerService:AccountingBasicEntryService
  ) {

   }

  ngOnInit() {
    this.compId=AuthService.CompanyId;
    if(this.accountId==null){
      this.accountId=0
    }
    this.getAllSubledger();
  }
  onSearchClick(searchModal: any) {
    this.subledgerSearch.subledgerName = '';
    //this.fdbcSearchKeys.idenNo = null;
    this.modalService.open(searchModal, {size: 'lg', windowClass: 'modal-xl'});
  }

  getAllSubledger(){
    this.subledgerService.getSubledgers().subscribe((response:any)=>{
      if(response){
        //filter need
     //this.compId,this.accountId
     console.log(response)
        this.Subledger=response;
        this.filteredSubledger = response;
      }else
      {
        this.Subledger=[];
      }
    })
  }
  filterSubledger(subledgerName: string) {
    if(subledgerName != null ){
      let filterAg = this.Subledger.filter(c => c.subledgerName.toLowerCase().match(subledgerName.toLowerCase()));
      this.filteredSubledger=filterAg;
    }else{
    }
   }
  onSelect(model: any) {
    this.selectEvent.emit(model);
    this.cancel();
  }

  cancel(){
    this.modalService.dismissAll();

  }
}
