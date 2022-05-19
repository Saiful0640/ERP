
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { AppService } from '../../../../app.service';
import { BasicEntryModel } from '../../../../models/hr/basicEntry.model';
import { AuthService } from '../../../../services/auth.service';
import { BasicEntryService } from '../../../../services/hr/basicEntry.service';

@Component({
  selector: 'app-designation-entry',
  templateUrl:'./designation-entry.component.html',
  styleUrls: ['./designation-entry.component.scss']
})
export class DesignationEntryComponent implements

OnInit {
isSubmitted = false;
selectedItemId: number;
filteredItem:BasicEntryModel[]=[];
  constructor(
    private fb: FormBuilder,
        private modalService: NgbModal,
        private basicEntryService: BasicEntryService,
        private toaster: ToastrService,
        private appService: AppService
  ) { }
  btnStatus = "Save";
  comID;
  user;
  basicEntryForm: FormGroup;
  basicEntryModel: BasicEntryModel[] = [];
  allSortOrder: any[] = [];
  title="Designation";
  ngOnInit() {
    this.comID = AuthService.CompanyId;
    this.user= AuthService.UserId;

    this.createForm();
    this.getAllDesignation();
  }
  createForm() {
    this.basicEntryForm = this.fb.group({
      id: [0, []],
      description: [, []],
      sortOrder: [, []],
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
      this.basicEntryService.saveDesignation(this.basicEntryForm.value).subscribe((result:any) => {
        if (result) {
          this.toaster.success( "Success");
          this.btnStatus = "Save";
          this.getAllDesignation();
          this.Reset();
        } else {
          this.toaster.error( "Failed!!");
        }
      });
    }
  }
  update() {
    this.isSubmitted = true;

      console.log(this.basicEntryForm.value)
      this.basicEntryService.updateDesignation(this.basicEntryForm.value).subscribe((result:any) => {
        if (result) {
          this.toaster.success( "Success");
          this.btnStatus = "Save";
          this.getAllDesignation();
          this.Reset();
        } else {
          this.toaster.error( "Failed!!");
        }
      });

  }
  getById(id: number) {
    let department =  this.filteredItem.find(x=>x.id==id)
    this.basicEntryForm.patchValue(department)
    this.btnStatus= "Update";
  }
  onSubmit(){
    if(this.btnStatus=="Save"){
      this.save();
    }else{
      this.update();
    }
  }

  getAllDesignation() {
    this.basicEntryService.getAllDesignationNew().subscribe((result:any) => {
      if (result) {
        this.filteredItem = result as BasicEntryModel[];
        this.basicEntryModel = result as BasicEntryModel[];

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

  }
  getAllSortOrder() {
    let sortOrders: BasicEntryModel[] = this.basicEntryModel.filter(
      (item, i, arr) => arr.findIndex(t => t.sortOrder === item.sortOrder) === i
    );
    let lastItem: BasicEntryModel = new BasicEntryModel();
    lastItem.id = 0;
    console.log(sortOrders);
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
