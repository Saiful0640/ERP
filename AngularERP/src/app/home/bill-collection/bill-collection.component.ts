import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { BillPrepared } from '../../models/bill-prepared.model';
import { AuthService } from '../../services/auth.service';
import { CenterBillPreparedService } from '../../services/center-bill-prepared.service';
import { CenterServiceNameService } from '../../services/center-service-name.service';
import { CriteriaCenterService } from '../../services/criteria-center.service';
import { Helper } from '../../shared/helper';

@Component({
  selector: 'app-bill-collection',
  templateUrl: './bill-collection.component.html',
  styleUrls: ['./bill-collection.component.scss']
})
export class BillCollectionComponent implements OnInit {

 title:string;
   lblname:string;
   lblname2:string;

  constructor(
    private criteriaService:CriteriaCenterService,
    private formBuilder:FormBuilder,
    private centerService:CenterServiceNameService,
    private billPreparedService:CenterBillPreparedService,
    private toastrService:ToastrService,
    private modalService:NgbModal
  ) {
    this.billCollectionArray=this.formBuilder.array([]);
  }
    compId:number;
    criterias:any[]=[];
    subCriterias:any[]=[];
    billCollectionForm:FormGroup;
    billCollectionArray:FormArray;
    servicesByType:any[]=[];
    billPreaparedList:any[]=[];
    billPreaparedListByDetailsId:any[]=[];
    btnStatus:string='Save';
    paramItems:any;
    moduleId:number;
    type:number=1;
    criteriaType:any[]=[];
    pageId:number;
  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.moduleId=AuthService.CurrentModuleId;
    this.pageId=AuthService.CurrentPageId;
    this.title=Helper.onSetTitleByModuleId(this.moduleId,this.pageId).title;
    this.getAllCriteriaTypeByModuleId();
    this.getCriteria();
    this.createForm();
    this.getServiceNameByType();
    this.getBillListOnSelectPeriod();
   /*  this.getBillListOnSelectPeriod(); */
  }
  getAllCriteriaTypeByModuleId(){
    this.criteriaService.getAllCriteriaTypeByModuleId(this.moduleId,this.compId).subscribe((types:any)=>{
      if(types.status){
        this.criteriaType=types.result;
        if(this.criteriaType.length>1){
        this.lblname=this.criteriaType.find(c=>c.criteriaID==1).criteriaCaption;
        this.lblname2=this.criteriaType.find(c=>c.criteriaID==2).criteriaCaption;
        }
      }
      else{
        this.criteriaType=[]
      }
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
      })
  }
  getSubCriteria(detailsId:number) {
    if(detailsId!=null){
    let criteriaById=this.criterias.find(c=>c.detailsID==detailsId).subCriteria;
    if(criteriaById.length >0){
      this.subCriterias=criteriaById;
    }else{
      let filter=this.billPreaparedList.filter(c=>c.detailsID==detailsId);
      this.billPreaparedListByDetailsId=filter;
      this.onFirstTimeSetArrayGroup(this.billPreaparedListByDetailsId)
      this.subCriterias=[]
    }
  }
  }
  onSelectSubCriteria(subdetailsId:number) {
    if(subdetailsId!=null){
      let superCriteria=this.subCriterias.find(c=>c.detailsID==subdetailsId);
      if(superCriteria.subCriteria.length>0){
        let filter=this.billPreaparedList.filter(c=>c.parentId==subdetailsId);
        this.billPreaparedListByDetailsId=filter;
        this.onFirstTimeSetArrayGroup(this.billPreaparedListByDetailsId);
      }
      else{
        let filter=this.billPreaparedList.filter(c=>c.parentID==subdetailsId);
        this.billPreaparedListByDetailsId=filter;
        this.onFirstTimeSetArrayGroup(this.billPreaparedList)
      }
     }
  }


  getServiceNameByType(){
   let processType:number=1;// ServiceTypeID=1 Because of ManualProcessType
    this.centerService.getServiceNameByType(processType,this.moduleId,this.compId).subscribe((response:any)=>{
      if(response.status){
        this.servicesByType=response.result;
      }else
      {
        this.servicesByType=[];
      }
    })
  }
  onSelectServiceName(serviceId:number){
    if(serviceId !=null){
    let filterbyService=this.billPreaparedListByDetailsId.filter(c=>c.serviceAccountID==serviceId);
     let billPreaparedListByDetailsId=filterbyService;
      this.onFirstTimeSetArrayGroup(billPreaparedListByDetailsId)
     }
  }
  createNewView(event:any){
    if(event!=null){
    this.modalService.open(event,{size: 'lg', windowClass: 'modal-xl'})
   }
  }
  onSelectPeriod(periods:any){
    if(periods!=null){
    this.billCollectionForm.patchValue({
      periodID:periods.id
    })
    // this.getBillListOnSelectPeriod(periods.id);
  }
  }
  onSetArrayGroup(billPreaparedListByDetailsId:any){
    this.billCollectionArray=this.formBuilder.array([]);
    billPreaparedListByDetailsId.forEach(item=>{
      this.billCollectionArray.push(
        new FormGroup({
          memberId:new FormControl(item.memberId,[]),
      memberCode:new FormControl(item.memberCode,[]),
      memberName:new FormControl(item.memberName,[]),
      detailsCaption:new FormControl(item.detailsCaption,[]),
      meterNo:new FormControl(item.meterNo,[]),
      serialNo:new FormControl(item.serialNo,[]),
      parentID:new FormControl(item.parentID,[]),
      consumeRate:new FormControl(0,[]),
      readingQty:new FormControl(item.readingQty,[]),
      unitPrice:new FormControl(item.unitPrice,[]),
      serviceAccountID:new FormControl(item.serviceAccountID,[]),
      costCenterId:new FormControl(item.costCenterId,[]),
      amount:new FormControl(item.amount,[])  ,
      isChecked:new FormControl(item.isChecked,[])
        })
        )
      })
  }
  onFirstTimeSetArrayGroup(billPreaparedListByDetailsId:any){
    this.billCollectionArray=this.formBuilder.array([]);
    billPreaparedListByDetailsId.forEach(item=>{
      this.billCollectionArray.push(
        new FormGroup({
          memberId:new FormControl(item.memberID,[]),
          memberCode:new FormControl(item.memberCode,[]),
          memberName:new FormControl(item.memberName,[]),
          detailsCaption:new FormControl(item.detailsCaption,[]),
          meterNo:new FormControl(item.meterNo,[]),
          parentID:new FormControl(item.parentId,[]),
          serialNo:new FormControl(item.serialNo,[]),
          consumeRate:new FormControl(0,[]),
          readingQty:new FormControl(item.readingQty,[]),
          unitPrice:new FormControl(item.unitPrice,[]),
          serviceAccountID:new FormControl(item.serviceAccountID,[]),
          costCenterId:new FormControl(item.detailsID,[]),
          amount:new FormControl(0,[])  ,
          isChecked:new FormControl(1,[])
        })
        )
      })
  }
  getBillListOnSelectPeriod(){
    this.billPreparedService.getServiceBillPreparedList(this.compId,this.moduleId,this.type,0).subscribe((response:any)=>{
      if(response.status){
        console.log(response)
        this.billPreaparedList=response.result;

      }else
      {
        this.billPreaparedList=[];
      }
    })

    // this.billPreaparedListByDetailsId=billInfo;

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
           this.billCollectionArray.controls[i].get('isChecked').patchValue(isSelect);
          }
          else {
           this.billCollectionArray.controls[i].get('isChecked').patchValue(isSelect);
         }
     }
  getServiceBillPreparedList(periodId:number){
     this.billPreparedService.getServiceBillPreparedList(this.compId,this.moduleId,periodId).subscribe((response:any)=>{
       if(response.status){

         this.billPreaparedList=response.result;
         console.log(this.billPreaparedList)
       }else
       {
         this.billPreaparedList=[];
       }
     })
   }

   saveBillPre(){
     let billPrepared=new BillPrepared();
     billPrepared=this.billCollectionForm.value;
    var filter=this.billCollectionArray.value.filter(item=>item.isChecked !=null);
    billPrepared.billPrepareItems=filter;
    console.log(billPrepared)
   this.billPreparedService.saveBillPrepared(billPrepared).subscribe((response:any)=>{
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
  getListForEditBill(event:any){
    this.btnStatus="Update";
    let isSelected:boolean=true;
    if(event.criteriaID==3){
      this.criteriaService.getCriteriaCenter(this.moduleId,this.compId,2)
      .subscribe((response: any) => {
        if (response.status) {
       let subcriterias=response.result ;
       let builldingId=subcriterias.find(c=>c.detailsID==event.parentId).parentID;
       this.f.buildingId.patchValue(builldingId);
       this.getSubCriteria(builldingId);
       this.f.detailsID.patchValue(event.parentId)
      }
      })
    }else if(event.criteriaID==2){
      this.f.buildingId.patchValue(event.parentId);
    }else{
      this.f.buildingId.patchValue(event.costCenterId);
    }
    this.billCollectionForm.patchValue({
      id:event.id,
      accountId:event.accountId,
      periodID:event.periodID
    })
    this.billCollectionArray=this.formBuilder.array([]);
    let consumeRate=Math.abs(event.serialN-event.readingQty)
      this.billCollectionArray.push(
        new FormGroup({
          memberId:new FormControl(event.memberID,[]),
      memberCode:new FormControl(event.memberCode,[]),
      memberName:new FormControl(event.memberName,[]),
      detailsCaption:new FormControl(event.detailsCaption,[]),
      meterNo:new FormControl(event.meterNo,[]),
      serialNo:new FormControl(event.serialNo,[]),
      consumeRate:new FormControl(Math.abs(event.readingQty-event.serialNo),[]),
      readingQty:new FormControl(event.readingQty,[]),
      unitPrice:new FormControl(event.unitPrice,[]),
      serviceAccountID:new FormControl(event.accountId,[]),
      costCenterId:new FormControl(event.costCenterId,[]),
      parentID:new FormControl(event.parentId,[]),
      amount:new FormControl(event.amount,[])  ,
      isChecked:new FormControl(1,[])
        })
        )

  }
  calculateConsumeRate(i:number){
    let previousRate=Number(this.billCollectionArray.controls[i].get('serialNo').value);
    let unitPrice=Number(this.billCollectionArray.controls[i].get('unitPrice').value);
    let presentRate=Number(this.billCollectionArray.controls[i].get('readingQty').value);
    let consumeRate=Math.abs(presentRate-previousRate);
    if(unitPrice>0){
      let totalAmount=consumeRate*unitPrice;
      this.billCollectionArray.controls[i].get('amount').patchValue(totalAmount)
    }
    this.billCollectionArray.controls[i].get('consumeRate').patchValue(consumeRate);

    }
    calculateTotalAmount(i:number){
      let consumeRate=Number(this.billCollectionArray.controls[i].get('consumeRate').value);
      let unitPrice=Number(this.billCollectionArray.controls[i].get('unitPrice').value);
       let totalAmount=consumeRate*unitPrice;
      this.billCollectionArray.controls[i].get('amount').patchValue(totalAmount);
      }
  reset(){
    this.btnStatus = 'Save'
    this.billCollectionForm.reset();
    this.createForm();
    this.billCollectionArray = this.formBuilder.array([]);
    this.getCriteria();
    this. getServiceNameByType();
  }
  createForm(){
    this.billCollectionForm=this.formBuilder.group({
      id:[0,[]],
      buildingId:[,[]],
      detailsID:[,[]],
      accountId:[,[]],
      periodID:[,[]],
      transId:[0,[]],
      compId:[this.compId,[]],
      moduleID:[this.moduleId,[]]
    })
  }

  get f(){
    return this.billCollectionForm.controls;
  }
}
