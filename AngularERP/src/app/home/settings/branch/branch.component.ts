import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CriteriaCenterModel } from '../../../models/criteria-center-model';
import { Branch } from '../../../models/settings/branch.model';
import { AuthService } from '../../../services/auth.service';
import { CriteriaCenterService } from '../../../services/criteria-center.service';
import { SettingService } from '../../../services/settings/Setting.service';
import { Helper } from '../../../shared/helper';

@Component({
  selector: 'app-branch',
  templateUrl: './branch.component.html',
  styleUrls: ['./branch.component.scss']
})
export class BranchComponent implements OnInit {


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
      if(this.moduleId==null || this.moduleId===undefined){
        this.moduleId=AuthService.CurrentModuleId;
      }
      else{
        this.moduleId=this.moduleId;
      }

      this.pageId=AuthService.CurrentPageId;
      this.title=Helper.onSetTitleByModuleId(this.moduleId,this.pageId).title;
      console.log(this.moduleId)
      this.createForm()
      this.getAllCriteriaTypeByModuleId();

    }
    getAllCriteriaTypeByModuleId(){
      this.criteriaService.getAllCriteriaTypeByModuleId(3,this.compId).subscribe((types:any)=>{
        if(types.status){
          this.criteriaType=types.result;
        }
        else{
          this.criteriaType=[]
        }
      })
    }
    getAllCriteriaCenter(){
      if(this.f.parentID.value==null){
        this.f.parentID.setValue(0)
      }
      if(this.criteriaCenterForm.controls.criteriaID.value==null){
      return;
      }
      console.log(this.criteriaCenterForm.value);
      this.criteriaService.getAllCriteriaCenter(this.criteriaCenterForm.value).subscribe((response:any)=>{
        if(response.status){
          this.criteriaAllArea=response.result;
          this.filteredCriteria=response.result;
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
        this.lableNameTwo=this.criteriaType.find(c=>c.criteriaID==1).criteriaCaption;
        if(criteriaId !=1){
          this.lableNameThree=this.criteriaType.find(c=>c.criteriaID==2).criteriaCaption;
        }
        this.criteriaService.getAllCriteriaAreaByCriteriaId(1,this.compId,this.moduleId).subscribe((response:any)=>{
        if(response.status){
          this.criteriaItemForTypeTwo=response.result;
        }
        else{
          this.criteriaItemForTypeTwo=[]
        }
      })
      }
    }
    getCriteriaThree(parentID:number){
      this.lableNameThree=this.criteriaType.find(c=>c.criteriaID==2).criteriaCaption;
      let object=new CriteriaCenterModel();
      object.criteriaID=2;
      object.parentID=parentID;
      object.compID=this.compId;
      object.moduleID=this.moduleId;
      this.criteriaService.getAllCriteriaCenter(object).subscribe((response:any)=>{
        if(response.status){
          this.criteriaItemForTypeThree=response.result;
        }
        else{
          this.criteriaItemForTypeThree=[]
        }
      })
    }

    saveCriteriaCenter() {
      this.btnStatus="Save";
      this.isSaving=true;
      if(this.f.parentID.value==null){
        this.f.parentID.setValue(0)
      }
       this.criteriaService.saveCriteriaCenter(this.criteriaCenterForm.value).subscribe((response: any) => {
         if (response.status) {
           this.toasterService.success(response.result, "Success!");
           this.getAllCriteriaCenter();
         } else {
           this.toasterService.error(response.status, "Failed!");
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
          detailsID   :criteria.detailsID,
          criteriaID  :criteria.criteriaID,
          detailsCaption :criteria.detailsCaption,
          parentID  :criteria.parentID,
          accountID  :criteria.accountID,
          moduleID  :criteria.moduleID,
          compID  :criteria.compID,
          detailsNote:criteria.detailsNote,
          flatSize:criteria.flatSize,
          underCriteriaID:criteria.superUnderCriteriaID,
          noticePeriodId:criteria.noticePeriodId,
          superUnderDetailsCaption:criteria.superUnderDetailsCaption,
          underDetailsCaption:criteria.underDetailsCaption
        })
       }else{
      this.criteriaCenterForm.patchValue({
        detailsID   :criteria.detailsID,
        criteriaID  :criteria.criteriaID,
        detailsCaption :criteria.detailsCaption,
        parentID  :criteria.parentID,
        accountID  :criteria.accountID,
        moduleID  :criteria.moduleID,
        compID  :criteria.compID,
        detailsNote:criteria.detailsNote,
        flatSize:criteria.flatSize,
        underCriteriaID:criteria.underCriteriaID,
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
        detailsID   :[0,[]],
        criteriaID  :[,[]],
        detailsCaption :[,[]],
        parentID  :[,[]],
        accountID  :[0,[]],
        moduleID  :[this.moduleId,[]],
        compID  :[this.compId,[]],
        detailsNote:[,[]],
        flatSize:[,[]],
        underCriteriaID:[,[]],
        noticePeriodId:[,[]],
        notice:[,[]],

      })
    }
    get f(){
      return this.criteriaCenterForm.controls
    }
    get formVal(){
      return this.criteriaCenterForm.value;
    }
}
