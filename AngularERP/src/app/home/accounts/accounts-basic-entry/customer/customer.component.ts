import { AccountingBasicEntryService } from './../../../../services/accounting/accounting-basic-entry.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeadGroupName } from '../../../../models/accounting/head-group-name.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../../services/auth.service';
import { LowerGroupType, GroupAccountType } from '../../../../shared/lookup';
import { GroupAccountModel } from '../../../../models/accounting/basic-entry/group-account-model';
import { GroupAccountSelectListComponent } from '../../../../shared/components/group-account-select-list/group-account-select-list.component';
import { CriteriaCenterService } from '../../../../services/criteria-center.service';
import { ReportModel } from '../../../../models/settings/app-settings/report-model';
// import { ReportService } from '../../../../services/report.service';
import { HttpErrorResponse } from '@angular/common/http';
import { AccountChart } from '../../../../models/accounting/basic-entry/bank/AccountChart';
import { AccountChartService } from '../../../../services/accounting/AccountChartService';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class NewCustomerComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private accChartService: AccountChartService,
    private toasterService: ToastrService,
    private modalService: NgbModal,
    private criteriaService: CriteriaCenterService,
    // private reportService: ReportService
  ) { }

  customerForm: FormGroup;
  customerModel: AccountChart[] = [];
  btnStatus: string = "Save";
  compID: number;
  headGroupNameModel: HeadGroupName[] = [];
  branchId: number;
  options: any[] = [];
  isSubmit: boolean = false;
  isSave: boolean = false;
  lowerGroupID: number = LowerGroupType.Customer;
  groupAccountID: number = GroupAccountType.Customer;
  groupAccountmodel: GroupAccountModel[] = [];
  ///MarketingModuleInfo
  parentDetailsItems: any[] = [];
  subDetailsItems: any[] = [];
  superSubDetailsItems: any[] = [];
  fstlabelName: string;
  sndlableName: string;
  thrdlableName: string;
  pageId: number;
  criteriaType: any[] = [];
  marketingModuleIdForGetCriteria: number = 57;
  companyType:number;
  @ViewChild(GroupAccountSelectListComponent, { read: false }) hello: GroupAccountSelectListComponent;
  //Report
  reports: ReportModel[] = [];
  isPrinting: boolean;
  exportType: string = "pdf";
  reportId: number;
  isExporting: boolean;
  subModuleId: number = 7;
  accountId:number;
  ngAfterViewInit() {
  }
  ngOnInit() {
    this.compID=AuthService.CompanyId;
    this.branchId = 1;
    this.companyType=1;
    // this.getAllCriteriaTypeByModuleId();
    // this.getCriteria();
    this.createForm();
    this.getAllAccountChartBasicEntry();
    // this.getReportInfo();
  }
  getAllAccountChartBasicEntry(){
    this.accChartService.getAllAccountChart().subscribe((response:any)=>{
      if(response){
       this.accountId=Math.max.apply(null,response.map(function(o) { return o.accountId; }))+1;//Number(Math.max(response.map(o => o.accountId))?Math.max(response.map(o => o.accountId)):0)+1;
       this.customerForm.patchValue({accountId:this.accountId});
      }
    })
  }
  onNewAccGroupAdd(item: any) {
    this.groupAccountmodel = item;
    this.ngAfterViewInit();
  }
  modalServOpen(event: any) {
    this.modalService.open(event, { size: 'lg', windowClass: 'modal-xl' });
  }
  getCustomerByID(customerInfo: AccountChart) {
    if (customerInfo.criteriaID == 2) {
      this.onSelectCriteria(customerInfo.parentID);
      this.customerForm.patchValue(customerInfo);
      this.customerForm.patchValue({
        underCriteriaID: customerInfo.detailsID,
        detailsID: 0,
        tIN: customerInfo.tin,
        bIN: customerInfo.bin
      });


    }
    else if (customerInfo.criteriaID == 3) {

      this.criteriaService.getCriteriaCenter(this.marketingModuleIdForGetCriteria, this.compID, 2)
        .subscribe((response: any) => {
          if (response.status) {
            let parentID = response.result.find(p => p.detailsID == customerInfo.parentID).parentID;
            this.onSelectCriteria(parentID);
            this.onSelectSubCriteria(customerInfo.parentID);
            this.customerForm.patchValue(customerInfo);
            this.customerForm.patchValue({
              parentID: parentID,
              underCriteriaID: customerInfo.parentID,
              detailsID: customerInfo.detailsID,
              tIN: customerInfo.tin,
              bIN: customerInfo.bin
            });
          }
        }, (err: any) => {
          this.toasterService.error(err.error, "Failed!");
        });

    }
    else {

      this.customerForm.patchValue({
        parentID: customerInfo.detailsID,
        underCriteriaID: null,
        detailsID: null,
        id: customerInfo.id,
        lowerGroupId: customerInfo.lowerGroupId,
        accountId: customerInfo.accountId,
        accountName: customerInfo.accountName,
        aliasName: customerInfo.aliasName,
        proprietorName: customerInfo.proprietorName,
        openningBalance: customerInfo.openningBalance,
        currencyId: customerInfo.currencyId,
        accType: customerInfo.accType,
        address: customerInfo.address,
        mobileNo: customerInfo.mobileNo,
        phoneNo: customerInfo.phoneNo,
        email: customerInfo.email,
        isCostCenter: customerInfo.isCostCenter,
        isSubledger: customerInfo.isSubledger,
        //isInventory: customerInfo.isInventory,
        isBillbyBill: customerInfo.isBillbyBill,
        isActive: customerInfo.isActive,
        isBranch: customerInfo.isBranch,
        balanceType: customerInfo.balanceType,
        depriciationRate: customerInfo.depriciationRate,
       // noteToHeadId: customerInfo.noteToHeadId,
        accountGroupId: customerInfo.accountGroupId,
        creditLimit: customerInfo.creditLimit,
        creditDays: customerInfo.creditDays,
        accountNo: customerInfo.accountNo,
        // groupAccountID: customerInfo.id,
        groupAccountID:customerInfo.groupAccountID,
        currencyRate: customerInfo.currencyRate,
        country: customerInfo.country,
        bIN: customerInfo.bin,
        tIN: customerInfo.tin,

      });
    }
    this.btnStatus = "Update";
  }
  getAllCriteriaTypeByModuleId() {
    this.criteriaService.getAllCriteriaTypeByModuleId(this.marketingModuleIdForGetCriteria, this.compID).subscribe((types: any) => {
      if (types.status) {
        this.criteriaType = types.result;
        if (this.criteriaType.length > 0) {
          this.fstlabelName = this.criteriaType.find(c => c.criteriaID == 1).criteriaCaption;
        }
      }
      else {
        this.criteriaType = [];
      }
    });
  }
  getCriteria() {
    if(this.companyType==100){
      this.marketingModuleIdForGetCriteria=6;
    }
    this.criteriaService.getCriteriaCenter(this.marketingModuleIdForGetCriteria, this.compID, 1)
      .subscribe((response: any) => {
        if (response.status) {
          this.parentDetailsItems = (response.result);
        }
      }, (err: any) => {
        this.toasterService.error(err.error, "Failed!");
      });
  }
  onSelectCriteria(parentId: number) {
    if (parentId != null) {
      let subDetailsItems = this.parentDetailsItems.find(crt => crt.detailsID == parentId).subCriteria;
      if (subDetailsItems.length > 0) {
        this.subDetailsItems = subDetailsItems;
        this.sndlableName = this.criteriaType.find(c => c.criteriaID == 2).criteriaCaption;
      } else {
        this.f.detailsID.patchValue(parentId);
      }
    }
  }
  onSelectSubCriteria(underCriteriaID: number) {
    if (underCriteriaID != null) {
      let superSubDetailsItems = this.subDetailsItems.find(crt => crt.detailsID == underCriteriaID).subCriteria;
      if (superSubDetailsItems.length > 0) {
        this.superSubDetailsItems = superSubDetailsItems;
        this.thrdlableName = this.criteriaType.find(c => c.criteriaID == 3).criteriaCaption;
      } else {
        this.f.detailsID.patchValue(underCriteriaID);
      }
    }
  }

  confirmSave(event: any) {
    this.isSubmit = true;
    if (this.customerForm.invalid) {
      this.isSave = false;
      this.toasterService.error("Please fill the all required fields", "Invalid submission");
      this.modalService.dismissAll();
      return;
    } else {
      this.isSave = true;
      this.modalService.open(event);
    }

  }
  onSubmit(){
    if(this.btnStatus=="Save"){
      this.saveCustomer();
    }else{
      this.updateCustomer();
    }
  }
  saveCustomer() {
    let bankInfo=new AccountChart();
    bankInfo=this.customerForm.value;
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
  updateCustomer(){
    this.accChartService.updateAccChart(this.customerForm.value).subscribe((response:any)=>{
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
  onSelectCustomer(accountId:any){
    // this.accChartService.getAccountById(this.compID,accountId).subscribe((response:any)=>{
    //   if(response.status){
    //     const test=response.result as any[]
    //     console.log("test",test)
    //     test.forEach(c=>{
    //       this.customerForm.patchValue({
    //         accountId:c.accountId,
    //         accountName:c.accountName,
    //         aliasName:c.aliasName,
    //         proprietorName:c.proprietorName,
    //         country:c.country,
    //         mobileNo:c.mobileNo,
    //         email:c.email,
    //         parentID:c.parentID,
    //         underCriteriaID:c.underCriteriaID,
    //         detailsID:c.detailsID,
    //         address:c.address,
    //         openningBalance:c.openningBalance,
    //         currencyId:c.currencyId,
    //         currencyRate:c.currencyRate,
    //         creditLimit:c.creditLimit,
    //         creditDays:c.creditDays,
    //         tIN:c.tin,
    //         bIN:c.bin,
    //         isBillbyBill:c.isBillbyBill,
    //         isActive:c.isActive,
    //         lowerGroupId:c.lowerGroupId,
    //         compId:c.compId,
    //         branchId:c.branchId,
    //         groupAccountID:c.groupAccountID,
    //         id:c.id

    //       })
    //       this.onSelectCriteria(c.parentID);
    //       if(c.parentID!=null){
    //         this.onSelectSubCriteria(c.underCriteriaID);
    //       }
    //     })
    //   }
    // })
  }
  reset() {
    this.isSubmit = false;
    this.isSave = false;
    this.customerForm.reset();
    this.createForm();
    this.getAllAccountChartBasicEntry();
    this.btnStatus = "Save";
    // this.getAllCustomer();
  }
  createForm() {
    this.customerForm = this.formBuilder.group({
      id:[0,[]],
      branchIdselect:[,[]],
      lowerGroupId:[this.lowerGroupID,[]],
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
    });
  }
  get f() {
    return this.customerForm.controls;
  }
  get formVal() {
    return this.customerForm.value;
  }
  //Report
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
    // this.reportService.getCommercialReportForRpt({
    //   ReportId: this.reportId,
    //   CompId: this.compID,
    //   LowerGroupId: this.lowerGroupID ? this.lowerGroupID : 0,
    //   ExportType: this.exportType
    // }).subscribe((file) => {
    //   this.isExporting = false;
    //   if (file) {
    //     this.reportService.openFileWindow(file)
    //   }
    // }, (err: HttpErrorResponse) => {
    //   this.isExporting = false;
    //   this.toasterService.error(err.error, 'An unexpected Error occured');
    // })
}
}
