import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TransMasterModel } from '../../models/accounting/transaction/trans-master-model';
import { AssignCriteriaModel } from '../../models/assign-criteria.model';
import { BillPrepared } from '../../models/bill-prepared.model';
import { AuthService } from '../../services/auth.service';
import { CenterBillPreparedService } from '../../services/center-bill-prepared.service';
import { CenterServiceNameService } from '../../services/center-service-name.service';
import { CriteriaCenterService } from '../../services/criteria-center.service';
import { Helper } from '../../shared/helper';

@Component({
  selector: 'app-individual-receipt-entry',
  templateUrl: './individual-receipt-entry.component.html',
  styleUrls: ['./individual-receipt-entry.component.scss']
})
export class IndividualReceiptEntryComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder ,
    private criteriaService:CriteriaCenterService,
    private centerService:CenterServiceNameService,
   private billPreparedService:CenterBillPreparedService,
   private toastrService:ToastrService,
   public modalService:NgbModal
  ) { this.individualReceiptArray=this.formBuilder.array([]);}
  compId:number;
  title:string;
  moduleId:number;
  pageId:number;
  isSubmitted:boolean=false;
  btnStatus:string="Save"
  criterias:any[]=[];
  criteriaType:any[]=[];
  billPreaparedList:any[]=[];
  lblname:string;
  lblSnd:string;
  lblthird:string;
  totalAmount:number=0;
  individualReceiptForm:FormGroup;
  individualReceiptArray:FormArray;
  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.moduleId=AuthService.CurrentModuleId;
    this.pageId=AuthService.CurrentPageId;
    this.title=Helper.onSetTitleByModuleId(this.moduleId,this.pageId).opTitle;
    this.getCriteria();
    this.getAllCriteriaTypeByModuleId();
    this.createForm();
  }
  onSelectMemberInfo(memList:any){
    this.individualReceiptForm.patchValue({
      memberID:memList.id
    })
    this.getBillPreparedListForIndReceiptEntry(memList.id);
    }
  getAllCriteriaTypeByModuleId(){
    this.criteriaService.getAllCriteriaTypeByModuleId(this.moduleId,this.compId).subscribe((types:any)=>{
      if(types.status){
        this.criteriaType=types.result;
        if(this.criteriaType.length>2){
        this.lblname=this.criteriaType.find(c=>c.criteriaID==1).criteriaCaption;
        this.lblSnd=this.criteriaType.find(c=>c.criteriaID==2).criteriaCaption;
        this.lblthird=this.criteriaType.find(c=>c.criteriaID==3).criteriaCaption;
        }else if(this.criteriaType.length>2){
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
  onSelectPeriod(periods:any){
    this.individualReceiptForm.patchValue({
      periodID:periods.id
    })
    }
    getBillPreparedListForIndReceiptEntry(memberId:number){
      let object=new AssignCriteriaModel();
      object.compID=this.compId;
      object.moduleID=this.moduleId;
      object.memberID=memberId;
      this.billPreparedService.getBillPreparedListForIndividualReceiptEntry(object).subscribe((response:any)=>{
        if(response.status){
          this.billPreaparedList=response.result;
          this.individualReceiptArray=this.formBuilder.array([]);
          this.billPreaparedList.forEach(item=>{
            if(item.parentId>0 && item.criteriaID==3){
              this.criteriaService.getCriteriaCenter(this.moduleId,this.compId,2)
              .subscribe((response: any) => {
                if (response.status) {
               let info=(response.result) ;
               let superDetailsId=info.find(c=>c.detailsID==item.parentId).parentID;
               let underDetailsCaption=info.find(c=>c.detailsID==item.parentId).detailsCaption;
               let superDetailsCaption=this.criterias.find(c=>c.detailsID==superDetailsId).detailsCaption;
               this.individualReceiptArray.push(
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
              this.individualReceiptArray.push(
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
              this.individualReceiptArray.push(
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
  createNewView(event:any){
    this.modalService.open(event,{size: 'lg', windowClass: 'modal-xl'})
    }
    oncheckedall(isSelect: any){
      if(isSelect){
        this.individualReceiptArray.controls.forEach(c=>c['controls'].isChecked.patchValue(isSelect))
        this.totalAmount =0;
        this.individualReceiptArray.controls.forEach(frmGroup=>{
        let tAmount=Number(frmGroup.get('amount').value);
        this.totalAmount+=tAmount;
        })
       this.f.totalAmount.patchValue(this.totalAmount);
      }else{
        this.individualReceiptArray.controls.forEach(c=>c['controls'].isChecked.patchValue(isSelect))
        this.individualReceiptArray.controls.forEach(frmGroup=>{
        let tAmount=Number(frmGroup.get('amount').value);
        this.totalAmount-=tAmount;
        })
       this.f.totalAmount.patchValue(this.totalAmount);
      }
      }
      getOnSelectedChecked(isSelect: any,i:number) {
        if (isSelect) {
          this.individualReceiptArray.controls[i].get('isChecked').patchValue(isSelect)  ;
         let amount=this.individualReceiptArray.controls[i].get('amount').value;
          this.totalAmount=this.totalAmount+amount
          this.f.totalAmount.patchValue(this.totalAmount);
        }
        else {
          this.individualReceiptArray.controls[i].get('isChecked').patchValue(isSelect)  ;
             let amount=this.individualReceiptArray.controls[i].get('amount').value;
          this.totalAmount=this.totalAmount-amount
          this.f.totalAmount.patchValue(this.totalAmount);
       }
   }

   saveIndividualReceipt(){
     this.btnStatus="Save"
   let individualReceipt=new BillPrepared();
    individualReceipt=this.individualReceiptForm.value;
    var filter=this.individualReceiptArray.value.filter(item=>item.isChecked !=null && item.isChecked !=false);
     individualReceipt.billPrepareItems=filter;
     console.log(individualReceipt,this.individualReceiptForm.value);
    this.billPreparedService.saveIndividualReceiptEntry(individualReceipt).subscribe((res:any)=>{
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
   onSelectIndividualReceiptList(event:any){


  }
   reset(){
    this.btnStatus = 'Save'
    this.individualReceiptForm.reset();
    this.createForm();
    this.individualReceiptArray = this.formBuilder.array([]);
    this.getCriteria();
    this.totalAmount=0;
  }
  createForm(){
    this.individualReceiptForm=this.formBuilder.group({
      id:[0,[]],
      typeID:[3,[]],
      memberID:[,[]],
      totalAmount:[,[]],
      compId:[this.compId,[]],
      moduleID:[this.moduleId,[]],
      accountId:[0,[]],
      costCenterId:[0,[]],
      periodID:[0,[]],
      transId:[0,[]],
    })
  }

  get f(){
    return this.individualReceiptForm.controls;
  }
}
