export class Discount {
   id:number; 
   categoryId:number; 
   itemName:string; 
   accountGroupTypeID:number; 
   compId:number; 
   productId:number; 
   discountRate:number; 
   categoryName:string;
   discountTypeName:string;
   discountSettingItems :Discount[];
   depDiscountRate:number;
}
