import { ProductColorModel } from './../../../../models/sales-purchase/product-color-model';
import { ToastrService } from 'ngx-toastr';
import { SalesPurchaseService } from './../../../../services/sales-purchase/sales-purchase.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-product-color',
  templateUrl: './product-color.component.html',
  styleUrls: ['./product-color.component.scss']
})
export class ProductColorComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private productColorService: SalesPurchaseService,
    private toasterService: ToastrService
  ) { }
  productColorForm: FormGroup;
  productColorModel: ProductColorModel[] = [];
  comCode: number;
  btnStatus:string="Save";
  isSubmit:boolean=false;
  isSaved:boolean=false;
 title:string;
@Input() title1:string;
@Input() lbl:string;
@Input() lbl1:string;

  ngOnInit() {
    this.comCode = AuthService.CompanyId;
    this.title=this.comCode!=92?"Add new  Color":"Add Thickness";
    this.title1=this.comCode!=92?"Product Color":"Product Thickness";
    this.lbl=this.comCode!=92?"Color Name":"Thickness";
    this.lbl1=this.comCode!=92?"Name":"Thickness";
    this.getAllColor();
    this.createForm();
  }
  getAllColor() {
    this.productColorService.getAllColor(this.comCode).subscribe((response: ProductColorModel[]) => {
      if (response) {
        console.log(response);
        this.productColorModel = response as ProductColorModel[];
      }
      else {
        this.productColorModel = [];
      }
    })
  }
  saveColor() {
    this.isSubmit=true;
    if(this.productColorForm.invalid){
      this.toasterService.error("Please Fill the all required field","Invalid Submission");
      this.isSaved=false;
      return;
    }else{
      this.isSaved=true;
    let color = new ProductColorModel;
    color = this.productColorForm.value;
    if (this.f.isActive.value == true) {
      color.isActive = 1;
    } else {
      color.isActive = 0;
    }
    this.productColorService.saveColor(color).subscribe((response: any) => {
      if (response.status) {
        this.toasterService.success(response.message, "Success!");
        this.reset();
      }
      else {
        this.toasterService.error(response.message, "Failed!");
        this.isSaved=false;
      }
    },(err:any)=>{
      this.toasterService.error(err.error, "Failed!");
      this.isSaved=false;
     // this.reset();
    })
    }
  }
  edit(color){
    console.log(color);
    this.btnStatus="Update";
    this.productColorForm.patchValue(color);
  }
    reset(){
      this.isSaved=false;
      this.isSubmit=false;
      this.createForm();
      this.getAllColor();
      this.btnStatus="Save";
    }
  createForm() {
    this.productColorForm = this.formBuilder.group({
      id: [0, []],
      name: [, [Validators.required]],
      compId: [this.comCode, []],
      description: [null, []],
      sortOrder: [0, []],
      isActive: [1, []]
    })
  }
  get f() {
    return this.productColorForm.controls;
  }
}
