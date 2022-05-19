import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './../../services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { CriteriaCenterService } from './../../services/criteria-center.service';
import { FormGroup, FormArray, FormBuilder, FormControl } from '@angular/forms';
import { Component,OnInit } from '@angular/core';
import { CenterServiceNameService } from '../../services/center-service-name.service';
import { CenterBillPreparedService } from '../../services/center-bill-prepared.service';
import { Openingbalancemodel } from '../../models/openingbalancemodel.model';
import { Helper } from '../../shared/helper';

@Component({
  selector: 'app-opening-balance',
  templateUrl: './opening-balance.component.html',
  styleUrls: ['./opening-balance.component.scss']
})
export class OpeningBalanceComponent implements OnInit {
 title:string;
/*   @Input() lblname2:string; */


  isSubmitted:boolean=false;
  locationTable: string = "Location";
  btnStatus:string="Save"
  openingBalanceForm:FormGroup
  criterias:any[]=[];
  subCriterias:any[]=[];
  openingBalanceArray:FormArray;
  compId:number;
  moduleId:number;
  lblname:string;
  lblSnd:string;
  memberID:number;
  servicesByType:any[]=[];
  paramItems:any;
  billPreaparedList:any[]=[];
  billPreaparedListByDetailsId:any[]=[];
  type:number=2;
  criteriaType:any[]=[];
  pageId:number;
  typeId:number;
  constructor(private formBuilder:FormBuilder ,
    private criteriaService:CriteriaCenterService,
    private centerService:CenterServiceNameService,
   private billPreparedService:CenterBillPreparedService,
   private toastrService:ToastrService,
   private modalService:NgbModal)
   {this.openingBalanceArray=this.formBuilder.array([]);  }

  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.moduleId=AuthService.CurrentModuleId;
    this.pageId=AuthService.CurrentPageId;
    this.title=Helper.onSetTitleByModuleId(this.moduleId,this.pageId).opTitle;
    this.typeId=Helper.onSetTitleByModuleId(this.moduleId,this.pageId).typeId;
    this.getCriteria();
    this.createForm();
    this.getAllCriteriaTypeByModuleId();
    this.getServiceNameByType();
    this.getBillListOnSelectPeriod();
  }
  getAllCriteriaTypeByModuleId(){
    this.criteriaService.getAllCriteriaTypeByModuleId(this.moduleId,this.compId).subscribe((types:any)=>{
      if(types.status){
        this.criteriaType=types.result;
        if(this.criteriaType.length>2){
        this.lblname=this.criteriaType.find(c=>c.criteriaID==1).criteriaCaption;
        this.lblSnd=this.criteriaType.find(c=>c.criteriaID==2).criteriaCaption;
        }else{
          this.lblname=this.criteriaType.find(c=>c.criteriaID==1).criteriaCaption;
        }
      }
      else{
        this.criteriaType=[]
      }
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
      })
  }
  getSubCriteria(detailsId:number) {
    if(detailsId>0){
    let criteriaById=this.criterias.find(c=>c.detailsID==detailsId).subCriteria;
     if(criteriaById.length >0){
      this.subCriterias=criteriaById;
    }else{
     let filter=this.billPreaparedList.filter(c=>c.detailsID==detailsId);
       this.billPreaparedListByDetailsId=filter;
       this.f.detailsID.patchValue(detailsId);
       this.onSetArrayGroup(this.billPreaparedListByDetailsId)
        this.subCriterias=[]
    }
  }
  }
  onSetArrayGroup(setItems:any){
    this.openingBalanceArray=this.formBuilder.array([]);
    setItems.forEach(item=>{
      this.openingBalanceArray.push(
        new FormGroup({
          memberID:new FormControl(item.memberID,[]),
      memberCode:new FormControl(item.memberCode,[]),
      memberName:new FormControl(item.memberName,[]),
      parentID:new FormControl(item.parentId,[]),
      installmentAmt:new FormControl(item.installmentAmt==null?0:item.installmentAmt,[]),
      installmentQty:new FormControl(item.installmentQty==null?0:item.installmentQty,[]),
      serviceAccountID:new FormControl(item.serviceAccountID,[]),
      costCenterId:new FormControl(item.detailsID,[]),
      amount:new FormControl(item.amount,[])  ,
      isChecked:new FormControl(item.isChecked,[])
        })
        )
      })
  }

  onSelectSubCriteria(subdetailsId:number) {
    if(subdetailsId!=null){
      let superCriteria=this.subCriterias.find(c=>c.detailsID==subdetailsId);
      if(superCriteria.subCriteria.length>0){
        let filter=this.billPreaparedList.filter(c=>c.parentId==subdetailsId);
        this.billPreaparedListByDetailsId=filter;
        console.log(this.billPreaparedListByDetailsId)
        this.onSetArrayGroup(this.billPreaparedListByDetailsId);
      }
      else{
        let filter=this.billPreaparedList.filter(c=>c.parentID==subdetailsId);
        this.billPreaparedListByDetailsId=filter;
        this.onSetArrayGroup(this.billPreaparedList)
      }
      //  console.log(superCriteria)

     }
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
  onSelectServiceName(serviceId:number){
    if(serviceId>0){
    let filterbyService=this.openingBalanceArray.value.filter(c=>c.serviceAccountID==serviceId);
     this.billPreaparedListByDetailsId=filterbyService;
    this.openingBalanceArray=this.formBuilder.array([]);
    this.billPreaparedListByDetailsId.forEach(item=>{
      this.openingBalanceArray.push(
        new FormGroup({
          memberID:new FormControl(item.memberID,[]),
      memberCode:new FormControl(item.memberCode,[]),
      memberName:new FormControl(item.memberName,[]),

      parentID:new FormControl(item.parentID,[]),
      installmentAmt:new FormControl(item.installmentAmt,[]),
      installmentQty:new FormControl(item.installmentQty,[]),
      serviceAccountID:new FormControl(item.serviceAccountID,[]),
      costCenterId:new FormControl(item.costCenterId,[]),
      amount:new FormControl(item.amount,[])  ,
      isChecked:new FormControl(item.isChecked,[])
        })
        )
      })
    }
  }
  createNewView(event:any){
  this.modalService.open(event,{size: 'lg', windowClass: 'modal-xl'})
  }
  onSelectPeriod(periods:any){
    this.openingBalanceForm.patchValue({
      periodID:periods.id
    })
    }
    oncheckedall(isSelect: any){
    if(isSelect){
      this.openingBalanceArray.controls.forEach(c=>c['controls'].isChecked.patchValue(isSelect))
    }else{
      this.openingBalanceArray.controls.forEach(c=>c['controls'].isChecked.patchValue(isSelect))
    }
    }

  getOnSelectedChecked(isSelect: any,i:number) {
     if (isSelect) {
      this.openingBalanceArray.controls[i].get('isChecked').patchValue(isSelect);
     }
     else {
      this.openingBalanceArray.controls[i].get('isChecked').patchValue(isSelect);
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
   savebalance(){
    let openingBalance=new Openingbalancemodel();
    openingBalance=this.openingBalanceForm.value;
    var filter=this.openingBalanceArray.value.filter(item=>item.isChecked !=null && item.isChecked !=false);
    openingBalance.billPrepareItems=filter;
    this.billPreparedService.saveBalance(openingBalance).subscribe((res:any)=>{
      if(res.status){
        this.toastrService.success(res.message,"Success")
        this.reset()
      }
      else{
        this.toastrService.error(res.message,"Faild!")
        this.reset()
      }
    },
    (error:any)=>{
      this.toastrService.error(error.error,"Failed!")
      })
   }

   onSelectOpeningBalanceList(event:any,){
    this.btnStatus="Update";
    let isSelected:boolean=true;
    if(event.criteriaID==3){
      this.criteriaService.getCriteriaCenter(this.moduleId,this.compId,2)
      .subscribe((response: any) => {
        if (response.status) {
       let subcriterias=response.result ;
       let builldingId=subcriterias.find(c=>c.detailsID==event.parentID).parentID;
       this.f.buildingId.patchValue(builldingId);
       this.getSubCriteria(builldingId);
       this.f.detailsID.patchValue(event.parentID)
      }
      })
    }else if(event.criteriaID==2){
      this.f.buildingId.patchValue(event.parentID);
    }else{
      this.f.buildingId.patchValue(event.costCenterId);
    }
    this.openingBalanceForm.patchValue({
      transId:event.transId,
      accountId:event.accountId,
      periodID:event.periodID,
      // detailsID:event.parentID
    })
    this.openingBalanceArray=this.formBuilder.array([]);
      this.openingBalanceArray.push(
        new FormGroup({
          memberID:new FormControl(event.memberID,[]),
      memberCode:new FormControl(event.memberCode,[]),
      memberName:new FormControl(event.memberName,[]),
      serviceAccountID:new FormControl(event.accountId,[]),
      installmentAmt:new FormControl(event.installmentAmt,[]),
      installmentQty:new FormControl(event.installmentQty,[]),
      costCenterId:new FormControl(event.costCenterId,[]),
      amount:new FormControl(event.amount,[])  ,
      isChecked:new FormControl(1,[])
        })
        )
     }
  reset(){
    this.btnStatus = 'Save'
    this.openingBalanceForm.reset();
    this.createForm();

    this.openingBalanceArray = this.formBuilder.array([]);
    this.getCriteria();
    this. getServiceNameByType();
  /*  this.getServiceBillPreparedList(); */
  }

  createForm(){
    this.openingBalanceForm=this.formBuilder.group({
      id:[0,[]],
      buildingId:[,[]],
      detailsID:[,[]],
      transId:[0,[]],
      accountId:[,[]],
      periodID:[,[]],
      compId:[this.compId,[]],
      moduleID:[this.moduleId,[]],
      typeID:[this.typeId,[]]
    })
  }

  get f(){
    return this.openingBalanceForm.controls;
  }
}
