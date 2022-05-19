import { ActivatedRoute } from '@angular/router';
import { Component, NgZone } from '@angular/core';
import { AppService } from '../../app.service';

@Component({
  selector: 'app-app-error',
  templateUrl: './app-error.component.html',
  styleUrls: ['./app-error.component.scss']
})
export class AppErrorComponent {

  errorText='';
  constructor(private appService: AppService, private ngZone:NgZone) {
    this.appService.pageTitle = 'Whoops...';
    const errorText= localStorage.getItem('error');
    if (errorText) {
      this.errorText = errorText;
    }else{
      this.errorText = 'There are an error which was not catch by developer. Contact with your site owner or try a few moments later';
    }
  }
  goBack() {
    this.ngZone.run(()=>{
      this.appService.redirect('/')
    })
  }

}
