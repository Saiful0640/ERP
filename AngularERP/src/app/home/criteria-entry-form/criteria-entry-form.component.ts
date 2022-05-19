import { AuthService } from './../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CriteriaCenterService } from './../../services/criteria-center.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { CriteriaEntry } from '../../models/criteria-entry.model';

@Component({
  selector: 'app-criteria-entry-form',
  templateUrl: './criteria-entry-form.component.html',
  styleUrls: ['./criteria-entry-form.component.scss']
})
export class CriteriaEntryFormComponent implements OnInit {
  criteriEntryForm:FormGroup;
  compID:number;
  @Input() moduleID:number;
  entryCriteria:any[]=[];
  btnStatus:string="Save"
 @Input()title:string;

 constructor(

    private formBuilder:FormBuilder,
    private criteriaService:CriteriaCenterService,
    private toasterService:ToastrService
  ) { }

  ngOnInit() {
    this.compID=AuthService.CompanyId;
    this.moduleID=AuthService.CurrentModuleId
    this.createForm();
    this.getAllEntryCriteria();
  }

  createForm(){
this.criteriEntryForm=this.formBuilder.group({
id:[0,[]],
criteriaID :[,[]],
criteriaCaption :['',[]],
moduleID :[this.moduleID,[]],
isActive :[,[]],
compID :[this.compID,[]]
})
}
getAllEntryCriteria()
{
  this.criteriaService.getAllEntryCriteria(this.compID,this.moduleID).subscribe((res:any[])=>{
if(res)
{
  console.log(res)
this.entryCriteria=res as any[];
}
else
{
  this.entryCriteria=[];
}
  })
}
saveCriteriaEntry(){
  let criteriaForm=new CriteriaEntry();
  criteriaForm=this.criteriEntryForm.value;
  if(this.f.isActive.value==true)
  {
    criteriaForm.isActive=1
  }
  else{ criteriaForm.isActive=0}
  console.log(criteriaForm)
this.criteriaService.saveCriteriaEntry(criteriaForm).subscribe((res:any)=>{
if(res.status)
{
  this.btnStatus="Save"
  this.toasterService.success(res.message);
  this.reset();
  this.getAllEntryCriteria();

}
else{
  this.toasterService.error(res.message)
}
})
}
edit(criteriaId)
{

let criteria=this.entryCriteria.find(c=>c.id==criteriaId);
this.criteriEntryForm.patchValue(criteria);
this.btnStatus="Update"

}
get f()
{
 return this.criteriEntryForm.controls;
}
get formVal()
{
 return this.criteriEntryForm.value;
}
reset(){
this.btnStatus="Save";
  this.criteriEntryForm.reset();
  this.createForm();
}
}
