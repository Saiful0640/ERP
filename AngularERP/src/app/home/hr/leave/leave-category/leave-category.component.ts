import { LeaveService } from '../../../../services/hr/leave.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './../../../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-leave-category',
  templateUrl: './leave-category.component.html',
  styleUrls: ['./leave-category.component.scss']
})
export class LeaveCategoryComponent implements OnInit {
  btnStatus:string='Save';
  leavetypeForm:FormGroup;
  compId:number;
  userId:number;
  moduleId:number;
  isSubmitted=false;
  leaveTypes:any[];
  leaveType:any[];
  selectedItemId: number;
  gradeValue:number = 1;
  constructor(
    private formBuilder:FormBuilder,
    private toastr:ToastrService,
    private modalService:NgbModal,
    private leaveTypeService: LeaveService
  ) { }

  ngOnInit() {
    this.compId = AuthService.CompanyId;
    this.userId = AuthService.UserId;
    this.moduleId=AuthService.CurrentModuleId;
    this.createForm();
    this.getAllLeaveTypesByGrade();

  }
  onSubmit(){
    if(this.btnStatus=="Save"){
      this.saveleaveType();
    }else{
      this.updateleaveType();
    }
  }
  saveleaveType(){
    this.isSubmitted=true;
    if(this.leavetypeForm.invalid){
      this.toastr.error("Fill Required Fields");
      return;
    }
    else{
    this.leaveTypeService.saveLeaveType(this.formval).subscribe((result:any)=>{
      if(result){
        this.toastr.success("Success");
        this.reset();
        this.getAllLeaveTypesByGrade();
      }
      else
      {
        this.toastr.error("Error");
      }
    })
  }
  }
  updateleaveType(){
    this.isSubmitted=true;
    if(this.leavetypeForm.invalid){
      this.toastr.error("Fill Required Fields");
      return;
    }
    else{
    this.leaveTypeService.updateLeaveType(this.formval).subscribe((result:any)=>{
      if(result){
        this.toastr.success("Success");
        this.reset();
        this.getAllLeaveTypesByGrade();
      }
      else
      {
        this.toastr.error("Error");
      }
    })
  }
  }
  getAllLeaveTypesByGrade(){
    this.leaveTypeService.getAllLeaveTypeByGrade().subscribe((result:any) => {
      if(result){
        this.leaveTypes = result;
      }else{
        this.toastr.error("Error");
      }
    })
  }

  getLeaveById(id:number){
    this.leaveTypeService.getLeaveTypeById(id).subscribe((result:any)=> {
      if(result){
        this.leaveType = result;
        this.leavetypeForm.patchValue(this.leaveType);
        this.btnStatus='Update';
      }else{
        this.toastr.error(result.message);
      }
    })
  }
  delete(id: number, modal: any) {
    this.selectedItemId = id;
    this.modalService.open(modal);
  }
  confirmDeleteLeaveById(id:number){
    this.leaveTypeService.deleteById(id).subscribe((result:any)=>{
      if(result){
        this.toastr.error(result.message)
        this.modalService.dismissAll()
        this.getAllLeaveTypesByGrade()
      }
    })
  }

  createForm(){
    this.leavetypeForm = this.formBuilder.group({
      id:[,[]],
      typeName:[,[Validators.required]],
      days:[,[Validators.required]],
      gradeValue:[1,[]],
      userId:[this.userId,[]],
      isActive:[1,[]],
      compId:[this.compId,[]],
      moduleId:[this.moduleId,[]]
    })

  }
reset(){
  this.isSubmitted=false;
  this.btnStatus='Save';
  this.createForm();
}
  get f(){
    return this.leavetypeForm.controls;
  }
  get formval(){
    return this.leavetypeForm.value;
  }

}
