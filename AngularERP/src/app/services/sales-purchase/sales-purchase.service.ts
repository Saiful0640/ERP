import { MarketingStatusParamObjec } from './../../models/sales-purchase/marketing-status-param-objec';
import { Helper } from './../../shared/helper';
import { InvoiceType, OrderType } from '../../shared/lookup';
import { toDate } from '@angular/common/src/i18n/format_date';
import { ProductModel } from './../../models/sales-purchase/product-model';
import { ProductColorModel } from './../../models/sales-purchase/product-color-model';
import { ProductBrandModel } from './../../models/sales-purchase/product-brand-model';

import { CategoryModel } from './../../models/sales-purchase/category-model';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TransactionModel } from '../../models/sales-purchase/transaction-model';
import { Doreport } from '../../models/sales-purchase/doreport.model';

@Injectable({
  providedIn: 'root'
})
export class SalesPurchaseService {

  constructor(
    private http: HttpClient
  ) { }

  getProductType() {
    return this.http.get(environment.apiUrl + '/salesPurchase/GetProductType');
  }
  /* #region  Category */
  saveCategory(category) {
    return this.http.post(environment.apiUrl + '/salesPurchase/saveCategory', category);
  }
  getAllCategory(companyId, categoryId: any = -1, parentId: any = -1, isParent: any = -1, productType: any = -1) {
    let httpParam = new HttpParams()
      .append('companyId', companyId)
      .append('categoryId', categoryId==null?-1:categoryId)
      .append('parentId', parentId)
      .append('isParent', isParent)
      .append('productType', productType)
    return this.http.get(environment.apiUrl + '/salesPurchase/GetCategory', { params: httpParam });
  }
  getAllCategoryPipe(companyId) {
    let httpParam = new HttpParams()
      .append('companyId', companyId)

    return this.http.get(environment.apiUrl + '/salesPurchase/GetCategoryPipe', { params: httpParam });
  }
  getAllCategoryForProduct(companyId) {
    let httpParam = new HttpParams()
      .append('companyId', companyId)
    return this.http.get(environment.apiUrl + '/salesPurchase/GetCategoryForProduct', { params: httpParam });
  }
  /* #endregion */
  /* #region  Brand */
  saveBrand(brand: ProductBrandModel) {
    return this.http.post(environment.apiUrl + '/salesPurchase/saveBrand', brand);
  }
  getAllBrand(companyId: number, id: number = -1) {
    let httpParam = new HttpParams()
      .append('companyId', companyId.toString())
      .append('id', id.toString())
    return this.http.get(environment.apiUrl + '/salesPurchase/getAllBrand', { params: httpParam });
  }

  /* #endregion */
  /* #region  Color */
  saveColor(color: ProductColorModel) {
    return this.http.post(environment.apiUrl + '/salesPurchase/saveColor', color);
  }
  getAllColor(companyId: number, id: number = -1) {
    var param = new HttpParams()
      .append('companyId', companyId.toString())
      .append('id', id.toString())
    return this.http.get(environment.apiUrl + '/salesPurchase/getColor', { params: param });
  }
  /* #endregion */
  /* #region  Product Model */
  saveProModel(Brand: ProductModel) {
    return this.http.post(environment.apiUrl + '/salesPurchase/saveProductModel', Brand);
  }
  getAllProModel(companyId: number, id: number = -1) {
    var httpParam = new HttpParams()
      .append('companyId', companyId.toString())
      .append('id', id.toString())
    return this.http.get(environment.apiUrl + '/salesPurchase/getProductModel', { params: httpParam });
  }
  /* #endregion */
  /* #region  Unit */
  saveProUnit(unit) {
    return this.http.post(environment.apiUrl + '/salesPurchase/saveUnit', unit);
  }
  getAllProUnit(companyId: number, id: number = -1) {
    var httpParam = new HttpParams()
      .append('companyId', companyId.toString())
      .append('id', id.toString())
    return this.http.get(environment.apiUrl + '/salesPurchase/GetUnit', { params: httpParam });
  }
  getProductUnit(productId, companyId, unitType) {
    const httpParam = new HttpParams()
      .append('productId', productId)
      .append('companyId', companyId)
      .append('unitType', unitType)
    return this.http.get(environment.apiUrl + '/salesPurchase/GetProductUnit', { params: httpParam });
  }
  /* #endregion */
  getAllOrigin(companyId: number, id: number = -1) {
    var httpParam = new HttpParams()
      .append('companyId', companyId.toString())
      .append('id', id.toString())
    return this.http.get(environment.apiUrl + '/salesPurchase/GetOrigin', { params: httpParam });
  }
  /* #region  Product */
  getProducts(companyId: number,categoryId:number, partyId: number) {
    var httpParam = new HttpParams()
      .append('companyId', companyId.toString())
      .append('categoryId', categoryId.toString())
      .append('partyId', partyId.toString())
    return this.http.get(environment.apiUrl + '/salesPurchase/GetProducts', { params: httpParam });
  }
  getProductsForSafowanOpeningStock(companyId: number) {
    var httpParam = new HttpParams()
      .append('companyId', companyId.toString())
    return this.http.get(environment.apiUrl + '/salesPurchase/GetProductsForSafowanOpeningStock', { params: httpParam });
  }
  getProductsForUnite(companyId: number,categoryId:number) {
    var httpParam = new HttpParams()
      .append('companyId', companyId.toString())
      .append('categoryId', categoryId.toString())
    return this.http.get(environment.apiUrl + '/salesPurchase/GetProductsForUnited', { params: httpParam });
  }
  getProductsForDisSettings(companyId: number,categoryId:number, partyType: number=0) {
    var httpParam = new HttpParams()
      .append('companyId', companyId.toString())
      .append('categoryId', categoryId.toString())
      .append('partyId', partyType.toString())
    return this.http.get(environment.apiUrl + '/salesPurchase/GetProductsForDisSettings', { params: httpParam });
  }

  getProductsForDisSettingsList(companyId: number, partyType:number,categoryId:number) {
   return this.http.get(environment.apiUrl + '/salesPurchase/GetProductsForDisSettingsList/companyId/'+companyId+'/partyType/'+partyType+'/categoryId/'+categoryId);
  }

 /*  GetProductsForDisSettings */
  getProductsChallanM(companyId: number) {
    var httpParam = new HttpParams()
      .append('companyId', companyId.toString())
    return this.http.get(environment.apiUrl + '/salesPurchase/GetProductsChallanM', { params: httpParam });
  }
  getReferenceProducts(companyId: number, categoryId: number=-1) {
    var httpParam = new HttpParams()
      .append('compId', companyId.toString())
      .append('categoryId', categoryId.toString())
    return this.http.get(environment.apiUrl + '/salesPurchase/GetReferenceProduct', { params: httpParam });
  }
  getReferenceMSPipes(companyId: number) {
    var httpParam = new HttpParams()
      .append('compId', companyId.toString())
    return this.http.get(environment.apiUrl + '/salesPurchase/GetRefarenceMSPipes', { params: httpParam });
  }
  getProductsByCategory(companyId: number, categoryId: number) {
    var httpParam = new HttpParams()
      .append('companyId', companyId.toString())
      .append('categoryId', categoryId.toString())
    return this.http.get(environment.apiUrl + '/salesPurchase/GetProducts', { params: httpParam });
  }
  getProduct(productId: number, compId: number = -1) {
    var httpParam = new HttpParams()
      .append('productId', productId.toString())
      .append('compId', compId.toString())
    return this.http.get(environment.apiUrl + '/salesPurchase/GetProduct', { params: httpParam });
  }
  getInvoiceProducts(compId:number,billNatureId:number) {
    var httpParam = new HttpParams()
      .append('compId', compId.toString())
      .append('billNatureId', billNatureId.toString())
    return this.http.get(environment.apiUrl + '/salesPurchase/GetInvoiceProducts', { params: httpParam });
  }
  saveProduct(product) {
    return this.http.post(environment.apiUrl + '/salesPurchase/SaveProduct', product);
  }
  /* #endregion */
  getCustomer(companyId: number, type: number = 2) {
    let httpParam: HttpParams = new HttpParams()
      .append('companyId', companyId.toString())
      .append('type', type.toString())
    return this.http.get(environment.apiUrl + '/salesPurchase/GetCustomer', { params: httpParam });
  }
  getCustomerForOrder(companyId: number, type: number ,empId:number) {
    let httpParam: HttpParams = new HttpParams()
      .append('companyId', companyId.toString())
      .append('type', type.toString())
      .append('empId', empId.toString())
    return this.http.get(environment.apiUrl + '/salesPurchase/GetCustomerForOrder', { params: httpParam });
  }
  getCustomerByDetailsId(companyId: number, type: number ,detailsId:number){
    let httpParam: HttpParams = new HttpParams()
    .append('companyId', companyId.toString())
    .append('type', type.toString())
    .append('detailsId', detailsId.toString())
  return this.http.get(environment.apiUrl + '/salesPurchase/GetCustomerByDetailsId', { params: httpParam });
  }
  getInvoiceCustomer(companyId: number, type: number = 2) {
    let httpParam: HttpParams = new HttpParams()
      .append('companyId', companyId.toString())
      .append('type', type.toString())
    return this.http.get(environment.apiUrl + '/salesPurchase/GetInvoiceCustomer', { params: httpParam });
  }
  getSalesPerson(companyId: number) {
    let httpParam: HttpParams = new HttpParams()
      .append('companyId', companyId.toString())
    return this.http.get(environment.apiUrl + '/salesPurchase/GetSalesPerson', { params: httpParam });
  }

  /* #region  Invoice */
  getAllMoneyReceipt(compId:number) {
    return this.http.get(environment.apiUrl + '/Invoice/GetMoneyReceipts/'+compId)
  }
  getInvoiceTypeKey(invoiceType: InvoiceType): string {
    switch (invoiceType) {
      case InvoiceType.Sales:
        return 'SA';
      case InvoiceType.Purchase:
        return 'PU';
      case InvoiceType.SalesReturn:
        return 'SR';
      case InvoiceType.PurchaseReturn:
        return 'PR';
      default:
        throw Error('Invalid Invoice Type');
    }
  }
  saveInvoice(invoice) {
    return this.http.post(environment.apiUrl + '/Invoice/Save', invoice);
  }
  searchInvoice(filterObj: any) {
    const paramObj = new HttpParams()
      .append('searchText', filterObj.searchText)
      .append('invoiceType', filterObj.invoiceType)
      .append('invoiceDate', filterObj.invoiceDate)
      .append('companyId', filterObj.companyId)
      .append('searchAnyDate', filterObj.searchAnyDate ? "1" : "0")
      .append('SearchLevel',filterObj.SearchLevel)
      .append('ModuleId',filterObj.ModuleId)
    return this.http.get(environment.apiUrl + '/Invoice/Search', { params: paramObj })
  }
  Searchbypartyname(filterObj: any) {
    const paramObj = new HttpParams()
      .append('searchText', filterObj.searchText)
      .append('invoiceType', filterObj.invoiceType)
      .append('companyId', filterObj.companyId)
      .append('SearchLevel',filterObj.SearchLevel)
      .append('ModuleId',filterObj.ModuleId)
      .append('accountId',filterObj.accountId)
      .append('billContactNo',filterObj.billContactNo)
    return this.http.get(environment.apiUrl + '/Invoice/Searchbypartyname', { params: paramObj })
  }
  //

  getInvoiceByTransId(transId, compId,billNatureId) {
    return this.http.get(environment.apiUrl + `/Invoice/GetInvoiceByTransId/${transId}/${compId}/${billNatureId}`)
  }
  getBillFromChallan(selectedChallanId, partyId, compId) {
    const httpParam = new HttpParams()
      .append('selectedChallanId', selectedChallanId)
      .append('partyId', partyId)
      .append('compId', compId)
    return this.http.get(environment.apiUrl + `/Invoice/GetBillFromChallan`, { params: httpParam })
  }
  /* #endregion */

  /* #region  Order */
  getOrderTypekey(orderType: OrderType): string {
    switch (orderType) {
      case OrderType.Sales:
        return 'SO';
      case OrderType.Purchase:
        return 'PO';
      default:
        throw Error('Invalid Order Type.');
    }
  }
  getDetailsIDByEmpType(compId:number,empId:number){
    return this.http.get(environment.apiUrl +`/order/getDetailsIDByEmpType/${compId}/${empId}`);
  }
  getNextOrderNo(companyId: number, orderType: OrderType, orderDate: any = new Date().toLocaleString()) {
    const httpParam = new HttpParams()
      .append('companyId', companyId.toString())
      .append('orderType', orderType.toString())
      .append('orderDate', orderDate)
    return this.http.get(environment.apiUrl + '/Order/GetNextOrderNo', { params: httpParam });
  }
  saveOrder(orderModel) {
    return this.http.post(environment.apiUrl + '/Order/Save', orderModel);
  }
  getOrder(searchObj):any{
    return this.http.post(environment.apiUrl+'/Order/Get',searchObj)
  }
  getDeleveryOrder(searchObj):any{
    return this.http.post(environment.apiUrl+'/Order/GetDelivary',searchObj)
  }
  getIdByOrderNo(OrderId:any,compId:any):any{
    let httpParam = new HttpParams()
    .set('OrderId',OrderId)
    .set('compId',compId)
    return this.http.get(environment.apiUrl+'/Order/GetIdByOrderNo',{params:httpParam})
  }
  getOrderById(id:any, compId:any){
    let httpParam = new HttpParams()
    .set('id',id)
    .set('compId',compId)
    return this.http.get(environment.apiUrl+'/Order/Get',{params:httpParam})
  }
  getFactor(compId:number,unitId:number,ProductId:number){
    let httpParam = new HttpParams()
    .set('compId',compId.toString())
    .set('UnitId',unitId.toString())
    .set('productId',ProductId.toString())
    return this.http.get(environment.apiUrl+'/SalesPurchase/GetFactor',{params:httpParam})
  }
  getPartyInformationById(id:any, compId:any){
    let httpParam = new HttpParams()
    .set('accountId',id)
    .set('compId',compId)
    return this.http.get(environment.apiUrl+'/Order/getPartyInformationById',{params:httpParam})
  }

  /* #endregion */

//#region DeliveryLocation

saveLocation(loc){

  return this.http.post(environment.apiUrl+'/SalesPurchase/SaveLocation',loc)
}

getAllLocationChart(compId:number,accountId:number=0){
 return this.http.get(environment.apiUrl+'/salesPurchase/getSearchLocations/compId/'+compId+'/accountID/'+accountId);
}
 /* #endregion */

 saveSimpleInvoice(invoice) {
  return this.http.post(environment.apiUrl + '/Invoice/SaveSimpleInvoice', invoice);
}
DeleteProductId(productid) {
  return this.http.post(environment.apiUrl + '/Invoice/DeleteProductId', productid);
}
/* BillingAccountsInvoice */
getBillingAccounts(billType, compId, isOptional) {
  const httpParam = new HttpParams()
    .append('billType', billType)
    .append('compId', compId)
    .append('isOptional', isOptional)
  return this.http.get(environment.apiUrl + `/Invoice/getBillingAccounts`, { params: httpParam })
}

/* #region TermsSave */

saveTerms(terms)
{
return this.http.post(environment.apiUrl +'/salesPurchase/SaveTermes',terms);
}

getAllTerms(compId:number,moduleId:number)
{
  return this.http.get(environment.apiUrl +'/salesPurchase/GetTermes/compId/'+compId+'/moduleId/'+moduleId);
}

deleteProductFromOrderDetails(id){
  return this.http.get(environment.apiUrl +'/order/deleteProductFromOrderDetails/'+id);
}

//marketing Status
getMarketingStatusByAuthEmpId(param:MarketingStatusParamObjec){
  return this.http.post(environment.apiUrl +'/order/geMarketingStatus/',param);
}
getMarketingEmpOrder(compId:number,empId:number){
  return this.http.get(environment.apiUrl +`/order/getMarketingEmpOrder/${compId}/${empId}`);
}

 getDashboardData(compId:number,empId:number,moduleId:number,creteriaLbl:number){
  return this.http.get(environment.apiUrl+'/salesPurchase/getDashboardData/compId/'+compId+'/empId/'+empId+'/moduleId/'+moduleId+'/creteriaLevel/'+creteriaLbl)
}

//DO Report
getAllDoForReport(DOReportLis:Doreport)
{
  return this.http.post(environment.apiUrl + '/Order/GetAllDOForReport', DOReportLis);
}
getAllDoForFactory(DOReportLis:Doreport)
{
  return this.http.post(environment.apiUrl + '/Order/GetDoForFactory', DOReportLis);
}
getproductUnitFactor(compId:number,productId:number,unitId:number) {
  var httpParam = new HttpParams()
    .append('compId', compId.toString())
    .append('productId', productId.toString())
    .append('unitId', unitId.toString())
  return this.http.get(environment.apiUrl + '/salesPurchase/GetProductUnitFactor', { params: httpParam });
}
/* getPendingOrder(compId:number,partyId:number,startDate:string,endDate:string,branchId:number,orderType:number,isActive:number){
  return this.http.get(environment.apiUrl+'/salesPurchase/GetPendingOrder/compId/'+compId+'/partyId/'+partyId+'/startDate/'+startDate+'/endDate/'+endDate+'/branchId/'+branchId+'/orderType/'+orderType+'/isActive/'+isActive);
 } */
 getPendingOrder(order:any){
  return this.http.post(environment.apiUrl+'/salesPurchase/GetPendingOrder',order);
 }
 getInvoiceDayBook(compId:number,startDate:string,endDate:string,branchId:number,challanNatureId:number){
  return this.http.get(environment.apiUrl+'/salesPurchase/GetInvoiceDayBook/compId/'+compId+'/startDate/'+startDate+'/endDate/'+endDate+'/branchId/'+branchId+'/challanNatureId/'+challanNatureId);
 }
 getProductionSearch(compId:number,startDate:string,endDate:string,orderId:number){
   return this.http.get(environment.apiUrl+'/salesPurchase/GetProductionSearch/compId/'+compId+'/startDate/'+startDate+'/endDate/'+endDate+'/orderId/'+orderId);
 }
 getproductprice(){
   return this.http.get(environment.apiUrl+'/salesPurchase/GetProductPrice');
 }
 getSalesDashboard(compId: number) {
  return this.http.get(environment.apiUrl + '/salesPurchase/SalesDashboard/' + compId);
}

getSalesDashboardDetais(compId: number) {
  return this.http.get(environment.apiUrl + '/salesPurchase/SalesDashboardDetails/' + compId);
}

getSalesDashboardByCityDetais(compId: any) {
  return this.http.post(environment.apiUrl + '/salesPurchase/SalesDashboardByCity',compId);
}
getProjectDashboard(compId: any) {
  return this.http.post(environment.apiUrl + '/salesPurchase/ProjectDashboard',compId);
}
getsalesDashboardReport(compId:number, startDate:string, endDate:string) {
  var httpParam = new HttpParams()
  .append('compId',compId.toString())
  .append('startDate',startDate)
  .append('endDate',endDate)
  return this.http.get(environment.apiUrl + '/salesPurchase/SalesDashboardDetailsw', {params:httpParam});
}
GetAllCategoryByDate(compId:number, startDate:string, endDate:string) {
  var httpParam = new HttpParams()
  .append('compId',compId.toString())
  .append('startDate',startDate)
  .append('endDate',endDate)
  return this.http.get(environment.apiUrl + '/salesPurchase/GetAllCategoryByDate', {params:httpParam});
}

getProductList(compId:number){
  var httParam=new HttpParams()
  .append('compId',compId.toString())
  return this.http.get(environment.apiUrl+'/salesPurchase/GetProductList/',{params:httParam});
}

}
