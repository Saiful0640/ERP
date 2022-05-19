import { AnimationStyleMetadata } from '@angular/animations';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CriteriaCenterService {

  constructor(private http:HttpClient) { }
  getAllCriteriaTypeByModuleId(moduleId:number,compId:number){///not usable method
    return this.http.get(environment.apiUrl+'/criteriaCenter/getCriteriaTypeByModuleId/moduleId/'+moduleId+'/ComId/'+compId);
   }
   ///For Spring boot
   getAllCriteriaTypeByModuleIdNew(){
    return this.http.get(environment.apiUrl+'/basicEntry/getAllCriteriaCenter');
   }
      ///For Spring boot
   getAllCriteriaAreaByCriteriaIdNew(){
    return this.http.get(environment.apiUrl+'/basicEntry/getAllCriteriaDetails');
   }
       ///For Spring boot
   getCriteriaCenterNew(){
    return this.http.get(environment.apiUrl+'/basicEntry/getAllCriteriaDetails');
   }
   ///For Spring boot
   getAllCriteriaCenterNew(){
    return this.http.get(environment.apiUrl+'/basicEntry/getAllCriteriaDetails');
   }
   saveCriteriaCenterNew(criteria:any){
    return this.http.post(environment.apiUrl+'/basicEntry/SaveCriteriaDetails',criteria)
  }

   getAllCriteriaAreaByCriteriaId(criteriaId:number,compId:number,moduleId:number){
    return this.http.get(environment.apiUrl+'/criteriaCenter/getCriteriaAreaByCriteriaId/criteriaId/'+criteriaId+'/ComId/'+compId+'/moduleId/'+moduleId);
   }

   getCriteriaCenter(moduleId:number,compId:number,criteriaID:number=0){
    return this.http.get(environment.apiUrl+'/criteriaCenter/getCriteriaCeneter/moduleId/'+moduleId+'/ComId/'+compId+'/criteriaID/'+criteriaID);
   }
   getDetailsCriteriaCenter(moduleId:number,criteriaID:number,detailsId:number){
    return this.http.get(environment.apiUrl+'/payroll/getCriteriaDetailsByModuleIdCriteriaIdDetailsId/'+moduleId+'/'+criteriaID+'/'+detailsId);
   }
  getAllCriteriaCenter(criteria:any){
    return this.http.post(environment.apiUrl+'/criteriaCenter/getAllCriteriaCeneter',criteria)
  }
   saveCriteriaCenter(criteria:any){
     return this.http.post(environment.apiUrl+'/criteriaCenter/SaveCriteriaCenter',criteria)
   }
   getCriteria(detailsID: number = 1) {
    return this.http.get(environment.apiUrl + '/criteriaCenter/GetCriterias/' + detailsID);
  }
  getServiceNameByDetailsID(moduleId:number,compId:number,detailsId?:number){
    return this.http.get(environment.apiUrl+`/assignCriteria/getServiceNameByDetailsID/${moduleId}/${compId}/${detailsId}`);
   }
//#region Criteria Entry
   //Save Criteria Entry

   saveCriteriaEntry(criteriaEntry:any){
    return this.http.post(environment.apiUrl+'/CriteriaCenter/SaveCriteriaEntry',criteriaEntry);
  }
  //get Criteria Entry
  getAllEntryCriteria(compId:number,moduleId:number)
  {
   return this.http.get(environment.apiUrl+'/CriteriaCenter/GetAllEntryCriteria/compId/'+compId+'/moduleId/'+moduleId);
  }
}
