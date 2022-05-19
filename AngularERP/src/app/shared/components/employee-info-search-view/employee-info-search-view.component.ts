import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MemberPersonalInfo } from '../../../models/member-personal-info';
import { AuthService } from '../../../services/auth.service';
import { SettingService } from '../../../services/settings/Setting.service';

@Component({
  selector: 'app-employee-info-search-view',
  templateUrl: './employee-info-search-view.component.html',
  styleUrls: ['./employee-info-search-view.component.scss']
})
export class EmployeeInfoSearchViewComponent implements OnInit {
  @Input() memberID: number;
  @Input() moduleId: number;
  @Output() selectEvent = new EventEmitter<any>();
  compId: number;
  memSearch: MemberPersonalInfo = new MemberPersonalInfo();
  memberInfo: any[] = [];
  filteredMember: any[] = [];
  constructor(
    private empService: SettingService,
    private modalService: NgbModal,
  ) { }

  ngOnInit() {
    this.compId = AuthService.CompanyId;
    this.getAllAssMemberInfo();
  }
  onSearchClick(searchModal: any) {
    this.memSearch.memberName = '';
    this.modalService.open(searchModal, { size: 'lg', windowClass: 'modal-xl' });
  }
  getAllAssMemberInfo() {
    this.empService.getAllMemberByModuleCompany(this.moduleId, this.compId).subscribe((response: any) => {
      if (response.status) {
        this.memberInfo = response.reasult;
        this.filteredMember = response.reasult;
        console.log( this.memberInfo )
      } else {
        this.memberInfo = [];
      }
    })
  }
  filterAssMemberInfo(memberName: string) {
    if (memberName != null) {
      let filterAg = this.memberInfo.filter(c => c.memberName.toLowerCase().match(memberName.toLowerCase()));
      this.filteredMember = filterAg;
    } else {
    }
  }
  onSelect(model: any) {
    this.selectEvent.emit(model);
    this.cancel();
  }
  cancel() {
    this.modalService.dismissAll();
  }
}
