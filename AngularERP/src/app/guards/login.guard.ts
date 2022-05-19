  
import { AppService } from './../app.service';
import { AuthService } from './../services/auth.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private appService: AppService) { }

  canActivate(): boolean {

    if (AuthService.isLocked()) {
      this.appService.redirect('user/locked');
      return false;
    }
    if (AuthService.isAuthenticated()) {
      this.appService.redirect('');
      return false;
    }
    return true;
  }
}