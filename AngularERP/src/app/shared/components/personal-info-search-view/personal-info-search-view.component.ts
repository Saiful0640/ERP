import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MemberPersonalInfo } from '../../../models/member-personal-info';
import { AuthService } from '../../../services/auth.service';
import { MemberPersonalInfoService } from '../../../services/member-personal-info.service';

@Component({
  selector: 'app-personal-info-search-view',
  templateUrl: './personal-info-search-view.component.html',
  styleUrls: ['./personal-info-search-view.component.scss']
})
export class PersonalInfoSearchViewComponent implements OnInit {
  @Input() memberID:number;
  @Input() moduleId:number;
  @Output() selectEvent = new EventEmitter<any>();
  compId:number;
   memSearch: MemberPersonalInfo = new MemberPersonalInfo();
  memberInfo:any[]=[];
  filteredMember:any[]=[];
  constructor(
    private modalService:NgbModal,
    private memPersonalService:MemberPersonalInfoService,
  ) { }

  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.moduleId=AuthService.CurrentModuleId;
    this.getAllAssMemberInfo();
  }
  onSearchClick(searchModal: any) {
    this.memSearch.memberName = '';
    //this.fdbcSearchKeys.idenNo = null;
    this.modalService.open(searchModal, {size: 'lg', windowClass: 'modal-xl'});
  }
  getAllAssMemberInfo(){
    this.memPersonalService.getAllEmployeeInfo().subscribe((response:any)=>{
      if(response){
        console.log(response)
        this.memberInfo=response.filter(c=>c.moduleID==this.moduleId);
        this.filteredMember = response.filter(c=>c.moduleID==this.moduleId);
      }else
      {
        this.memberInfo=[];
      }
    })
  }
  /* filterAssMemberInfo(memberName: string) {
    if(memberName != null ){
      let filterAg = this.memberInfo.filter(c => c.memberName.toLowerCase().match(memberName.toLowerCase()));
      this.filteredMember=filterAg;
    }else{
    }
   } */
  onSelect(model: any) {
    this.selectEvent.emit(model);
    this.cancel();
  }

  cancel(){
    this.modalService.dismissAll();

  }
  onSearch(searchKey:string) {
    if (searchKey && searchKey!='') {
      this.filteredMember = this.memberInfo.filter(c =>
        this.isNull(c.memberName).toLowerCase().match(searchKey.toLowerCase()) ||
        this.isNull(c.memberCode).toLowerCase().match(searchKey.toLowerCase()) ||
        this.isNull(c.mobileNo).toLowerCase().match(searchKey.toLowerCase())
      )
    } else {
      this.filteredMember = this.memberInfo;
    }
  }
  isNull(value){
    return value?value:'';
  }
}
