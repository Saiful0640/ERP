import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forbidden',
  templateUrl: './forbidden.component.html',
  styleUrls: ['./forbidden.component.scss']
})
export class ForbiddenComponent implements OnInit {

  constructor(private router: Router, private ngZone: NgZone) { }

  ngOnInit() {
  }

  goBack() {
    this.ngZone.run(() => {
      this.router.navigate(['']);
    })
  }

}
