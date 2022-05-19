import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AccountingBasicEntryService } from '../../../services/accounting/accounting-basic-entry.service';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-other-references-select-list',
  template: `<ng-select
  [(ngModel)]="otherID"
  name="otherReferencesID"
  (change)="onSelect($event)"
  (keydown)="onEnterKeyPress($event)"
  [items]="otherReferencesModel"
  bindLabel="othersReferenceName"
  bindValue="othersID"
  [id]="idForTabIndex"
  placeholder="Select Other References">
  </ng-select>`,
  styleUrls: []
})
export class OtherReferencesSelectListComponent implements OnInit {

  constructor(
    private accountBasicEntryService:AccountingBasicEntryService
  ) { }

  otherReferencesModel:any[]=[];
 @Input() otherID:number;
 @Input() isCheque:number;
 @Input() idForTabIndex:string;
 @Output() onChange=new EventEmitter<any>();
 @Output() onEventEnter=new EventEmitter<any>();
 compId:number;
  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.getotherReferences();
  }
  onEnterKeyPress(event:KeyboardEvent){
    if(event.key=='Enter' || event.key=='Tab'){
      this.onEventEnter.emit(event)
    }
  }
  onSelect(otherRef:any){
    if(otherRef==null){
      this.onChange.emit({othersID:null, othersReferenceName:null});
      return;
    }
    this.onChange.emit(otherRef);
  }
  getotherReferences(){
   this.accountBasicEntryService.getOtherReferences(this.compId).subscribe((response:any)=>{
     if(response.status){
       this.otherReferencesModel=response.result;
     }
     else{
       this.otherReferencesModel= [];
     }
   })
  }

}
