export class SalesTargetModel {
          id :number;
          salesMonth :string;
          fromDate :string;
          toDate :string;
          locationID :number;
          empCode :string;
          designationId :number;
          commissionPercentage :number;
          targetAmount :number;
          shortOrder :number;
          compId :number;
          periodID :number;
          empID :number;
          detailsID :number;
          memberName:string;
          createdBy:number;
          itemSalesTarget:SalesTargetModel[];
}
