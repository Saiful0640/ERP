import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { AppService } from "../app.service";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from "@angular/router";
import { SettingService } from "../services/settings/Setting.service";
import { UserPagePrivilegeModel } from "../models/settings/user-page-privilege.model";

@Injectable({
  providedIn: 'root'
})
export class PageGuard implements CanActivate {
  constructor(private appService: AppService,
    private settingsService: SettingService,
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (!AuthService.isAuthenticated()) {
      this.appService.redirect('user/login');
      return false;
    }
    if (AuthService.isLocked()) {
      this.appService.redirect('user/locked');
      return false;
    }
    AuthService.CurrentPageId = next.data['pageId'] as number;
    if (next.data['pageId']) {
      this.settingsService.getPageAuthInfo(AuthService.UserId, AuthService.CurrentPageId)
        .subscribe((response: any) => {
          if (response.status) {
            AuthService.PageAuthInfo = response.result as UserPagePrivilegeModel;
            return true;
          }
        })
    }
    return true;
  }
}
