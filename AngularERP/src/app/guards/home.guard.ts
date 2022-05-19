import { AppService } from './../app.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HomeGuard implements CanActivate {

  constructor(private appService: AppService) { }

  canActivate(): boolean {
    if (!AuthService.isAuthenticated()) {
      this.appService.redirect('user/login');
      return false;
    }
    if (AuthService.isLocked()) {
      this.appService.redirect('user/locked');
      return false;
    }
    return true;
  }
}