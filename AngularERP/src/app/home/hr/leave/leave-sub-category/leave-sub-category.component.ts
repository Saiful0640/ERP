import { AuthService } from './../../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LeaveClassification } from '../../../../models/hr/leave-classification.model';
import { LeaveService } from '../../../../services/hr/leave.service';

@Component({
  selector: 'app-leave-sub-category',
  templateUrl: './leave-sub-category.component.html',
  styleUrls: ['./leave-sub-category.component.scss']
})
export class LeaveSubCategoryComponent implements OnInit {


  moduleId:number;
  compId: number;
  formGroup:FormGroup;
  leaveCategory:any[]=[];
  leaveTypes:any[]=[];
  isSubmitted = false;
  btnStatus: string = 'Save';

  constructor(
    private fromBuilder:FormBuilder,
    private leaveService:LeaveService,
    private toastr:ToastrService
  ) { }

  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.moduleId=AuthService.CurrentModuleId
    this.createFrom();
    this.getAllLeaveTypes();
    this.getLeaveCategories();

  }

  getLeaveCategories(){
    this.leaveService.getLeaveCategory().subscribe((response:any)=>{
      if(response){
        //this.compId,this.moduleId
        this.leaveCategory=response as any;
      }else
      {
        this.leaveCategory=[];
      }
    })
  }
  getAllLeaveTypes(){
    this.leaveService.getAllLeaveTypeByGrade().subscribe((response:any)=>{
    // this.leaveService.getAllLeaveTypes(this.compId,this.moduleId).subscribe((response:any)=>{
      if(response){
        //this.compId,this.moduleId
        this.leaveTypes=response as any;
      }else
      {
        this.leaveTypes=[];
      }
    })
  }
getLeaveSubCategoryById(id:number){
  this.leaveService.getLeaveSubCategoryById(id).subscribe((response:any)=>{
    if(response){
      this.btnStatus='Update';
      let leaveCategory=response as any;
      this.formGroup.patchValue(leaveCategory)
      // if(leaveCategory){
      //   console.log(leaveCategory,this.leaveTypes)
      //   this.formGroup.patchValue({
      //     id:leaveCategory.id,
      //     leaveCategoryID:this.leaveTypes.find(c=>c.id==leaveCategory.leaveCategoryID).id,
      //     title:leaveCategory.title,
      //     days:leaveCategory.days,
      //     compId:this.compId,
      //     moduleId:this.moduleId,
      //   });
      // }
      
    }
    else{
      return;
    }
  })
}
onSubmit(){
  if(this.btnStatus=="Save"){
    this.saveLeaveSubCategory();
      }else{
        this.updateLeaveSubCategory();
      }
}
saveLeaveSubCategory(){
  this.isSubmitted=true;
  if(this.formGroup.invalid){
    this.toastr.error("Fill the required fields");
    return;
  }else{
    let lev=new LeaveClassification();
    lev=this.formGroup.value;
    this.leaveService.saveLeaveSubnCategory(lev).subscribe((res:any)=>{
      if(res){
        this.toastr.success("Success");
        this.getLeaveCategories();
        this.reset();
      }else{
        this.toastr.error("Failed")
      }
    },(err:any)=>{
      this.toastr.error(err.error,"Please fill the required fields")
      this.reset();
      this.isSubmitted=false;
    })
  }
}
  updateLeaveSubCategory(){
    this.isSubmitted=true;
      let lev=new LeaveClassification();
      lev=this.formGroup.value;
      this.leaveService.updateLeaveSubnCategory(lev).subscribe((res:any)=>{
        if(res){
          this.toastr.success("Success");
          this.getLeaveCategories();
          this.reset();
        }else{
          this.toastr.error("Failed")
        }
      },(err:any)=>{
        this.toastr.error(err.error,"Please fill the required fields")
        this.reset();
        this.isSubmitted=false;
      })
  }

  reset(){
    this.createFrom();
    this.btnStatus='Save';
  }

  createFrom(){
    this.formGroup=this.fromBuilder.group({
      id:[0,[]],
      leaveCategoryId:[,[]],
      title:[,[]],
      days:[,[]],
      compId:[this.compId,[]],
      moduleId:[this.moduleId,[]]
    })
  }

  get f(){
    return this.formGroup.controls;
  }

}
