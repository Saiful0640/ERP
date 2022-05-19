import { Component, OnInit } from '@angular/core';
import { PartyType, TransType } from '../../../../shared/lookup';

@Component({
  selector: 'app-loan-and-advance',
  templateUrl: './loan-and-advance.component.html',
  styleUrls: ['./loan-and-advance.component.scss']
})
export class LoanAndAdvanceComponent implements OnInit {
  title:string = "Loan & Advance";
  partyId:number = PartyType.HRAndPayroll;
  transType:number = TransType.PaymentEntry;
  constructor() { }

  ngOnInit() {
  }

}
