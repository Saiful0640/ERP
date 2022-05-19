import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CenterServiceAmount } from '../../../../models/center-service-amount';
import { CenserviceAmtParam } from '../../../../models/payroll/censervice-amt-param';
import { AuthService } from '../../../../services/auth.service';
import { CenterServiceNameService } from '../../../../services/center-service-name.service';
import { CriteriaCenterService } from '../../../../services/criteria-center.service';
import { ServiceAmountSetupService } from '../../../../services/service-amount-setup.service';

@Component({
  selector: 'app-emp-salary-structure',
  templateUrl: './emp-salary-structure.component.html',
  styleUrls: ['./emp-salary-structure.component.scss']
})
export class EmpSalaryStructureComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private toastr:ToastrService,
    private serviceAmtSetup:ServiceAmountSetupService,
    private centerService:CenterServiceNameService,
    private criteriaService:CriteriaCenterService
  ) {
    this.additionArForm=this.formBuilder.array([]);
    this.detuctionArForm=this.formBuilder.array([])
  }

  formGroup:FormGroup;
  additionArForm:FormArray;
  detuctionArForm:FormArray;
  serviceName:any[]=[];
  employees:any[]=[];
  parentDetailsItems:any[]=[];
  subDetailsItems:any[]=[];
  superSubDetailsItems:any[]=[];
  criteriaType:any[]=[];
  ////////
  compId:number;
  moduleId:number;
  fstlabelName:string;
  sndlableName:string;
  thrdlableName:string;
  btnStatus="Save";
  isSubmit:boolean=false;

  ngOnInit() {
    this.compId=AuthService.CompanyId;
    this.moduleId=AuthService.CurrentModuleId;
    this.createForm();
    this.getCriteria();
    this.getAllCriteriaTypeByModuleId();
  }

  getEmp(){
    this.serviceAmtSetup.getEmpName(this.compId,30).subscribe((res:any)=>{
      if(res){
    this.employees=res.result as any[];
      }else{
        this.employees=[];
      }
    })
  }

  getAllCriteriaTypeByModuleId(){
    this.criteriaService.getAllCriteriaTypeByModuleIdNew().subscribe((types:any)=>{
      if(types){
        //this.moduleId,this.compId
        this.criteriaType=types.filter(c=>c.moduleId==this.moduleId);
        if(this.criteriaType.length>2){
        this.fstlabelName=this.criteriaType.find(c=>c.id==1).criteriaCaption;
        this.sndlableName=this.criteriaType.find(c=>c.id==2).criteriaCaption;
        this.thrdlableName=this.criteriaType.find(c=>c.id==3).criteriaCaption;
        }else if(this.criteriaType.length>1){
          this.fstlabelName=this.criteriaType.find(c=>c.id==1).criteriaCaption;
          this.sndlableName=this.criteriaType.find(c=>c.id==2).criteriaCaption;
          }else {
            this.fstlabelName=this.criteriaType.find(c=>c.id==1).criteriaCaption;
          }
      }
      else{
        this.criteriaType=[]
      }
    },(err:any)=>{
      alert("askasla")
    })
  }


  getCriteria() {
    this.criteriaService.getDetailsCriteriaCenter(this.moduleId,1,0)
    .subscribe((response: any) => {
      if (response) {
        //this.moduleId,this.compId,1
     this.parentDetailsItems=response;
     if(this.parentDetailsItems.length>0){
       for(let i=0;this.parentDetailsItems.length>i;i++){
         this.criteriaService.getDetailsCriteriaCenter(this.moduleId,2,this.parentDetailsItems[i].id).subscribe((subresponse:any)=>{
           if(subresponse){
            this.parentDetailsItems[i].subCriteria=subresponse;
            if(this.parentDetailsItems[i].subCriteria.length>0){
              for(let subi=0;this.parentDetailsItems[i].subCriteria.length>subi;subi++){
                this.criteriaService.getDetailsCriteriaCenter(this.moduleId,3,this.parentDetailsItems[i].subCriteria[i].id).subscribe((supersubres:any)=>{
                  if(supersubres){
                    this.parentDetailsItems[i].subCriteria[i].subCriteria=supersubres;
                  }
                })
              }
            }
           }
         },(err:any)=>{
           alert("a222s")
         })
       }
     }
    }
    },(err:any)=>{
      this.toastr.error(err.error,"Failed!")
    })
  }

  onSelectCriteria(parentId: number ) {
    if(parentId !=null){
      let subDetailsItems=this.parentDetailsItems.find(crt => crt.id == parentId).subCriteria;
      if( subDetailsItems.length>0){
        this.subDetailsItems=subDetailsItems;
      }else{
        this.f.detailsID.patchValue(parentId)
      }
    }
  }

  onSelectSubCriteria(underCriteriaID: number) {
    if(underCriteriaID !=null){
      let superSubDetailsItems=this.subDetailsItems.find(crt => crt.detailsID == underCriteriaID).subCriteria;
      if( superSubDetailsItems.length>0){
        this.superSubDetailsItems=superSubDetailsItems;
      }else{
        this.f.detailsID.patchValue(underCriteriaID)
      }
    }
  }


  getAllServiceName(){
    this.centerService.getAllServiceNameNew().subscribe((response:any)=>{
      if(response){
        // this.compId,this.moduleId
        console.log(response)
        this.serviceName=response.filter(c=>c.moduleID==this.moduleId);
        let additionAr=this.serviceName.filter(c=>c.addDeduct==1);
        let detuctionAr=this.serviceName.filter(c=>c.addDeduct==-1)
        this.additionArForm=this.formBuilder.array([]);
        let grossSalary=this.f.grossSalary.value;

        additionAr.forEach(items=>{
          this.additionArForm.push(
            new FormGroup({
              serviceID:new FormControl(items.id,[]),
              serviceName:new FormControl(items.serviceName,[]),
              amount:new FormControl((grossSalary*items.unitPrice)/100,[]),
             serialNo:new FormControl(items.serialNo,[]) ,
             processType:new FormControl(items.serviceTypeID,[])
            })
          )
        })
    this.detuctionArForm=this.formBuilder.array([]);
    detuctionAr.forEach(items=>{
      this.detuctionArForm.push(
        new FormGroup({
          serviceID:new FormControl(items.id,[]),
          serviceName:new FormControl(items.serviceName,[]),
          amount:new FormControl((grossSalary*items.unitPrice)/100,[]),
          meterNo:new FormControl(null,[]) ,
          serialNo:new FormControl(items.serialNo,[]) ,
          processType:new FormControl(items.serviceTypeID,[])
        })
      )
    })

      }else
      {
        this.serviceName=[];
      }
    })
  }

  getEmpSalaryById(){}

  saveData(){
    this.isSubmit=true;
    // if(this.formGroup.invalid){
    //   this.toastr.error("Please all the required fields")
    //   return;
    // }

    var filterAddition=this.additionArForm.value.filter(item=>item.serviceID !=null && item.amount >0 );
    var filterDeduction=this.detuctionArForm.value.filter(item=>item.serviceID !=null && item.amount >0 );
    if(filterAddition.length>0){
      if(this.f.detailsID.value>0){
       let cenParam=new CenserviceAmtParam();
       cenParam.detailsId=this.f.detailsID.value;
       cenParam.moduleId=this.moduleId;
       this.serviceAmtSetup.deleteCenServiceAmtSetting(cenParam).subscribe((res:any)=>{ 
          if(res){
            for(let i=0;filterAddition.length>i;i++){
              let serAmt=new CenterServiceAmount();
              serAmt.id=this.f.id.value ;
              serAmt.detailsID=this.f.detailsID.value 
              serAmt.serviceID=filterAddition[i]['serviceID'] ;
              serAmt.amount=filterAddition[i]['amount'];
              serAmt.compID=this.compId; 
              serAmt.moduleID=this.moduleId;
              serAmt.processType=filterAddition[i]['processType'];
              serAmt.serialNo=i+1
              if(serAmt.serviceID >0){
                this.serviceAmtSetup.saveServiceAmount(serAmt).subscribe((response: any) => {
                  if (response) {
                    this.toastr.success( "Success!")
                  } else {
                    this.toastr.error( "Failed!")
                  }
                 //  this.reset();
                })
              }
   
            }
          }

       })
      }
     }
     if(filterDeduction.length>0){
      if(this.f.detailsID.value>0){
       let cenParam=new CenserviceAmtParam();
       cenParam.detailsId=this.f.detailsID.value;
       cenParam.moduleId=this.moduleId;
       this.serviceAmtSetup.deleteCenServiceAmtSetting(cenParam).subscribe((res2:any)=>{ 
        if(res2){
          for(let i=0;filterDeduction.length>i;i++){
            let serAmt=new CenterServiceAmount();
            serAmt.id=this.f.id.value ;
            serAmt.detailsID=this.f.detailsID.value 
            serAmt.serviceID=filterDeduction[i]['serviceID'] ;
            serAmt.amount=filterDeduction[i]['amount'];
            serAmt.compID=this.compId; 
            serAmt.moduleID=this.moduleId;
            serAmt.processType=filterDeduction[i]['processType'];
            serAmt.serialNo=i+1
            if(serAmt.serviceID >0){
              this.serviceAmtSetup.saveServiceAmount(serAmt).subscribe((response: any) => {
                if (response) {
                  this.toastr.success( "Success!")
                } else {
                  this.toastr.error( "Failed!")
                }
               //  this.reset();
              })
            }
 
          }
        }

       })
      }
     }
  }

  reset(){
    this.btnStatus="Save";
    this.formGroup.reset();
    this.createForm();
    this.additionArForm=this.formBuilder.array([]);
    this.detuctionArForm=this.formBuilder.array([]);
  }

  createForm(){
    this.formGroup=this.formBuilder.group({
      id:[,[]],
      grossSalary:[,[]],
      parentID:[,[Validators.required]],
      underCriteriaID:[,[]],
      detailsID:[,[]],
      compID:[this.compId,[]],
      moduleID:[this.moduleId,[]]
    })
  }

  get f(){
    return this.formGroup.controls;
  }

}
