import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { Role } from './../../../../models/settings/role.model';
import { SettingService } from '../../../../services/settings/Setting.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private settingService: SettingService,
    private toasterService: ToastrService,
    private modalService: NgbModal
  ) { }

  roleForm: FormGroup;
  compID: number;
  branchID: number;
  createdBy: string;
  roleModel: Role[] = [];
  btnStatus = "Save";
  patternCode: string;
  isSubmit: boolean = false;

  ngOnInit() {
    // this.patternCode = '1'
    // this.branchID = -1;
    // this.compID = 1;
    // this.createdBy = null;
    this.createForm();
    this.getUserRole();
  }
  getUserRole(){
    this.settingService.getUserRole().subscribe((response:any)=>{
      if(response){
        this.roleModel=response;
      } })
  }
  getRoleByID(id: number) {
    let roleIn = this.roleModel.find(c => c.id == id);
    this.roleForm.patchValue(roleIn);
    this.btnStatus = "Update"
  }
  onSubmit(){
    if(this.btnStatus=="Save"){
      this.saveRole();
    }else{
      this.updateRole();
    }
  }
  saveRole() {
    // this.isSubmit = true;
    // if (this.roleForm.invalid) {
    //   this.toasterService.error("Please fill the all required fields", "Invalid submission");
    //   return;
    // }
    this.settingService.saveRole(this.roleForm.value).subscribe((response: any) => {
      if (response) {
        this.toasterService.success( "Success!");

        this.reset();
      }else{
        this.toasterService.error( "Failed!");
      }
    })

  }
  updateRole(){
    this.settingService.updateRole(this.roleForm.value).subscribe((response: any) => {
      if (response) {
        this.toasterService.success( "Success!");

        this.reset();
      }else{
        this.toasterService.error( "Failed!");
      }
    })

  }
  reset() {
    this.isSubmit = false;
    this.createForm();
    this.btnStatus = "Save";
    this.getUserRole();
  }
  createForm() {
    this.roleForm = this.formBuilder.group({
      id: [0, []],
      roleName: [, [Validators.required]],
      compId: [this.compID, []],
    })
  }

  get f() {
    return this.roleForm.controls;
  }
  cancel() {
    this.modalService.dismissAll();

  }

}
