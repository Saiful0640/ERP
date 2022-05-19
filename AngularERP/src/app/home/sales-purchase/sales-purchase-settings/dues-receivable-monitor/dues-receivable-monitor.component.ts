import { AuthService } from './../../../../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { SalesPurchaseDiscountService } from './../../../../services/sales-purchase-discount.service';
import { DuesPayReceive, DuesPayType } from './../../../../shared/lookup';

import { Component, Input, OnInit } from '@angular/core';
import { NgbDateCustomParserFormatter } from '../../../../shared/dateformat';

@Component({
  selector: 'app-dues-receivable-monitor',
  templateUrl: './dues-receivable-monitor.component.html',
  styleUrls: ['./dues-receivable-monitor.component.scss']
})
export class DuesReceivableMonitorComponent implements OnInit {
  duesForm:FormGroup;
  dues:any[]=[];
  compId:number;
  receivePay:number;
  constructor(
    ) { }
    @Input() duespayType:number=DuesPayType.DuesReceivableMonitorComponent
 /*  lblName:string="Receiavable"; */
 title:string="Dues Receivable Information"
  payReceive:number=DuesPayReceive.receivable;
  ngOnInit() {

  }




}
