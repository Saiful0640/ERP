import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CenterServiceNameService {

  constructor(private http:HttpClient) { }
  ///Service Name Setup
  getAllServiceType(){
    return this.http.get(environment.apiUrl+'/payroll/getAllServiceType');
   }
   saveServiceName(services:any){
    return this.http.post(environment.apiUrl+'/centerServiceName/SaveCenServiceName',services);
   }
   updateServiceName(services:any){
    return this.http.put(environment.apiUrl+'/centerServiceName/updateCenServiceName',services);
   }
   getAllServiceName(compId:number,moduleId:number){
    return this.http.get(environment.apiUrl+'/centerServiceName/getAllServiceName/compId/'+compId+'/moduleId/'+moduleId);
   }
   getAllServiceNameNew(){
    return this.http.get(environment.apiUrl+'/centerServiceName/getAllCenServiceName');
   }
   getServiceNameByType(type:number,moduleId:number,compId:number){
    return this.http.get(environment.apiUrl+'/centerServiceName/getServiceNameByType/processType/'+type+'/moduleId/'+moduleId+'/compId/'+compId);
   }
}
