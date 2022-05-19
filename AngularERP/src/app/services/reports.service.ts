import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportsService {

  constructor(private http:HttpClient) { }

  openFileWindow(file: Blob, fileName?: string, save: Boolean = false) {
    console.log(file,"Blob")
    const data = new Blob([file], { type: file.type })
    const nav = (window.navigator as any);
    if (nav.msSaveOrOpenBlob) {
      nav.msSaveOrOpenBlob(data, fileName);
    } else {
      var objectUrl = URL.createObjectURL(data);
      window.open(objectUrl);

      if (save) {
        var fileLink = document.createElement('a');
        fileLink.href = objectUrl;
        fileLink.download = this.getUniqueStr(fileName);

        fileLink.click();
      }
    }
  }
  private getUniqueStr(fileName: string) {
    let date = new Date();
    let y = date.getFullYear();
    let m = (date.getMonth() + 1).toString().padStart(2, '0');
    let d = date.getDate().toString().padStart(2, '0');
    let h = date.getHours().toString().padStart(2, '0');
    let min = date.getMinutes().toString().padStart(2, '0');
    let s = date.getSeconds().toString().padStart(2, '0');
    fileName = fileName ? fileName + '_' : '';
    return fileName + y + '' + m + '' + d + '' + h + '' + min + '' + s;
  }
  ///Daybook
  getDaybookForReport(startdate:string,enddate:string,vouchertype:string,accountId:number){
  return this.http.get(environment.apiUrl +'/report/daybookReport/'+startdate+'/'+enddate+'/'+vouchertype+'/'+accountId );
}
  getDaybookPDFReport(startdate:string,enddate:string,vouchertype:string,accountId:number){
    
    return this.http.get(environment.apiUrl +'/report/daybook/export/pdf/'+startdate+'/'+enddate+'/'+vouchertype+'/'+accountId ,{responseType: 'blob'});
  }
  getLeavePDFReport(year:number,empCode:string){
    
    return this.http.get(environment.apiUrl +'/leavereport/LeaveReport/export/pdf/'+year+'/'+empCode ,{responseType: 'blob'});
  }
}
