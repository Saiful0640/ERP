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
@NamedStoredProcedureQueries({@NamedStoredProcedureQuery(name = "CenterServiceAmountList", procedureName = "CenterServiceAmountList", parameters = {
			@StoredProcedureParameter(mode = ParameterMode.IN, name = "ModuleID", type = long.class),@StoredProcedureParameter(mode = ParameterMode.IN, name = "DetailsID", type = long.class)},resultClasses = CenterServiceAmountList.class) })
public class CenterServiceAmountList {
	@Id
	private long id;
	@Column(name="detailsid")
	private int detailsID;
	@Column(name="serviceid")
	private int ServiceID;
	@Column(name="servicename")
	private String serviceName;
	@Column(name="detailscaption")
	private String detailsCaption;
	@Column(name="amount")
	private Double amount;
	@Column(name="compid")
	private long compID;
	@Column(name="moduleid")
	private long moduleID;
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
	public String getServiceName() {
		return serviceName;
	}
	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}
	public String getDetailsCaption() {
		return detailsCaption;
	}
	public void setDetailsCaption(String detailsCaption) {
		this.detailsCaption = detailsCaption;
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
