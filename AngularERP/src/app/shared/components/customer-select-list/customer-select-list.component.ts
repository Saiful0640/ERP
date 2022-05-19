
import { FormGroup } from '@angular/forms';
import { CustomerLocation } from './../../../models/sales-purchase/customer-location.model';
import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { SalesPurchaseService } from '../../../services/sales-purchase/sales-purchase.service';
import { ToastrService } from 'ngx-toastr';
import { Customer } from '../../../models/sales-purchase/customer.model';
import { AuthService } from '../../../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LowerGroupType } from '../../lookup';
import { AccountingBasicEntryService } from '../../../services/accounting/accounting-basic-entry.service';
import { Helper } from '../../helper';
import { AccountChart } from '../../../models/accounting/basic-entry/bank/AccountChart';

@Component({
  selector: 'app-customer-select-list',
  templateUrl: './customer-select-list.component.html',
  styleUrls: ['./customer-select-list.component.scss']
})
export class CustomerSelectListComponent implements OnInit, OnChanges {
  @Input() modalName: any;
  @Input() CustomerType: number = 1;
  @Input() Classes: string = '';
  @Input() IsInvalid: boolean = true;
  @Input() isPlusIconHide: boolean = true;
  @Input() IsDisabled: boolean = false;
  @Input() customerId: number;
  @Output() onChange = new EventEmitter<Customer>();
  @Output() onSelectAddress = new EventEmitter<CustomerLocation>();
  @Input() elementId: string;
  compId: number;
  companyId: number;
  customers: Customer[] = [];
  filtered: any[] = [];
  newCustomerModel: AccountChart;
  accChartSearch: CustomerLocation = new CustomerLocation();
  accountChartBasicEntry: CustomerLocation[] = [];
  locations: CustomerLocation[] = [];
  filterlocations: any[] = [];
  locationForm: FormGroup;
  constructor(
    private salePurchaseService: SalesPurchaseService,
    private toaster: ToastrService,
    public modalService: NgbModal,
    private accChartService: AccountingBasicEntryService
  ) {
    this.resetNewCustomerModel();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.companyId = AuthService.CompanyId;
    for (const propName in changes) {
      if (changes.hasOwnProperty(propName)) {
        let change = changes[propName];
        switch (propName) {
          case 'CustomerType':
            this.getCustomer(change.currentValue)
        }
      }
    }
  }

  ngOnInit() {
    this.companyId = AuthService.CompanyId;
    this.getCustomer(this.CustomerType);
    this.compId = AuthService.CompanyId;
    /*  this.getAllLocation(); */
  }

  getCustomer(type) {

    this.salePurchaseService.getCustomer(this.companyId, type)
      .subscribe(response => {
        console.log("response",response)
        this.customers = response as Customer[];
        this.filtered = response as Customer[];
      }, err => {
        this.customers = [];
        this.toaster.error(err.message);
      })
  }


  onSelect(customer) {
   if (customer == null) {
      this.onChange.emit(null);
      return;
    }
    else {
      if (customer) {
        this.onChange.emit(customer);
      } else {
        this.onChange.emit(new Customer());
      }
      // this.modalService.dismissAll()
    }
  }
  createNewItem() {
    this.modalService.open(this.modalName)
  }
  onClickSearchBtn(template) {
    this.modalService.open(template, { size: 'lg' })
  }
  search(event) {
    if (event.key == 'ArrowUp' && this.filtered.length > 0) {
      this.onArrowUpKey();
      return;
    }
    if (event.key == 'ArrowDown' && this.filtered.length > 0) {
      this.onArrowDownKey();
      return;
    }
    if (event.shiftKey && event.key == 'S') {
      Helper.focusTextField('txtSearch');
      this.selectedRow = -1;
      return;
    }

    if (event.target.value && event.target.value != '') {
      this.filtered = this.customers.filter(cust =>
        this.isNull(cust.formattedName).toLowerCase().match(event.target.value.toLowerCase()) ||
        this.isNull(cust.billContactNo).toLowerCase().match(event.target.value.toLowerCase())
      )
      if (this.filtered.length == 0) {
        this.newCustomerModel.accountName = event.target.value;
      }
    } else {
      this.filtered = this.customers;
    }

  }
  isNull(value) {
    return value ? value : '';
  }
  onAddNewCustomer() {
    this.accChartService.saveAccChart(this.newCustomerModel)
      .subscribe((response: any) => {
        if (response.status && response.newAccChart) {
          var newCustomer = new Customer();
          newCustomer.accountId = response.newAccChart.accountId;
          newCustomer.accountName = response.newAccChart.accountName;
          newCustomer.aliasName = response.newAccChart.aliasName;
          newCustomer.formattedName = response.newAccChart.accountName + ((!response.newAccChart.aliasName || response.newAccChart.aliasName == 'null') ? '' : (' - ' + response.newAccChart.aliasName));
          newCustomer.deliveryAddress = response.newAccChart.address;
          newCustomer.billContactNo = response.newAccChart.mobileNo;
          this.customers.push(newCustomer);
          this.filtered.push(newCustomer);

          //this.onSelect(newCustomer)
          this.resetNewCustomerModel();
          this.toaster.success('New Customer added successfully!', 'Saved');
          this.getCustomer(this.CustomerType);
        } else {
          this.toaster.error('Failed to save new customer', 'Failed');
        }
      })
  }
  /* Show Location Address */

  addressSearchBtn(template) {
    this.modalService.open(template, { size: 'lg' })
  }

  selectLocation(location) {
    if (location) {
      this.onSelectAddress.emit(location);
    }
    else {
      this.onSelectAddress.emit(new CustomerLocation());
    }
    this.modalService.dismissAll();
  }
  getAllLocation() {
    this.salePurchaseService.getAllLocationChart(this.compId, this.customerId).subscribe((res: CustomerLocation[]) => {
      if (res) {
        this.locations = res as CustomerLocation[];
        this.filterlocations = res as CustomerLocation[];
      }
      else {
        this.filterlocations = [];
      }
    })
  }
  filterAccountChartBasicEntry(formattedName: string) {
    if (formattedName != null) {
      this.filterlocations = this.locations.filter(l => this.isNull
        (l.formatedName).toLowerCase().match(formattedName.toLowerCase()))
    }
    else {
      this.filterlocations = this.locations;
    }
  }
  get f() {
    return this.locationForm.controls;
  }
  cancel() {
    this.modalService.dismissAll();
  }

  selectedRow = -1;
  onArrowDownKey() {
    this.selectedRow = (this.selectedRow + 1) % this.filtered.length;
    Helper.focusTextField('btnSelectProduct' + this.selectedRow)
    document.getElementById('row' + this.selectedRow).classList.add('selected-row')
    if (this.selectedRow > 0) {
      document.getElementById('row' + (this.selectedRow - 1)).classList.remove('selected-row')
    } else {
      document.getElementById('row' + (this.filtered.length - 1)).classList.remove('selected-row')
    }
  }
  onArrowUpKey() {
    this.selectedRow = this.selectedRow > 0 ? this.selectedRow - 1 : this.filtered.length - 1;
    document.getElementById('row' + this.selectedRow).classList.add('selected-row')
    Helper.focusTextField('btnSelectProduct' + this.selectedRow)
    if (this.selectedRow >= this.filtered.length - 1) {
      document.getElementById('row' + 0).classList.remove('selected-row')
    } else {
      document.getElementById('row' + (this.selectedRow + 1)).classList.remove('selected-row')
    }
  }

  resetNewCustomerModel() {
    this.newCustomerModel = new AccountChart();
    this.newCustomerModel.lowerGroupId = LowerGroupType.Customer;
    this.newCustomerModel.openningBalance = 0;
    this.newCustomerModel.presentBalance = 0;
    // this.newCustomerModel.compId = AuthService.CompanyId;
    // this.newCustomerModel.branchId = AuthService.BranchId;
    // this.newCustomerModel.billByBill = '1';
    // this.newCustomerModel.isSubledger = 0;
    // this.newCustomerModel.isCostCenter = 0;
    // this.newCustomerModel.currencyRate = 1;
    // this.newCustomerModel.creditDays = 0;
    // this.newCustomerModel.creditLimit = 0;
    // this.newCustomerModel.isActive = 1;
    this.newCustomerModel.accountGroupId = 0;
    // this.newCustomerModel.createdBy = AuthService.UserId.toString();
    this.newCustomerModel.mobileNo = '';
  }
}



