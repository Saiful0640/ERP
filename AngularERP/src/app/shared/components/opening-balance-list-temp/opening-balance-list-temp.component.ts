import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../services/auth.service';
import { CenterBillPreparedService } from '../../../services/center-bill-prepared.service';

@Component({
  selector: 'app-opening-balance-list-temp',
  templateUrl: './opening-balance-list-temp.component.html',
  styleUrls: ['./opening-balance-list-temp.component.scss']
})
export class OpeningBalanceListTempComponent implements OnInit {
  @Input() periodId:number;
  @Output() selectEvent=new EventEmitter<any>();
  constructor(
    private billPreparedService:CenterBillPreparedService,
    private modalService:NgbModal
  ) { }
  compId:number;
  moduleId:number;
  openingBalances:any[]=[];
  filteropeningBalances:any[]=[];
  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.moduleId=AuthService.CurrentModuleId;
    if(this.periodId !=null){
    this.getOpeningBalancelList();
     }
  }
  getOpeningBalancelList(){
    this.billPreparedService.getOpeningBalance(this.compId,this.moduleId,this.periodId).subscribe((response:any)=>{
      if(response.status){
        this.openingBalances=response.result;
        this.filteropeningBalances=response.result;
      }else{
        this.openingBalances=[];
      }
    })
  }
  filteropeningBalanceList(memberName: string) {
    if(memberName != null ){
      let filterAg = this.openingBalances.filter(c =>c.memberName.toLowerCase().match(memberName.toLowerCase()));
      this.filteropeningBalances=filterAg;
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
