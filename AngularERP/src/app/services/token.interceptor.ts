import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/retry';
import { AuthService } from './auth.service';
import { tap } from 'rxjs/operators';
import { AppService } from '../app.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private appService: AppService) {
  }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (request.headers.get("skip")){
      return next.handle(request);
    }
    let token = AuthService.Token;
    if (token) {
      request = request.clone({
        setHeaders: { 'Authorization': 'Bearer ' + token }
      });
      return next.handle(request).pipe(
        tap(
          success => { },
          err => {
            if (err.status == 401) {
              this.appService.redirect('/user/login')
            }
            else if (err.status == 403) {
              this.appService.redirect('/forbidden');
            }
          }
        )
      );
    } else {
      return next.handle(request.clone());
    }
  }
}
