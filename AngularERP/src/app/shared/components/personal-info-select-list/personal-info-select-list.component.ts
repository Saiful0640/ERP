import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../services/auth.service';
import { MemberPersonalInfoService } from '../../../services/member-personal-info.service';

@Component({
  selector: 'app-personal-info-select-list',
  templateUrl: './personal-info-select-list.component.html',
  styleUrls: []
})
export class PersonalInfoSelectListComponent implements OnInit {

  constructor(
    private memPersonalInfoService:MemberPersonalInfoService,
    public modalService:NgbModal,
  ) { }
  memberOrEmployeeImfoModel:any[]=[];
  @Input() isSearchBtnHide=false;
  @Input() isInvalid:boolean = false;
  @Input() memberId:number;
  @Output() onChange=new EventEmitter<any>();
  compId:number;
  moduleId:number;
  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.moduleId=AuthService.CurrentModuleId;
    this.getAllAssMemberInfo();
  }
  onSelect(personalInfo:any){
    if(personalInfo==null){
      this.onChange.emit({id:null, name:null});
      return;
    }
    this.onChange.emit(personalInfo);
  }
  getAllAssMemberInfo(){  
    this.memPersonalInfoService.getAllEmployeeInfo().subscribe((response:any)=>{
      if(response){
        //this.moduleId
        
        this.memberOrEmployeeImfoModel=response;
      }else
      {
        this.memberOrEmployeeImfoModel=[];
      }
    })
  }
  onSearchBtnClick(memberId:number){
    this.memberId=memberId;

    //let emp = this.employees.find(c=>c.empCode==empCode);
    //this.onSelect(emp);
  }
}
