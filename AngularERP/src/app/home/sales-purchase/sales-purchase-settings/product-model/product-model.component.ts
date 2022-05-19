import { ProductModel } from './../../../../models/sales-purchase/product-model';
import { ToastrService } from 'ngx-toastr';
import { SalesPurchaseService } from './../../../../services/sales-purchase/sales-purchase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-product-model',
  templateUrl: './product-model.component.html',
  styleUrls: ['./product-model.component.scss']
})
export class ProductModelComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private productModelService: SalesPurchaseService,
    private toasterService: ToastrService
  ) { }
  productModelForm: FormGroup;
  productModel: ProductModel[] = [];
  comCode: number;
  btnStatus:string="Save";
  isSubmit:boolean=false;
  isSaved:boolean=false;
  ngOnInit() {
    this.comCode = AuthService.CompanyId;
    this.createForm();
    this.getAllModel();

  }
  getAllModel() {
    this.productModelService.getAllProModel(this.comCode).subscribe((response: ProductModel[]) => {
      if (response) {
        this.productModel = response as ProductModel[];
      }
      else {
        this.productModel = [];
      }
    })
  }
  saveProModel() {
      this.isSubmit=true;
    if(this.productModelForm.invalid){
      this.toasterService.error("Please Fill the all required field","Invalid Submission");
      this.isSaved=false;
      return;
    }else{
      this.isSaved=true;
    let proModel = new ProductModel;
    proModel = this.productModelForm.value;
    if (this.f.isActive.value == true) {
      proModel.isActive = 1;
    } else {
      proModel.isActive = 0;
    }
    this.productModelService.saveProModel(proModel).subscribe((response: any) => {
      if (response.status) {
        this.toasterService.success(response.message, "Success!");
        this.reset();
      }
      else {
        this.toasterService.error(response.message, "Failed!");
        this.isSaved=false;
        //this.reset();
      }
    },(err:any)=>{
      this.toasterService.error(err.error, "Failed!");
      this.isSaved=false;
      //this.reset();
    })
  }
  }
  edit(productModel){
    this.btnStatus="Update";
    this.productModelForm.patchValue(productModel);
  }
  reset(){
    this.isSaved=false;
    this.isSubmit=false;
    this.createForm();
    this.getAllModel();
    this.btnStatus="Save";
  }
  createForm() {
    this.productModelForm = this.formBuilder.group({
      id: [0, []],
      name: [, [Validators.required]],
      compId: [this.comCode, []],
      description: [null, []],
      isActive: [1, []]
    })
  }
  get f() {
    return this.productModelForm.controls;
  }
}
