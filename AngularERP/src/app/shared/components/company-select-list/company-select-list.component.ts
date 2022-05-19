import { UserType } from './../../lookup';
import { AuthService } from './../../../services/auth.service';
import { ApiResponse } from './../../../models/api-response';
import { SettingService } from '../../../services/settings/Setting.service';
import { Company } from './../../../models/settings/company.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-company-select-list',
  template: `<ng-select
  [(ngModel)]="companyId"
  name="companyId"
  (change)="onSelect($event)"
  [items]="companies"
  bindLabel="name"
  bindValue="id"
  placeholder="Select Company">
  </ng-select>`,
  styleUrls: []
})
export class CompanySelectListComponent implements OnInit {

  constructor(
    private settingService: SettingService
  ) { }
  @Input() clientId: number  ;
  @Input() companyId: number ;
  @Output() onChange = new EventEmitter<Company>()
  companies: Company[] = [];
  ngOnInit() {
    this.getCompanies();
  }
  onSelect(comp: Company) {
    if (comp == null) {
      this.onChange.emit(new Company());
      return;
    }
    this.onChange.emit(comp);

  }
  getCompanies() {
    this.settingService.getAllCompany().subscribe((response: any) => {
      if (response) {
        this.companies = response as Company[];
      }else{
        this.companies = [];
      }
    })

  }

}
