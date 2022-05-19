import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-branch-criteria',
  templateUrl: './branch-criteria.component.html',
  styleUrls: ['./branch-criteria.component.scss']
})
export class BranchCriteriaComponent implements OnInit {

  constructor() { }
  moduleId:number;
  ngOnInit() {
    this.moduleId=AuthService.CurrentModuleId;
  }

}
