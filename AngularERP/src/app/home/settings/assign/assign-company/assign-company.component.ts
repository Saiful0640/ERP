import { SettingService } from '../../../../services/settings/Setting.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Template } from '@angular/compiler/src/render3/r3_ast';

@Component({
  selector: 'app-assign-company',
  templateUrl: './assign-company.component.html',
  styleUrls: ['./assign-company.component.scss']
})
export class AssignCompanyComponent implements OnInit {

  clientId: number = AuthService.ClientId;
  companies: any[] = [];
  users: any[] = [];
  selectedUserId: number;

  constructor(
    private settingsServices: SettingService,
    private toaster: ToastrService
  ) { }

  ngOnInit() {
    this.getCompanies();
    this.getUsers();
  }

  getCompanies() {
    this.settingsServices.getCompanies(AuthService.UserId,AuthService.UserTypeId,this.clientId)
      .subscribe((response: any) => {
        if (response.status) {
          this.companies = response.result as any[];
        }
      })
  }

  getUsers() {
    this.settingsServices.getUsers(AuthService.UserTypeId, AuthService.ClientId,AuthService.CompanyId,undefined,1)
      .subscribe((response: any) => {
        if (response.status) {
          this.users = response.result as any[];
        }
      })
  }
  onSelectUser(userId) {
    if (userId) {
      this.settingsServices.getAssignedCompaniesForEdit(userId).subscribe((response: any) => {
        if (response.status) {
          this.companies = response.result as any[];
        }
      })
    }
  }

  onSelectCompany(isChecked, companyId, elementId) {
    this.companies.find(c => c.compId == companyId).isAssigned = !isChecked;
  }
  onExpand(elementId) {
    let element = document.getElementById(elementId);
    if (element.classList.item(1)=='fa-chevron-right') {
      element.classList.remove('fa-chevron-right')
      element.classList.add('fa-chevron-down')
    } else {
      element.classList.remove('fa-chevron-down')
      element.classList.add('fa-chevron-right')
    }
  }

  onSubmit() {
    if (!this.selectedUserId) {
      this.toaster.error('User is required', 'Invalid Submission');
      return;
    }
    const paramObj: any[] = [];
    this.companies.forEach(company => {
      if (company.isAssigned) {
        paramObj.push({
          userId: this.selectedUserId,
          compId: company.compId,
          isAssigned: true,
          branches:(company.branches as any[]).filter(branch=>branch.isAssigned)
        })
      }
    })
    this.settingsServices.assignCompany({
      userId:this.selectedUserId,
      clientId : this.clientId,
      assignedItems : paramObj
    })
      .subscribe((response: any) => {
        if (response.status) {
          this.toaster.success(response.result, 'Success')
        } else {
          this.toaster.error(response.result, 'Failed')
        }
      })
  }
}
