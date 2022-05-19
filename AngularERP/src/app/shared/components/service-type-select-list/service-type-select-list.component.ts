import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { CenterServiceNameService } from '../../../services/center-service-name.service';

@Component({
  selector: 'app-service-type-select-list',
  template:  `<ng-select
  [(ngModel)]="typeId"
  name="typeId"
  (change)="onSelect($event)"
  [items]="serviceTypes"
  bindLabel="typeName"
  bindValue="id"
  placeholder="Select Service Type">
  </ng-select>`,
})
export class ServiceTypeSelectListComponent implements OnInit {

  constructor(private centerServiceName:CenterServiceNameService) { }
  @Input() typeId:number;
  @Output() onChange=new EventEmitter<any>()
  serviceTypes:any[]=[];

  ngOnInit() {
    this.getAllServiceType()
  }
  onSelect(types:any){
    if(types==null){
      this.onChange.emit({id:null, typeName:null});
      return;
    }
    this.onChange.emit(types);
  }
  getAllServiceType(){
    this.centerServiceName.getAllServiceType().subscribe((types:any)=>{
      if(types){
        this.serviceTypes=types;
      }else{
        this.serviceTypes=[];
      }
    })
  }

}
