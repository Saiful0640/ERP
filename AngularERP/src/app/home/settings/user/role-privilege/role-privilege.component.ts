import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-role-privilege',
  templateUrl: './role-privilege.component.html',
  styleUrls: ['./role-privilege.component.scss']
})
export class RolePrivilegeComponent implements OnInit {
  constructor(
    private formBuilder:FormBuilder
  ) { }

  rolePreviliegeForm:FormGroup
  ngOnInit() {
    this.createForm();
  }

  createForm(){
    this.rolePreviliegeForm=this.formBuilder.group({
      userRoleID:[,[]],
    })
  }
  get f(){
    return this.rolePreviliegeForm.controls;
  }
}
