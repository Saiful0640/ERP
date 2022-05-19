import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { SalesPurchaseService } from '../../../services/sales-purchase/sales-purchase.service';

@Component({
  selector: 'app-category-select-list',
  template:  `<ng-select
  [(ngModel)]="categoryId"
  name="categoryId"
  (change)="onSelect($event)"
  [items]="categories"
  bindLabel="categoryName"
  bindValue="categoryId"
  placeholder="Select Category">
  </ng-select>`,
})
export class CategorySelectListComponent implements OnInit {
  constructor (
    private service:SalesPurchaseService,
    private toasterService:ToastrService
    ){}

  @Input() categoryId:number;
  @Input() parentId:number = -1;
  @Input() isParent:number = -1;
  @Input() productType:number = -1;
  @Input() isRequired:boolean = true;
  @Output() onChange=new EventEmitter<any>();
  categories:any[]=[];
  compId:number;
  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.getCagetories();

  }

  onSelect(category:any){
    if(category==null){
   this.onChange.emit();
      return;
    }
    this.onChange.emit(category);
  }
 

 /*  onSelect(category){
    if(category==null){
      this.onChange.emit({categoryId:null,categoryName:null});
      return;
    }
    else{
    this.onChange.emit();
    }
  }
 */

  getCagetories(){
    this.service.getAllCategory(this.compId,this.categoryId,this.parentId,this.isParent,this.productType).subscribe((category:any[])=>{
      if(category){
        this.categories=category;
      }else{
        this.categories=[];
      }
    },(err:any)=>{
      this.toasterService.error(err.error,"Error")
    })
  }
  hasError(field):boolean{
    if(field.invalid && (field.dirty || field.touched) && field.errors){
      return true;
    }else{return false}
  }

}
