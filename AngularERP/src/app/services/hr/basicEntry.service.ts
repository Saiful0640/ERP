import { environment } from './../../../environments/environment';
import { PeriodModel } from './../../models/hr/period.model';
import { BasicEntryModel } from './../../models/hr/basicEntry.model';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { HolydayCalender } from '../../models/hr/holiday.model';

@Injectable({
    providedIn: 'root'
  })
  export class BasicEntryService {

    constructor(private http: HttpClient) { }
       saveOrUpdateBasicEntry(basicEntry: BasicEntryModel) {
        return this.http.post(environment.apiUrl + '/BasicEnty/SaveBasicEntry', basicEntry)
      }
      saveDepartment(basicEntry: BasicEntryModel) {
        return this.http.post(environment.apiUrl + '/BasicEnty/SaveDepartment', basicEntry)
      }
      updateDepartment(basicEntry: BasicEntryModel) {
        return this.http.put(environment.apiUrl + '/BasicEnty/updateDepartment', basicEntry)
      }
      saveDesignation(basicEntry: BasicEntryModel) {
        return this.http.post(environment.apiUrl + '/BasicEnty/SaveDesignation', basicEntry)
      }
      updateDesignation(basicEntry: BasicEntryModel) {
        return this.http.put(environment.apiUrl + '/BasicEnty/updateDesignation', basicEntry)
      }
      saveGroupType(basicEntry: BasicEntryModel) {
        return this.http.post(environment.apiUrl + '/BasicEnty/SaveGroupType', basicEntry)
      }
      updateGroupType(basicEntry: BasicEntryModel) {
        return this.http.put(environment.apiUrl + '/BasicEnty/updateGroupType', basicEntry)
      }
      saveSection(basicEntry: BasicEntryModel) {
        return this.http.post(environment.apiUrl + '/BasicEnty/SaveSection', basicEntry)
      }
      updateSection(basicEntry: BasicEntryModel) {
        return this.http.put(environment.apiUrl + '/BasicEnty/updateSection', basicEntry)
      }
      getByIdBasicEntry(tableName:string,compId:number,id:number) {
        var param=new HttpParams()
        .set('tableName',tableName)
        .set('compId',compId.toString())
        .set('id',id.toString())
        return this.http.get(environment.apiUrl + '/BasicEnty/GetByIdBasicEntry', {params:param})
      }
      deleteBasicEntry(tableName:string,id:number,compId:number) {
        var param=new HttpParams()
        .set('tableName',tableName)
        .set('compId',compId.toString())
        .set('id',id.toString())
        return this.http.delete(environment.apiUrl + '/BasicEnty/DeleteBasicEntry/',{params:param});
      }
      getAllDepartment(compId:number){
        var param=new HttpParams()
        .set('compId',compId.toString())
        return this.http.get(environment.apiUrl+'/BasicEnty/getAllDepartment',{params:param})
      }
      getAllDesignation(compId:number){
        var param=new HttpParams()
        .set('compId',compId.toString())
        return this.http.get(environment.apiUrl+'/BasicEnty/getAllDesignation',{params:param})
      }
      getDesignations(compId:number){
        var param=new HttpParams()
        .set('compId',compId.toString())
        return this.http.get(environment.apiUrl+'/BasicEnty/GetDesignations',{params:param})
      }
      getAllSectionold(compId:number){
        var param=new HttpParams()
        .set('compId',compId.toString())
        return this.http.get(environment.apiUrl+'/BasicEnty/getAllSection',{params:param})
      }
      getAllGroup(compId:number){
        var param=new HttpParams()
        .set('compId',compId.toString())
        return this.http.get(environment.apiUrl+'/BasicEnty/getAllGroup',{params:param})
      }
      getAllGroupNew(){

        return this.http.get(environment.apiUrl+'/BasicEnty/getAllGroupType')
      }
      getAllLocation(){
        return this.http.get(environment.apiUrl+'/BasicEnty/getAllLocation')
      }
      getAllCountry(){
        return this.http.get(environment.apiUrl+'/BasicEnty/getAllCountry')
      }
      getAllGender(){
        return this.http.get(environment.apiUrl+'/BasicEnty/getAllGender')
      }
      getAllReligion(){
        return this.http.get(environment.apiUrl+'/BasicEnty/getAllReligion')
      }
      getAllBloodGroup(){
        return this.http.get(environment.apiUrl+'/BasicEnty/getAllBloodGroup')
      }
      getAllMaritial(){
        return this.http.get(environment.apiUrl+'/BasicEnty/getAllMaritial')
      }
      getAllDistrict(divisionId:number){
        var param=new HttpParams()
        .set('divisionId',divisionId.toString())
        return this.http.get(environment.apiUrl+'/BasicEnty/GetDistrict',{params:param})
      }
      getAllThana(divisionId:number){
        var param=new HttpParams()
        .set('divisionId',divisionId.toString())
        return this.http.get(environment.apiUrl+'/BasicEnty/GetThana',{params:param})
      }
      getAllUpazila(divisionId:number){
        var param=new HttpParams()
        .set('divisionId',divisionId.toString())
        return this.http.get(environment.apiUrl+'/BasicEnty/GetUpazila',{params:param})
      }
      saveHoliDay(holiday:HolydayCalender){
       return this.http.post(environment.apiUrl+'/BasicEnty/SaveHoliday',holiday)
      }

      getHolydayList(yearMonth:any){

        return this.http.get(environment.apiUrl+'/BasicEnty/getallholiday/'+yearMonth)
      }
      getAllBasicEntry(tableName:string,compId:number){
        return this.http.get(environment.apiUrl+'/BasicEnty/GetAllBasicEntry/tableName/'+tableName +'/compId/'+compId);
       }
       getAllDepartmentNew(){
        return this.http.get(environment.apiUrl+'/BasicEnty/getAllDepartment');
       }
       getAllDesignationNew(){
        return this.http.get(environment.apiUrl+'/BasicEnty/getAllDesignation');
       }
       getAllGroupType(){
        return this.http.get(environment.apiUrl+'/BasicEnty/getAllGroupType');
       }
       getAllSection(){
        return this.http.get(environment.apiUrl+'/BasicEnty/getAllSection');
       }
       getBasicEntryName(){
         return this.http.get(environment.apiUrl+'/BasicEnty/GetBasicEntry')
       }

       //getYearName
       getYearNameByYearType(yearNAme){
         return this.http.post(environment.apiUrl+'/BasicEnty/getYearByType',yearNAme)
       }
  }
