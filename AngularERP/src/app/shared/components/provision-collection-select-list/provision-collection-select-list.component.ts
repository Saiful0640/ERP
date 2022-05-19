import { AuthService } from './../../../services/auth.service';
import { TransactionService } from './../../../services/accounting/transaction.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ProvisionCollectionModel } from './../../../models/accounting/transaction/provision-collection-model';
import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { ProvisionType } from '../../lookup';

@Component({
  selector: 'app-provision-collection-select-list',
  templateUrl: './provision-collection-select-list.component.html',
  styleUrls: ['./provision-collection-select-list.component.scss']
})
export class ProvisionCollectionSelectListComponent implements OnInit {
  @Input()accountId:number;
  comId:number;
  id:number;
  @Input() paytype:number;
  accountName:any[]=[];
  collectionModal:ProvisionCollectionModel[]=[];
  @Output() selectEvent=new EventEmitter<ProvisionCollectionModel>();
  constructor(
    private collectionService:TransactionService,
    private modalService:NgbModal
  ) { }

  ngOnInit() {
    this.comId=AuthService.CompanyId;
    this.getAllProvisionCollection();
  }
   getAllProvisionCollection(){
    //if(this.accountId==null){this.accountId=0}
    console.log(this.paytype);
      this.collectionService.getProvisionDueCollection(this.comId,this.paytype,this.id).subscribe((response:any)=>{
        if(response.status){
          this.collectionModal=response.result as ProvisionCollectionModel[];
        }else{
          this.collectionModal=[];
        }
      })

  } 
  /* getAllProvisionCollection(){
      this.collectionService.getProvisionDueCollection().subscribe((response:any)=>{
        if(response.status){
          this.collectionModal=response.result as ProvisionCollectionModel[];
          console.log(this.collectionModal);
        }else{
          this.collectionModal=[];
        }
      })

  } */
  cancel(){
    this.modalService.dismissAll();
  }
  onSelect(model:any){
    this.selectEvent.emit(model);
    this.cancel();
  }

}
