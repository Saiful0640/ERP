import { transition } from '@angular/animations';
import { Component, Input, HostBinding } from '@angular/core';
import { AppService } from '../../app.service';
import { LayoutService } from '../../layout/layout.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar-navbar-with-icon-menu',
  templateUrl: './navbar-with-icon-menu.component.html',
  styles: [`
  :host { display: block; }`
  ],
  styleUrls:['./navbar-with-icon-menu.component.scss']
})
export class NavbarWithIconMenuComponent {
  isExpanded = false;
  isRTL: boolean;
  @Input() sidenavToggle = true;

  @HostBinding('class.layout-navbar')
  private hostClassMain = true;
  
  remember = false;
  constructor(private appService: AppService, private layoutService: LayoutService) {
    this.isRTL = appService.isRTL;
    const rememberMe = localStorage.getItem('remember');
    if (rememberMe) {
      if (rememberMe === 'true') {
        this.remember = true;
      }
    }
  }

  currentBg() {
    return `bg-${this.appService.layoutNavbarBg}`;
  }

  toggleSidenav() {
    this.layoutService.toggleCollapsed();
  }

  locked() {
    if (this.remember) {
      localStorage.setItem('locked', 'true');
    } else {
      sessionStorage.setItem('locked', 'true');
    }
    this.appService.redirect('user/locked');
  }

  logout() {
    if (this.remember) {
      localStorage.removeItem('token');
      localStorage.removeItem('name');
      localStorage.removeItem('password');
      localStorage.removeItem('locked');
      localStorage.removeItem('remember');
    } else {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('name');
      sessionStorage.removeItem('password');
      sessionStorage.removeItem('locked');
    }
    this.appService.redirect('user/login');
  }

}
