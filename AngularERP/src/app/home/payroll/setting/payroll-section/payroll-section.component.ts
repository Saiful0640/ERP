import { Component,EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-payroll-section',
  templateUrl: './payroll-section.component.html',
  styleUrls: ['./payroll-section.component.scss'] 
})
export class PayrollSectionComponent implements OnInit {
  @Output() getItems = new EventEmitter<any[]>();

  constructor() { }

  ngOnInit() {
  }

}
