import { AccountingBasicEntryService } from './../../../../../services/accounting/accounting-basic-entry.service';
import { NgbDateCustomParserFormatter } from './../../../../../shared/dateformat';
import { ToastrService } from 'ngx-toastr';
import { ChequeBook } from './../../../../../models/accounting/basic-entry/bank/cheque-book.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../../../services/auth.service';
import { Helper } from '../../../../../shared/helper';
import { AccountChart } from '../../../../../models/accounting/basic-entry/bank/AccountChart';
import { ChequeBookView } from '../../../../../models/accounting/bank/cheque-book-view.model';

@Component({
  selector: 'app-cheque-book',
  templateUrl: './cheque-book.component.html',
  styleUrls: ['./cheque-book.component.scss']
})
export class ChequeBookComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private chequeBookService: AccountingBasicEntryService,
    private toasterService: ToastrService,
    private dateFormater: NgbDateCustomParserFormatter
  ) { }
  chequeBookForm: FormGroup;
  btnStatus: string = "Save";
  totalPage: number;
  compID: number;
  branchID: number;
  chequeBookModel: ChequeBookView[] = [];
  chequeBookInfo: ChequeBook;
  userID: number;
  receivedDateNgb: NgbDateStruct = null;
  rejectDateNgb: NgbDateStruct = null;
  isSubmitted:boolean = false;
  isSaving:boolean=false;
  ngOnInit() {
    this.userID = AuthService.UserId;
    this.compID =AuthService.CompanyId;
    this.createForm();
  }
  onSelectBank(chequeBook: AccountChart) {
    this.chequeBookForm.patchValue({
      accountId: chequeBook.accountId
    })
    this.getAllChequeBook(chequeBook.accountId);
  }
  getAllChequeBook(accountID: number) {
    this.chequeBookService.getAllChequeBookNew().subscribe((response: any) => {
      if (response) {
        //accountID,this.compID
        this.chequeBookModel = response.filter(x=>x.accountId==accountID).map(item=>{
          item.isUsed=item.used,
          item.isRejected=item.rejected
          return item;
        }) ;
        let lastChequeNo:number = Math.max.apply(Math, this.chequeBookModel.map(function(o) { return o.chequeNo; })) +1;
        console.log(this.chequeBookModel)
        this.chequeBookForm.patchValue({firstPage:lastChequeNo, lastPage:lastChequeNo})
      } else {
        this.chequeBookModel = [];
      }
    }, err=>{
      this.chequeBookModel = [];
      this.f.firstPage.patchValue(0);
      this.f.lastPage.patchValue(0)
    })
  }

  getChequeBookByID(id: number) {
    let chequeBookInfo = this.chequeBookModel.find(c => c.id == id);
    if(chequeBookInfo.isRejected ==true || chequeBookInfo.isUsed==true){
      this.toasterService.warning('This cheque can\'t be edit','Invalid Attempt!');
      return;
    }
    this.receivedDateNgb = this.dateFormater.getYyyymmddToNgbDate(chequeBookInfo.recivedDate);
    this.rejectDateNgb = this.dateFormater.getYyyymmddToNgbDate(chequeBookInfo.rejectDate);
    this.chequeBookForm.patchValue({
      id: chequeBookInfo.id,
      accountId: chequeBookInfo.accountId,
      receivedDate: chequeBookInfo.recivedDate,
      chequeNo: chequeBookInfo.chequeNo,
      isUsed: chequeBookInfo.isUsed,
      isRejected:chequeBookInfo.isRejected,
      rejectReason:chequeBookInfo.rejectReason,
      rejectDate: chequeBookInfo.rejectDate,
      compId: this.compID,
      rejectedBy:this.userID
    });
    this.btnStatus = "Update"
  }

  onLastChequeNo() {
    this.totalPage = (this.f.lastPage.value - this.f.firstPage.value)+1
  }
  onSubmit(){
    if(this.btnStatus=="Save"){
      this.saveChequeBook();
    }else{
      this.updateChequeBook();
    }
  }
  saveChequeBook() {
    this.isSubmitted = true;
    this.isSaving=true;    
      for(let firstPage=this.f.firstPage.value;firstPage<=this.f.lastPage.value;firstPage++){
          let chequeInfo=new ChequeBook();
          chequeInfo.accountId=this.f.accountId.value;
          chequeInfo.chequeNo=Number(firstPage.toString().padStart(6,'0'));
          chequeInfo.compId=this.compID;
          chequeInfo.isRejected=this.f.isRejected.value;
          chequeInfo.isUsed=this.f.isUsed.value;
          chequeInfo.recivedDate=this.f.receivedDate.value;
          chequeInfo.rejectReason=this.f.rejectReason.value;
          chequeInfo.rejectedBy=this.userID;
        this.chequeBookService.saveChequeBookNew(chequeInfo)
        .subscribe((response: any) => {
          if (response) {
            this.toasterService.success( "Success!");
          } else {
            this.toasterService.error( "Failed!");
          }
          // this.getAllChequeBook(this.f.accountId.value);
         this.reset();
          this.btnStatus = "Save";
          this.isSaving=false;
        },(err:any)=>{
          this.toasterService.error(err.error,"Error!!");
          this.isSaving=false;
        })
      }
  }
  updateChequeBook() {
    this.isSubmitted = true;
    this.isSaving=true;
      if(this.f.rejectDate.value ==null){
        this.toasterService.error('Invalid Submission');
        this.isSaving=false;
        return;
      }
      let chequeInfo=new ChequeBookView();
          chequeInfo.id=this.f.id.value;
          chequeInfo.accountId=this.f.accountId.value;
          chequeInfo.chequeNo=this.f.chequeNo.value;;
          chequeInfo.compId=this.compID;
          chequeInfo.isRejected=this.f.isRejected.value;
          chequeInfo.isUsed=this.f.isUsed.value;
          chequeInfo.rejected=this.f.isRejected.value;
          chequeInfo.used=this.f.isUsed.value;
          chequeInfo.recivedDate=this.f.receivedDate.value;
          chequeInfo.rejectDate=this.f.rejectDate.value;
          chequeInfo.rejectReason=this.f.rejectReason.value;
          chequeInfo.rejectedBy=this.userID;
          console.log(chequeInfo);
      this.chequeBookService.updateChequeBookNew(chequeInfo)
        .subscribe((response: any) => {
          if (response) {
            this.toasterService.success( "Updated!");
          } else {
            this.toasterService.error( "Failed!");
          }
          // this.getAllChequeBook(this.f.accountId.value);
           this.reset();
        },(err:any)=>{
          this.toasterService.error(err.error,"Error!!");
          this.isSaving=false;
        })
  }


  onReject(isChecked) {
    this.chequeBookForm.patchValue({
      isRejected: isChecked 
    })
  }
  reset() {
    this.receivedDateNgb = null;
    this.rejectDateNgb = null;
    this.createForm();
    this.chequeBookForm.controls['receivedDate'].setValue(Helper.getLocalDateStr());
    this.receivedDateNgb=this.dateFormater.getCurrentNgbDate()
    this.btnStatus = "Save";
    this.isSubmitted = false;
    this.isSaving=false;
  }
  createForm() {
    this.chequeBookForm = this.formBuilder.group({
      id: [0, []],
      accountId: [, [Validators.required]],
      receivedDate: [this.dateFormater.getDateToYyyymmdd(new Date()), [Validators.required]],
      firstPage: [0, [Validators.required]],
      lastPage: [0, [Validators.required]],
      chequeNo: [, []],
      isUsed: [false, []],
      isRejected: [false, []],
      rejectReason: [null, []],
      rejectDate: [this.dateFormater.getDateToYyyymmdd(new Date()), []],
      compId: [this.compID, []],
      rejectedBy: [this.userID, [Validators.required]]
    })
  }
  get f() {
    return this.chequeBookForm.controls;
  }
}



