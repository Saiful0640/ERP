import { AccountingBasicEntryService } from './../../../../../services/accounting/accounting-basic-entry.service';
import { ToastrService } from 'ngx-toastr';
import { CostCenterModel } from './../../../../../models/accounting/basic-entry/chart-of-account/cost-center.model';
import { Component, OnInit, Renderer2, ViewChild, ElementRef, HostListener, Input } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CostCenterChildModel } from '../../../../../models/accounting/basic-entry/chart-of-account/cost-center-parent-model';
import { AuthService } from '../../../../../services/auth.service';

@Component({
  selector: 'app-cost-center',
  templateUrl: './cost-center.component.html',
  styleUrls: ['./cost-center.component.scss']
})
export class CostCenterComponent implements OnInit {
  @Input() moduleId:number;
  currentModuleId:number;
  constructor(
    // private formBuilder: FormBuilder,
    // private charofaccService: AccountingBasicEntryService,
    // private toasterService: ToastrService,
    // private renderer:Renderer2
  ) { }
  title:string="CostCenter";
  // costCenterForm: FormGroup;
  // compID: number;
  // branchID: number;
  // parentCostCenter: CostCenterModel[] = [];
  // allCostCenter: CostCenterModel[] = [];
  // btnStatus = "Save";
  // visible = false;
  // pVisible = false;

  // @ViewChild('treeView') treeView:ElementRef;
  ngOnInit() {
    if(this.moduleId==null || this.moduleId===undefined){
    this.moduleId=AuthService.CurrentModuleId;
    }else{
    this.moduleId=this.moduleId;
    }
    // this.compID = 1;
    // this.branchID = -1;
    // this.createForm();
    // this.getListOfCostCenter();
    // this.getAllCostCenter();
  }
  // keyboardEvent: any;
  // altKey: boolean;
  // charCode: number;
  // code: string;
  // ctrlKey: boolean;
  // keyCode: number;
  // keyIdentifier: string;
  // metaKey: boolean;
  // shiftKey: boolean;
  // timeStamp: number;
  // type: string;
  // which: number;

  // @HostListener('window:keydown', ['$event'])
  // keyboardInput(event: any) {
  //   event.preventDefault();
  //   event.stopPropagation();

  //   this.keyboardEvent = event;
  //   this.altKey = event.altKey;
  //   this.charCode = event.charCode;
  //   this.code = event.code;
  //   this.ctrlKey = event.ctrlKey;
  //   this.keyCode = event.keyCode;
  //   this.keyIdentifier = event.keyIdentifier;
  //   this.metaKey = event.metaKey;
  //   this.shiftKey = event.shiftKey;
  //   this.timeStamp = event.timeStamp;
  //   this.type = event.type;
  //   this.which = event.which;
  // }

  // taggle() {
  //   this.visible = !this.visible
  // }
  // tagglep() {
  //   this.pVisible = !this.pVisible
  // }
  // getListOfCostCenter() {
  //   this.charofaccService.getListOfCostCenter(this.compID).subscribe((response:any) => {
  //     if (response.status) {
  //       this.parentCostCenter = response.result;
  //     }
  //     else {
  //       this.parentCostCenter = [];
  //     }
  //   })
  // }

  // getAllCostCenter() {
  //   this.charofaccService.getAllCostCenter(this.compID).subscribe((response:any) => {
  //     if (response.status) {
  //       this.allCostCenter = response.result;
  //       let ul = this.genListOfCostCenter(this.allCostCenter)
  //       this.renderer.appendChild(this.treeView.nativeElement, ul)
  //     } else {
  //       this.allCostCenter = [];
  //     }
  //   })
  // }
  // getCostCenterByID(id: number) {
  //   let costCenter = new CostCenterModel();
  //   costCenter = this.allCostCenter.find(c => c.costCenterId == id)
  //   this.costCenterForm.patchValue(costCenter);
  //   this.btnStatus = "Update"
  // }
  // saveCostCenter() {
  //   let costCenterInfo = new CostCenterModel();
  //   costCenterInfo = this.costCenterForm.value;
  //   costCenterInfo.parentId = this.f.parentID.value;
  //   if (this.f.isGroup.value == true) {
  //     costCenterInfo.isGroup = 1;
  //   } else {
  //     costCenterInfo.isGroup = 0;
  //   }
  //   this.charofaccService.saveCostCenter(costCenterInfo).subscribe((response: any) => {
  //     this.toasterService.success(response.status, "Success!")
  //     this.getAllCostCenter();
  //     this.getListOfCostCenter();
  //     this.reset();
  //     this.btnStatus = "Save";

  //   })
  // }

  // reset() {
  //   this.costCenterForm.reset();
  //   this.createForm();
  //   this.btnStatus = "Save";
  // }
  // createForm() {
  //   this.costCenterForm = this.formBuilder.group({
  //     id: [0, []],
  //     costCenterName: [, []],
  //     parentID: [, []],
  //     isGroup: [, []],
  //     isActive: [1, []],
  //     companyID: [this.compID, []],
  //     branchID: [this.branchID, []]
  //   })
  // }
  // get f() {
  //   return this.costCenterForm.controls;
  // }

  // selectedList: any;
  // onSelect(costCenter: CostCenterModel): void {
  //   costCenter.hide = !costCenter.hide;
  //   this.selectedList = costCenter;
  // }


  // genListOfCostCenter(items:CostCenterModel[]){
  //   let ul = document.createElement('ul');
  //   this.renderer.addClass(ul, 'list-group')
  //   items.forEach(item=>{
  //     let li = document.createElement('li');
  //     this.renderer.addClass(li, 'list-group-item');
  //     this.renderer.addClass(li, 'pl-2');
  //     li.innerText =item.costCenterName;
  //     let span1 = document.createElement('span');
  //     li.appendChild(span1);
  //     let span2 = document.createElement('span');
  //     this.renderer.addClass(span2, 'fa')
  //     this.renderer.addClass(span2, 'fa-chevron-down')
  //     this.renderer.addClass(span2, 'pull-right')
  //     li.appendChild(span2)
  //     ul.appendChild(li);
  //     // if(item.isGroup==1){
  //     //   let child_ul = this.genListOfCostCenter(item.underCostCenters)
  //     //   if(ul.childElementCount>0){
  //     //     li.appendChild(child_ul)
  //     //   }
  //     // }
  //   })
  //   return ul;
  // }

}
