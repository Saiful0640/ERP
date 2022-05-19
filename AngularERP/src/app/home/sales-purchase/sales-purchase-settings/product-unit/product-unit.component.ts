import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SalesPurchaseService } from '../../../../services/sales-purchase/sales-purchase.service';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../../../services/auth.service';
import { SettingService } from '../../../../services/settings/Setting.service';
import { Router } from '@angular/router';
import { PageAuthModel } from '../../../../models/settings/page-auth.model';
import { ApiResponse } from '../../../../models/api-response';

@Component({
  selector: 'app-product-unit',
  templateUrl: './product-unit.component.html',
  styleUrls: ['./product-unit.component.scss']
})
export class ProductUnitComponent implements OnInit {
  companyId;
  unitForm: FormGroup;
  allUnit;
  btnStatus:string="Save";
  isSubmit:boolean=false;
  isSaved:boolean=false;
  pageAuthInfo:PageAuthModel = new PageAuthModel()
  constructor(
    private fb: FormBuilder,
    private salePurchaseService: SalesPurchaseService,
    private toaster:ToastrService,
    private settingService:SettingService,
    private router:Router,
  ) { }
  ngOnInit() {
    this.companyId = AuthService.CompanyId;
    this.getAuthInfo();
    this.createForm();
    this.getAllUnit();
  }
  getAllUnit() {
    this.salePurchaseService.getAllProUnit(this.companyId).subscribe((res: any) => {
      this.allUnit = res;
    })
  }
  saveUnit() {
    this.isSubmit=true;
    if(this.unitForm.invalid){
      this.toaster.error("Please fill the all required fields","Invalid submission");
      this.isSaved=false;
      return;
    }else{
      this.isSaved=true;
    this.salePurchaseService.saveProUnit(this.unitForm.value)
      .subscribe((res: any) => {
        if (res.status) {
          this.toaster.success(res.message);
          this.reset();
        }
      },(err:any)=>{
        this.toaster.error(err.error,"Failed");
        this.isSaved=false;
      })
    }
  }
  edit(unit) {
    this.btnStatus="Update";
    this.unitForm.patchValue(unit)
  }
  createForm() {
    this.unitForm = this.fb.group({
      unitId: [, [Validators.required]],
      unitName: [, [Validators.required]],
      unitDescription: [, []],
      isBox: [1, []],
      isActive: [1, []],
      compId: [this.companyId, []],
      sortOrder: [0, []],
      priorityName:[,[]],
      priorityid:[0,[]]
    })
  }
  reset(){
    this.isSaved=false;
    this.isSubmit=false;
    this.createForm();
    this.getAllUnit();
    this.btnStatus="Save";
  }
  get f(){
    return this.unitForm.controls;
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
