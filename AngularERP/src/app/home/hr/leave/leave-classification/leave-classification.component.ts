import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LeaveClassification } from '../../../../models/hr/leave-classification.model';
import { AuthService } from '../../../../services/auth.service';
import { LeaveService } from '../../../../services/hr/leave.service';

@Component({
  selector: 'app-leave-classification',
  templateUrl: './leave-classification.component.html',
  styleUrls: ['./leave-classification.component.scss']
})
export class LeaveClassificationComponent implements OnInit {
  constructor() { }

  ngOnInit() {
  }

}
