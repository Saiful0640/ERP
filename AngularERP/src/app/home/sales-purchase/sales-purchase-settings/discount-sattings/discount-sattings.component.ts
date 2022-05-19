import { AuthService } from './../../../../services/auth.service';
import { FormGroup, FormBuilder, FormArray, FormControl, Validators } from '@angular/forms';
import { Toast, ToastrService } from 'ngx-toastr';
import { Component, EventEmitter, Input, OnInit, ViewChild } from '@angular/core';
import { SalesPurchaseDiscountService } from '../../../../services/sales-purchase-discount.service';
import { GroupAccountType, LowerGroupType } from '../../../../shared/lookup';
import { GroupAccountModel } from '../../../../models/accounting/basic-entry/group-account-model';
import { GroupAccountSelectListComponent } from '../../../../shared/components/group-account-select-list/group-account-select-list.component';
import { SalesPurchaseService } from '../../../../services/sales-purchase/sales-purchase.service';
import { Discount } from '../../../../models/sales-purchase/discount.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-discount-sattings',
  templateUrl: './discount-sattings.component.html',
  styleUrls: ['./discount-sattings.component.scss']
})
export class DiscountSattingsComponent implements OnInit {
  discountSettingForm: FormGroup;
  discountSettingArrayForm: FormArray
  products: any[] = [];
  compId: number;
  btnStatus: string = "Save"
  lowerGroupID: number = LowerGroupType.Customer;
  groupAccountID: number = GroupAccountType.Customer
  groupAccountmodel: GroupAccountModel[] = [];
  isSaved: boolean = false;
  companyType: number;
  isSubmitted = false;
  discountSearch: Discount = new Discount();
  discountSettingList: Discount[] = [];
  filterDiscountSettingList: Discount[] = [];
  selectEvent = new EventEmitter<Discount>();

  @ViewChild(GroupAccountSelectListComponent, { read: false }) hello: GroupAccountSelectListComponent;

  constructor(private discountService: SalesPurchaseDiscountService,
    private services: SalesPurchaseService,
    private toastrServie: ToastrService,
    private formBuilder: FormBuilder,
    private modalService: NgbModal
  ) {
    this.discountSettingArrayForm = this.formBuilder.array([]);
  }
  ngAfterViewInit() {
  }
  ngOnInit() {
    this.compId = AuthService.CompanyId;
    this.companyType = AuthService.CompanyType;

    this.createForm();
    /*  this.getDiscountSettingList(); */
  }
  onNewAccGroupAdd(item: any) {
    this.groupAccountmodel = item;
    this.ngAfterViewInit();
  }

  onSelectCategory(catInfo: any) {

    if (catInfo) {
      this.discountSettingForm.patchValue({
        categoryId: catInfo.categoryId
      })
      this.getProducts(catInfo.categoryId)
    }
    else {
      this.discountSettingForm.patchValue({
        categoryId: 0
      })
    }
  }
  getProducts(catagoryId: number) {

    this.services.getProductsForDisSettings(this.compId, catagoryId).subscribe((response: any) => {
      if (response.status) {
        (response.result as any[]).forEach(item => {
          item.name = item.name + (item.description ? (' - ' + item.description) : '');
        })

        this.products = response.result as any[];
        this.discountSettingArrayForm = this.formBuilder.array([]);
        this.products.forEach(c => {
          this.discountSettingArrayForm.push(
            new FormGroup({
              productId: new FormControl(c.productId, []),
              itemName: new FormControl(c.name, []),
              discountRate: new FormControl(c.discountRate, []),
              depDiscountRate: new FormControl(c.depDiscountRate, []),
              isChecked: new FormControl(1, []),
            })
          )
        })
      } else {
        this.products = [];
      }
    })
  }

  getProductsList() {
    let categoryId = this.f.categoryId.value
    let partyType = this.f.accountGroupTypeID.value

    this.services.getProductsForDisSettingsList(this.compId, partyType, categoryId).subscribe((response: any) => {
      if (response.status) {
        (response.result as any[]).forEach(item => {
          item.name = item.name + (item.description ? (' - ' + item.description) : '');
        })

        this.products = response.result as any[];

        this.discountSettingArrayForm = this.formBuilder.array([]);
        this.products.forEach(c => {
          this.discountSettingArrayForm.push(
            new FormGroup({
              productId: new FormControl(c.productId, []),
              itemName: new FormControl(c.name, []),
              discountRate: new FormControl(c.discountRate, []),
              depDiscountRate: new FormControl(c.depDiscountRate, []),
              isChecked: new FormControl(1, []),
              /* c.depDiscountRate */
            })
          )
        })
      } else {
        this.products = [];
      }
    })
  }
  onSelectAccountGroup(disTypeId) {
    if (disTypeId) {
      this.discountSettingForm.patchValue({
        accountGroupTypeID: disTypeId.id
      })

      this.getProductsList()
    }
    else {
      this.discountSettingForm.patchValue({
        accountGroupTypeID: 0
      })
    }
  }
  saveDiscount() {
    /* if(!this.discountSettingForm.value.accountGroupTypeID){
      this.toastrServie.warning("Please Select Discount Type","Select Type")
    } */
    /* else{ */
    this.isSubmitted = false;
    this.isSaved = true;
    this.isSubmitted = true;
    let discountSetting = new Discount();
    discountSetting = this.discountSettingForm.value;
    var filter = this.discountSettingArrayForm.value.filter(item => item.isChecked != null && item.isChecked != false);
    /* CONDITION CHILO SAVE E:&& item.discountRate>0 */
    discountSetting.discountSettingItems = filter;

    this.discountService.saveDiscountSetting(discountSetting).subscribe((respose: any) => {
      if (respose.status) {
        this.toastrServie.success(respose.result, "Saved Successed!");
        this.reset();
      } else {
        this.toastrServie.error(respose.error, "Failed to Save!");
        this.isSaved = false;
      }
    }, (err: any) => {
      this.toastrServie.error(err.error, "Failed!");
      this.isSaved = false;
    })
  }
  oncheckedall(isSelect: any) {
    if (isSelect) {
      this.discountSettingArrayForm.controls.forEach(c => c['controls'].isChecked.patchValue(isSelect))
    } else {
      this.discountSettingArrayForm.controls.forEach(c => c['controls'].isChecked.patchValue(isSelect))
    }
  }
  getOnSelectedChecked(productId: number, isSelect: any) {
    if (isSelect) {
      this.discountSettingArrayForm.controls.find(crt => crt.value.productId === productId)['controls']
        .isChecked.patchValue(isSelect);
    }
    else {
      this.discountSettingArrayForm.controls.find(crt => crt.value.productId === productId)['controls']
        .isChecked.patchValue(isSelect);
    }
  }
  newTemplate(event: any) {
    if (!this.discountSettingForm.value.accountGroupTypeID) {
      this.toastrServie.warning("Please Select Discount Type", "Select Type")
    }
    if (!this.discountSettingForm.value.categoryId) {
      this.toastrServie.warning("Please Select Product Category", "Select Product Category")
    }
    else {
      if (event != null) {
        this.modalService.open(event, { size: 'lg', windowClass: 'my-class' })
        this.getDiscountSettingList()
      }
    }
  }
  onDiscountTempSelect(discountInfo: any) {
    this.discountSettingForm.patchValue({
      id: discountInfo.id,
      categoryId: discountInfo.categoryId,
      accountGroupTypeID: discountInfo.accountGroupTypeID,
    })
    this.discountSettingArrayForm = this.formBuilder.array([]);
    this.discountSettingArrayForm.push(
      new FormGroup({
        productId: new FormControl(discountInfo.productId, []),
        itemName: new FormControl(discountInfo.itemName, []),
        discountRate: new FormControl(discountInfo.discountRate, []),
        depDiscountRate: new FormControl(discountInfo.depDiscountRate, []),
        isChecked: new FormControl(1, []),
      })
    )
  }
  reset() {
    this.isSaved = false;
    this.discountSettingForm.reset();
    this.discountSettingArrayForm = this.formBuilder.array([]);
    this.createForm();
    this.btnStatus = "Save";
  }
  createForm() {
    this.discountSettingForm = this.formBuilder.group({
      id: [0, []],
      categoryId: [, [Validators.required]],
      accountGroupTypeID: [, [Validators.required]],
      compId: [this.compId, []]
    })
  }
  addRow() {
    this.discountSettingArrayForm.push(
      new FormGroup({
        productId: new FormControl(null, []),
        itemName: new FormControl(null, []),
        discountRate: new FormControl(0, []),
        isChecked: new FormControl(1, []),
        depDiscountRate: new FormControl(0, [])
      })
    )
  }
  setVal(key, value) {
    this.discountSettingForm.get(key).patchValue(value);
    this.discountSettingForm.get(key).markAsDirty();
  }
  get formVal() {
    return this.discountSettingForm.value;
  }
  get f() {
    return this.discountSettingForm.controls;
  }
  //Modal Windoww
  getDiscountSettingList() {
    this.discountService.getAllDiscountForDIsSetting(this.discountSettingForm.value).subscribe((response: any) => {
      if (response.status) {
        this.discountSettingList = response.result as Discount[];
        this.filterDiscountSettingList = response.result as Discount[];
      } else {
        this.discountSettingList = [];
      }
    }, (err: any) => {
      this.toastrServie.error(err.error, "Failed!")
    })
  }
  filterCommercialBasicEntryList(itemName: string) {
    if (itemName != null) {
      let filterAg = this.discountSettingList.filter(c => c.itemName.toLowerCase().match(itemName.toLowerCase()));
      this.filterDiscountSettingList = filterAg;
    } else {
    }
  }
  onSelect(model: any) {
    this.selectEvent.emit(model);
    this.cancel();
  }


  /* onSelect(customer) {
     if (customer == null) {
       return;
     }
     else {
       if (customer) {
         this.selectEvent.emit(customer);
       } else {
         this.selectEvent.emit(new Discount());
       }
       this.modalService.dismissAll()
     }
   }
  */

  cancel() {
    this.modalService.dismissAll();

  }
}
