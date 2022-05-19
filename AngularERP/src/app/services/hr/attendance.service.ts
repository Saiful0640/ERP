import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AttendanceService {
  constructor(private http: HttpClient) { }
  getAttendanceByFilter(memberCode: string, departmentId: number, designationId: number,  periodId: number) {
    // var param = new HttpParams()
    //   .set('memberCode', memberCode)
    //   .set('departmentId', departmentId.toString())
    //   .set('designationId', designationId.toString())
    //   .set('compId', compId.toString())
    //   .set('periodId', periodId.toString())
    return this.http.get(environment.apiUrl + '/Attendance/getAllUspEmpManualAttendence/'+memberCode+'/'+departmentId+'/'+designationId+'/'+periodId)
  }
  saveMenualAttendance(attendance: any) {
    return this.http.post(environment.apiUrl + '/Attendance/SaveMenualAttendance', attendance)
  }
}
