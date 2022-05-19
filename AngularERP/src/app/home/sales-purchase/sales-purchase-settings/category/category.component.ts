import { Helper } from './../../../../shared/helper';
import { CategoryModel } from './../../../../models/sales-purchase/category-model';
import { ToastrService } from 'ngx-toastr';
import { SalesPurchaseService } from './../../../../services/sales-purchase/sales-purchase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { ApiResponse } from '../../../../models/api-response';
import { PageAuthModel } from '../../../../models/settings/page-auth.model';
import { SettingService } from '../../../../services/settings/Setting.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private service: SalesPurchaseService,
    private toasterService: ToastrService,
    private settingService:SettingService,
    public router:Router
  ) { }
  categoryForm: FormGroup;
  compId: number;
  categories: CategoryModel[] = [];
  filteredcategories:CategoryModel[] = [];
  parentCategory: CategoryModel[] = [];
  productType: any[] = [];
  isSubmit:boolean=false;
  isSaved:boolean=false;
  btnStatus:string="Save";
  pageAuthInfo:PageAuthModel = new PageAuthModel();
  ngOnInit() {
    this.compId = AuthService.CompanyId;
    this.getAuthInfo();
    this.createForm();
    this.getAllCategory();
    this.service.getProductType().subscribe(res => { this.productType = res as any[] })
  }
  getAllCategory() {
    this.service.getAllCategory(this.compId).subscribe((response: CategoryModel[]) => {
      if (response) {
        this.parentCategory = [];
        this.categories = (response as CategoryModel[]).map(cat => {
          if (cat.isParent) {
            this.parentCategory.push(cat);
          }
          return cat;
        });
        this.filteredcategories=response as CategoryModel[];
      } else {
        this.categories = [];
      }
    })
  }
  onSearch(searchKey: string) {
    if (searchKey) {
      this.filteredcategories = this.categories.filter(category => (
        (category.categoryName as string).toLocaleLowerCase().match(searchKey.toLocaleLowerCase()) ||
        (Helper.isNullOrEmpty(category.categoryDescription) ? '' : category.categoryDescription as string).toLocaleLowerCase().match(searchKey.toLocaleLowerCase())
      ))
    } else {
      this.filteredcategories = this.categories;
    }
  }
  saveCategory() {
    this.isSubmit=true;
    if(this.categoryForm.invalid){
      this.isSaved=false;
      this.toasterService.error("Please fill the all required fields","Invalid submission");
      return;
    }else{
      this.isSaved=true;
    this.service.saveCategory(this.categoryForm.value).subscribe((response: any) => {
      if (response.status) {
        this.toasterService.success(response.message, "Success!")
        this.getAllCategory();
         this.reset();
      }
      else {
        this.toasterService.error(response.message, "Failed!");
        this.isSaved=false;
      }
    },(err:any)=>{
      this.toasterService.error(err.error,"Failed")
      this.isSaved=false;
    })
  }
  }
  edit(catId) {
    this.btnStatus="Update";
    let category = this.categories.find(c => c.categoryId == catId);
    this.categoryForm.patchValue(category)
  }

  createForm() {
    this.categoryForm = this.formBuilder.group({
      categoryId: [0, []],
      categoryName: [, [Validators.required]],
      categoryDescription: [, []],
      parentId: [ , []],
      companyId: [this.compId, []],
      isParent: [false, []],
      productType: [1, [Validators.required]]
    })
  }
  get f() {
    return this.categoryForm.controls;
  }
  reset() {
    this.isSubmit=false;
    this.isSaved=false;
    this.createForm();
    this.getAllCategory();
    this.btnStatus="Save";
  }

  getAuthInfo(){
    this.settingService.getPageAuthInfo(AuthService.UserId, AuthService.CurrentPageId)
    .subscribe((res:ApiResponse)=>{
      if(res.status){
        this.pageAuthInfo = res.result as PageAuthModel;
        if(!this.pageAuthInfo.isAssigned){
          this.router.navigate(['forbidden']);
        }
      }
    });
  }

}
