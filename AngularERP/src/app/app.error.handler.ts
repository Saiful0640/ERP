import { ErrorHandler, Injectable, Input, Injector } from '@angular/core';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable()
export class AppErrorHandler extends ErrorHandler {


  constructor(private injector: Injector,
    private toaster: ToastrService
  ) {
    super();
  }
  handleError(error: Error | HttpErrorResponse) {

    const toaster = this.injector.get(ToastrService);
    const router = this.injector.get(Router);
    if (error instanceof HttpErrorResponse) {

      console.error(error);
      // Server or connection error happened
      toaster.toastrConfig.preventDuplicates = true;
      toaster.toastrConfig.onActivateTick = true;
      if (!navigator.onLine) {
        // Handle offline error
        return toaster.error('Check your internet connection', 'Connection failed!');
      } else {
        switch (error.status) {
          case 0: return toaster.error('No response from server');
          case 400:
            
            localStorage.setItem('error', error.error.text || error.message);
            return router.navigate(['/error']);
          case 401: return router.navigate(['/user/login']);
          case 403: return router.navigate(['/forbidden']);
          case 404: return this.toaster.error(error.statusText, 'NOT FOUND');
          case 405: return this.toaster.error(error.statusText, 'METHOD NOT ALLOWED');
          case 408: return this.toaster.error(error.statusText, 'REQUEST TIMEOUT');
          case 415: return this.toaster.error(error.statusText, 'UNSUPPORTED MEDIA TYPE');
          case 500: return this.toaster.error(error.statusText, 'SERVER ERROR!');
          case 503: return this.toaster.error(error.statusText, 'SERVICE UNAVAILABLE!');
          default: return this.toaster.error(error.statusText, error.status.toString());
        }
      }
    } else {
      console.error(error);
      // Handle Client Error (Angular Error, ReferenceError...)
      localStorage.setItem('error', error.message);
      //this.toaster.error(error.message, error.name);
      router.navigate(['/error']);
    }
  }
}
