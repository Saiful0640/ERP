import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DuesMonitoring } from '../../../models/sales-purchase/dues-monitoring.model';
import { AuthService } from '../../../services/auth.service';
import { SalesPurchaseDiscountService } from '../../../services/sales-purchase-discount.service';
import { NgbDateCustomParserFormatter } from '../../dateformat';
import { DuesPayReceive } from '../../lookup';

@Component({
  selector: 'app-dues-payble-list',
  templateUrl: './dues-payble-list.component.html',
  styleUrls: ['./dues-payble-list.component.scss']
})
export class DuesPaybleListComponent implements OnInit {
  dues:any[]=[];
  duesModal:DuesMonitoring[]=[];
  @Input() duesId:number;
  @Input() type:string;
  @Output()selectEvent=new EventEmitter<DuesMonitoring>();
  compId:number;
  receivePay:number;
  constructor(
    private modalService:NgbModal,
    private discountservice:SalesPurchaseDiscountService,
    public dateFormat: NgbDateCustomParserFormatter
  ) { }

  ngOnInit() {
    this.receivePay=2;
   this.compId=AuthService.CompanyId;
    this.getAllPaybleDue();
  }
  cancel(){
    this.modalService.dismissAll();
  }
  onSelect(model:any){
    this.selectEvent.emit(model);
    this.cancel();
  }
  getAllPaybleDue(){
    this.discountservice.getAllPaybleDues(this.compId,this.receivePay).subscribe((res:DuesMonitoring[])=>{
      if(res)
      {
        this.duesModal=res as DuesMonitoring[];
      }
     })
  }
}
