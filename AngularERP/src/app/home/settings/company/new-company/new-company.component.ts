import { AccountChartService } from './../../../../services/accounting/AccountChartService';
import { NgbDateCustomParserFormatter } from './../../../../shared/dateformat';
import { ToastrService } from 'ngx-toastr';
import { Company } from './../../../../models/settings/company.model';
import { SettingService } from '../../../../services/settings/Setting.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  styleUrls: ['./new-company.component.scss', '../../../../../vendor/libs/ng-select/ng-select.scss']
})
export class NewCompanyComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private companyService: SettingService,
    private route: ActivatedRoute,
    private toasterService: ToastrService,
    private dateFormater: NgbDateCustomParserFormatter,
    private router:Router,
    private accountChartService: AccountChartService,
    private toastrService: ToastrService,

  ) { }
  companyForm: FormGroup
  companyModel:Company[]=[];
  isSubmit: boolean = false;
  btnStatus = 'Save';
  companyType:any[]=[];
  currencySign:string='';
  currencyList: any[] = [];
  clientId:number;
  ngOnInit() {
   // this.clientId=AuthService.ClientId;
    this.createForm();
    // this.getCompanyByID();
    // this.getCompanyType();
    this.getAllCompany();
     this.getAllCurrency();
  }
  onSelectCompanyId(id:number) {
    //let id = this.route.snapshot.params['compId']
    if (id != null) {
      this.companyService.getCompanyById(id).subscribe((response: any) => {
        if (response) {
          this.btnStatus = 'Update'
          this.companyForm.patchValue(response )
        }
      })
    }
    else {
      return;
    }
  }
  getCompanyType(){
    this.companyService.getCompanyType().subscribe((res:any)=>{
      if(res){

        this.companyType=res as any[];
       }else{
        this.companyType=[];
      }
    })
  }
  getAllCompany(){
    this.companyService.getAllCompany().subscribe((response:any)=>{
      if(response){
        this.companyModel=response as Company[];
      }else
      {
        this.companyModel=[];
      }
    })
  }
  onSubmit(){
    if(this.btnStatus=="Save"){
      this.save();
    }else{
      this.update();
    }
  }
  save() {
    // this.isSubmit = true;
    // if (this.companyForm.invalid) {
    //   this.toasterService.error("Please fill the all required fields", "Invalid submission");
    //   return;
    // };
     console.log(this.companyForm.value);
    this.companyService.saveCompany(this.companyForm.value).subscribe((response: any) => {
      if (response) {
        this.toasterService.success("Success!")
        this.reset();
       // this.router.navigate(['settings/assign/module'])
      } else {
        this.toasterService.error( "Failed!")
      }

    })
  }
  update() {
    // this.isSubmit = true;
    // if (this.companyForm.invalid) {
    //   this.toasterService.error("Please fill the all required fields", "Invalid submission");
    //   return;
    // };
     console.log(this.companyForm.value);
    this.companyService.updateCompany(this.companyForm.value).subscribe((response: any) => {
      if (response) {
        this.toasterService.success("Success!")
        this.reset();
        //this.router.navigate(['settings/assign/module'])
      } else {
        this.toasterService.error( "Failed!")
      }

    })
  }
  reset() {
    this.isSubmit = false;
    this.btnStatus = 'Save'
    this.createForm();
    this.getAllCompany();
    document.getElementById('pictureFileName').innerText = 'Choose file...'
  }
  getAllCurrency() {
    this.accountChartService.getAllCurrencies().subscribe((response: any) => {
      if (response) {
        console.log(response)
        this.currencyList = response;
       // this.currencySign=this.currencyList.find(c=>c.idenNo==1).currencySign;
        console.log(response)
      } else {
        this.currencyList = [];
      }
    },(err:any)=>{
      this.toastrService.error(err.error,"Error!")
    })
  }
  createForm() {
    this.companyForm = this.formBuilder.group({
      id: [, []],
      name: [, [Validators.required]],
      description: [, []],
      tin: [, []],
      phone: [, []],
      email: [, [Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],

      address: [, []],
      logo: [, []],
      isActive: [1, []],
      currencyType: [, []],

    })
  }
  onChangeCurrencySign(curency)
  {
    if(curency){
      this.companyForm.patchValue({
        currencyType:curency.id
      });
      this.currencySign=curency.currencySign;
    }else{
      this.currencySign='';
    }

  }
  get f() {
    return this.companyForm.controls;
  }
  get formVal() {
    return this.companyForm.value;
  }
}
