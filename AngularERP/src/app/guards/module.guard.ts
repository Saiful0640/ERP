import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { AppService } from "../app.service";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { SettingService } from "../services/settings/Setting.service";

@Injectable({
    providedIn: 'root'
})
export class ModuleGuard implements CanActivate {
    constructor(public authService: AuthService,
      private appService: AppService,
      private settingsService:SettingService
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
          if (next.data['moduleId']) {
            AuthService.CurrentModuleId = next.data['moduleId'] as number;
               this.settingsService.getModuleAuthInfo(AuthService.CompanyId, next.data['moduleId'] as number)
              .subscribe((response: any) => {

              })
          }
          return true;
    }
}
