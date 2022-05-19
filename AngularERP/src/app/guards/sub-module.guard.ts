import { Injectable } from "@angular/core";
import { AuthService } from "../services/auth.service";
import { AppService } from "../app.service";
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { SettingService } from "../services/settings/Setting.service";

@Injectable({
  providedIn: 'root'
})
export class SubModuleGuard implements CanActivate {
  constructor(public authService: AuthService,
    private appService: AppService,
    private settingsService: SettingService
  ) { }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {

    AuthService.CurrentModuleId = next.data['moduleId'] as number;
    return true;
  }
}
