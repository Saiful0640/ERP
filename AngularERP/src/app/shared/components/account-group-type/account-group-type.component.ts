import { AccountingBasicEntryService } from './../../../services/accounting/accounting-basic-entry.service';
import { GroupAccountModel } from './../../../models/accounting/basic-entry/group-account-model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { FormGroup, FormBuilder } from '@angular/forms';

import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { AuthService } from '../../../services/auth.service';
@Component({
  selector: 'app-account-group-type',
  templateUrl: './account-group-type.component.html',
  styleUrls: ['./account-group-type.component.scss']
})
export class AccountGroupTypeComponent implements OnInit {

  constructor(private accountGroupType:AccountingBasicEntryService,
    private toasterService:ToastrService,
    private formBuilder:FormBuilder,
    private modalService:NgbModal) { }
    accountGroupForm:FormGroup;
    createdBy:number;
    compID:number;
    @Input() lowerGroupID:number;
    @Output() onAdd=new EventEmitter<GroupAccountModel[]>();


  ngOnInit() {
    this.compID=AuthService.CompanyId;
    this.createdBy=AuthService.UserId;
    this.createForm();
  }

  saveAccountGroup(){
    this.accountGroupType.saveAccountGroup(this.accountGroupForm.value).subscribe((response:any)=>{
      if (response.status) {
        this.onAdd.emit(response.result );
        this.modalService.dismissAll();
        this.reset();
      } else {
       this.onAdd.emit([])
        this.modalService.dismissAll();
        this.reset();
      }
    },(error:any)=>{
      this.toasterService.error(error.error,"Failed!")
      this.modalService.dismissAll();
   })
  }
  reset(){
    this.accountGroupForm.reset();
  }
  createForm(){
    this.accountGroupForm=this.formBuilder.group({
      id :[0,[]],
      typeName :[,[]],
      lowerGroupID :[this.lowerGroupID,[]],
      isActive :[1,[]],
      compID :[this.compID,[]],
      createdBy :[this.createdBy,[]],
    })
  }
  get f(){
    return this.accountGroupForm.controls;
  }
  cancel(){
    this.modalService.dismissAll();
  }
}




