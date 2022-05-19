import { CostCenterModel } from './cost-center.model';
export class CostCenterChildModel {
	id: number;
	costCenterName: string;
	parentID: number;
	parentName:string;
	isGroup: number;
	isActive: number;
	companyID: number;
	branchID: number;
	createdDate: Date;
	createdBy: string;
	modifiedDate: Date;
	modifiedBy: string;
	underCostCenters: CostCenterModel[];
}
