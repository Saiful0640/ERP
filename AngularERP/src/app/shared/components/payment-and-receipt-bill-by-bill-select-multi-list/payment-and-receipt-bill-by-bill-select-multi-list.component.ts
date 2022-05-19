import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';
import { TransBillByBillModel } from '../../../models/accounting/transaction/trans-bill-by-bill-model';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-payment-and-receipt-bill-by-bill-select-multi-list',
  template:`
  <ng-select
  [(ngModel)]="invoiceID"
  name="invoiceID"
  [multiple]="true" [closeOnSelect]="true"
  (change)="onSelect($event)"
  [items]="billBybillAmount"
  [hideSelected]="true"
  bindLabel="formatInvoiceNo"
  bindValue="voucherNo"
  placeholder="Select Invoice No">
  </ng-select>
  `,
  styleUrls: []
})
export class PaymentAndReceiptBillByBillSelectMultiListComponent implements OnInit {
  @Input() invoiceID = [];
  // @Input() partyType:number;
  @Output() onChange = new EventEmitter<TransBillByBillModel[]>();
  @Input()  billBybillAmount:any;
  // @Input()  billBybillAmount: TransBillByBillModel[] = [];
  headGroupOptions: IMultiSelectOption[] = [];
  compId:number;
  constructor(
  //  private receiptAndPaymentService: ReceiptAndPaymentService
  ) { }

  ngOnInit() {
    this.compId=AuthService.CompanyId;
    // this.getTotalPartyIdAmount();
    this.headGroupOptions = [];
  }

  onSelect(billInfo: any) {
    if (billInfo == null) {
      this.onChange.emit();
      return;
    }
    this.onChange.emit(billInfo);
  }

}
