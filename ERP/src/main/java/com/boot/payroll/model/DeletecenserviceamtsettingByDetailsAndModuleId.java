package com.boot.payroll.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedStoredProcedureQueries;
import javax.persistence.NamedStoredProcedureQuery;
import javax.persistence.ParameterMode;
import javax.persistence.StoredProcedureParameter;
import javax.persistence.Table;

@Entity
@Table
@NamedStoredProcedureQueries({@NamedStoredProcedureQuery(name="deletecenserviceamtsettingByDetailsAndModuleId", procedureName = "deletecenserviceamtsettingByDetailsAndModuleId", parameters = {
		@StoredProcedureParameter(mode = ParameterMode.IN, name = "DetailsId", type = long.class),
			@StoredProcedureParameter(mode = ParameterMode.IN, name = "ModuleId", type = long.class)},resultClasses = DeletecenserviceamtsettingByDetailsAndModuleId.class) })
public class DeletecenserviceamtsettingByDetailsAndModuleId {
	@Id
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
}
