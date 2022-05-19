import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CriteriaCenterModel } from '../../../../models/criteria-center-model';
import { AuthService } from '../../../../services/auth.service';
import { CriteriaCenterService } from '../../../../services/criteria-center.service';
import { SettingService } from '../../../../services/settings/Setting.service';
import { NgbDateCustomParserFormatter } from '../../../../shared/dateformat';
import { Helper } from '../../../../shared/helper';

@Component({
  selector: 'app-assign-branch',
  templateUrl: './assign-branch.component.html',
  styleUrls: ['./assign-branch.component.scss']
})
export class AssignBranchComponent implements OnInit {


  @Input() moduleId:number;
  compId:number;
  currentModuleId:number
  branchForm:FormGroup;
  btnStatus : string="Save";
  typelst:any[]=['Branch','Floor Production'];
  title:string;
  pageId:number;
  userId:number=AuthService.UserId;
  isSaving:boolean=false;
  lstbranchname:any[]=[];
  filterlstbranchname:any[]=[];
    constructor(
      private formBuilder:FormBuilder,
      private _settingservice:SettingService,
      private toasterService:ToastrService,
    public dateFormat: NgbDateCustomParserFormatter,

      ) { }

    ngOnInit() {
      this.compId=AuthService.CompanyId;
      this.pageId=AuthService.CurrentPageId;
      this.createForm();
      this.getAllBranch();

    }
    getAllBranch(){
      this._settingservice.getAllBranchName(this.branchForm.value).subscribe((response:any)=>{
        if(response.status){
          this.lstbranchname=response.result as any[];
          this.filterlstbranchname=response.result as any[];

          console.log("Response",this.lstbranchname);
        }
      })

    }

    branchType(type){
      if(type){
        this.branchForm.patchValue({
          type:type
        });
      }
    }

    saveBranch(){
      if(this.f.type.value=="Branch" ){
        this.branchForm.patchValue({
          type:1
        });

      }
      else if(this.f.type.value=="Floor Production" ){
        this.branchForm.patchValue({
          type:2
        });

      }
      else{
        this.branchForm.patchValue({
          type:0
        });
      }
      this._settingservice.saveBranchName(this.branchForm.value).subscribe((response:any)=>{
        if(response.status){
          this.toasterService.success(response.result);
          this.reset();
        }
        else{
          this.toasterService.error(response.result);

        }
      },er=>{
        this.toasterService.error(er.ex);
      })
    }
    onSearch(searchKey: string) {
      if (searchKey) {
        this.lstbranchname = this.filterlstbranchname.filter(criteria => (
          (criteria.name as string).toLocaleLowerCase().match(searchKey.toLocaleLowerCase())
          // ||(Helper.isNullOrEmpty(criteria.description) ? '' : criteria.description as string)
          // .toLocaleLowerCase().match(searchKey.toLocaleLowerCase())
        ))
      } else {
        this.lstbranchname = this.filterlstbranchname;
      }
    }
    edit(ct:any){
      this.btnStatus="Update";
      this.branchForm.patchValue(ct);
      if(this.f.type.value==1 ){
        this.branchForm.patchValue({
          type:"Branch"
        });

      }
      else if(this.f.type.value==2 ){
        this.branchForm.patchValue({
          type:"Floor Production"
        });

      }

    }
      reset() {
       this.isSaving=false;
        this.btnStatus = "Save";
        this.branchForm.reset();
        this.createForm();
        this.getAllBranch();
      }

    createForm(){
      this.branchForm=this.formBuilder.group({
        iD:[0,[]],
        compId  :[this.compId,[]],
        type:[,[]],
        name:[,[]],
        shortName:[,[]],
        contactNo:[,[]],
        address:[,[]],
        entryDate:[new Date(),[]],
        createdBy:[this.userId,[]],
        criteriaId:[,[]],
      })
    }
    get f(){
      return this.branchForm.controls
    }
    get formVal(){
      return this.branchForm.value;
    }
}
