import { AuthService } from './../../../../services/auth.service';
import { BasicEntryService } from './../../../../services/hr/basicEntry.service';
import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgbDateCustomParserFormatter } from '../../../../shared/dateformat';
import { Pagination } from '../../../../shared/paginate';
import { HolydayCalender } from '../../../../models/hr/holiday.model';

@Component({
  selector: 'app-holiday-setup',
  templateUrl: './holiday-setup.component.html',
  styleUrls: ['./holiday-setup.component.scss']
})
export class HolidaySetupComponent extends Pagination implements OnInit  {
  holydayForm:FormGroup;
  holydayCalenderItem:HolydayCalender[]=[];
  comId:number;
  holydayEditForm:FormArray;
  isSubmitted = false;
  btnStatus=false;
  constructor(
    private formBuilder:FormBuilder,
    private basicServiceService:BasicEntryService,
    private toster:ToastrService,
    private dateFormatter:NgbDateCustomParserFormatter,
  ) {super();
    this.holydayEditForm = this.formBuilder.array([]);
  }
    title="Holyday Calender";
  ngOnInit() {
    this.items = [];
    this.update();
    this.comId=AuthService.CompanyId;
    this.createHolydayForm();
  }
  getAllHolidayList(){
    this.isSubmitted=true;
    if(this.holydayForm.invalid){
      this.toster.warning("Fill Required Fields");
      return;
    }else{
      let date=this.holydayForm.controls.hYear.value;
      let dateyymm = date.substring(0,6);
      console.log(dateyymm);

    this.basicServiceService.getHolydayList(dateyymm).subscribe((result:any)=>{
      if(result){
        this.btnStatus=true;
      this.items=result as HolydayCalender[];
       this.update();
       this.holydayEditForm = this.formBuilder.array([]);
       this.items.forEach(holydayParam=>{
         this.holydayEditForm.push(
           new FormGroup({
             hdate: new FormControl(date,[Validators.required]),
             note: new FormControl(holydayParam.note,[Validators.required])
           })
         )
       })
      }
      else{
        this.items=[];
        this.update();
      }
    });
    }

}
  saveHolyDay(){
    this.isSubmitted=true;
    if(this.holydayForm.invalid){
      this.toster.warning("Fill Required Fields");
      return;
    }else{
      let obj= new HolydayCalender();
      obj.calenderArray=this.holydayEditForm.value;
      console.log(obj);
      this.basicServiceService.saveHoliDay(obj).subscribe((result:any)=>{
      if(result){
        this.toster.success("Successfully");
        this.btnStatus=false;
        this.Reset();
      }
      else{
        this.toster.error(result,"Failed");

      }
    });
    }

  }
  createHolydayForm(){
    this.holydayForm=this.formBuilder.group({
      id:[0,[]],
      companyID:[this.comId,[]],
      hYear:[,[]],
      hYearNgb:[,[]]
    })
  }
  get f(){
    return this.holydayForm.controls;
  }

  Reset(){
    this.isSubmitted=false;
    this.createHolydayForm();
    this.holydayEditForm.controls=[];
    this.items=[];
    this.update();

  }
}
