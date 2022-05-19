import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { BasicEntryService } from '../../../services/hr/basicEntry.service';
import { BasicEntryModel } from '../../../models/hr/basicEntry.model';

@Component({
  selector: 'app-section-select-list',
  template: `<ng-select
  [(ngModel)]="sectionId"
  (change)="onSelect($event)"
  [items]="section"
  [id]="focusId"
  bindLabel="description"
  bindValue="id"
  [disabled]="disabled"
  placeholder="Select Section">
  </ng-select>`,
  styleUrls: ['../../../../vendor/libs/ng-select/ng-select.scss']
})
export class SectionSelectListComponent implements OnInit {

  @Input() sectionId: number;
  @Input() departmentId: number = 0;
  @Input() focusId: string;
  @Input() disabled: boolean = false;
  @Output() onChange = new EventEmitter<any>();
  compId:number;
  section:BasicEntryModel[] = [];

  constructor(private service: BasicEntryService) { }
  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.getAllBusinessNature();
  }

  getAllBusinessNature() {
    this.service.getAllSection().subscribe((result:any) => {
      if (result) {
        this.section = result as BasicEntryModel[];
      }
      else {
        this.section = [];
      }
    })
  }

  onSelect(section) {
    if (section) {
      this.onChange.emit(section)
    } else {
      this.onChange.emit({
        id: null, description: null, departmentID: null
      })
    }
  }

}
