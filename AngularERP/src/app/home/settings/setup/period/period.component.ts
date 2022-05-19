
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { PeriodModel } from '../../../../models/hr/period.model';
import { MonthModel } from '../../../../models/settings/month.model';
import { YearModel } from '../../../../models/settings/year/year.model';
import { AuthService } from '../../../../services/auth.service';
import { SettingService } from '../../../../services/settings/Setting.service';
import { NgbDateCustomParserFormatter } from '../../../../shared/dateformat';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.scss']
})
export class PeriodComponent implements OnInit {
  isSubmitted = false;
  btnStatus:string='Save';
  @Input() moduleID:number;
  periodForm:FormGroup;
  compId:number;
  userId:number;
  month:MonthModel;
  year:YearModel;
  periodItem:any[]=[]
  months:any[]=[ {id: 1,monthName:"January"},{id: 2,monthName:"February"},{id: 3,monthName:"March"},{id: 4,monthName:"April"}, {id: 5,monthName:"May"}, {id: 6,monthName:"June"},  {id: 7,monthName:"July"},  {id: 8,monthName:"August"},  {id: 9,monthName:"September"},  {id: 10,monthName:"October"},{id: 11,monthName:"Nevember"},{id: 12,monthName:"December"}]
  constructor(
    private formBuilder:FormBuilder,
    private settingService:SettingService,
    private toster:ToastrService,
    public dateformat:NgbDateCustomParserFormatter
  ) { }

  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.userId=AuthService.UserId;
    this.moduleID=AuthService.CurrentModuleId;
    this.createForm();
    this.getAllPeriod();
  }

createForm(){
  this.periodForm=this.formBuilder.group({
    id:[0,[]],
    startDate:[,[Validators.required]],
    startDateNgb:[,[]],
    endDate:[,[Validators.required]],
    endDateNgb:[,[]],
    periodName:[,[]],
    yearId:[,[Validators.required]],
    yearName:[,[]],
    monthId:[,[Validators.required]],
    monthName:[,[]],
    createdBy:[this.userId,[]],
    compId:[this.compId,[]],
    moduleId:[this.moduleID,[]],
  })
}
onSelectMonth(month){  
  let yearName:string='';
  yearName = this.formVal.yearName?this.formVal.yearName:'';
  this.periodForm.patchValue({
    monthId:month.id,
    monthName:month.monthName,
    periodName:(month.monthName?month.monthName:'')+' - '+yearName
  })
}
onSelectYear(year){
  let monthName:string='';
  monthName = this.formVal.monthName?this.formVal.monthName:'';
  this.periodForm.patchValue({
    yearId:year.id,
    yearName:year.yearName,
    periodName:monthName+' - '+(year.yearName?year.yearName:'')
  })
}
onSubmit(){
  if(this.btnStatus=="Save"){
    this.savePeriod();
  }else{
    this.updatePeriod();
  }
}
savePeriod(){
  this.isSubmitted = true;
  if(this.periodForm.invalid){
    this.toster.warning("Fill Required Fields");
  }
  else{
    console.log(this.periodForm.value);
  this.settingService.savePeriod(this.periodForm.value).subscribe((result:any)=>{
    if(result){
    this.toster.success("Success");
    this.reset();
    }
    else{
      this.toster.error("Fail");
      this.reset();
    }
  })
}
}
updatePeriod(){
  this.isSubmitted = true;
    console.log(this.periodForm.value);
  this.settingService.updatePeriod(this.periodForm.value).subscribe((result:any)=>{
    if(result){
    this.toster.success("Success");
    this.reset();
    }
    else{
      this.toster.error("Fail");
      this.reset();
    }
  })
}
getPeriodById(id:any){
    let period=this.periodItem.find(c=>c.id==id)
    this.periodForm.patchValue({
      id:period.id,
      startDate:period.startDate,
      startDateNgb:this.dateformat.getYyyymmddToNgbDate(period.startDate),
      //startDateNgb:this.dateformat.stringToNgbDate(period.startDate.toString()),
      endDate:period.endDate,
      endDateNgb:this.dateformat.getYyyymmddToNgbDate(period.endDate),
      //endDateNgb:this.dateformat.stringToNgbDate(period.endDate.toString()),
      yearId:period.yearId,
      monthId:period.monthId,
      periodName:period.periodName,
      sortOrder:period.sortOrder
    });
    console.log(this.periodForm.value);
    this.btnStatus='Update';
}

getAllPeriod(){
this.settingService.getAllPeriodNew().subscribe((result:any)=>{
  console.log(result)
  if(result){
    //this.compId,this.moduleID
    this.periodItem=result.filter(c=>c.moduleId==this.moduleID) ;
  }else{
    this.periodItem=[];
  }
},(err:any)=>{
  this.toster.error(err.error,"Failed")
})
}
get f(){
  return this.periodForm.controls;
}
get formVal(){
  return this.periodForm.value;
}
reset(){
  this.isSubmitted=false;
  this.periodForm.reset();
  this.createForm();
  this.f.startDate.setValue('');
  this.f.startDateNgb.setValue('');
  this.f.endDate.setValue('');
  this.f.endDateNgb.setValue('');
  this.getAllPeriod();
  this.btnStatus='Save';
}
}
