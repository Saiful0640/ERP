import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
export class SalesInvoiceProductModel{
  id:number
  productId:number
  name:string
  description:string
  unitId:number
  billUnitId:number
  billUnitFactor:number
  unitName:string
  factor:number
  categoryId:number
  productType:number
  costPrice:number
  salePrice:number
  vatrate:number
  modelId:number
  originId:number
  colorId:number
  image:any
  compId:number
  brandID:number
  sortOrder:number
  isActive:number
  stockQty:number
  serialNo:number
  purchaseDate:NgbDateStruct
}
