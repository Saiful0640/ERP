import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './../../../../services/auth.service';
import { AccountingBasicEntryService } from './../../../../services/accounting/accounting-basic-entry.service';
import { ToastrService } from 'ngx-toastr';
import { SalesPurchaseService } from './../../../../services/sales-purchase/sales-purchase.service';
import { CustomerLocation } from './../../../../models/sales-purchase/customer-location.model';
import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Console } from 'console';
import { Customer } from '../../../../models/sales-purchase/customer.model';

@Component({
  selector: 'app-customer-delivery-location',
  templateUrl: './customer-delivery-location.component.html',
  styleUrls: ['./customer-delivery-location.component.scss']
})
export class CustomerDeliveryLocationComponent implements OnInit {
  /* lowerGroupId:number=3; */
  compId: number;
  /*  accountID:number; */
  accountChartBasicEntry: any[] = [];
  constructor(private formBuilder: FormBuilder,
    private service: SalesPurchaseService,
    private toaster: ToastrService,
    private modalService: NgbModal) { }
  locationForm: FormGroup;
  locations: CustomerLocation[] = [];
  btnStatus: string = "Save";
  isSubmitted: boolean = false;
  isSave: boolean = false;
  customers: Customer[] = [];
  customerType: number = 1;

  ngOnInit() {
    this.compId = AuthService.CompanyId;
    this.createForm();
    this.locationForm.value
    this.getCustomer(this.customerType)
    this.getAllLocationList(0);

  }

  getCustomer(type) {

    this.service.getCustomer(this.compId, type)
      .subscribe(response => {
        this.customers = response as Customer[];

        /* this.filtered = response as Customer[]; */
      }, err => {
        this.customers = [];
        this.toaster.error(err.message);
      })
  }

  getAllLocation() {

    this.service.getAllLocationChart(this.compId, this.f.accountId.value).subscribe((res: CustomerLocation[]) => {
      if (res) {
        this.locations = res as CustomerLocation[];
      }
      else {
        this.locations = [];
      }
    })
  }

  getAllLocationList(accountId: number) {

    this.service.getAllLocationChart(this.compId, accountId).subscribe((res: CustomerLocation[]) => {
      if (res) {
        this.locations = res as CustomerLocation[];

      } else {
        this.locations = [];
      }
    })
  }
  onSelectCustomer(list) {
    if (list != null) {
      this.locationForm.patchValue({
        accountId: list.accountId
      })
      this.getAllLocation();

    } else {
      this.locationForm.patchValue({
        accountId: 0
      })
      /* this.getAllLocationList(0); */
      this.getAllLocation();
    }
  }
  saveLocation() {
    this.isSubmitted = true;
    if (this.locationForm.invalid) {
      this.toaster.error("Please fill the all required fields", "Invalid submission");
      this.isSave = false;
      return;
    } else {
      this.isSave = true;
      this.service.saveLocation(this.locationForm.value).subscribe((res: any) => {
        if (res.status) {
          this.toaster.success(res.message);
          this.reset();
        }
        else {
          this.toaster.error(res.message, "Failed!");
          this.isSave = false;
        }
      }, (err: any) => {
        this.toaster.error(err.error, "Error!!");
        this.isSave = false;
      })
    }
  }
  // saveLocation(isDismis){
  //   if(isDismis){this.isSave=false;}else{
  //     this.isSave=true;
  //      this.service.saveLocation(this.locationForm.value).subscribe((res:any)=>{
  //     if(res.status)
  //    {
  //    this.btnStatus='Save'
  //   this.getAllLocation(this.f.accountId.value);
  //    this.modalService.dismissAll();
  //   this.toaster.success(res.message)
  //    this.reset();
  //    }
  //    else{
  //   this.toaster.error(res.message,"Failed!");
  //   this.modalService.dismissAll();
  //   this.isSave=false;
  //    }
  //    this.modalService.dismissAll();
  //    this.isSave=false;
  //   })}
  //   }
  edit(locId: any) {
    this.btnStatus = "Update"
    let loc = this.locations.find(l => l.locationID == locId)
    this.locationForm.patchValue(loc);
  }
  createForm() {
    this.locationForm = this.formBuilder.group
      ({
        locationID: [0, []],
        location: ['', [Validators.required]],
        customerAddress: ['', [Validators.required]],
        compId: [this.compId, []],
        accountId: [, [Validators.required]],
        formatedName: ['', []],
        mobileNo: [, []]
      })
  }
  confirmSave(event: any) {
    this.isSubmitted = true;
    if (this.f['formatedName'].invalid && this.f['location'].invalid) {
      this.modalService.dismissAll();
      this.isSave = false;
      this.toaster.error("Please fill the all required fields", "Invalid submission");
      return;
    } else {
      this.isSave = true;
      this.modalService.open(event)
    }
  }
  get f() {
    return this.locationForm.controls;
  }
  reset() {
    this.isSave = false;
    this.btnStatus = "Save";
    this.isSubmitted = false;

    this.locationForm.reset();
    this.createForm();
    this.getAllLocationList(0);
  }
  newTemplate(event: any) {
    this.modalService.open(event, { size: 'lg', windowClass: 'modal-xl' })
  }
}
