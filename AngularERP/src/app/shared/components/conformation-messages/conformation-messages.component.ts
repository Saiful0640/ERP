import { AuthService } from './../../../services/auth.service';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-conformation-messages',
  templateUrl: './conformation-messages.component.html',
  styleUrls: []
})
export class ConformationMessagesComponent implements OnInit {

  @Input() saveOrUpdate:string;
  @Input() registrationNo:string;
  @Input() statementNo:number;
  @Input() totalSalesAmount:number;
  @Output() onConfirmation = new EventEmitter<any>();
  @Output() onbtnClick = new EventEmitter<any>();
  isDismiss:boolean;
  compType:number;
  isSaving:boolean=false;
  constructor(
    private modalService:NgbModal,
  ) { }

  ngOnInit() {
    this.compType=AuthService.CompanyType;
  }
  confirmation(){
      this.isSaving=true;
      this.onConfirmation.emit(this.isDismiss=false);
  }

  close(){
    this.isSaving=false;
    this.onConfirmation.emit(this.isDismiss=true);
    this.modalService.dismissAll();
  }
}
