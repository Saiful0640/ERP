import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
export class EmpGenInfoModel {
    id: number;
    empCode: string;
    name: string;
    dOB: string;
    ngbDbo:NgbDateStruct;
    genderID: number;
    bloodGroupID: number;
    religionID: number;
    nationalID: string;
    mobile: string;
    presentAddress: string;
    permamentAddress: string;
    meritalStatusID: number;
    spouseName: string;
    fatherName: string;
    motherName: string;
    remarks: string;
    picture: any;
    pictureFile:File;
    companyID: number;
    userID: number;
    option: number;
    entryDate:string;
    ngbEntryDate:NgbDateStruct;
    active:number;
    thanaId:number;
    permanentThanaId:number;
    presentUpozilla:number;
    permanentUpozilla:number;
    presentDistrict:number;
    permanentDistrict:number;
    email:string;
}