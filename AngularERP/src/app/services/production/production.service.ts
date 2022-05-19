import { HttpClient, HttpParams } from "@angular/common/http"
import { Injectable } from "@angular/core"
import { environment } from "../../../environments/environment"

@Injectable({
  providedIn: 'root'
})
export class ProductionService {

  constructor(private http: HttpClient) { }
  saveProduction(production) {
    return this.http.post(environment.apiUrl + '/Production/SaveProduction', production)
  }
  manufactureMsRecycle(production) {
    return this.http.post(environment.apiUrl + '/Production/ManufactureRecycle', production)
  }
  msToGIPipe(production) {
    return this.http.post(environment.apiUrl + '/Production/MsToGiPipeProduction', production)
  }
  getBom(compId: number,productType:number) {
    return this.http.get(environment.apiUrl + '/Production/getBom/compId/' + compId+'/productType/'+productType)
  }
  saveProductionFoam(production) {
    return this.http.post(environment.apiUrl + '/Production/SaveProductionFoam', production)
  }
  //-----------Get Production-----------------------
  getBabyCoilProduction(CompId:number,ChallanID:number, ChallanNO:number,ChallanType:string,OrderId:number) {
    var param=new HttpParams()
    .set('CompId',CompId.toString())
    .set('ChallanID',ChallanID.toString())
    .set('ChallanNO',ChallanNO.toString())
    .set('ChallanType',ChallanType)
    .set('OrderId',OrderId.toString())

    return this.http.get(environment.apiUrl + '/production/getProductionBabyCoil/', {params:param})
  }

  saveLayer(layer){
    return this.http.post(environment.apiUrl+'/production/saveLayer',layer);
  }
  saveBoom(boom){
    return this.http.post(environment.apiUrl+'/production/saveBoom',boom);
  }
  GetAllLayer(){
    return this.http.get(environment.apiUrl+'/production/GetAllLayer');
  }
  GetChallanMode(){
    return this.http.get(environment.apiUrl+'/production/GetChallanMode');
  }
  getBOM(compId:number,reference2:number) {
    var param=new HttpParams()
    .set('CompId',compId.toString())
    .set('Reference2',reference2.toString())
    return this.http.get(environment.apiUrl + '/production/GetBOM/', {params:param})
  }
}
