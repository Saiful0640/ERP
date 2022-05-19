import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Customer } from '../../../models/sales-purchase/customer.model';
import { SalesPurchaseService } from '../../../services/sales-purchase/sales-purchase.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sales-person-select-list',
  template: `
  <ng-select
  [(ngModel)]="salesPersonId"
  [items]="salesPerson"
  bindLabel = "name"
  bindValue="empCode"
  (change)="onSelect($event)"
  [disabled]="disabled"
  placeholder = "Select Employee"
  #field="ngModel"
  [ngClass]="{'is-invalid':IsInvalid && compType==1 && (field.touched || field.dirty)}"
  [ngStyle]="{'width':width}"
  [id]="tabIndexId"></ng-select>

`,
styleUrls: []
})
export class SalesPersonSelectListComponent implements OnInit {

  @Input() Classes: string = '';
  @Input() IsInvalid: boolean = true;
  @Input() salesPersonId: number;
  @Input() disabled:boolean = false;
  @Input() width:string = '250px';
  @Input() tabIndexId:string;
  @Output() onChange = new EventEmitter<any>()

  companyId: number;
  compType:number;
  salesPerson: any[] = [];
  constructor(
    private salePurchaseService: SalesPurchaseService,
    private toaster: ToastrService
  ) { }

  ngOnInit() {
    this.companyId = AuthService.CompanyId;
    this.compType=AuthService.CompanyType;
    this.getSalesPerson();
  }

  getSalesPerson() {
    this.salePurchaseService.getSalesPerson(this.companyId)
      .subscribe(response => {
        this.salesPerson = response as any[];
      }, err => {
        this.toaster.error(err.message);
      })
  }

  onSelect(person) {
    if (person) {
      this.onChange.emit(person);
    } else {
      this.onChange.emit({empCode:null, name:null});
    }
  }

}
