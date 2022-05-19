import { AssignCriteriaModel } from './../../../models/assign-criteria.model';
import { AuthService } from './../../../services/auth.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BillPrepared } from '../../../models/bill-prepared.model';
import { CenterBillPreparedService } from '../../../services/center-bill-prepared.service';

@Component({
  selector: 'app-center-prepared-bill-list',
  templateUrl: './center-prepared-bill-list.component.html',
  styleUrls: ['./center-prepared-bill-list.component.scss']
})
export class CenterPreparedBillListComponent implements OnInit {
  @Input() periodId:number;
  @Input() type:number;
  @Output() selectEvent=new EventEmitter<any>();
  constructor(
    private billPreparedService:CenterBillPreparedService,
    private modalService:NgbModal
  ) { }
   compId:number;
   moduleId:number;
   preparedBills:any[]=[];
   filterPreparedBills:any[]=[];
  preparedBillSearch: BillPrepared = new BillPrepared();
  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.moduleId=AuthService.CurrentModuleId;
    if(this.periodId !=null){
    this.getCenterPreparedBillList();
     }
  }
  onSearchClick(memberName: string, searchModal: any) {
       this.preparedBillSearch.memberName = '';
    //this.fdbcSearchKeys.idenNo = null;
    this.modalService.open(searchModal, { windowClass: 'modal-width' });
  }

  getCenterPreparedBillList(){
    let cenBill=new AssignCriteriaModel();
    cenBill.compID=this.compId;
    cenBill.moduleID=this.moduleId;
    cenBill.periodID=this.periodId;
    cenBill.type=this.type;
    this.billPreparedService.getCenterBillPrepared(cenBill).subscribe((response:any)=>{
      if(response.status){
        console.log(response)
        this.preparedBills=response.result;
        this.filterPreparedBills=response.result;
      }else{
        this.preparedBills=[];
      }
    })
  }
  filterPreparedBillList(memberName: string) {
    if(memberName != null ){
      let filterAg = this.preparedBills.filter(c =>c.memberName.toLowerCase().match(memberName.toLowerCase()));
      this.filterPreparedBills=filterAg;
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
