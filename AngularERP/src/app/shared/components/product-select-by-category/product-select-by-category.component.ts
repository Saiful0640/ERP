import { Component, NgModule, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../services/auth.service';
import { SalesPurchaseService } from '../../../services/sales-purchase/sales-purchase.service';
import { SettingService } from '../../../services/settings/Setting.service';
import { Helper } from '../../helper';

@Component({
  selector: 'app-product-select-by-category',
  templateUrl: './product-select-by-category.component.html',
  styleUrls: ['./product-select-by-category.component.scss']
})
export class ProductSelectByCategoryComponent implements OnInit {

  @Input() productId: number;
  @Input() categoryId: number;
  @Input() categoryProduction: number;
  @Input() thickness: number = 0;
  @Input() IsDisabled: boolean = false;
  @Input() productTabId: string;
  @Input() productSearchBtnId: string;
  @Output() onChange = new EventEmitter<any>()
  @Input() products: any[] = [];
  @Input() showSearchBtn: boolean = true;
  @Input() width: string = '350px';
  pageId:number;
  filtered: any[] = [];
  companyId: number;
  priceRange = [1, 5000];
  productUnitFormArray: FormArray;
  isNewProductAdded: boolean = false;
  productModel = {
    id: null,
    categoryId: null,
    name: null,
    unitId: null,
    factor: null,
    costPrice: null,
    salePrice: null,
    productUnit: [],
    productType: 0,
    compId: AuthService.CompanyId
  }
  constructor(
    private services: SalesPurchaseService,
    private Settingservices: SettingService,
    public modalService: NgbModal,
    private fb: FormBuilder,
    private toaster: ToastrService
  ) { }

  ngOnInit() {
    this.companyId = AuthService.CompanyId;
    this.getProducts();
    this.productUnitFormArray = this.fb.array([]);
    this.getAllUnit();
    this.pageId=AuthService.CurrentPageId;
  }

  onSelect(product: any) {
    if (product == null) {
      this.onChange.emit({ productId: null, name: null });
      return;
    }
    this.onChange.emit(product);
    this.modalService.dismissAll();
  }
  getProducts() {
    this.Settingservices.getProductForFoamProduction(this.categoryId, this.companyId, this.categoryProduction, this.thickness).subscribe((response: any) => {
      if (response.status) {
        (response.result as any[]).forEach(item => {
          item.name = item.name + (item.description ? (' - ' + item.description) : '');
        })
        this.products = response.result as any[];
        this.filtered = response.result as any[];
        console.log("get",this.products)
         } else {
        this.products = [];
      }
    })
  }
  eventTracker: NodeJS.Timer;
  search(event) {
    //Stop auto scroll
    if (event.shiftKey && (event.key == 'ArrowDown' || event.key == 'ArrowUp') && event.altKey) {
      if (this.eventTracker) {
        clearInterval(this.eventTracker);
        this.eventTracker = null;
      }
      return;
    }
    //Start auto scroll to down
    if (event.shiftKey && event.key == 'ArrowDown' && this.filtered.length > 0 && !this.eventTracker) {
      this.eventTracker = setInterval(() => {
        this.onArrowDownKey();
      }, 100);
      return;
    }
    //Start auto scroll to up
    if (event.shiftKey && event.key == 'ArrowUp' && this.filtered.length > 0 && !this.eventTracker) {
      this.eventTracker = setInterval(() => {
        this.onArrowUpKey();
      }, 100);
      return;
    }
    //Select Up
    if (!event.shiftKey && event.key == 'ArrowUp' && this.filtered.length > 0) {
      this.onArrowUpKey();
      return;
    }
    //Select Down
    if (!event.shiftKey && event.key == 'ArrowDown' && this.filtered.length > 0) {
      this.onArrowDownKey();
      return;
    }
    //Focus Search field
    if (event.shiftKey && event.key == 'S') {
      if (this.eventTracker) {
        clearInterval(this.eventTracker);
      }
      Helper.focusTextField('txtSearch');
      this.selectedRow = -1;
      return;
    }
    //Search
    if (event.target.value && event.target.value != '') {
      this.filtered = this.products.filter(p =>
        p.name.toLowerCase().match(event.target.value.toLowerCase())
      )
      if (this.filtered.length == 0) {
        this.productModel.name = event.target.value;
      }
    } else {
      this.filtered = this.products;
    }
  }

  openSearchModal(template) {
    //this.modalService.open(template);
    this.modalService.open(template, { size: 'lg', windowClass: 'modal-xl' });
  }

  getAllUnit() {
    this.productUnitFormArray = this.fb.array([]);
    this.services.getAllProUnit(this.companyId).subscribe((data: any[]) => {
      data.forEach(unit => {
        this.productUnitFormArray.push(new FormGroup({
          id: new FormControl(null),
          productId: new FormControl(null),
          unitId: new FormControl(unit.unitId),
          unitName: new FormControl(unit.unitName),
          factor: new FormControl(unit.unitFactor),
          isDefaultBillUnit: new FormControl(false),
          isDefaultChallanUnit: new FormControl(false),
          compId: new FormControl(this.companyId)
        }))
      })
    })
  }
  onChangeDefaultUnit(unit) {
    if (!unit) {
      this.productModel.unitId = null;
      this.productModel.factor = null;
      this.resetUnitConvTable();
      return
    }
    this.productModel.unitId = unit.unitId;
    this.productModel.factor = unit.unitFactor;
    if (unit && unit.unitId) {
      this.productUnitFormArray.controls.find(u => u.value.unitId == unit.unitId).patchValue({
        isDefaultBillUnit: true,
        isDefaultChallanUnit: true,
        factor: unit.unitFactor
      })
      this.productUnitFormArray.controls.filter(u => u.value.unitId != unit.unitId).forEach(group => {
        group.patchValue({
          isDefaultBillUnit: false,
          isDefaultChallanUnit: false,
          factor: null
        })
      })
    } else {
      this.resetUnitConvTable();
    }
  }
  resetUnitConvTable() {
    this.productUnitFormArray.controls.forEach(group => {
      group.patchValue({
        isDefaultBillUnit: false,
        isDefaultChallanUnit: false,
        factor: null
      })
    })
  }
  onCheck(index, key) {
    this.productUnitFormArray.controls.forEach(group => {
      group.get(key).patchValue(false);
    })
    this.productUnitFormArray.controls[index].get(key).patchValue(true);
  }
  onSubmit() {
    if (!(this.productModel.categoryId && this.productModel.name && this.productModel.unitId)) {
      this.toaster.error('Invalid Submission', 'Fill all required filed');
      return;
    }
    var unitConv = this.productUnitFormArray.controls
      .filter(ctrl => (ctrl.get('isDefaultBillUnit').value || ctrl.get('isDefaultChallanUnit').value))
      .map(unit => unit.value);
    if (unitConv.some(unit => Number(unit.factor) <= 0) || Number(this.productModel.factor) <= 0) {
      return this.toaster.error('Unit factor should be greater than 0', 'Invalid Submission!');
    }
    this.productModel.productUnit = unitConv;
    this.services.saveProduct(this.productModel).subscribe((response: any) => {
      if (response.status) {
        this.toaster.success('Saved', response.message);
        Helper.focusTextField('txtSearch');
      } else {
        this.toaster.error('Failed', response.message);
      }
    })
  }
  reset() {
    this.productModel = {
      id: null,
      categoryId: null,
      name: null,
      unitId: null,
      factor: null,
      costPrice: null,
      salePrice: null,
      productUnit: [],
      compId: AuthService.CompanyId,
      productType: 0
    }
  }

  selectedRow: number = -1;

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

  closeModal() {
    if (this.eventTracker) {
      clearInterval(this.eventTracker);
      this.eventTracker = null;
    }
    this.modalService.dismissAll();
  }
}
