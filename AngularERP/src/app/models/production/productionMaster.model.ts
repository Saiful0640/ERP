export class productionMasterModel {
  id: number
  partyId: number
  challanId: number
  challanNo: number
  challanType: string
  challanDate: string
  productId: number
  pDescription: string
  unitId: number
  unitQty: number
  pcsQty: number
  uniqueQty: number
  compId: number
  brId: number
  godownId: number
  challanNatureId: number
  transId: number
  orderId: number
  userId: number
  refAutoId: number
  remarks: string
  factor: number
  boxConv: number
  destinationGodownId:number
  billTo:string
  billAddress:string
  billContactNo:string
  stockUniqueQty:number
  companyType:number
  unitPrice:number
}

export class BillOfMeterialModel {
  id: number
  productId: number
  fPQty: number
  unitQty: number
  unitPrice: number
  total: number
  reference1: number
  reference2: number
  compId: number
}
export class BillOfMeterialAccountModel {
  id: number
  accountId: number
  amount: number
}
