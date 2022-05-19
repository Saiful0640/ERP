import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { ToastrService } from "ngx-toastr";
import { AppService } from "../../../app.service";
import { BasicEntryModel } from "../../../models/hr/basicEntry.model";
import { AuthService } from "../../../services/auth.service";
import { BasicEntryService } from "../../../services/hr/basicEntry.service";
import { Pagination } from "../../../shared/paginate";

@Component({
    selector: 'app-basic-entry',
    templateUrl: './hr-basic-entry.component.html',
    styleUrls: [
      './hr-basic-entry.component.css',
      '../../../../vendor/libs/ng-select/ng-select.scss'
    ]
  })
  export class BasicEntryComponent extends Pagination implements OnInit {
    @Input() title = "Basic Entry";
    @Input() tableName: string;
    @Output() allItem = new EventEmitter<any[]>();
    @Input() descriptionFieldNumber: boolean = false;
    @Input() showCloseBtn: boolean = false;
    isSubmitted = false;
    selectedItemId: number;
    filteredItem:BasicEntryModel[]=[];
    constructor(
        private fb: FormBuilder,
        private modalService: NgbModal,
        private basicEntryService: BasicEntryService,
        private toaster: ToastrService,
        private appService: AppService
      ) {
        super();
      }
      btnStatus = "Save";
  comID;
  user;
  basicEntryForm: FormGroup;
  basicEntryModel: BasicEntryModel[] = [];
  allSortOrder: any[] = [];

  ngOnInit() {
    this.comID = AuthService.CompanyId;
    this.user= AuthService.UserId;
    this.items = [];
    this.perPage = 50,
      this.searchKeys = ['description']
    this.update();
    this.createForm();
    this.getAllItem();
    //this.getAllDepartment();

  }
  createForm() {
    this.basicEntryForm = this.fb.group({
      id: [0, []],
      description: [, []],
      tableName: [this.tableName, []],
      sortOrder: [0, []],
      compId: [this.comID, []],
      userId:[this.user,[]]
    })
  }
  save() {
    this.isSubmitted = true;
    if (this.basicEntryForm.invalid) {
      return;
    }
    else {
      console.log(this.basicEntryForm.value)
      this.basicEntryService.saveOrUpdateBasicEntry(this.basicEntryForm.value).subscribe((result:any) => {
        if (result) {
          this.toaster.success(result.result, "Success");
          this.btnStatus = "Save";
          this.getAllItem();
          this.update();
          this.Reset();
        } else {
          this.toaster.error(result.result, "Failed!!");
        }
      });
    }
  }
  getById(id: number) {
    this.basicEntryService.getByIdBasicEntry(this.tableName,this.comID,id).subscribe((result:any) => {
      if (result) {
        let obj = result as BasicEntryModel;
        obj.tableName = this.tableName;
        this.basicEntryForm.patchValue(result);
        this.btnStatus = "Update";
      }
    });
  }
  getAllDepartment(){
    this.basicEntryService.getAllDepartment(this.comID).subscribe((result:any)=>{
    if(result){
   this.filteredItem=result as BasicEntryModel[];
    }
    else{
      return;
    }
    })
  }
  getAllItem() {
    this.basicEntryService.getAllBasicEntry(this.tableName, this.comID).subscribe((result:any) => {
      if (result) {
        this.filteredItem = result as BasicEntryModel[];
        this.basicEntryModel = result as BasicEntryModel[];
        this.allItem.emit(this.basicEntryModel);
      }
      this.getAllSortOrder();
      return;
    });
  }
  delete(id: number, modal: any) {
    this.selectedItemId = id;
    this.modalService.open(modal);
  }
  confirmDelete(rowId: number) {
    this.basicEntryService.deleteBasicEntry(this.tableName, rowId, this.comID)
      .subscribe(
        (result) => {
          if (result) {
            this.toaster.error("Deleted");
            this.getAllItem();
             this.modalService.dismissAll();
          }
        },
        err => {
          this.toaster.error(err, 'Failed!');
          this.modalService.dismissAll();
        }
      )
    this.modalService.dismissAll()
  }
  getAllSortOrder() {
    let sortOrders: BasicEntryModel[] = this.basicEntryModel.filter(
      (item, i, arr) => arr.findIndex(t => t.sortOrder === item.sortOrder) === i
    );
    let lastItem: BasicEntryModel = new BasicEntryModel();
    lastItem.id = 0;
    if (sortOrders.length > 0) {
      lastItem.sortOrder = Math.max.apply(Math, sortOrders.map(function (o) { return o.sortOrder; })) + 1;
    } else {
      lastItem.sortOrder = 1;
    }
    sortOrders.push(lastItem);
    this.allSortOrder = sortOrders;
    this.basicEntryForm.patchValue({ sortOrder: lastItem.sortOrder });
  }
  close() {
    this.modalService.dismissAll();
  }
  get f() {
    return this.basicEntryForm.controls;
  }
  Reset() {
    this.isSubmitted = false;
    this.basicEntryForm.reset();
    this.createForm();
    this.btnStatus = 'Save'
  }
  }
