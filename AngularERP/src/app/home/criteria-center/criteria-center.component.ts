import { CriteriaCenterModel } from './../../models/criteria-center-model';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { CriteriaCenterService } from '../../services/criteria-center.service';
import { Helper } from '../../shared/helper';

@Component({
  selector: 'app-criteria-center',
  templateUrl: './criteria-center.component.html',
  styleUrls: ['./criteria-center.component.scss']
})
export class CriteriaCenterComponent implements OnInit {

@Input() moduleId:number;
//moduleID:number;
compId:number;
currentModuleId:number
criteriaCenterForm:FormGroup;
btnStatus : string="Save";
lableNameTwo:string;
lableNameThree:string;
criteriaType:any[]=[];
criteriaItemForTypeTwo:any[]=[];
criteriaItemForTypeThree:any[]=[];
criteriaAllArea:any[]=[];
title:string;
filteredCriteria: any[] = [];
pageId:number;
isSaving:boolean=false;
  constructor(
    private formBuilder:FormBuilder,
    private criteriaService:CriteriaCenterService,
    private toasterService:ToastrService
    ) { }

  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.moduleId=AuthService.CurrentModuleId;
    this.createForm()
    this.getAllCriteriaTypeByModuleId();
  }
  getAllCriteriaTypeByModuleId(){
    this.criteriaService.getAllCriteriaTypeByModuleIdNew().subscribe((types:any)=>{
      if(types){
       /// this.moduleId,this.compId
        this.criteriaType=types.filter(c=>c.moduleId==this.moduleId);
          if(this.criteriaType.length>0){
            if(this.criteriaType.length>2){
              this.lableNameTwo=this.criteriaType.find(c=>c.id==1).criteriaCaption;
              this.lableNameThree=this.criteriaType.find(c=>c.id==2).criteriaCaption;
            }else {
              this.lableNameTwo=this.criteriaType.find(c=>c.id==1).criteriaCaption;
            }
          }
      }
      else{
        this.criteriaType=[]
      }
    })
  }
  getAllCriteriaCenter(){
    if(this.f.parentId.value==null){
      this.f.parentId.setValue(0)
    }
    if(this.criteriaCenterForm.controls.criteriaId.value==null){
    return;
    }
    this.criteriaService.getAllCriteriaCenterNew().subscribe((response:any)=>{
      if(response){
        ///moduleId:number,compId:number,criteriaID:number=0
        this.criteriaAllArea=response.map(c=>{
          if(c.criteriaId==3){
            c.superUnderDetailsCaption=response.find(y=>y.id==c.underCriteriaId).detailsCaption
            
          }else if(c.criteriaId==2){
            c.underDetailsCaption=response.find(y=>y.id==c.parentId).detailsCaption
          }else{
            c.detailsCaption=c.detailsCaption
          }
          return c;
        });
        this.filteredCriteria=response.map(c=>{
          if(c.criteriaId==3){
            c.superUnderDetailsCaption=response.find(y=>y.id==c.underCriteriaId).detailsCaption
            
          }else if(c.criteriaId==2){
            c.underDetailsCaption=response.find(y=>y.id==c.parentId).detailsCaption
          }else{
            c.detailsCaption=c.detailsCaption
          }
          return c;
        });
      }
      else{
        this.criteriaAllArea=[]
      }
    })
  }
  onSearch(searchKey: string) {
    if (searchKey) {
      this.filteredCriteria = this.criteriaAllArea.filter(criteria => (
        (criteria.detailsCaption as string).toLocaleLowerCase().match(searchKey.toLocaleLowerCase())
        // ||(Helper.isNullOrEmpty(criteria.description) ? '' : criteria.description as string)
        // .toLocaleLowerCase().match(searchKey.toLocaleLowerCase())
      ))
    } else {
      this.filteredCriteria = this.criteriaAllArea;
    }
  }

  ///this function for Area And Name Select list
  getCriteriaTwo(criteriaId:number){
    if(criteriaId==null || criteriaId===undefined || criteriaId==0){
      return;
    }
    else{
      this.criteriaService.getAllCriteriaAreaByCriteriaIdNew().subscribe((response:any)=>{
      if(response){
        //1,this.compId,this.moduleId///criteriaId:number,compId:number,moduleId:number
        this.criteriaItemForTypeTwo=response.filter(c=>c.criteriaId==1);
        this.getAllCriteriaCenter();

      }
      else{
        this.criteriaItemForTypeTwo=[]
      }
    })
    }
  }
  getCriteriaThree(parentID:number){
    // this.lableNameThree=this.criteriaType.find(c=>c.criteriaID==2).criteriaCaption;
    // let object=new CriteriaCenterModel();
    // object.criteriaID=2;
    // object.parentID=parentID;
    // object.compID=this.compId;
    // object.moduleID=this.moduleId;
    this.criteriaService.getAllCriteriaCenterNew().subscribe((response:any)=>{
      if(response){
        //object
        this.criteriaItemForTypeThree=response.filter(c=>{return c.parentId==parentID && c.criteriaId==2});
      }
      else{
        this.criteriaItemForTypeThree=[]
      }
    })
  }

  saveCriteriaCenter() {
    this.btnStatus="Save";
    this.isSaving=true;
    if(this.f.parentId.value==null){
      this.f.parentId.setValue(0)
    }
     this.criteriaService.saveCriteriaCenterNew(this.criteriaCenterForm.value).subscribe((response: any) => {
       if (response) {
         this.toasterService.success("Saved", "Success!");
         this.getAllCriteriaCenter();
       } else {
         this.toasterService.error("Saved", "Failed!");
         this.getAllCriteriaCenter();
       }
       this.reset();
     },(err:any)=>{
      this.toasterService.error(err.error, "Error!");
      this.isSaving=false;
     })
   }
   edit(criteria){
     this.btnStatus="Update";
     if(criteria.criteriaID==3){
       this.getCriteriaThree(criteria.superUnderCriteriaID);
      this.criteriaCenterForm.patchValue({
        detailsId   :criteria.detailsID,
        criteriaId  :criteria.criteriaID,
        detailsCaption :criteria.detailsCaption,
        parentId  :criteria.parentID,
        accountId  :criteria.accountID,
        moduleId  :criteria.moduleID,
        compId  :criteria.compID,
        detailsNote:criteria.detailsNote,
        flatSize:criteria.flatSize,
        underCriteriaId:criteria.superUnderCriteriaID,
        noticePeriodId:criteria.noticePeriodId,
        superUnderDetailsCaption:criteria.superUnderDetailsCaption,
        underDetailsCaption:criteria.underDetailsCaption
      })
     }else{
    this.criteriaCenterForm.patchValue({
      detailsId   :criteria.detailsID,
      criteriaId  :criteria.criteriaID,
      detailsCaption :criteria.detailsCaption,
      parentId  :criteria.parentID,
      accountId  :criteria.accountID,
      moduleId  :criteria.moduleID,
      compId  :criteria.compID,
      detailsNote:criteria.detailsNote,
      flatSize:criteria.flatSize,
      underCriteriaId:criteria.underCriteriaID,
      noticePeriodId:criteria.noticePeriodId,
      underDetailsCaption:criteria.underDetailsCaption
    })
  }
   }
   onSelectPeriod(periods:any){
    this.criteriaCenterForm.patchValue({
      noticePeriodId:periods.id
    })
  }
    reset() {
     // this.isSubmitted = false;
     this.isSaving=false;
      this.btnStatus = "Save";
      this.criteriaCenterForm.reset();
      this.createForm();
      this.filteredCriteria=[];
      //this.getAllServiceName();
    }

  createForm(){
    this.criteriaCenterForm=this.formBuilder.group({
      detailsId   :[0,[]],
      criteriaId  :[,[]],
      detailsCaption :[,[]],
      parentId  :[,[]],
      accountId  :[0,[]],
      moduleId  :[this.moduleId,[]],
      compId  :[this.compId,[]],
      detailsNote:[,[]],
      underCriteriaId:[,[]],
    })
  }
  get f(){
    return this.criteriaCenterForm.controls
  }
  get formVal(){
    return this.criteriaCenterForm.value;
  }
}
