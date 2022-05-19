import { Company } from './../../../../models/settings/company.model';
import { SettingService } from '../../../../services/settings/Setting.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.scss']
})
export class CompanyListComponent implements OnInit {

  constructor(
    private companyService:SettingService
  ) { }
  companyModel:Company[]=[];
  clientId:number;
  ngOnInit() {
    this.clientId=AuthService.ClientId;
        this.getAllCompany();
  }
  getAllCompany(){
    this.companyService.getAllCompany().subscribe((response:any)=>{
      if(response.status){
        this.companyModel=response.result as Company[];
      }else
      {
        this.companyModel=[];
      }
    })
  }
}
