import { AccountingBasicEntryService } from './../../../services/accounting/accounting-basic-entry.service';

import { HeadGroupName } from './../../../models/accounting/head-group-name.model';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IMultiSelectOption } from 'angular-2-dropdown-multiselect';

@Component({
  selector: 'app-head-group-name-multi-select-list',
  template: `
  <ng-select
  [(ngModel)]="headGroupID"
  name="headGroupID"
  [multiple]="true" [closeOnSelect]="false"
  (change)="onSelect($event)"
  [items]="headGroupNameModel"
  [hideSelected]="true"
  bindLabel="headGroupName"
  bindValue="id"
  placeholder="Select Account Group">
  </ng-select>
  `,
  styleUrls: []
})
export class HeadGroupNameMultiSelectListComponent implements OnInit {

  constructor(private accChartService: AccountingBasicEntryService) { }
  @Input() headGroupID = [];
  @Output() onChange = new EventEmitter<HeadGroupName[]>();
  headGroupNameModel: HeadGroupName[] = [];
  headGroupOptions: IMultiSelectOption[] = [];

  ngOnInit() {
    this.getAllHeadGroupName();
    this.headGroupOptions = [];
  }

  onSelect(headGroup: any) {
    if (headGroup == null) {
      this.onChange.emit();
      return;
    }
    this.onChange.emit(headGroup);
  }


  getAllHeadGroupName() {
    this.accChartService.getAllHeadGroupName().subscribe((response:any) => {
      if (response.status) {
        this.headGroupNameModel = response.result;
      } else {
        this.headGroupNameModel = [];
      }
    })
  }



}
