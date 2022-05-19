import { transition } from '@angular/animations';
import { Component, Input, HostBinding } from '@angular/core';
import { AppService } from '../../app.service';
import { LayoutService } from '../../layout/layout.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-layout-navbar',
  templateUrl: './layout-navbar.component.html',
  styles: [`
  :host { display: block; }
  .modules{
    font-size: 1.5rem;
    padding: 10px;
    background-color: #282;
    color: #eee;
    cursor:pointer;
    border-radius: 100%;
    height:50px;
    width:50px;
    margin-left:5px;
    text-align:center;
    box-shadow: 0px 0px 5px 1px #000;
  }
  .modules:hover{
    background-color: #eee;
    color: #282;
    transition: .3s;
    box-shadow: 0px 0px 5px 1px #000;
  }
  .top-nav{
    max-width:100%;
    overflow-x:scroll;
  }
  .logout:hover{
    color:#d00 !important;
  }
  `
  ]
})
export class LayoutNavbarComponent {
  isExpanded = false;
  isRTL: boolean;
  companyName:string = AuthService.CompanyName;
  userName:string  = AuthService.LoginId;
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
  onCompanySelect(event){
      alert("nav");
      console.log(event)
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
    sessionStorage.clear();
    localStorage.clear();
    this.appService.redirect('user/login');
  }
}
