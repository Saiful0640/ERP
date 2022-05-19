import { Component, OnInit } from '@angular/core';
import { AppService } from '../../../app.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-settings-index',
  templateUrl: './settings-index.component.html',
  styleUrls: ['./settings-index.component.scss']
})
export class SettingsIndexComponent implements OnInit {

  constructor(
    private appService:AppService
  ) { }

  ngOnInit() {
    this.appService.pageTitle = 'Admin'; 
  }

}
