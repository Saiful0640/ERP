import { FormGroup, FormBuilder } from '@angular/forms';
import { VoucherType } from './../../../models/accounting/transaction/voucher-type.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { trigger, transition, style, animate, animateChild, useAnimation } from '@angular/animations';
import { group } from 'console';
import { query } from '@angular/core/src/render3';
import { fade, slide, bounceOutLeftAnimation, fadeInAnimation } from '../../../shared/animations';
import { NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-sales-manage',
  templateUrl: './sales-manage.component.html',
  styleUrls: ['./sales-manage.component.scss',]
})
export class SalesManageComponent implements OnInit {
  voucherName:string="SalesManage";
  voucherTypeModel:VoucherType[]=[];
  isSubmit:boolean=false;
  showAdvanceFilter:boolean = false;
  salesManageForm:FormGroup;
  showColumnList:boolean = false;
  actionTypes:any[]=[
    {id:1, typeName:'Edit'},
    {id:2, typeName:'Customer'},
    {id:3, typeName:'Checked'},
    {id:4, typeName:'Verified'},
    {id:5, typeName:'Approve'},
    {id:6, typeName:'Reject'},
    {id:7, typeName:'Print'},
    {id:8, typeName:'Undo'},
  ]
  constructor(public fb:FormBuilder) { }
  ngOnInit() {
    this.createForm();
  }
  onToggleAdvanceFilter(){
    this.showAdvanceFilter = !this.showAdvanceFilter;
  }
  onToggleColumnList(){
    this.showColumnList = !this.showColumnList
  }
  onSelectedVocherNo(){}
createForm(){
  this.salesManageForm=this.fb.group({
    id:[0,[]],
    voucherType:[,[]]
  })
}
  get f(){
    return this.salesManageForm.controls;
  }
}
