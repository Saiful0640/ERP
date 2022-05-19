import { Helper } from './../../../../shared/helper';
import { Component, OnInit, Input } from '@angular/core';
import { SalesPurchaseService } from '../../../../services/sales-purchase/sales-purchase.service';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../services/auth.service';
import { ApiResponse } from '../../../../models/api-response';
import { SettingService } from '../../../../services/settings/Setting.service';
import { Router } from '@angular/router';
import { PageAuthModel } from '../../../../models/settings/page-auth.model';
import { ReportModel } from '../../../../models/settings/app-settings/report-model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() lbl: string
  constructor(
    private services: SalesPurchaseService,
    private fb: FormBuilder,
    private toaster: ToastrService,
    private settingService: SettingService,
    private router: Router,
    // private reportService:ReportService
  ) { }

  btnStatus: string = "Save"
  companyId: number;
  products: any[] = [];
  productList: any[] = [];
  categories: any[] = []
  filteredProducts: any[] = [];
  filteredProductList: any[] = [];
  productForm: FormGroup;
  productUnitFormArray: FormArray;
  pageAuthInfo: PageAuthModel = new PageAuthModel();
  referenceproductList: any[] = [];
  isSaved: boolean = false;
  statuslist:any[]=['Active',"InActive"]
  //Report
  moduleId:number=25 ;
  pageId:number=77;
  reports:ReportModel[]=[];
  isSubmmited:boolean;
  isLoading:boolean;
  reportId:number;
  isExporting:boolean;
  companyType:number;
  exportType: string = 'pdf';
  thiskness:string;
  ngOnInit() {
    this.companyId = AuthService.CompanyId;
    this.companyType = AuthService.CompanyType;
    /* this.moduleId=AuthService.CurrentModuleId; */
     this.lbl = this.companyType != 2 ? "Color" : "Thickness";
    this.getAuthInfo();
    this.getCategories();
    this.createForm();
    this.getAllUnit();
    this.getProducts();
    this.getReferenceProducts();
    // this.getReportInfo();
    this.getProductList();
  }
  statuschange(statusss){
    if(statusss){
      this.productForm.patchValue({
        statusss:statusss


      });
  }
  }
  getProducts() {
    let partyId = 0;
    this.services.getProducts(this.companyId,0, partyId).subscribe((response: any) => {
      if (response.status) {
        this.products = response.result as any[];
        this.filteredProducts = response.result as any[];
      } else {
        this.products = [];
      }
    })
  }
  getReferenceProducts() {
    this.services.getReferenceMSPipes(this.companyId).subscribe((response: any) => {
      if (response.status) {
        this.referenceproductList = response.result as any[];
      } else {
        this.products = [];
      }
    }, (err: any) => {
      this.toaster.error(err.error, "Error")
    })
  }
  getCategories() {
    this.services.getAllCategoryForProduct(this.companyId).subscribe((response: any) => {
      if (response) {
        this.categories = response as any[];
      }
      else{
    this.categories=[];
      }
    })
  }
  getProductByCategory(category) {
    if (category===undefined) {
      this.filteredProducts=[];
      this.products = [];
      return;
    }
    else {
      // this.inventoryService.getProductByCategoryId(category.categoryId).subscribe((reasult: any) => {
      //   if (reasult) {
      //     this.filteredProducts = reasult.result as any[];
      //   }
      //   else {
      //     this.filteredProducts = [];
      //   }
      // }, (err: any) => {
      //   this.toaster.error(err.error, "Error")
      // });
    }
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
  onCheck(index, key, checked) {
    // this.productUnitFormArray.controls.forEach(group => {
    //   group.get(key).patchValue(false);
    // })
    if (checked) {
      this.productUnitFormArray.controls[index].get(key).patchValue(true);
    }
    else {
      this.productUnitFormArray.controls[index].get(key).patchValue(false);
    }

  }
  onSearch(searchKey: string) {
    if (searchKey) {
      this.filteredProducts = this.products.filter(product => (
        (product.name as string).toLocaleLowerCase().match(searchKey.toLocaleLowerCase()) ||
        (Helper.isNullOrEmpty(product.description) ? '' : product.description as string).toLocaleLowerCase().match(searchKey.toLocaleLowerCase())
      ))
    } else {
      this.filteredProducts = this.products;
    }
  }
  onSearchList(searchKey: string) {
    if (searchKey) {
      this.filteredProductList = this.productList.filter(product => (
        (product.Name as string).toLocaleLowerCase().match(searchKey.toLocaleLowerCase()) ||
        (Helper.isNullOrEmpty(product.Description) ? '' : product.Description as string).toLocaleLowerCase().match(searchKey.toLocaleLowerCase())
      ))
    } else {
      this.filteredProductList = this.productList;
    }
  }
  onSubmit() {


    if (this.productForm.invalid) {
      this.isSaved = false;
      this.toaster.error('Invalid Submission', 'Fill all required filed');
      return;
    }
    this.isSaved = true;
    var unitConv = this.productUnitFormArray.controls
      .filter(ctrl => (ctrl.get('isDefaultBillUnit').value == true || ctrl.get('isDefaultBillUnit').value == false || ctrl.get('isDefaultChallanUnit').value == true || ctrl.get('isDefaultChallanUnit').value == false))
      .map(unit => unit.value);
    /*  if(unitConv.some(unit=>Number(unit.factor)<=0) || Number(this.formVal.factor)<=0){
       return this.toaster.error('Unit factor should be greater than 0', 'Invalid Submission!');
     } */
    if (unitConv.some(unit => Number(unit.factor) < 0) || Number(this.formVal.factor) < 0) {
      return this.toaster.error('Unit factor should be greater than 0', 'Invalid Submission!');
    }
    if(this.productForm.value.statusss=="Active"){
      this.productForm.value.statusss=1
    }
    else if(this.productForm.value.statusss=="InActive"){
      this.productForm.value.statusss=0
    }
    else{
      this.productForm.value.statusss=1
    }
    var product = {
      ...this.productForm.value,
      productUnit: unitConv
    }
    this.services.saveProduct(product).subscribe((response: any) => {
      if (response.status) {
        var existIndex = this.products.findIndex(c => c.id == product.id);
        if (existIndex >= 0) {
          this.products[existIndex] = response.result;
        } else {
          this.products.push(response.result);
        }
        this.toaster.success('Saved', response.message);
        this.reset();
      } else {
        this.toaster.error('Failed', response.message);
        this.isSaved = false;
      }
    }, (err: any) => {
      this.toaster.error(err.error, 'Failed');
      this.isSaved = false;
    })
  }
  edit(productId) {
    this.services.getProduct(productId, this.companyId).subscribe((response: any) => {
      if (response.status) {
        this.resetUnitConvTable();
        this.productForm.patchValue(response.result);
        this.productForm.controls.pParentId.setValue(response.result.pParentID);
        (response.result.productUnit as any[]).forEach(unit => {
          this.productUnitFormArray.controls.find(u => u.value.unitId == unit.unitId).patchValue({
            isDefaultBillUnit: unit.isDefaultBillUnit,
            isDefaultChallanUnit: unit.isDefaultChallanUnit,
            factor: unit.factor
          })
        })
        this.btnStatus = "Update";
      }
    })

  }
  createForm() {
    this.productForm = this.fb.group({
      id: [],
      name: [null, [Validators.required]],
      description: [null],
      categoryId: [, [Validators.required]],
      unitId: [null, [Validators.required]],
      factor: [null, []],
      brandID: [],
      modelId: [],
      originId: [],
      colorId: [],
      costPrice: [],
      salePrice: [],
      reorderLevel: [],
      isActive: [1, []],
      compId: [this.companyId],
      productType: [0, []],
      pParentId: [, []],
      statusss:[1,[]]
    })
  }
  setVal(key, value) {
    if(value===undefined){
      return;
    }
    this.productForm.get(key).patchValue(value);
    this.productForm.get(key).markAsDirty();
  }
  hasError(key): boolean {
    const field = this.productForm.get(key)
    if (field.invalid && (field.dirty || field.touched) && field.errors) {
      return true;
    } else { return false }
  }
  reset() {
    this.isSaved = false;
    this.productUnitFormArray = this.fb.array([]);
    let categoryId=this.formVal.categoryId;
    this.createForm();
    this.getAllUnit();
    //this.getProducts();
    this.btnStatus = "Save";
    this.productForm.controls.categoryId.setValue(categoryId);
    if(categoryId==null){
      return
    }
    else{
      // this.inventoryService.getProductByCategoryId(categoryId).subscribe((reasult: any) => {
      //   if (reasult) {
      //     this.filteredProducts = reasult.result as any[];
      //   }
      //   else {
      //     this.filteredProducts = [];
      //   }
      // }, (err: any) => {
      //   this.toaster.error(err.error, "Error")
      // });
    }
  }
  get formVal() {
    return this.productForm.value;
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
  onChangeDefaultUnit(unit) {
    if (!unit) {

      this.setVal('unitId', null);
      this.setVal('factor', null);
      this.resetUnitConvTable();
      return
    }

    this.setVal('unitId', unit.unitId);
    this.setVal('factor', unit.unitFactor);
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
  getAuthInfo() {
    this.settingService.getPageAuthInfo(AuthService.UserId, AuthService.CurrentPageId)
      .subscribe((res: ApiResponse) => {
        if (res.status) {
          this.pageAuthInfo = res.result as PageAuthModel;
          if (!this.pageAuthInfo.isAssigned) {
            this.router.navigate(['forbidden']);
          }
        }
      });
  }

  getProductList() {
    this.services.getProductList(this.companyId).subscribe((response: any) => {
      if (response.status) {
        console.log('reslt',response.result);
        this.productList = response.result as any[];
        this.filteredProductList = response.result as any[];
      } else {
        this.productList = [];
      }
    })
  }

  //Report
  // getReportInfo() {
  //   this.reportService.getReports(AuthService.CompanyId, this.moduleId, this.pageId).subscribe((response) => {
  //         if (response.status) {
  //           this.reports = response.result as ReportModel[];

  //         }
  //       },
  //       (err) => {
  //         this.toaster.error(err.error,"Report Info not found");


  //       }
  //     );
  // }
  // onPrint() {
  //   this.isExporting = true;
  //       this.reportId = this.reports.length > 0 ? this.reports[0].reportId : null;
  //       this.reportService.getCommercialReportForRpt({
  //         ReportId: this.reportId,
  //        CategoryId:this.formVal.categoryId?this.formVal.categoryId:0,
  //         CompId: this.companyId,
  //         ExportType:this.exportType
  //       }).subscribe((file) => {
  //         this.isExporting = false;
  //         if (file) {
  //           this.reportService.openFileWindow(file)
  //         }
  //       }, (err: HttpErrorResponse) => {
  //         this.isExporting = false;
  //         this.toaster.error(err.error, 'An unexpected Error occured');
  //       })

  //   }
  //   onPrintCwBd() {
  // this.isExporting = true;
  //     this.reportId = this.reports.length > 0 ? this.reports[0].reportId : null;
  //     this.reportService.getCommercialReportForRpt({
  //       ReportId: 2315,
  //       //ReportId: this.reportId,
  //      CategoryId:this.formVal.categoryId?this.formVal.categoryId:0,
  //       CompId: this.companyId,
  //       ExportType:this.exportType
  //     }).subscribe((file) => {
  //       this.isExporting = false;
  //       if (file) {
  //         this.reportService.openFileWindow(file)
  //       }
  //     }, (err: HttpErrorResponse) => {
  //       this.isExporting = false;
  //       this.toaster.error(err.error, 'An unexpected Error occured');
  //     })

  // }
}
