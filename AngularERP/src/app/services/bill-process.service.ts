import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillProcessService {

  constructor(private http:HttpClient) { }
  processBill(bills:any){
    return this.http.post(environment.apiUrl+'/billProcess/processBill',bills)
  }
}
