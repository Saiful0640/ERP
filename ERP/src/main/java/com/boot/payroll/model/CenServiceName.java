package com.boot.payroll.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="censervicename")
public class CenServiceName {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column(name="servicename")
	private String serviceName;
	@Column(name="unitprice")
	private Double unitPrice;
	@Column(name="isfixedamount")
	private boolean isFixedAmount;
	@Column(name="accountid")
	private long accountID;
	@Column(name="compid")
	private long compId;
	@Column(name="servicetypeid")
	private int serviceTypeID;
	@Column(name="adddeduct")
	private int addDeduct;
	@Column(name="moduleid")
	private long moduleID;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getServiceName() {
		return serviceName;
	}
	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}
	public Double getUnitPrice() {
		return unitPrice;
	}
	public void setUnitPrice(Double unitPrice) {
		this.unitPrice = unitPrice;
	}
	public boolean isFixedAmount() {
		return isFixedAmount;
	}
	public void setFixedAmount(boolean isFixedAmount) {
		this.isFixedAmount = isFixedAmount;
	}
	public long getAccountID() {
		return accountID;
	}
	public void setAccountID(long accountID) {
		this.accountID = accountID;
	}
	public long getCompId() {
		return compId;
	}
	public void setCompId(long compId) {
		this.compId = compId;
	}
	public int getServiceTypeID() {
		return serviceTypeID;
	}
	public void setServiceTypeID(int serviceTypeID) {
		this.serviceTypeID = serviceTypeID;
	}
	public int getAddDeduct() {
		return addDeduct;
	}
	public void setAddDeduct(int addDeduct) {
		this.addDeduct = addDeduct;
	}
	public long getModuleID() {
		return moduleID;
	}
	public void setModuleID(long moduleID) {
		this.moduleID = moduleID;
	}
	public CenServiceName(long id, String serviceName, Double unitPrice, boolean isFixedAmount, long accountID,
			long compId, int serviceTypeID, int addDeduct, long moduleID) {
		super();
		this.id = id;
		this.serviceName = serviceName;
		this.unitPrice = unitPrice;
		this.isFixedAmount = isFixedAmount;
		this.accountID = accountID;
		this.compId = compId;
		this.serviceTypeID = serviceTypeID;
		this.addDeduct = addDeduct;
		this.moduleID = moduleID;
	}
	public CenServiceName() {
		
	}
	
	
	
}
