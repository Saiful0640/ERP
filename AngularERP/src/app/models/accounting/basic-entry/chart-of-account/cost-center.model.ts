export class CostCenterModel {
	costCenterId: number;
	costCenterName: string;
	parentId: number;
	parentName:string;
	isGroup: number;
	isActive: number;
	compId: number;
	branchID: number;
	createdDate: Date;
	createdBy: string;
	modifiedDate: Date;
	modifiedBy: string;
	underCostCenters: CostCenterModel[];
	hide: boolean = true;

}
