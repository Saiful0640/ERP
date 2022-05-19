import { AccountingBasicEntryService } from './../../../../services/accounting/accounting-basic-entry.service';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit,ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../../services/auth.service';
import {LowerGroupType } from '../../../../shared/lookup';
import { GroupAccountModel } from '../../../../models/accounting/basic-entry/group-account-model';
import { GroupAccountSelectListComponent } from '../../../../shared/components/group-account-select-list/group-account-select-list.component';
import { ReportModel } from '../../../../models/settings/app-settings/report-model';
// import { ReportService } from '../../../../services/report.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AccountChart } from '../../../../models/accounting/basic-entry/bank/AccountChart';
import { AccountChartService } from '../../../../services/accounting/AccountChartService';

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss']
})
export class NewSupplierComponent implements OnInit {

  constructor(
    private formBuilder:FormBuilder,
    private accChartService:AccountChartService,
    private toasterService:ToastrService,
    private modalService:NgbModal,
    // private reportService: ReportService
  ) { }

  supplierForm:FormGroup;
  supplierModel:AccountChart[]=[];
  btnStatus:string="Save";
  compID:number;
  branchId:number;
  isSubmit:boolean=false;
  isSave:boolean=false;
  lowerGroupId:number=LowerGroupType.Supplier;
  // accGroupItem:any;
  groupAccountmodel:GroupAccountModel[]=[];
  @ViewChild(GroupAccountSelectListComponent ,{read: false}) hello: GroupAccountSelectListComponent ;
  /// Reports
  reports: ReportModel[] = [];
  isExporting: boolean;
  reportId: number;
  exportType: string = "pdf";
  subModuleId: number = 7;
  accountId:number;
  ngAfterViewInit() {
  }
  ngOnInit() {
    this.compID = AuthService.CompanyId
    this.branchId=1;
    this.createForm();
    this.getAllAccountChartBasicEntry();
    //this.getReportInfo();
  }
  getAllAccountChartBasicEntry(){
    this.accChartService.getAllAccountChart().subscribe((response:any)=>{
      if(response){
       this.accountId=Math.max.apply(null,response.map(function(o) {return o.accountId;}))+1;//Number(Math.max(response.map(o => o.accountId))?Math.max(response.map(o => o.accountId)):0)+1;
          console.log(this.accountId)
       this.supplierForm.patchValue({accountId:this.accountId});
      }
    })
  }
  onNewAccGroupAdd(item:any){
    this.groupAccountmodel=item;
    this.ngAfterViewInit();
  }
  modalServOpen(event:any){
    this.modalService.open(event,{size: 'lg', windowClass: 'modal-xl'})

  }
getSupplierByID(supplierInfo:AccountChart){
  //console.log(supplierInfo)
  this.supplierForm.patchValue(supplierInfo)
  this.supplierForm.patchValue({
    tIN:supplierInfo.tin,
    bIN:supplierInfo.bin,
    /* mobileNo:supplierInfo.mobileNo,
    email:supplierInfo.email,
    address:supplierInfo.address */
  });
  this.btnStatus="Update";
}

confirmSave(event:any){
  this.isSubmit=true;
  if(this.supplierForm.invalid){
    this.isSave=false;
   this.toasterService.error("Please fill the all required fields","Invalid submission");
   this.modalService.dismissAll();
   return;
 }else{
  this.isSave=true;
  this.modalService.open(event)
 }

}
onSubmit(){
  if(this.btnStatus=="Save"){
    this.saveSupplier();
  }else{
    this.updateSupplier();
  }
}
saveSupplier(){

    let bankInfo=new AccountChart();
    bankInfo=this.supplierForm.value;
    console.log(bankInfo);
    this.accChartService.saveAccChart(bankInfo).subscribe((response:any)=>{
      if(response){
        this.modalService.dismissAll();
        this.toasterService.success("Saved Success!");
        this.reset();
      }else
      {
        this.toasterService.error("Faild!")
        this.modalService.dismissAll();
        this.isSave=false;
      }
   },(error:any)=>{
    this.toasterService.error(error.error,"Error!")
    this.modalService.dismissAll();
    this.isSave=false;
  }
   )

}
updateSupplier(){

  let supplierInfo=new AccountChart();
  supplierInfo=this.supplierForm.value;

  this.accChartService.updateAccChart(supplierInfo).subscribe((response:any)=>{
    if(response){
      this.modalService.dismissAll();
      this.toasterService.success("Success!")
      this.reset();
    }else{

      this.toasterService.error("Faild!")
      this.modalService.dismissAll();
      this.isSave=false;
    }
 },(error:any)=>{
  this.toasterService.error(error.error,"Failed!")
  this.modalService.dismissAll();
  this.isSave=false;
}
 )

}

///Reports

getReportInfo() {
  // this.reportService.getReports(AuthService.CompanyId, this.subModuleId, AuthService.CurrentPageId).subscribe((response) => {
  //   if (response.status) {
  //     this.reports = response.result as ReportModel[];

  //   }
  // },
  //   (err) => {
  //     this.toasterService.error(err.error, "Report Info not found");
  //   }
  // );
}

onPrint() {
  // this.isExporting = true;
  // this.reportId = this.reports.length > 0 ? this.reports[0].reportId : null;
  // //console.log(this.f.lowerGroupId.value);
  // this.reportService.getCommercialReportForRpt({
  //   ReportId: this.reportId,
  //   CompId: this.compID,
  //   LowerGroupId: this.f.lowerGroupId.value ? this.f.lowerGroupId.value : 0,
  //   ExportType: this.exportType
  // }).subscribe((file) => {
  //   console.log(file);
  //   this.isExporting = false;
  //   if (file) {
  //     this.reportService.openFileWindow(file)
  //   }
  // }, (err: HttpErrorResponse) => {
  //   this.isExporting = false;
  //   this.toasterService.error(err.error, 'An unexpected Error occured');
  // })
}

reset(){
  this.isSubmit=false;
  this.isSave=false;
  this.supplierForm.reset();
  this.createForm();
  this.btnStatus="Save";
  this.getAllAccountChartBasicEntry();
  // this.getAllSupplier();
}
  createForm(){
    this.supplierForm=this.formBuilder.group({
      id:[0,[]],
    branchIdselect:[,[]],
    lowerGroupId:[this.lowerGroupId,[]],
    accountId:[this.accountId,[]],
    accountName:[,[Validators.required]],
    aliasName:[,[]],
    openningBalance:[0,[]],
    currencyId:[1,[]],
    accType:[,[]],
    address:[,[]],
    mobileNo:[,[]],
    phoneNo:[,[]],
    email:[,[Validators.email,Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
    isCostCenter:[,[]],
    isSubledger:[,[]],
    isBillbyBill:[,[]],
    isActive:[1,[]],
    isBranch:[0,[]],
    balanceType:[,[]],
    depriciationRate:[0,[]],
    accountGroupId:[1,[]],
    branchId:[1,[]],
    compId:[this.compID,[]],
    creditLimit:[0,[]],
    creditDays:[0,[]],
    accountNo:[,[Validators.required]],
    groupAccountID :[1,[]],
    currencyRate:[0,[]],
    country:[0,[]],
    tIN:[,[]],
    bIN:[,[]],
    proprietorName:[,[]]
    })
  }
  get f(){
    return this.supplierForm.controls;
  }

}
