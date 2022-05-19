import { Component, OnInit, Input, HostBinding, HostListener } from '@angular/core';
import {  Router } from '@angular/router';
import { AppService } from '../../app.service';
import { UserModulePrivilegeModel } from '../../models/settings/user-module-privilege.model';
import { AuthService } from '../../services/auth.service';
import { LayoutService } from '../layout.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {
  @Input() orientation = 'vertical';

  @HostBinding('class.layout-sidenav') private hostClassVertical = false;
  @HostBinding('class.layout-sidenav-horizontal') private hostClassHorizontal = false;
  @HostBinding('class.flex-grow-0') private hostClassFlex = false;

  public innerWidth: any;
  @HostListener('window:load', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }

  @Input() moduleId = -1;
  currentModuleId:number;
  companyName: string = AuthService.CompanyName;
  userName:string = AuthService.LoginId;
  module: UserModulePrivilegeModel = new UserModulePrivilegeModel();

  isLoading: boolean = false;
  constructor(
    private router: Router,
    private appService: AppService,
    private layoutService: LayoutService
  ) {
    // Set host classes
    // this.hostClassVertical = this.orientation !== 'horizontal';
    this.hostClassHorizontal = !this.hostClassVertical;
    this.hostClassFlex = this.hostClassHorizontal;
  }
  ngOnInit(): void {
    this.companyName=AuthService.CompanyName;
    console.log(this.companyName)
    this.currentModuleId=AuthService.CurrentModuleId;
     
  }
  ngAfterViewInit() {
    // Safari bugfix
    this.layoutService._redrawLayoutSidenav();
  }

  getClasses() {
    let bg = this.appService.layoutSidenavBg;

    if (this.orientation === 'horizontal' && (bg.indexOf(' sidenav-dark') !== -1 || bg.indexOf(' sidenav-light') !== -1)) {
      bg = bg
        .replace(' sidenav-dark', '')
        .replace(' sidenav-light', '')
        .replace('-darker', '')
        .replace('-dark', '');
    }

    return `${this.orientation === 'horizontal' ? '' : ''} bg-${bg}`;
  }

  isActive(url) {
    return this.router.isActive(url, true);
  }

  isMenuActive(url) {
    return this.router.isActive(url, false);
  }

  isMenuOpen(url) {
    return this.router.isActive(url, false) && this.orientation !== 'horizontal';
  }

  toggleSidenav() {
    this.layoutService.toggleCollapsed();
  }

  logout() {
    if (AuthService.IsRemembered) {
      localStorage.removeItem('token');
      localStorage.removeItem('companyName');
      localStorage.removeItem('loginId');
      localStorage.removeItem('locked');
      localStorage.removeItem('loginPassword');
    } else {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('companyName');
      sessionStorage.removeItem('loginId');
      sessionStorage.removeItem('loginPassword');
    }
    this.appService.redirect('user/login');
  }

}
