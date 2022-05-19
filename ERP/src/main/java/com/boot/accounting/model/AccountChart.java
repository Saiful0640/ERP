package com.boot.accounting.model;







import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name="accountchart")
public class AccountChart {
	@Id
	@GeneratedValue(strategy =GenerationType.IDENTITY)
	private Long id;
	@Column(name="lowergroupid")
	private int lowerGroupId;
	@Column(name="accountid")
	private int accountId;
	@Column(name="proprietorName")
	private String proprietorName;
	@Column(name="accountname")
	private String accountName;
	@Column(name="aliasname")
	private String aliasName;
	@Column(name="openningbalance")
	private Double openningBalance;
	@Column(name="currencyid")
	private int currencyId;
	@Column(name="currencyrate")
	private Double currencyRate;
	@Column(name="acctype")
	private int accType;
	@Column(name="isbranch")
	private boolean isBranch;
	@Column(name="compid")
	private int compId;
	@Column(name="branchid")
	private int branchId;
	@Column(name="issubledger")
	private boolean isSubledger;
	@Column(name="isbillbybill")
	private boolean isBillbyBill;
	@Column(name="isemployee")
	private boolean isEmployee;
	@Column(name="iscostcenter")
	private boolean isCostCenter;
	@Column(name="headgroupid")
	private int headGroupID;
	@Column(name="balancetype")
	private int balanceType;
	@Column(name="isactive")
	private boolean isActive;
	@Column(name="depriciationrate")
	private Double depriciationRate;
	@Column(name="accountgroupid")
	private int accountGroupId;
	@Column(name="issalesaccount")
	private boolean isSalesAccount;
	@Column(name="creditlimit")
	private Double creditLimit;
	@Column(name="creditdays")
	private Double creditDays;
	@Temporal(TemporalType.DATE)
	@Column(name="entrytime")
	private Date entryTime = new Date(System.currentTimeMillis());
	@Column(name="groupaccountid")
	private int groupAccountID;
	@Column(name="address")
	private String address;
	@Column(name="mobileno")
	private String mobileNo;
	@Column(name="phoneno")
	private String phoneNo;
	@Column(name="email")
	private String email;
	@Column(name="statusstring")
	private String statusString;
	@Column(name="presentbalance")
	private Double presentBalance;
	@Column(name="accountno")
	private String accountNo;
	@Column(name="country")
	private String country;
	@Column(name="tIN")
	private String tin;
	@Column(name="bIN")
	private String bin;
	@Column(name="criteriaid")
	private int criteriaID;
	@Column(name="parentid")
	private int parentID;
	@Column(name="detailsid")
	private int detailsID;
	@Column(name="indercriteriaid")
	private int underCriteriaID;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public int getLowerGroupId() {
		return lowerGroupId;
	}
	public void setLowerGroupId(int lowerGroupId) {
		this.lowerGroupId = lowerGroupId;
	}
	public int getAccountId() {
		return accountId;
	}
	public void setAccountId(int accountId) {
		this.accountId = accountId;
	}
	public String getProprietorName() {
		return proprietorName;
	}
	public void setProprietorName(String proprietorName) {
		this.proprietorName = proprietorName;
	}
	public String getAccountName() {
		return accountName;
	}
	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}
	public String getAliasName() {
		return aliasName;
	}
	public void setAliasName(String aliasName) {
		this.aliasName = aliasName;
	}
	public Double getOpenningBalance() {
		return openningBalance;
	}
	public void setOpenningBalance(Double openningBalance) {
		this.openningBalance = openningBalance;
	}
	public int getCurrencyId() {
		return currencyId;
	}
	public void setCurrencyId(int currencyId) {
		this.currencyId = currencyId;
	}
	public Double getCurrencyRate() {
		return currencyRate;
	}
	public void setCurrencyRate(Double currencyRate) {
		this.currencyRate = currencyRate;
	}
	public int getAccType() {
		return accType;
	}
	public void setAccType(int accType) {
		this.accType = accType;
	}
	public boolean isBranch() {
		return isBranch;
	}
	public void setBranch(boolean isBranch) {
		this.isBranch = isBranch;
	}
	public int getCompId() {
		return compId;
	}
	public void setCompId(int compId) {
		this.compId = compId;
	}
	public int getBranchId() {
		return branchId;
	}
	public void setBranchId(int branchId) {
		this.branchId = branchId;
	}
	public boolean isSubledger() {
		return isSubledger;
	}
	public void setSubledger(boolean isSubledger) {
		this.isSubledger = isSubledger;
	}
	public boolean isBillbyBill() {
		return isBillbyBill;
	}
	public void setBillbyBill(boolean isBillbyBill) {
		this.isBillbyBill = isBillbyBill;
	}
	public boolean isEmployee() {
		return isEmployee;
	}
	public void setEmployee(boolean isEmployee) {
		this.isEmployee = isEmployee;
	}
	public boolean isCostCenter() {
		return isCostCenter;
	}
	public void setCostCenter(boolean isCostCenter) {
		this.isCostCenter = isCostCenter;
	}
	public int getHeadGroupID() {
		return headGroupID;
	}
	public void setHeadGroupID(int headGroupID) {
		this.headGroupID = headGroupID;
	}
	public int getBalanceType() {
		return balanceType;
	}
	public void setBalanceType(int balanceType) {
		this.balanceType = balanceType;
	}
	public boolean isActive() {
		return isActive;
	}
	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}
	public Double getDepriciationRate() {
		return depriciationRate;
	}
	public void setDepriciationRate(Double depriciationRate) {
		this.depriciationRate = depriciationRate;
	}
	public int getAccountGroupId() {
		return accountGroupId;
	}
	public void setAccountGroupId(int accountGroupId) {
		this.accountGroupId = accountGroupId;
	}
	public boolean isSalesAccount() {
		return isSalesAccount;
	}
	public void setSalesAccount(boolean isSalesAccount) {
		this.isSalesAccount = isSalesAccount;
	}
	public Double getCreditLimit() {
		return creditLimit;
	}
	public void setCreditLimit(Double creditLimit) {
		this.creditLimit = creditLimit;
	}
	public Double getCreditDays() {
		return creditDays;
	}
	public void setCreditDays(Double creditDays) {
		this.creditDays = creditDays;
	}
	public Date getEntryTime() {
		return entryTime;
	}
	public void setEntryTime(Date entryTime) {
		this.entryTime = entryTime;
	}
	public int getGroupAccountID() {
		return groupAccountID;
	}
	public void setGroupAccountID(int groupAccountID) {
		this.groupAccountID = groupAccountID;
	}
	public String getAddress() {
		return address;
	}
	public void setAddress(String address) {
		this.address = address;
	}
	public String getMobileNo() {
		return mobileNo;
	}
	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}
	public String getPhoneNo() {
		return phoneNo;
	}
	public void setPhoneNo(String phoneNo) {
		this.phoneNo = phoneNo;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getStatusString() {
		return statusString;
	}
	public void setStatusString(String statusString) {
		this.statusString = statusString;
	}
	public Double getPresentBalance() {
		return presentBalance;
	}
	public void setPresentBalance(Double presentBalance) {
		this.presentBalance = presentBalance;
	}
	public String getAccountNo() {
		return accountNo;
	}
	public void setAccountNo(String accountNo) {
		this.accountNo = accountNo;
	}
	public String getCountry() {
		return country;
	}
	public void setCountry(String country) {
		this.country = country;
	}
	public String getTin() {
		return tin;
	}
	public void setTin(String tin) {
		this.tin = tin;
	}
	public String getBin() {
		return bin;
	}
	public void setBin(String bin) {
		this.bin = bin;
	}
	public int getCriteriaID() {
		return criteriaID;
	}
	public void setCriteriaID(int criteriaID) {
		this.criteriaID = criteriaID;
	}
	public int getParentID() {
		return parentID;
	}
	public void setParentID(int parentID) {
		this.parentID = parentID;
	}
	public int getDetailsID() {
		return detailsID;
	}
	public void setDetailsID(int detailsID) {
		this.detailsID = detailsID;
	}
	public int getUnderCriteriaID() {
		return underCriteriaID;
	}
	public void setUnderCriteriaID(int underCriteriaID) {
		this.underCriteriaID = underCriteriaID;
	}
	public AccountChart(Long id, int lowerGroupId, int accountId, String proprietorName, String accountName,
			String aliasName, Double openningBalance, int currencyId, Double currencyRate, int accType,
			boolean isBranch, int compId, int branchId, boolean isSubledger, boolean isBillbyBill, boolean isEmployee,
			boolean isCostCenter, int headGroupID, int balanceType, boolean isActive, Double depriciationRate,
			int accountGroupId, boolean isSalesAccount, Double creditLimit, Double creditDays, Date entryTime,
			int groupAccountID, String address, String mobileNo, String phoneNo, String email, String statusString,
			Double presentBalance, String accountNo, String country, String tin, String bin, int criteriaID,
			int parentID, int detailsID, int underCriteriaID) {
		super();
		this.id = id;
		this.lowerGroupId = lowerGroupId;
		this.accountId = accountId;
		this.proprietorName = proprietorName;
		this.accountName = accountName;
		this.aliasName = aliasName;
		this.openningBalance = openningBalance;
		this.currencyId = currencyId;
		this.currencyRate = currencyRate;
		this.accType = accType;
		this.isBranch = isBranch;
		this.compId = compId;
		this.branchId = branchId;
		this.isSubledger = isSubledger;
		this.isBillbyBill = isBillbyBill;
		this.isEmployee = isEmployee;
		this.isCostCenter = isCostCenter;
		this.headGroupID = headGroupID;
		this.balanceType = balanceType;
		this.isActive = isActive;
		this.depriciationRate = depriciationRate;
		this.accountGroupId = accountGroupId;
		this.isSalesAccount = isSalesAccount;
		this.creditLimit = creditLimit;
		this.creditDays = creditDays;
		this.entryTime = entryTime;
		this.groupAccountID = groupAccountID;
		this.address = address;
		this.mobileNo = mobileNo;
		this.phoneNo = phoneNo;
		this.email = email;
		this.statusString = statusString;
		this.presentBalance = presentBalance;
		this.accountNo = accountNo;
		this.country = country;
		this.tin = tin;
		this.bin = bin;
		this.criteriaID = criteriaID;
		this.parentID = parentID;
		this.detailsID = detailsID;
		this.underCriteriaID = underCriteriaID;
	}
	public AccountChart() {
		
	}
	
}
