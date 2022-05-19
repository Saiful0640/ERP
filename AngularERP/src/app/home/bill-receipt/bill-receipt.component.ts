import { AssignCriteriaModel } from './../../models/assign-criteria.model';
import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TransMasterModel } from '../../models/accounting/transaction/trans-master-model';
import { ApiResponse } from '../../models/api-response';
import { BillPrepared } from '../../models/bill-prepared.model';
import { MoneyReceiptModel } from '../../models/sales-purchase/money-receipt-mode';
import { TransactionService } from '../../services/accounting/transaction.service';
import { AppCollectionService } from '../../services/app-collection.service';
import { AuthService } from '../../services/auth.service';
import { CenterBillPreparedService } from '../../services/center-bill-prepared.service';
import { CenterServiceNameService } from '../../services/center-service-name.service';
import { CriteriaCenterService } from '../../services/criteria-center.service';
import { SalesPurchaseService } from '../../services/sales-purchase/sales-purchase.service';
import { Helper } from '../../shared/helper';

@Component({
  selector: 'app-bill-receipt',
  templateUrl: './bill-receipt.component.html',
  styleUrls: ['./bill-receipt.component.scss']
})
export class BillReceiptComponent implements OnInit {
  moduleId:number;
  title:string;
  lblname:string;
  lblname2:string;
  @Input() partyId:number;
  @Input() transType:number;
  constructor(
    private criteriaService:CriteriaCenterService,
    private formBuilder:FormBuilder,
    private centerService:CenterServiceNameService,
    private billPreparedService:CenterBillPreparedService,
    private salesPurchaseService: SalesPurchaseService,
    private toastrService:ToastrService,
    private appCollection: AppCollectionService,
    private transactionService:TransactionService,
    private modalService:NgbModal
  ) {
    this.billCollectionArray=this.formBuilder.array([]);
   }
    compId:number;
    criterias:any[]=[];
    subCriterias:any[]=[];
    receiptEntryForm:FormGroup;
    billCollectionArray:FormArray;
    mobileBankTypes: { name: string }[] = [];
    chequeNoShowModel:TransMasterModel[]=[];
    servicesByType:any[]=[];
    billPreaparedList:any[]=[];
    billPreaparedListByDetailsId:any[]=[];
    moneyReceipts: MoneyReceiptModel[] = [];
    btnStatus:string='Save';
    paramItems:any;
    consumeRate:number=0;
    type:number=1;
    lblname3:string;
    criteriaType:any[]=[];
    pageId:number;
    totalAmount:number=0;
  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.moduleId=AuthService.CurrentModuleId;
    this.pageId=AuthService.CurrentPageId;

    console.log(this.pageId)
    this.title=Helper.onSetTitleByModuleId(this.moduleId,this.pageId).title;
    this.mobileBankTypes = this.appCollection.getMobileBankingType();
    this.createForm();
    this.getAllMoneyReceipt();
    this.getAllCriteriaTypeByModuleId();
    this.getCriteria();
    this.getServiceNameByType();
    this.getBillListOnSelectPeriod();
  }
  getAllCriteriaTypeByModuleId(){
    this.criteriaService.getAllCriteriaTypeByModuleId(this.moduleId,this.compId).subscribe((types:any)=>{
      if(types.status){
        this.criteriaType=types.result;
        if(this.criteriaType.length>2){
        this.lblname=this.criteriaType.find(c=>c.criteriaID==1).criteriaCaption;
        this.lblname2=this.criteriaType.find(c=>c.criteriaID==2).criteriaCaption;
        this.lblname3=this.criteriaType.find(c=>c.criteriaID==3).criteriaCaption;
        }else  if(this.criteriaType.length>1){
          this.lblname=this.criteriaType.find(c=>c.criteriaID==1).criteriaCaption;
          this.lblname2=this.criteriaType.find(c=>c.criteriaID==2).criteriaCaption;
          }else  {
            this.lblname=this.criteriaType.find(c=>c.criteriaID==1).criteriaCaption;
            }
      }
      else{
        this.criteriaType=[]
      }
    },(err:any)=>{
      this.toastrService.error(err.error,"Failed!");
    })
  }
  getBillListOnSelectPeriod(){
    this.billPreparedService.getServiceBillPreparedList(this.compId,this.moduleId,this.type).subscribe((response:any)=>{
      if(response.status){
        this.billPreaparedList=response.result;
       }else
      {
        this.billPreaparedList=[];
      }
    },(err:any)=>{
      this.toastrService.error(err.error,"Failed")
    })
  }
  getCriteria() {
    this.criteriaService.getCriteriaCenter(this.moduleId,this.compId,1)
      .subscribe((response: any) => {
        if (response.status) {
       this.criterias=response.result ;
      }else{
        this.criterias=[];
      }
      },(err:any)=>{
        this.toastrService.error(err.error,"Failed!");
      })
  }
  getSubCriteria(detailsId:number) {
    if(detailsId>0){
    let criteriaById=this.criterias.find(c=>c.detailsID==detailsId).subCriteria;
     if(criteriaById.length >0){
      this.subCriterias=criteriaById;
    }else{
    this.f.costCenterId.patchValue(detailsId);
        this.subCriterias=[]
    }
  }
  }


  getBillPreparedListForAllReceiptEntry(){
     let object=new AssignCriteriaModel();
   object.compID=this.compId;
    object.moduleID=this.moduleId;
    object.costCenterId=this.f.costCenterId.value;
    object.locationId=this.f.locationId.value;
    object.periodID=this.f.periodID.value;
    this.billPreparedService.getBillPreparedListForAllReceiptEntry(object).subscribe((response:any)=>{
      if(response.status){
        this.billPreaparedList=response.result;
        this.billCollectionArray=this.formBuilder.array([]);
          this.billPreaparedList.forEach(item=>{
            if(item.parentId>0 && item.criteriaID==3){
              this.criteriaService.getCriteriaCenter(this.moduleId,this.compId,2)
              .subscribe((response: any) => {
                if (response.status) {
               let info=(response.result) ;
               let superDetailsId=info.find(c=>c.detailsID==item.parentId).parentID;
               let underDetailsCaption=info.find(c=>c.detailsID==item.parentId).detailsCaption;
               let superDetailsCaption=this.criterias.find(c=>c.detailsID==superDetailsId).detailsCaption;
               this.billCollectionArray.push(
                new FormGroup({
                  id:new FormControl(item.id,[]),
                  memberID:new FormControl(item.memberID,[]),
              memberCode:new FormControl(item.memberCode,[]),
              memberName:new FormControl(item.memberName,[]),
              underDetailsID:new FormControl(item.parentId,[]),
              underDetailsCaption:new FormControl(underDetailsCaption,[]),
              superDetailsCaption:new FormControl(superDetailsCaption,[]),
              accountId:new FormControl(item.accountId,[]),
              serviceName:new FormControl(item.serviceName,[]),
              costCenterId:new FormControl(item.costCenterId,[]),
              detailsCaption:new FormControl(item.detailsCaption,[]),
              transId:new FormControl(item.transId,[]),
              periodID:new FormControl(item.periodID,[]),
              periodName:new FormControl(item.periodName,[]),
              amount:new FormControl(item.amount,[])  ,
              isChecked:new FormControl(item.isChecked,[])
                })
                )
              }
            })
            }else if(item.parentId>0 && item.criteriaID==2){
              let underDetailsCaption=this.criterias.find(c=>c.detailsID==item.parentId).detailsCaption;
              this.billCollectionArray.push(
               new FormGroup({
                id:new FormControl(item.id,[]),
                 memberID:new FormControl(item.memberID,[]),
             memberCode:new FormControl(item.memberCode,[]),
             memberName:new FormControl(item.memberName,[]),
             underDetailsID:new FormControl(item.parentId,[]),
             underDetailsCaption:new FormControl(underDetailsCaption,[]),
             superDetailsCaption:new FormControl(null,[]),
             accountId:new FormControl(item.accountId,[]),
             serviceName:new FormControl(item.serviceName,[]),
             costCenterId:new FormControl(item.costCenterId,[]),
             detailsCaption:new FormControl(item.detailsCaption,[]),
             transId:new FormControl(item.transId,[]),
             periodID:new FormControl(item.periodID,[]),
             periodName:new FormControl(item.periodName,[]),
             amount:new FormControl(item.amount,[])  ,
             isChecked:new FormControl(item.isChecked,[])
               })
               )
            }else{
              this.billCollectionArray.push(
                new FormGroup({
                  id:new FormControl(item.id,[]),
                  memberID:new FormControl(item.memberID,[]),
              memberCode:new FormControl(item.memberCode,[]),
              memberName:new FormControl(item.memberName,[]),
              underDetailsID:new FormControl(item.parentId,[]),
              underDetailsCaption:new FormControl(null,[]),
              superDetailsCaption:new FormControl(null,[]),
              accountId:new FormControl(item.accountId,[]),
              serviceName:new FormControl(item.serviceName,[]),
              costCenterId:new FormControl(item.costCenterId,[]),
              detailsCaption:new FormControl(item.detailsCaption,[]),
              transId:new FormControl(item.transId,[]),
              periodID:new FormControl(item.periodID,[]),
              periodName:new FormControl(item.periodName,[]),
              amount:new FormControl(item.amount,[])  ,
              isChecked:new FormControl(item.isChecked,[])
                })
                )
            }

            })
      }else
      {
        this.billPreaparedList=[];
      }
    })
  }
  getAllMoneyReceipt() {
    this.salesPurchaseService.getAllMoneyReceipt(this.compId).subscribe((response: ApiResponse) => {
      if (response.status) {
        let moneyReceipt = response.result as MoneyReceiptModel[];
        this.moneyReceipts=moneyReceipt.filter(c=>c.id !=5);

      }
    })
  }
  getServiceNameByType(){
    this.centerService.getAllServiceName(this.compId,this.moduleId).subscribe((response:any)=>{
      if(response.status){
        this.servicesByType=response.result;
      }else
      {
        this.servicesByType=[];
      }
    })
  }
  createNewView(event:any){
    if(event!=null){
    this.modalService.open(event,{size: 'lg', windowClass: 'modal-xl'})
   }
  }
  onSelectPeriod(periods:any){
    this.receiptEntryForm.patchValue({
      periodID:periods.id
    })
    }
    onSelectLocation(location:any){
      this.receiptEntryForm.patchValue({
        locationId:location.id
      })
      this.getBillPreparedListForAllReceiptEntry();
    }
      oncheckedall(isSelect: any){
        if(isSelect){
          this.billCollectionArray.controls.forEach(c=>c['controls'].isChecked.patchValue(isSelect))
        }else{
          this.billCollectionArray.controls.forEach(c=>c['controls'].isChecked.patchValue(isSelect))
        }
        }
        getOnSelectedChecked(isSelect: any,i:number) {
          if (isSelect) {
            this.billCollectionArray.controls[i].get('isChecked').patchValue(isSelect)  ;
           let amount=this.billCollectionArray.controls[i].get('amount').value;
            this.totalAmount=this.totalAmount+amount
            this.f.totalAmount.patchValue(this.totalAmount);
          }
          else {
            this.billCollectionArray.controls[i].get('isChecked').patchValue(isSelect)  ;
               let amount=this.billCollectionArray.controls[i].get('amount').value;
            this.totalAmount=this.totalAmount-amount
            this.f.totalAmount.patchValue(this.totalAmount);
         }
     }

  getServiceBillPreparedList(parentId){
    this.billPreparedService.getServiceBillPreparedList(this.compId,this.moduleId,parentId).subscribe((response:any)=>{
      if(response.status){
        this.billPreaparedList=response.result;
      }else
      {
        this.billPreaparedList=[];
      }
    })
  }
   saveBillPre(){
     let billPrepared=new BillPrepared();
     billPrepared=this.receiptEntryForm.value;
    var filter=this.billCollectionArray.value.filter(item=>item.isChecked !=null);
    billPrepared.billPrepareItems=filter;
   this.billPreparedService.saveIndividualReceiptEntry(billPrepared).subscribe((response:any)=>{
      if(response.status){
        this.toastrService.success(response.message,"Success!")
        this.reset();
      }else{
        this.toastrService.error(response.message,"Faild!")
        this.reset();
      }
   },(error:any)=>{
    this.toastrService.error(error.error,"Failed!")
    }
   )
  }
   //// chequeNo textBox
   getChequeNo(bankID:number){
    if(bankID == null){
     return;
    }else{
      this.transactionService.getChequeNo(bankID,this.compId).subscribe((response:any)=>{
        if(response.status){
          this.chequeNoShowModel=response.result ;
        }else{
          this.chequeNoShowModel=[];
        }
      })
    }
  }
  // getListForEditBill(event:any){
  //   this.btnStatus="Update";
  //   let isSelected:boolean=true;
  //   if(event.criteriaID==3){
  //     this.criteriaService.getCriteriaCenter(this.moduleId,this.compId,2)
  //     .subscribe((response: any) => {
  //       if (response.status) {
  //      let subcriterias=response.result ;
  //      let builldingId=subcriterias.find(c=>c.detailsID==event.parentId).parentID;
  //      this.f.buildingId.patchValue(builldingId);
  //      this.getSubCriteria(builldingId);
  //      this.f.costCenterId.patchValue(event.parentId)
  //     }
  //     })
  //   }else if(event.criteriaID==2){
  //     this.f.buildingId.patchValue(event.parentId);
  //   }else{
  //     this.f.buildingId.patchValue(event.costCenterId);
  //   }
  //   this.receiptEntryForm.patchValue({
  //     id:event.id,
  //     costCenterId:event.costCenterId,
  //     accountId:event.accountId,
  //     periodID:event.periodID,
  //     locationId:event.location,
  //     totalAmount:event.totalAmount,
  //     transId:event.transId,
  //   })
  //   this.billPreparedService.getBillPreparedReceiptListForEdit(this.moduleId,this.compId,event.transId).subscribe((response:any)=>{
  //     if(response.status){
  //       let billPreaparedList=response.result;
  //       this.billCollectionArray=this.formBuilder.array([]);
  //       billPreaparedList.forEach(item=>{
  //           if(item.parentId>0 && item.criteriaID==3){
  //             this.criteriaService.getCriteriaCenter(this.moduleId,this.compId,2)
  //             .subscribe((response: any) => {
  //               if (response.status) {
  //              let info=(response.result) ;
  //              let superDetailsId=info.find(c=>c.detailsID==item.parentId).parentID;
  //              let underDetailsCaption=info.find(c=>c.detailsID==item.parentId).detailsCaption;
  //              let superDetailsCaption=this.criterias.find(c=>c.detailsID==superDetailsId).detailsCaption;
  //              this.billCollectionArray.push(
  //               new FormGroup({
  //                 id:new FormControl(item.id,[]),
  //                 memberID:new FormControl(item.memberID,[]),
  //             memberCode:new FormControl(item.memberCode,[]),
  //             memberName:new FormControl(item.memberName,[]),
  //             underDetailsID:new FormControl(item.parentId,[]),
  //             underDetailsCaption:new FormControl(underDetailsCaption,[]),
  //             superDetailsCaption:new FormControl(superDetailsCaption,[]),
  //             accountId:new FormControl(item.accountId,[]),
  //             serviceName:new FormControl(item.serviceName,[]),
  //             costCenterId:new FormControl(item.costCenterId,[]),
  //             detailsCaption:new FormControl(item.detailsCaption,[]),
  //             transId:new FormControl(item.transId,[]),
  //             periodID:new FormControl(item.periodID,[]),
  //             periodName:new FormControl(item.periodName,[]),
  //             amount:new FormControl(item.amount,[])  ,
  //             isChecked:new FormControl(item.isChecked,[])
  //               })
  //               )
  //             }
  //           })
  //           }else if(item.parentId>0 && item.criteriaID==2){
  //             let underDetailsCaption=this.criterias.find(c=>c.detailsID==item.parentId).detailsCaption;
  //             this.billCollectionArray.push(
  //              new FormGroup({
  //               id:new FormControl(item.id,[]),
  //                memberID:new FormControl(item.memberID,[]),
  //            memberCode:new FormControl(item.memberCode,[]),
  //            memberName:new FormControl(item.memberName,[]),
  //            underDetailsID:new FormControl(item.parentId,[]),
  //            underDetailsCaption:new FormControl(underDetailsCaption,[]),
  //            superDetailsCaption:new FormControl(null,[]),
  //            accountId:new FormControl(item.accountId,[]),
  //            serviceName:new FormControl(item.serviceName,[]),
  //            costCenterId:new FormControl(item.costCenterId,[]),
  //            detailsCaption:new FormControl(item.detailsCaption,[]),
  //            transId:new FormControl(item.transId,[]),
  //            periodID:new FormControl(item.periodID,[]),
  //            periodName:new FormControl(item.periodName,[]),
  //            amount:new FormControl(item.amount,[])  ,
  //            isChecked:new FormControl(item.isChecked,[])
  //              })
  //              )
  //           }else{
  //             this.billCollectionArray.push(
  //               new FormGroup({
  //                 id:new FormControl(item.id,[]),
  //                 memberID:new FormControl(item.memberID,[]),
  //             memberCode:new FormControl(item.memberCode,[]),
  //             memberName:new FormControl(item.memberName,[]),
  //             underDetailsID:new FormControl(item.parentId,[]),
  //             underDetailsCaption:new FormControl(null,[]),
  //             superDetailsCaption:new FormControl(null,[]),
  //             accountId:new FormControl(item.accountId,[]),
  //             serviceName:new FormControl(item.serviceName,[]),
  //             costCenterId:new FormControl(item.costCenterId,[]),
  //             detailsCaption:new FormControl(item.detailsCaption,[]),
  //             transId:new FormControl(item.transId,[]),
  //             periodID:new FormControl(item.periodID,[]),
  //             periodName:new FormControl(item.periodName,[]),
  //             amount:new FormControl(item.amount,[])  ,
  //             isChecked:new FormControl(item.isChecked,[])
  //               })
  //               )
  //           }

  //           })
  //     }else
  //     {
  //       this.billPreaparedList=[];
  //     }
  //  },(error:any)=>{
  //   this.toastrService.error(error.error,"Failed!")
  //   }
  //  )
  //     // this.billCollectionArray.push(
  //     //   new FormGroup({
  //     //     id:new FormControl(event.id,[]),
  //     //     memberID:new FormControl(event.memberID,[]),
  //     // memberCode:new FormControl(event.memberCode,[]),
  //     // memberName:new FormControl(event.memberName,[]),
  //     // underDetailsID:new FormControl(event.parentId,[]),
  //     // superDetailsCaption:new FormControl(null,[]),
  //     // accountId:new FormControl(event.accountId,[]),
  //     // serviceName:new FormControl(event.serviceName,[]),
  //     // costCenterId:new FormControl(event.costCenterId,[]),
  //     // detailsCaption:new FormControl(event.detailsCaption,[]),
  //     // transId:new FormControl(event.transId,[]),
  //     // periodID:new FormControl(event.periodID,[]),
  //     // periodName:new FormControl(event.periodName,[]),
  //     // amount:new FormControl(event.amount,[])  ,
  //     // isChecked:new FormControl(event.isChecked,[])
  //     //   })
  //     //   )


  // }
  calculateConsumeRate(i:number){
    this.consumeRate=0;
    let previousRate=Number(this.billCollectionArray.controls[i].get('serialNo').value);
    let presentRate=Number(this.billCollectionArray.controls[i].get('readingQty').value)
    this.consumeRate=Math.abs(presentRate-previousRate);
  }
  onSelectMemberInfo(memList:any){
    this.receiptEntryForm.patchValue({
      memberID:memList.id
    })
    }
  onSelectchequeDate(cdate:any){
    if(cdate !=null){
      this.receiptEntryForm.patchValue({
        chequeDate:cdate
      })
    }
  }
  reset(){
    this.btnStatus = 'Save'
    this.receiptEntryForm.reset();
    this.createForm();
    this.billCollectionArray = this.formBuilder.array([]);
    this.getCriteria();
    this.getAllMoneyReceipt();
    this. getServiceNameByType();
    this.consumeRate=0;
    // this.getServiceBillPreparedList();
  }
  createForm(){
    this.receiptEntryForm=this.formBuilder.group({
      id:[0,[]],
      buildingId:[,[]],
      costCenterId:[,[]],
      periodID:[,[]],
      compId:[this.compId,[]],
      moduleID:[this.moduleId,[]],
      locationId:[,[]],
      typeID:[4,[]],
      totalAmount:[,[]],
      transId:[0,[]],
    })
  }
  get f(){
    return this.receiptEntryForm.controls;
  }

}
