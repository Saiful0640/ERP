import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SalesPurchaseService } from './../../../services/sales-purchase/sales-purchase.service';
import { AuthService } from './../../../services/auth.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-term-and-condition-view',
  templateUrl: './term-and-condition-view.component.html',
  styleUrls: ['./term-and-condition-view.component.scss']
})
export class TermAndConditionViewComponent implements OnInit {

  constructor(private salesPurchaseSurvice:SalesPurchaseService,
    private modalService: NgbModal,
    private formBuilder:FormBuilder
    ) {
      this.termsNDConditionArray=this.formBuilder.array([]);
    }
  compId:number;
  moduleId:number;
  termsList:any[]=[];
  termsNDConditionArray:FormArray;
  @Output() selectEvent = new EventEmitter<any>();
  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.moduleId=AuthService.CurrentModuleId;
    this.getAllTerms();
  }
  onSelect(model:any){
    model=this.termsNDConditionArray.value.filter(c=>c.isChecked==true)
    this.selectEvent.emit(model);
    this.cancel();
  }
  getAllTerms(){
    this.salesPurchaseSurvice.getAllTerms(this.compId,this.moduleId).subscribe((res:any[])=>{
      if(res)
      {
      this.termsList=res as any[];
      this.termsList.forEach(item=>{
        this.termsNDConditionArray.push(
          new FormGroup({
            id:new FormControl(item.id,[]),
            warranty:new FormControl(item.warranty,[]),
            description:new FormControl(item.description,[]),
            isChecked:new FormControl(1,[])
          })
        )
      })
      }
      else
      {
        this.termsList=[];
      }
    })
  }
  oncheckedall(isSelect: any){
    if(isSelect){
      this.termsNDConditionArray.controls.forEach(c=>c['controls'].isChecked.patchValue(isSelect))
    }else{
      this.termsNDConditionArray.controls.forEach(c=>c['controls'].isChecked.patchValue(isSelect))
    }
    }
  getOnSelectedChecked(isSelect: any,i:number) {
    if (isSelect) {
     this.termsNDConditionArray.controls[i].get('isChecked').patchValue(isSelect);
    }
    else {
     this.termsNDConditionArray.controls[i].get('isChecked').patchValue(isSelect);
   }
}
  cancel(){
    this.modalService.dismissAll();
  }
}
