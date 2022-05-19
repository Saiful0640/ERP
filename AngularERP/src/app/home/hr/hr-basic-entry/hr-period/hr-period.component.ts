import { YearModel } from '../../../../models/settings/year/year.model';
import { MonthModel } from '../../../../models/settings/month.model';
import { AuthService } from '../../../../services/auth.service';
import { PeriodModel } from '../../../../models/hr/period.model';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { BasicEntryService } from '../../../../services/hr/basicEntry.service';
import { NgbDateCustomParserFormatter } from '../../../../shared/dateformat';
import { SettingService } from '../../../../services/settings/Setting.service';

@Component({
  selector: 'app-hr-period',
  templateUrl: './hr-period.component.html',
  styleUrls: ['./hr-period.component.scss']
})
export class HrPeriodComponent implements OnInit {
moduleID:number=12;
  constructor( ) { }

  ngOnInit() {
  }

}
