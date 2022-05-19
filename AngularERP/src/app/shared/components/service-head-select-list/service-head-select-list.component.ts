import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { CenterServiceNameService } from '../../../services/center-service-name.service';

@Component({
  selector: 'app-service-head-select-list',
  template:  `<ng-select
  [(ngModel)]="serviceId"
  name="serviceId"
  (change)="onSelect($event)"
  [items]="serviceNameModel"
  bindLabel="serviceName"
  bindValue="id"
  appendTo="body"
  placeholder="Select Services">
  </ng-select>`
})
export class ServiceHeadSelectListComponent implements OnInit {

  constructor(  private centerService:CenterServiceNameService) { }
  @Input() serviceId:number;
  @Input() moduleId:number;
  @Output() onChange=new EventEmitter<any>()
  serviceNameModel:any[]=[];
  compId:number; 
  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.getServiceName();
  }

  onSelect(period:any){
    if(period==null){
      this.onChange.emit({id:null, serviceName:null});
      return;
    }
    this.onChange.emit(period);
  }
  getServiceName(){
    this.centerService.getAllServiceNameNew().subscribe((response:any)=>{
      if(response){      
        //this.compId,this.moduleId
        this.serviceNameModel=response;              
      }else
      {
        this.serviceNameModel=[];
      }
    })
  }
}
