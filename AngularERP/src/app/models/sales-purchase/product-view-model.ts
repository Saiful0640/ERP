import { ProductUnitModel } from "./Product-Unit-Model";

export class ProductViewModel{
  id:number;
  name:string;
  description:string;
  unitId:number;
  unitName:string;
  unitFactor:number;
  categoryId:number;
  productType:number;
  costPrice:number;
  unitPrice:number;
  salePrice:number;
  vatrate:number;
  unitQty:number;
  discountRate:number;
  disCountAmount:number;
  total:number;
  netAmount:number;
  modelId:number;
  originId:number;
  colorId:number;
  image:any;
  compId:number;
  brandID:number;
  sortOrder:number;
  isActive:number;
  productUnitGrid:ProductUnitModel[];
}
