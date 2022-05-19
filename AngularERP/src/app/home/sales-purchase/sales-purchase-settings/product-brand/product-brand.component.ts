import { ProductBrandModel } from './../../../../models/sales-purchase/product-brand-model';
import { ToastrService } from 'ngx-toastr';
import { SalesPurchaseService } from './../../../../services/sales-purchase/sales-purchase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-product-brand',
  templateUrl: './product-brand.component.html',
  styleUrls: ['./product-brand.component.scss','./../../../../../vendor/libs/ngx-toastr/ngx-toastr.scss']
})
export class ProductBrandComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private brandService:SalesPurchaseService,
    private toasterService:ToastrService
  ) { }
    productBrandForm:FormGroup;
    productBrandModel:ProductBrandModel[]=[];
    comCode:number;
    isSubmit:boolean=false;
    isSaved:boolean=false;
    btnStatus:string="Save";
  ngOnInit() {
    this.comCode=AuthService.CompanyId;
    this.createForm();
    this.getAllBrand();
  }
  getAllBrand(){
    this.brandService.getAllBrand(this.comCode).subscribe((response:ProductBrandModel[])=>{
      if(response){
        this.productBrandModel=response as ProductBrandModel[];
      }else{
        this.productBrandModel=[];
      }

    })
  }
  saveBrand(){
    // let brand=new ProductBrandModel;
    this.isSubmit=true;
    if(this.productBrandForm.invalid){
      this.toasterService.error("Please Fill up All required Field","Invalid Submission");
      this.isSaved=false;
      return;
    }else{
      this.isSaved=true;
    let brand=new ProductBrandModel;
    brand=this.productBrandForm.value;
    if(this.f.isActive.value==true){
      brand.isActive=1;
    }else{
      brand.isActive=0;
    }
    this.brandService.saveBrand(brand).subscribe((response:any)=>{
      if(response.status){
        let index = this.productBrandModel.findIndex(p=>p.name===brand.name);
        if(index && index>=0){
          this.productBrandModel[index] = brand;
        }else{
          this.productBrandModel.push(brand);
        }
        this.toasterService.success(response.message ,"Success!");
        this.reset();
      }
      else{
        this.toasterService.error(response.message , "Failed!");
        this.isSaved=false;
        // this.reset();
      }
    },(err:any)=>{
      this.toasterService.error(err.error , "Failed!");
      this.isSaved=false;
      // this.reset();
    })
  }
  }
  reset(){
    this.isSaved=false;
    this.isSubmit=false;
    this.createForm();
    this.getAllBrand();
    this.btnStatus="Save";
  }
  edit(brand){
    this.btnStatus="Update";
    this.productBrandForm.patchValue(brand);
  }


  createForm(){
    this.productBrandForm=this.formBuilder.group({
      id:[0,[]],
      name:[,[Validators.required]],
      compId:[this.comCode,[]],
      description:[null,[]],
      sortOrder:[,[]],
      isActive:[1,[]]
    })
  }
get f(){
  return this.productBrandForm.controls;
}
}
