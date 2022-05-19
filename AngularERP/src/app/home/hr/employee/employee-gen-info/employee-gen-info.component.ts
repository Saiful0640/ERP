import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { EmpGenInfoService } from '../../../../services/hr/empGenInfo.service';

@Component({
  selector: 'app-employee-gen-info',
  templateUrl: './employee-gen-info.component.html',
  styleUrls: ['./employee-gen-info.component.scss', '../../../../../vendor/libs/ng-select/ng-select.scss']
})
export class EmployeeGenInfoComponent implements OnInit {
  memberTitle:string="Employee Information"
  comType:number=5;
  constructor(
  ) { }
  empGenInfoForm: FormGroup;
  ngOnInit() {
  }



}
