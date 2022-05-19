import { forEach } from '@angular/router/src/utils/collection';
import { animate, transition, trigger, useAnimation } from '@angular/animations';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AssignCriteriaService } from '../../services/assign-criteria.service';
import { AuthService } from '../../services/auth.service';
import { CriteriaCenterService } from '../../services/criteria-center.service';
import { hide, show } from '../../shared/animations';
import { Helper } from '../../shared/helper';
import { AssignCriteriaModel } from '../../models/assign-criteria.model';
import { ServiceAmountSetupService } from '../../services/service-amount-setup.service';
import { AssignCriteria } from '../../models/payroll/assign-criteria';

@Component({
  selector: 'app-assign-criteria',
  templateUrl: './assign-criteria.component.html',
  styleUrls: ['./assign-criteria.component.scss',],
  animations: [
    trigger('listAnimation', [
      transition(':enter', [
        useAnimation(show, {
          params: {
            duration: '2000ms'
          }
        }),
        animate(200),
      ]),
      transition(':leave', [
        useAnimation(hide, {
          params: {
            duration: '2000ms'
          }
        }),
        animate(200)
      ])
    ])
  ]
})
export class AssignCriteriaComponent implements OnInit {
   title:string;
    moduleId:number;
  @Input() memberId:number;
  assignCriteriaForm:FormGroup;
  // serviceNameModel:any[]=[];
  criteriaAllArea:any[]=[];
  assMemberInfo:any[]=[];
  filteredAssMember:any[]=[];
  assignCriteriaModel:any[]=[];
  serviceNames:any[]=[];
  isSubmitted:boolean=false;
  criteriaForms: FormArray;
  assignServiceArry: FormArray;
  compId:number;
  btnStatus = 'Save';
  ///
  parentDetailsItems:any[]=[];
subDetailsItems:any[]=[];
superSubDetailsItems:any[]=[];
fstlabelName:string;
sndlableName:string;
thrdlableName:string;
pageId:number;
criteriaType:any[]=[];
  constructor(
    private formBuilder:FormBuilder,
    private toasterService:ToastrService,
    private criteriaService:CriteriaCenterService,
    private assignCriteriaService:AssignCriteriaService,
    private serviceAmtService:ServiceAmountSetupService,
    private modalService:NgbModal,
  ) {
      this.criteriaForms = this.formBuilder.array([]);
      this.assignServiceArry = this.formBuilder.array([]);
  }

  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.moduleId=AuthService.CurrentModuleId;
    this.pageId=AuthService.CurrentPageId;
    this.getAllCriteriaTypeByModuleId();
    this.createForm();
    this.getCriteria();
  }
  onSelectAssignList(assignList:any){
    if(assignList.unitID>0){
     this.f.detailsID.patchValue(assignList.unitID);
      this.onSelectCriteria(assignList.buildingID);
      this.onSelectSubCriteria(assignList.floorID);
    }else if(assignList.unitID==0 && assignList.floorID>0){
      this.f.detailsID.patchValue(assignList.floorID);
      this.onSelectCriteria(assignList.buildingID);
    }else{
      this.f.detailsID.patchValue(assignList.buildingID);
    }
    this.onSelectMemberInfo(assignList);
     this.assignCriteriaForm.patchValue({
      stuRollNo:assignList.stuRollNo,
      underCriteriaID:assignList.floorID,
      parentID:assignList.buildingID,
      isActive:assignList.isActive,
    })

  }
    onSelectMemberInfo(memList:any){
      this.assignCriteriaForm.patchValue({
        memberID:memList.id,
      })
     this.onSelectMember(memList.id)
    }
    onShowAssigned(event:any){
      if(event !=null){
        this.modalService.open(event,{size: 'lg', windowClass: 'my-class'});
      }
    }
    onSelectMember(memberID: number) {
      if (!memberID) { return; }
      this.assignCriteriaService.getIndividualAssignCriteriaNew(this.moduleId,this.f.detailsID.value,memberID)
      .subscribe((response: any) => {
          if (response) {
            console.log(response)
            let assignedCriteria = response as any[];
            if(assignedCriteria.length>0){
            this.assignServiceArry=this.formBuilder.array([]);
            assignedCriteria.forEach(item=>{
              this.assignServiceArry.push(
                new FormGroup({
                  id:new FormControl(item.id,[]),
                  serviceAccountID:new FormControl(item.serviceAccountID,[]),
                  serviceName:new FormControl(item.serviceName),
                  processType:new FormControl(item.processType),
                    amount:new FormControl(item.amount,[])})
              )})
            }
          }

        })
    }
    getAllCriteriaTypeByModuleId(){
      this.criteriaService.getAllCriteriaTypeByModuleIdNew().subscribe((types:any)=>{
        if(types){
          // this.moduleId,this.compId
          this.criteriaType=types.filter(c=>c.moduleId==this.moduleId);
          if(this.criteriaType.length>2){
          this.fstlabelName=this.criteriaType.find(c=>c.id==1).criteriaCaption;
           this.sndlableName=this.criteriaType.find(c=>c.id==2).criteriaCaption;
           this.thrdlableName=this.criteriaType.find(c=>c.id==3).criteriaCaption;
          }else if(this.criteriaType.length>1){
            this.fstlabelName=this.criteriaType.find(c=>c.id==1).criteriaCaption;
            this.sndlableName=this.criteriaType.find(c=>c.id==2).criteriaCaption;
          }else{
            this.fstlabelName=this.criteriaType.find(c=>c.id==1).criteriaCaption;
          }
        }
        else{
          this.criteriaType=[]
        }
      })
    }
    getCriteria() {
      this.criteriaService.getDetailsCriteriaCenter(this.moduleId,1,0)
      .subscribe((response: any) => {
        if (response) {
          //this.moduleId,this.compId,1
       this.parentDetailsItems=response;
       if(this.parentDetailsItems.length>0){
         for(let i=0;this.parentDetailsItems.length>i;i++){
           this.criteriaService.getDetailsCriteriaCenter(this.moduleId,2,this.parentDetailsItems[i].id).subscribe((subresponse:any)=>{
             if(subresponse){
              this.parentDetailsItems[i].subCriteria=subresponse;
              if(this.parentDetailsItems[i].subCriteria.length>0){
                for(let subi=0;this.parentDetailsItems[i].subCriteria.length>subi;subi++){
                  this.criteriaService.getDetailsCriteriaCenter(this.moduleId,3,this.parentDetailsItems[i].subCriteria[i].id).subscribe((supersubres:any)=>{
                    if(supersubres){
                      this.parentDetailsItems[i].subCriteria[i].subCriteria=supersubres;
                    }
                  })
                }
              }
             }
           })
         }
       }
       console.log(this.parentDetailsItems)
      }
      },(err:any)=>{
        this.toasterService.error(err.error,"Failed!")
      })
    }
    onSelectCriteria(parentId: number ) {
      if(parentId !=null){
        let subDetailsItems=this.parentDetailsItems.find(crt => crt.id == parentId).subCriteria;
        if( subDetailsItems.length>0){
          this.subDetailsItems=subDetailsItems;
        }else{
          this.f.detailsID.patchValue(parentId)
           this.getServiceNameByDetailsID(parentId)
        }
        }
    }

    // getCriteria() {
    //   this.criteriaService.getCriteriaCenter(this.moduleId,this.compId,1)
    //     .subscribe((response: any) => {
    //       if (response.status) {
    //      this.createCriteriaForms(response.result) ;
    //     }
    //     })
    // }
    getServiceNameByDetailsID(detailsID:number) {
        if(detailsID ==null){return;}
      this.serviceAmtService.getAllCenServiceAmountNew(this.moduleId,detailsID)
        .subscribe((response: any) => {
          if (response) {
           this.serviceNames=response ;
            this.assignServiceArry=this.formBuilder.array([]);
            this.serviceNames.forEach(item=>{
              this.assignServiceArry.push(
                new FormGroup({
                  id:new FormControl(0,[]),
                  serviceAccountID:new FormControl(item.serviceID,[]),
                  serviceName:new FormControl(item.serviceName),
                  processType:new FormControl(item.processType),
                    amount:new FormControl(item.amount,[])})
              )})
                    }
        })
    }
    onSelectSubCriteria(underCriteriaID: number) {
      if(underCriteriaID !=null){
        let superSubDetailsItems=this.subDetailsItems.find(crt => crt.detailsID == underCriteriaID).subCriteria;
        if( superSubDetailsItems.length>0){
          this.superSubDetailsItems=superSubDetailsItems;
          this.thrdlableName=this.criteriaType.find(c=>c.criteriaID==3).criteriaCaption;
        }else{
          this.f.detailsID.patchValue(underCriteriaID)
           this.getServiceNameByDetailsID(underCriteriaID)
        }
      }
    }
    onSelectSupSubCriteria(detailsId: number) {
       this.getServiceNameByDetailsID(detailsId);
    }

    onSubmit() {    
      var filterassignService=this.assignServiceArry.value.filter(item=>item.serviceAccountID !=null)
        if(filterassignService.length>0){
          this.isSubmitted = true;
         for(let i=0;filterassignService.length>i;i++){
           let assignCriteria=new AssignCriteria();
           assignCriteria.id=this.f.id.value;
           assignCriteria.detailsID=this.f.detailsID.value;
           assignCriteria.moduleID=this.moduleId;
           assignCriteria.memberID=this.f.memberID.value;
           assignCriteria.compID=this.compId;
           assignCriteria.serviceAccountID=filterassignService[i].serviceAccountID;
           assignCriteria.amount=filterassignService[i].amount;
           assignCriteria.status=this.f.status.value;
           assignCriteria.processType=filterassignService[i].processType;
           assignCriteria.accountId=0;
           this.assignCriteriaService.assignCriteriaByMemberIdNew(assignCriteria)
           .subscribe((response: any) => {
             if (response) {
               this.toasterService.success( 'Success');
               this.isSubmitted = false;
               this.reset();
               this.modalService.dismissAll();
             } else {
               this.toasterService.error( 'Failed');
               this.reset();
             }
           },(err:any)=>{
             this.toasterService.error(err.error,"Failed!");
           })
         }
        }    
     else{
        this.toasterService.error("Please Assign Services")
      }
    }
  createForm(){
    this.assignCriteriaForm=this.formBuilder.group({
      id:[,[]] ,
      detailsID   :[,[]],
      memberID:[this.memberId,[]]  ,
      moduleID  :[this.moduleId,[]],
      compID  :[this.compId,[]],
      parentID:[,[]],
      underCriteriaID:[,[]],
      status:[1,[]],
      services:[,[]]
    })
  }
  reset() {
     this.btnStatus = 'Save'
     this.assignCriteriaForm.reset();
     this.createForm();
     this.criteriaForms = this.formBuilder.array([]);
     this.assignServiceArry = this.formBuilder.array([]);
     this.subDetailsItems=[];
     this.superSubDetailsItems=[];
     this.criteriaAllArea=[];
     this.getCriteria();
   }

  get f(){
    return this.assignCriteriaForm.controls
  }
  get formVal(){
    return this.assignCriteriaForm.value;
  }
  onToggle(elementId) {
    let span = document.getElementById(elementId);
    var iconName = span.classList.item(1);
    if (iconName == 'fa-plus-circle') {
      span.classList.remove(iconName)
      span.classList.add('fa-minus-circle')
    } else {
      span.classList.remove('fa-minus-circle')
      span.classList.add('fa-plus-circle')
    }
  }
  cancel(){
    this.modalService.dismissAll();
  }
}
