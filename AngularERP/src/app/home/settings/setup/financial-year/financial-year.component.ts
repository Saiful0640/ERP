import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Financialyear } from '../../../../models/settings/financialyear.modal';
import { AuthService } from '../../../../services/auth.service';
import { SettingService } from '../../../../services/settings/Setting.service';
import { NgbDateCustomParserFormatter } from '../../../../shared/dateformat';

@Component({
  selector: 'app-financial-year',
  templateUrl: './financial-year.component.html',
  styleUrls: ['./financial-year.component.scss']
})
export class FinancialYearComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private financialService:SettingService,
    private toastr:ToastrService,
    public dateFormate:NgbDateCustomParserFormatter
  ) { }
  financialForm:FormGroup;
  comId:number;
  financialModal:Financialyear[]=[];
  btnStatus="Save";
  isSubmit:boolean=false;

  ngOnInit() {
    this.comId=AuthService.CompanyId;
    this.createForm();
    this.getAllFinancialYear();
  }
  getAllFinancialYear(){
    this.financialService.getAllFinancialYear().subscribe((response:any)=>{
      if(response){
        this.financialModal=response as Financialyear[];
      }else{
        this.financialModal=[];
      }
    })
  }
  getYearByID(id:number){
    let oyear=new Financialyear();
    oyear=this.financialModal.find(f=>f.id==id);
    // this.financialForm.patchValue(oyear);
    this.financialForm.patchValue({
      id:oyear.id,
      sfYear:oyear.sfYear,     
      efYear:oyear.efYear,
      yearName:oyear.yearName,
      compID:this.comId,
      startDateNgb:this.dateFormate.getYyyymmddToNgbDate(oyear.sfYear),
      endDateNgb:this.dateFormate.getYyyymmddToNgbDate(oyear.efYear)
    })
    console.log(this.financialForm.value)
    this.btnStatus="Update"
  }
  onSubmit(){
    if(this.btnStatus=="Save"){
      this.saveFinancialYear();
    }else{
      this.updateFinancialYear();
    }
  }
  saveFinancialYear(){
    this.isSubmit=true;
    // if(this.financialForm.invalid){
    //   this.toastr.error("Please fill the all required fields","Invalid submission");
    //   return;
    // }else{
      let financialyear=new Financialyear();
      financialyear=this.financialForm.value;
      this.financialService.saveFinancialYear(financialyear).subscribe((res:any)=>{
        if(res){
          this.toastr.success("Financial Year Saved","Success!")         
          this.reset();
        }else{
          this.toastr.error("Financial Year Saved","Failed!")
        }
      },(err:any)=>{
        this.toastr.error(err.error,"Failed");
        this.isSubmit=false;
      }
      )

    // }
  }
  updateFinancialYear(){
    let financialyear=new Financialyear();
      financialyear=this.financialForm.value;
      this.financialService.updateFinancialYear(financialyear).subscribe((res:any)=>{
        if(res){
          this.toastr.success("Financial Year Updated","Success!")         
          this.reset();
        }else{
          this.toastr.error("Financial Year Update","Failed!")
        }
      },(err:any)=>{
        this.toastr.error(err.error,"Failed");
        this.isSubmit=false;
      }
      )
  }
  reset(){
    this.isSubmit=false;
    this.financialForm.reset();
    this.createForm();
    this.f['sfYear'].setValue((new Date).toLocaleDateString());
   this.f['startDateNgb'].setValue(this.dateFormate.getCurrentNgbDate())
   this.f['efYear'].setValue((new Date).toLocaleDateString());
   this.f['endDateNgb'].setValue(this.dateFormate.getCurrentNgbDate())
    this.btnStatus="Save";
    this.getAllFinancialYear();
  }
  createForm(){
    this.financialForm=this.formBuilder.group({
      id:[0,[]],
      sfYear:[,[Validators.required]],
      startDateNgb:[,[]],
      efYear:[,[Validators.required]],
      endDateNgb:[,[]],
      yearName:[,[Validators.required]],
      compId:[this.comId,[]]
    })
  }
  get f(){
    return this.financialForm.controls;
  }

}
