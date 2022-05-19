import { environment } from './../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransfermobileService {

  constructor(private http:HttpClient) { }

  updateMobile(mobile:any){
    return this.http.post(environment.apiUrl+'/transfermobile/updateMobile',mobile);
  }
}
