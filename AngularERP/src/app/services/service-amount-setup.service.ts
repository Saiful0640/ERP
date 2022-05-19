import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { CenserviceAmtParam } from '../models/payroll/censervice-amt-param';

@Injectable({
  providedIn: 'root'
})
export class ServiceAmountSetupService {

  constructor(private http:HttpClient) { }
  saveServiceAmount(serviceAmt:any){    
    return this.http.post(environment.apiUrl+'/Payroll/SaveCenServiceAmtSetting',serviceAmt);
   }
   deleteCenServiceAmtSetting(cenParam:CenserviceAmtParam){        
    return this.http.post(environment.apiUrl+'/Payroll/DeleteCenServiceAmtSettingByModuleIdAndDetailsId',cenParam);
   }
   getAllCenServiceAmount(compId:number,detailsId:number,moduleId:number){    
    return this.http.get(environment.apiUrl+'/cenServiceAmoutSetup/getAllCenServiceAmount/ComId/'+compId+'/detailsId/'+detailsId+'/moduleId/'+moduleId);
   }
   getAllCenServiceAmountNew(moduleId:number,detailsId:number){    
    return this.http.get(environment.apiUrl+'/Payroll/getCenterServiceAmountList/'+moduleId+'/'+detailsId);
   }
   getServiceBillProcessType(){    
    return this.http.get(environment.apiUrl+'/payroll/getAllServiceBillProcessType');
   }
   getEmpName(compId:number,moduleId:number){
    return this.http.get(environment.apiUrl+'/school/GetTeachersName/ComId/'+compId+'/moduleId/'+moduleId)
  }
}
