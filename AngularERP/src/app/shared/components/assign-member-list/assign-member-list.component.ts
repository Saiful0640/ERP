import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../../services/auth.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AssignCriteriaService } from '../../../services/assign-criteria.service';
import { CriteriaCenterService } from '../../../services/criteria-center.service';

@Component({
  selector: 'app-assign-member-list',
  templateUrl: './assign-member-list.component.html',
  styleUrls: ['./assign-member-list.component.scss']
})
export class AssignMemberListComponent implements OnInit {

  constructor(
    private modalService: NgbModal,
    private assignCriteriaService:AssignCriteriaService,
    private toasterService:ToastrService,
    private criteriaService:CriteriaCenterService,
  ) { }
    compId:number;
    moduleId:number;
    @Input() detailsId:number=0;
    assignedCriteria:any[]=[];
    filterAssignedCriteria:any[]=[];
    criteriaType:any[]=[];
    fstlabelName:string;
    sndlableName:string;
    thrdlableName:string;
    @Output() selectEvent = new EventEmitter<any>();
  ngOnInit() {
   this.compId=AuthService.CompanyId;
   this.moduleId=AuthService.CurrentModuleId;
   this.getAssignListList();
   this.getAllCriteriaTypeByModuleId();
  }
  onSelect(ass:any){
    this.selectEvent.emit(ass);
    this.cancel();
   }
  getAllCriteriaTypeByModuleId(){
    this.criteriaService.getAllCriteriaTypeByModuleId(this.moduleId,this.compId).subscribe((types:any)=>{
      if(types.status){
        this.criteriaType=types.result;
        if(this.criteriaType.length>2){
        this.fstlabelName=this.criteriaType.find(c=>c.criteriaID==1).criteriaCaption;
         this.sndlableName=this.criteriaType.find(c=>c.criteriaID==2).criteriaCaption;
         this.thrdlableName=this.criteriaType.find(c=>c.criteriaID==3).criteriaCaption;
        }else if(this.criteriaType.length>1){
          this.fstlabelName=this.criteriaType.find(c=>c.criteriaID==1).criteriaCaption;
          this.sndlableName=this.criteriaType.find(c=>c.criteriaID==2).criteriaCaption;
        }else{
          this.fstlabelName=this.criteriaType.find(c=>c.criteriaID==1).criteriaCaption;
        }
      }
      else{
        this.criteriaType=[]
      }
    })
  }
  getAssignListList(){
    this.assignCriteriaService.getAssignedCriteria(this.compId,this.moduleId)
    .subscribe((response: any) => {
      if (response.status) {
        if(this.detailsId>0){
          this.assignedCriteria = (response.result as any[]).filter(c=>c.unitID==this.detailsId);
          this.filterAssignedCriteria=(response.result as any[]).filter(c=>c.unitID==this.detailsId);
        }else{
          this.assignedCriteria = response.result as any[];
          this.filterAssignedCriteria=response.result as any[];
          console.log(this.assignedCriteria)
         }
      }
    },(err:any)=>{
      this.toasterService.error(err.error,"Failed!")
    })
  }
  filterAssignListList(searchKey: string) {
    if (searchKey && searchKey!='') {
      this.filterAssignedCriteria = this.assignedCriteria.filter(dbook =>
        this.isNull(dbook.memberCode).toLowerCase().match(searchKey.toLowerCase()) ||
        this.isNull(dbook.memberName).toLowerCase().match(searchKey.toLowerCase()) ||
        this.isNull(dbook.building).toLowerCase().match(searchKey.toLowerCase())
      )

    } else {
      this.filterAssignedCriteria = this.assignedCriteria;
    }
   }
   isNull(value){
    return value?value:'';
  }
  cancel(){
    this.modalService.dismissAll();
  }
}
