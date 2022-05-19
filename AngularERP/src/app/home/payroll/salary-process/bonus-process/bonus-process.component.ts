import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Bonusprocess } from '../../../../models/payroll/bonusprocess.model';
import { AuthService } from '../../../../services/auth.service';
import { PayrollServiceService } from '../../../../services/payroll/payroll-service.service';
import { NgbDateCustomParserFormatter } from '../../../../shared/dateformat';

@Component({
  selector: 'app-bonus-process',
  templateUrl: './bonus-process.component.html',
  styleUrls: ['./bonus-process.component.scss']
})
export class BonusProcessComponent implements OnInit {
  formGroup:FormGroup;
  //compId:number;
  compId:number=AuthService.CompanyId;
  moduleId:number=AuthService.CurrentModuleId;
  arrayForm:FormArray;
  memberInfo:any[]=[];
  bonusList:any[]=[];
  btnStatus:string='Save';
  isSubmit:boolean=false;

  constructor(
    private formBuilder:FormBuilder,
    private payrollService:PayrollServiceService,
    private toastr:ToastrService,
    public dateformat:NgbDateCustomParserFormatter
  ) { 
    this.arrayForm=this.formBuilder.array([]);
  }
  

  ngOnInit() {
    //this.compId=AuthService.CompanyId;
    this.createForm();
    //this.getBonusProcess();
    this.getMemberInfo()
    this.addRow();
  }

  saveData(){
    this.isSubmit=true;
    if(this.formGroup.invalid){
      this.toastr.error("Please fill the required fields")
      return;
    }
    let bonus=new Bonusprocess();
    bonus=this.formGroup.value;
    var bonusFilter=this.arrayForm.value;
    bonus.itemBonusProcess=bonusFilter;
    console.log(bonus,);
    this.payrollService.saveBonusProcess(bonus).subscribe((res:any)=>{
      if(res.status){
        this.toastr.success(res.result,"Success!")
        this.reset();
      }else{
        this.toastr.error(res.status,"Failed!")

      }
    },(err:any)=>{
      this.toastr.error(err.error,"Please fill the required fields")
      this.reset();
      this.isSubmit=false;
    })
  }

  getBonusProcess(){
    this.payrollService.getBonusProcess(this.compId,this.moduleId).subscribe((response:any)=>{
      if(response.status){
        this.bonusList=response.result;
        console.log(this.bonusList);
        this.formGroup.patchValue({
          id:this.bonusList[0].id,
          periodID:this.bonusList[0].periodID,
          groupID:this.bonusList[0].groupID,
          sectionID: this.bonusList[0].sectionID,
          bonusID:this.bonusList[0].bonusID,
          narration:this.bonusList[0].narration,
          empCode:this.bonusList[0].empCode,
          designationID:this.bonusList[0].designationID,
          departmentID:this.bonusList[0].departmentID,
          entryDate:this.bonusList[0].entryDate,
          entryDateNgb:this.dateformat.getYyyymmddToNgbDate(this.bonusList[0].entryDate),
        })
        this.arrayForm=this.formBuilder.array([]);
        this.bonusList.forEach(item=>{
        this.arrayForm.push(
        new FormGroup({
          empCode:new FormControl(item.empCode,[]),
          //empName:new FormControl(item.memberName,[]),
          //designationID:new FormControl(item.designationID,[]),
          //departmentId:new FormControl(item.departmentId,[]),
          joiningDate:new FormControl(item.joingDate,[]),
          joiningDateNgb:new FormControl(this.dateformat.getYyyymmddToNgbDate(item.joingDate),[]),
          servicePeriod:new FormControl(item.servicePeriod,[]),
          grossSalary:new FormControl(item.grossSalary,[]),
          percentage:new FormControl(item.percentage,[]),
          bonusAmount:new FormControl(item.bonusAmount,[]),
          stampAmount:new FormControl(item.stampAmount,[]),
          netPayment:new FormControl(item.netPayment,[]),
          remarks:new FormControl(item.remarks,[]),
        })
        )
      })
      }else
      {
        this.bonusList=[];
      }
    },(err:any)=>{
      this.toastr.error(err.error,"Please Select the Month & Group Type")
    })
  }
  onCalculation(rowIndex:number){
    let grossSalary = Number(this.arrayForm.value[rowIndex]["grossSalary"])
    let percentage = Number(this.arrayForm.value[rowIndex]["percentage"])
    let bonusAmount = Number(this.arrayForm.value[rowIndex]["bonusAmount"])
    let stampAmount = Number(this.arrayForm.value[rowIndex]["stampAmount"])  
    let parse=grossSalary * percentage * 0.01
    console.log(parse)
    this.arrayForm.controls[rowIndex].patchValue({
      netPayment:grossSalary-parse+bonusAmount+stampAmount
    })
  }
  addRow() {
    this.arrayForm.push(
    new FormGroup({
      empCode:new FormControl(null,[]),
      //empName:new FormControl(null,[]),
      //designationID:new FormControl(null,[]),
      //departmentID:new FormControl(null,[]),
      joiningDate:new FormControl(null,[]),
      joiningDateNgb:new FormControl(null,[]),
      servicePeriod:new FormControl(null,[]),
      grossSalary:new FormControl(0,[]),
      percentage:new FormControl(0,[]),
      bonusAmount:new FormControl(0,[]),
      stampAmount:new FormControl(0,[]),
      netPayment:new FormControl(0,[]),
      remarks:new FormControl(null,[]),
    })
  )
}

removeRow(index:number){
  this.arrayForm.removeAt(index);
}

  getMemberInfo(){
    this.payrollService.getNameAndCode(this.compId,this.moduleId).subscribe((response:any)=>{
      if(response.status){
        this.memberInfo=response.result;
      }else
      {
        this.memberInfo=[];
      }
    })
  }

  onSelectPeriod(periods:any){
    //console.log(periods)
    this.formGroup.patchValue({
      periodID:periods.id
    })
  }

  reset(){
    this.btnStatus="Save";
    this.createForm();
    this.arrayForm=this.formBuilder.array([]);
    this.addRow();
  }
  
  createForm(){
    this.formGroup=this.formBuilder.group({
      id:[0,[]],
      compId:[this.compId,[]],
      moduleId:[this.moduleId,[]],
      periodID:[,[]],
      groupID:[,[]],
      sectionID:[,[]],
      bonusID:[0,[]],
      narration:[,[]],
      designationID:[,[]],
      departmentID:[,[]],
      entryDate:[,[]],
      entryDateNgb:[,[]],
      joingDate:[,[]],
      ngbJoinDate:[,[]],
      empCode:[,[]]

    })
  }
  get f(){
    return this.formGroup.controls;
  }

}
