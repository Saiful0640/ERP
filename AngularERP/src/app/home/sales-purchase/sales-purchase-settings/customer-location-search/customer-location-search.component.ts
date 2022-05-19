import { SalesPurchaseService } from './../../../../services/sales-purchase/sales-purchase.service';
import { CustomerLocation } from './../../../../models/sales-purchase/customer-location.model';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AuthService } from './../../../../services/auth.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AccountingBasicEntryService } from './../../../../services/accounting/accounting-basic-entry.service';
import { Component, OnInit, EventEmitter, Input } from '@angular/core';
import { AccountChart } from '../../../../models/accounting/basic-entry/bank/AccountChart';


@Component({
  selector: 'app-customer-location-search',
  templateUrl: './customer-location-search.component.html',
  styleUrls: ['./customer-location-search.component.scss']
})
export class CustomerLocationSearchComponent implements OnInit {
  accountChartBasicEntry:CustomerLocation[]=[];
  isLoading: boolean = false;
  lowerGroupId=3;
  compId:number;
 selectEvent=new EventEmitter<AccountChart>()
  accChartSearch:CustomerLocation=new CustomerLocation();
  filterlocations:any[]=[];
  locationForm:FormGroup;
 locations:CustomerLocation[]=[];
  onChange = new EventEmitter<CustomerLocation>();
  @Input() accountId:number;
  constructor(
    private salesPurchaseService:SalesPurchaseService,
    private modalService:NgbModal,
    private formBuilder:FormBuilder
    ) { }
  ngOnInit() {
     this.createForm();
    this.compId=AuthService.CompanyId;
    /* this.getAllLocation(); */
    this.getAllLocation();
  }
  createForm(){
    this.locationForm=this.formBuilder.group
     ({
     locationID:[0,[]],
     location:['',[]],
     customerAddress:['',[]],
     compId:[this.compId,[]],
     accountId:[this.accountId,[]],
   })
     }
     getAllLocation(){
       console.log(this.f.accountId.value)
      this.salesPurchaseService.getAllLocationChart(this.compId,this.f.accountId.value).subscribe((res:CustomerLocation[])=>{
        if(res)
        {
          this.locations=res as CustomerLocation[];
          this.filterlocations =res as CustomerLocation[];
          console.log(this.locations)
        }
        else
        {
          this.filterlocations=[];
        }
      })
      }
 onSelect(modal){
   this.selectEvent.emit(modal);
   this.cancel();
 }



 filterAccountChartBasicEntry(formattedName:string){
  if(formattedName!=null)
  {
    this.filterlocations=this.locations.filter(l=> this.isNull
      (l.formatedName).toLowerCase().match(formattedName.toLowerCase()))
  }else{
    this.filterlocations=this.locations;
  }
   }
   isNull(value){
    return value?value:'';
  }
get f()
{
  return this.locationForm.controls;
 }
 cancel()
 {
this.modalService.dismissAll();
 }
}
