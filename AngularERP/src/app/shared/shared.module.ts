import { CurrencyTypeSelectListComponent } from './components/currency-type-select-list/currency-type-select-list.component';

import { SectionSelectListComponent } from './components/section-select-list/section-select-list.component';
import { UserModule } from './../user/user.module';
import { AccountMidGroupSelectListComponent } from './components/account-mid-group-select-list/account-mid-group-select-list.component';
import { NgbDateCustomParserFormatter } from './dateformat';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DateControlComponent } from './components/date-control/date-control.component';
import { ImageControlComponent } from './components/image-control/image-control.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeControlComponent } from './components/time-control/time-control.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { AccountGroupSelectListComponent } from './components/account-group-select-list/account-group-select-list.component';
import { BankSelectListComponent } from './components/bank-select-list/bank-select-list.component';
import { VoucherTypeSelectListComponent } from './components/voucher-type-select-list/voucher-type-select-list.component';
import { YearTypeSelectListComponent } from './components/year-type-select-list/year-type-select-list.component';
import { CompanySelectListComponent } from './components/company-select-list/company-select-list.component';
import { UserTypeSelectListComponent } from './components/user-type-select-list/user-type-select-list.component';
import { HeadGroupNameMultiSelectListComponent } from './components/head-group-name-multi-select-list/head-group-name-multi-select-list.component';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { NoCommaPipe } from './no-comma.pipe';
import { AccountNameSelectListComponent } from './components/account-name-select-list/account-name-select-list.component';
import { GroupAccountSelectListComponent } from './components/group-account-select-list/group-account-select-list.component';
import { AccountGroupTypeComponent } from './components/account-group-type/account-group-type.component';

import { TransactionSubledgerSelectListComponent } from './components/transaction-subledger-select-list/transaction-subledger-select-list.component';
import { TransCostCenetrSelectListComponent } from './components/trans-cost-cenetr-select-list/trans-cost-cenetr-select-list.component';
import { CostcenterTemplateComponent } from './components/costcenter-template/costcenter-template.component';
import { LedgerSelectListComponent } from './components/ledger-select-list/ledger-select-list.component';
import { SubledgerTemplateComponent } from './components/subledgerTemplate/subledger-template.component';
import { CategorySelectListComponent } from './components/category-select-list/category-select-list.component';
import { ProductModelSelectListComponent } from './components/product-model-select-list/product-model-select-list.component';
import { UnitSelectListComponent } from './components/unit-select-list/unit-select-list.component';
import { ColorSelectListComponent } from './components/color-select-list/color-select-list.component';
import { BrandSelectListComponent } from './components/brand-select-list/brand-select-list.component';
import { OriginSelectListComponent } from './components/origin-select-list/origin-select-list.component';
import { ConformationMessagesComponent } from './components/conformation-messages/conformation-messages.component';
import { CustomerSelectListComponent } from './components/customer-select-list/customer-select-list.component';
import { ProductSelectListComponent } from './components/product-select-list/product-select-list.component';
import { SalesPersonSelectListComponent } from './components/sales-person-select-list/sales-person-select-list.component';
import { LaddaModule } from 'angular2-ladda';
import { TransactionListShowTempComponent } from './components/transaction-list-show-temp/transaction-list-show-temp.component';
import { SubledgerSelectListForTransactionComponent } from './components/subledger-select-list-for-transaction/subledger-select-list-for-transaction.component';
import { CostcenterSelectListForTransactionComponent } from './components/costcenter-select-list-for-transaction/costcenter-select-list-for-transaction.component';
import { AccountChartBasicEntryShowDataTempComponent } from './components/account-chart-basic-entry-show-data-temp/account-chart-basic-entry-show-data-temp.component';
import { PaymentAndReceiptBillByBillSelectMultiListComponent } from './components/payment-and-receipt-bill-by-bill-select-multi-list/payment-and-receipt-bill-by-bill-select-multi-list.component';
import { SearchInvoiceComponent } from './components/search-invoice/search-invoice.component';
import { DepartmentSelectListComponent } from './components/department-select-list/department-select-list.module';
import { DeleteConfirmationComponent } from './components/delete-confirmation/delete-confirmation.component';
import { DesignationSelectListComponent } from './components/designation-select-list/designation-select-list.module';
import { BasicItemSelectListComponent } from './components/basic-item-select-list/basic-item-select-list.component';
import { ThanaSelectListComponent } from './components/thana-select-list/thana-select-list.component';
import { ServiceTypeSelectListComponent } from './components/service-type-select-list/service-type-select-list.component';
import { MonthSelectListComponent } from './components/month-select-list/month-select-list.component';
import { YearSelectListComponent } from './components/year-select-list-calender/year-select-list-calender.component';
import { PersonalInfoSelectListComponent } from './components/personal-info-select-list/personal-info-select-list.component';
import { PersonalInfoSearchViewComponent } from './components/personal-info-search-view/personal-info-search-view.component';
import { BillProcessViewComponent } from './components/bill-process-view/bill-process-view.component';
import { ReceiptMemberAmountViewComponent } from './components/receipt-member-amount-view/receipt-member-amount-view.component';
import { ReportSelectListComponent } from './components/report-select-list/report-select-list.component';
import { PeriodSelectListComponent } from './components/period-select-list/period-select-list.component';
import { ServiceHeadSelectListComponent } from './components/service-head-select-list/service-head-select-list.component';
import { OrderListModalComponent } from './components/order-list-modal/order-list-modal.component';
import { NouisliderModule } from 'ng2-nouislider';
import { CenterPreparedBillListComponent } from './components/center-prepared-bill-list/center-prepared-bill-list.component';
import { LocationSelectListComponent } from './components/location-select-list/location-select-list.component';
import { MemberSelectListComponent } from './components/member-select-list/member-select-list.component';
import { OtherReferencesSelectListComponent } from './components/other-references-select-list/other-references-select-list.component';
import { LedgerListForSearchInTransactionComponent } from './components/ledger-list-for-search-in-transaction/ledger-list-for-search-in-transaction.component';
import { NewLedgerComponent } from './components/ledger/ledger.component';
import { ProvisionCollectionSelectListComponent } from './components/provision-collection-select-list/provision-collection-select-list.component';
import { DuesPaybleListComponent } from './components/dues-payble-list/dues-payble-list.component';
import { OpeningBalanceListTempComponent } from './components/opening-balance-list-temp/opening-balance-list-temp.component';
import { AssignMemberListComponent } from './components/assign-member-list/assign-member-list.component';
import { DiscountSettingsViewTempComponent } from './components/discount-settings-view-temp/discount-settings-view-temp.component';
import { InvoiceProductSelectListComponent } from './components/invoice-product-select-list/invoice-product-select-list.component';
import { InvoiceCustomerSelectListComponent } from './components/invoice-customer-select-list/invoice-customer-select-list.component';
import { TermAndConditionViewComponent } from './components/term-and-condition-view/term-and-condition-view.component';
import { EmployeeInfoSearchViewComponent } from './components/employee-info-search-view/employee-info-search-view.component';
import { ProductionProductSelectListComponent } from './components/production-product-select-list/production-product-select-list.component';
import { CustomerSelectListForOrderComponent } from './components/customer-select-list-for-order/customer-select-list-for-order.component';
import { ProductSelectByCategoryComponent } from './components/product-select-by-category/product-select-by-category.component';
import { SubledgerTempForBusBdComponent } from './components/subledger-temp-for-bus-bd/subledger-temp-for-bus-bd.component';
import { SearchProductionComponent } from './components/search-production/search-production.component';
import { GroupSlectListComponent } from './components/group-slect-list/group-slect-list.component';
import { ProductSearchListComponent } from './components/product-search-list/product-search-list.component';
import { InvoiceProductSearchListComponent } from './components/invoice-product-search-list/invoice-product-search-list.component';
import { SelectListComponent } from './components/select-list/select-list.component';
import { ProductpricedeductlistComponent } from './components/productpricedeductlist/productpricedeductlist.component';
import { FoamSelectListComponent } from './components/foam-select-list/foam-select-list.component';





@NgModule({
  declarations: [
    ImageControlComponent,
    DateControlComponent,
    TimeControlComponent,
    AccountGroupSelectListComponent,
    AccountMidGroupSelectListComponent,
    BankSelectListComponent,
    VoucherTypeSelectListComponent,
    YearTypeSelectListComponent,
    MemberSelectListComponent,
    CompanySelectListComponent,
    UserTypeSelectListComponent,
    HeadGroupNameMultiSelectListComponent,
    NoCommaPipe,
    AccountNameSelectListComponent,
    GroupAccountSelectListComponent,
    AccountGroupTypeComponent,
    SubledgerTemplateComponent,
    TransactionSubledgerSelectListComponent,
    TransCostCenetrSelectListComponent,
    CostcenterTemplateComponent,
    LedgerSelectListComponent,
    CategorySelectListComponent,
    ProductModelSelectListComponent,
    UnitSelectListComponent,
    ColorSelectListComponent,
    BrandSelectListComponent,
    OriginSelectListComponent,
    ConformationMessagesComponent,
    CustomerSelectListComponent,
    ProductSelectListComponent,
    SalesPersonSelectListComponent,
    TransactionListShowTempComponent,
    SubledgerSelectListForTransactionComponent,
    CostcenterSelectListForTransactionComponent,
    AccountChartBasicEntryShowDataTempComponent,
    LedgerListForSearchInTransactionComponent,
    PaymentAndReceiptBillByBillSelectMultiListComponent,
    SearchInvoiceComponent,
    DepartmentSelectListComponent,
    DesignationSelectListComponent,
    DeleteConfirmationComponent,
    SectionSelectListComponent, DesignationSelectListComponent,
    SectionSelectListComponent,
    BasicItemSelectListComponent,
    ThanaSelectListComponent,
    ServiceTypeSelectListComponent ,
    MonthSelectListComponent,
    YearSelectListComponent,
    PersonalInfoSelectListComponent,
    PersonalInfoSearchViewComponent,
    BillProcessViewComponent,
    ReportSelectListComponent,
    ReceiptMemberAmountViewComponent,
    PeriodSelectListComponent,
    ServiceHeadSelectListComponent,
    OrderListModalComponent,
    CenterPreparedBillListComponent,
    LocationSelectListComponent,
    OtherReferencesSelectListComponent,
    NewLedgerComponent,
    ProvisionCollectionSelectListComponent,
    DuesPaybleListComponent,
    OpeningBalanceListTempComponent,
    AssignMemberListComponent,
    DiscountSettingsViewTempComponent,
    InvoiceProductSelectListComponent,
    InvoiceCustomerSelectListComponent,
    CurrencyTypeSelectListComponent,
    TermAndConditionViewComponent,
    EmployeeInfoSearchViewComponent,
    ProductionProductSelectListComponent,
    CustomerSelectListForOrderComponent,
    ProductSelectByCategoryComponent,
    SubledgerTempForBusBdComponent,
    SearchProductionComponent,

    GroupSlectListComponent,
    ProductSearchListComponent,
    InvoiceProductSearchListComponent,
    SelectListComponent,
    ProductpricedeductlistComponent,
    FoamSelectListComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgSelectModule,
    MultiselectDropdownModule,
    UserModule,
    LaddaModule,
    NouisliderModule
  ],
  exports:[
    ImageControlComponent,
    DateControlComponent,
    TimeControlComponent,
    AccountGroupSelectListComponent,
    AccountMidGroupSelectListComponent,
    BankSelectListComponent,
    VoucherTypeSelectListComponent,
    YearTypeSelectListComponent,
    CompanySelectListComponent,
    MemberSelectListComponent,
    UserTypeSelectListComponent,
    HeadGroupNameMultiSelectListComponent,
    NoCommaPipe,
    AccountNameSelectListComponent,
    GroupAccountSelectListComponent,
    AccountGroupTypeComponent,
    SubledgerTemplateComponent,
    TransactionSubledgerSelectListComponent,
    TransCostCenetrSelectListComponent,
    CostcenterTemplateComponent,
    LedgerSelectListComponent,
    CategorySelectListComponent,
    ProductModelSelectListComponent,
    UnitSelectListComponent,
    ColorSelectListComponent,
    BrandSelectListComponent,
    OriginSelectListComponent,
    ConformationMessagesComponent,
    CustomerSelectListComponent,
    ProductSelectListComponent,
    SalesPersonSelectListComponent,
    TransactionListShowTempComponent,
    SubledgerSelectListForTransactionComponent,
    CostcenterSelectListForTransactionComponent,
    AccountChartBasicEntryShowDataTempComponent,
    LedgerListForSearchInTransactionComponent,
    PaymentAndReceiptBillByBillSelectMultiListComponent,
    SearchInvoiceComponent,
    DepartmentSelectListComponent,
    DesignationSelectListComponent,
    DeleteConfirmationComponent,
    SectionSelectListComponent,
    DesignationSelectListComponent,
    LocationSelectListComponent,
    BasicItemSelectListComponent,
    ThanaSelectListComponent,
    ServiceTypeSelectListComponent,
    MonthSelectListComponent,
    YearSelectListComponent,
    PersonalInfoSelectListComponent,
    PersonalInfoSearchViewComponent,
    BillProcessViewComponent,
    ReportSelectListComponent,
    ReceiptMemberAmountViewComponent,
    PeriodSelectListComponent,
    ServiceHeadSelectListComponent,
    OrderListModalComponent,
    CenterPreparedBillListComponent,
    OtherReferencesSelectListComponent,
    NewLedgerComponent,
    ProvisionCollectionSelectListComponent,
    DuesPaybleListComponent,
    OpeningBalanceListTempComponent,
    AssignMemberListComponent,
    DiscountSettingsViewTempComponent,
    InvoiceProductSelectListComponent,
    InvoiceCustomerSelectListComponent,
    TermAndConditionViewComponent,
    EmployeeInfoSearchViewComponent,
    ProductionProductSelectListComponent,
    CustomerSelectListForOrderComponent,
    ProductSelectByCategoryComponent,
    SubledgerTempForBusBdComponent,
    SearchProductionComponent,
    GroupSlectListComponent,
    ProductSearchListComponent,
    InvoiceProductSearchListComponent,
    SelectListComponent,
    ProductpricedeductlistComponent,
    FoamSelectListComponent,
    CurrencyTypeSelectListComponent
  ],
  providers:[NgbDateCustomParserFormatter, NoCommaPipe]
})
export class SharedModule { }
