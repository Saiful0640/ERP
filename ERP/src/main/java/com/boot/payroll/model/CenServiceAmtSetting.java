package com.boot.payroll.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="censerviceamtsetting")
public class CenServiceAmtSetting {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column(name="detailsid")
	private int detailsID;
	@Column(name="serviceid")
	private int ServiceID;
	@Column(name="amount")
	private Double amount;
	@Column(name="compid")
	private long compID;
	@Column(name="moduleid")
	private long moduleID;
	@Column(name="meterno")
	private String meterNo;
	@Column(name="serialno")
	private int serialNo;
	@Column(name="processtype")
	private int processType;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public int getDetailsID() {
		return detailsID;
	}
	public void setDetailsID(int detailsID) {
		this.detailsID = detailsID;
	}
	public int getServiceID() {
		return ServiceID;
	}
	public void setServiceID(int serviceID) {
		ServiceID = serviceID;
	}
	public Double getAmount() {
		return amount;
	}
	public void setAmount(Double amount) {
		this.amount = amount;
	}
	public long getCompID() {
		return compID;
	}
	public void setCompID(long compID) {
		this.compID = compID;
	}
	public long getModuleID() {
		return moduleID;
	}
	public void setModuleID(long moduleID) {
		this.moduleID = moduleID;
	}
	public String getMeterNo() {
		return meterNo;
	}
	public void setMeterNo(String meterNo) {
		this.meterNo = meterNo;
	}
	public int getSerialNo() {
		return serialNo;
	}
	public void setSerialNo(int serialNo) {
		this.serialNo = serialNo;
	}
	public int getProcessType() {
		return processType;
	}
	public void setProcessType(int processType) {
		this.processType = processType;
	}
	public CenServiceAmtSetting(long id, int detailsID, int serviceID, Double amount, long compID, long moduleID,
			String meterNo, int serialNo, int processType) {
		super();
		this.id = id;
		this.detailsID = detailsID;
		ServiceID = serviceID;
		this.amount = amount;
		this.compID = compID;
		this.moduleID = moduleID;
		this.meterNo = meterNo;
		this.serialNo = serialNo;
		this.processType = processType;
	}
	public CenServiceAmtSetting() {
		
	}
	
}
