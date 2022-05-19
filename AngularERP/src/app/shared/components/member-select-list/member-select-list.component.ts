import { AuthService } from '../../../services/auth.service';
import { FormBuilder } from '@angular/forms';
import { SettingService } from '../../../services/settings/Setting.service';
import { Component, OnInit, EventEmitter, Input, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EmpSearchModel } from '../../../models/hr/empSearch.model';
import { MemberPersonalInfoService } from '../../../services/member-personal-info.service';

@Component({
  selector: 'app-member-select-list',
  templateUrl: './member-select-list.component.html',
  styleUrls: []
})
export class MemberSelectListComponent implements OnInit {
  @Input() isSearchBtnHide:boolean=false;
  @Input() isRequired:boolean=false;
  @Input() fixedWidth:string='250px';
  @Input() memberCode:string;
  @Input() moduleId:number;
  @Input() employees:EmpSearchModel[]=[];
  compId:number ;
  branchId:number;
  @Output() onChange = new EventEmitter<EmpSearchModel>();
  isLoading:boolean;

  constructor(
    private memPersonalService:MemberPersonalInfoService,
    private empService:SettingService,
    public modalService:NgbModal,
    private fb:FormBuilder
  ) { }

  ngOnInit() {
    // this.compId=AuthService.CompanyId;
    // this.branchId=AuthService.BranchId
    if(this.employees.length==0){
    this.getEmployees();
    }
  }

  // getEmployees(){
  //   this.empService.getAllMemberByModuleCompany(this.moduleId,this.compId).subscribe((result:any)=>{
  //     if(result){
  //       this.employees = result.reasult as EmpSearchModel[];
  //     }
  //     this.isLoading = false;
  //   })
  // }
  getEmployees(){
    this.memPersonalService.getAllEmployeeInfo().subscribe((result:any)=>{
      if(result){
        this.employees = result as EmpSearchModel[];
      }
      this.isLoading = false;
    })
  }

  onSelect(memberCode:any){
    if(memberCode==null || memberCode==''){
      this.onChange.emit(new EmpSearchModel());
    }else{
      this.onChange.emit(memberCode);
    }
  }

  onSearchBtnClick(memberCode:any){
    this.memberCode=memberCode;
    let emp = this.employees.find(c=>c.memberCode==memberCode);
    this.onSelect(emp);
  }
  getMemberByID(assMembers: any) {
    console.log(assMembers);
  }

}
