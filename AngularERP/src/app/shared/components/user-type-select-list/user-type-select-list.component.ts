import { SettingService } from '../../../services/settings/Setting.service';
import { ApiResponse } from '../../../models/api-response';
import { Role } from '../../../models/settings/role.model';
import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-user-type-select-list',
  template:  `<div class="input-group ">
  <ng-select
  [(ngModel)]="userTypeId"
  name="roleID"
  (change)="onSelect($event)"
  [items]="userTypes"
  bindLabel="userTypeName"
  bindValue="id"
  placeholder="Select User Type">
  </ng-select>
  <div *ngIf="isPlusIconHide==false" class="input-group-append">
  <button  (click)="createNewItem()" class="input-group-text btn btn-info"
   type="button">
    <span class="fa fa-plus" style="cursor: pointer;"></span>
    </button>
  </div>
  </div>`,
  styleUrls: []
})
export class UserTypeSelectListComponent implements OnInit {

  constructor(
    private settingService:SettingService,
    private modalService:NgbModal
  ) { }
  @Input() userTypeId:number;
  @Input() modalName:any;
  @Input() isPlusIconHide:boolean=false;
  @Output() onChange=new EventEmitter<Role>();

  userTypes:any[]=[];
  compId:number;
  ngOnInit() {
   // this.compId=AuthService.CompanyId;
    this.getAllUserType();
  }
  onSelect(userType:any){
    if(userType==null){
      this.onChange.emit(new Role());
      return;
    }
    this.onChange.emit(userType);
  }

  getAllUserType(){
    this.settingService.getAllUserType().subscribe((response:any)=>{
      if(response){
        console.log(response);
        this.userTypes= response as any[]
        // this.userTypes=(response as any[]).filter(type=>type.id>AuthService.UserTypeId)
      }
      else{
        this.userTypes=[];
      }
    })
  }
  createNewItem(){
    this.modalService.open(this.modalName)
  }
}
