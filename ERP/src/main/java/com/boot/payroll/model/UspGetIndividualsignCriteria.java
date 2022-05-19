package com.boot.payroll.model;

import java.util.Date;

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
@NamedStoredProcedureQueries({@NamedStoredProcedureQuery(name="usp_Get_IndividualsignCriteria", procedureName = "usp_Get_IndividualsignCriteria", parameters ={@StoredProcedureParameter(mode = ParameterMode.IN, name = "ModuleID", type = long.class),@StoredProcedureParameter(mode = ParameterMode.IN, name = "DetailsID", type = long.class),@StoredProcedureParameter(mode = ParameterMode.IN, name = "MemberID", type = long.class)},resultClasses = UspGetIndividualsignCriteria.class) })
public class UspGetIndividualsignCriteria {
	@Id
	private long id;
	@Column(name="detailsid")
	private long detailsID;
	@Column(name="memberid")
	private long memberID;
	@Column(name="compid")
	private long compID;
	@Column(name="createddate")
	private Date createdDate;
	@Column(name="serviceaccountid")
	private long serviceAccountID;
	@Column(name="amount")
	private Double amount;
	@Column(name="accountid")
	private long accountId;
	@Column(name="status")
	private boolean status;
	@Column(name="processtype")
	private int processType;
	@Column(name="activedate")
	private String activeDate;
	@Column(name="servicename")
	private String serviceName;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getDetailsID() {
		return detailsID;
	}
	public void setDetailsID(long detailsID) {
		this.detailsID = detailsID;
	}
	public long getMemberID() {
		return memberID;
	}
	public void setMemberID(long memberID) {
		this.memberID = memberID;
	}
	public long getCompID() {
		return compID;
	}
	public void setCompID(long compID) {
		this.compID = compID;
	}
	public Date getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	public long getServiceAccountID() {
		return serviceAccountID;
	}
	public void setServiceAccountID(long serviceAccountID) {
		this.serviceAccountID = serviceAccountID;
	}
	public Double getAmount() {
		return amount;
	}
	public void setAmount(Double amount) {
		this.amount = amount;
	}
	public long getAccountId() {
		return accountId;
	}
	public void setAccountId(long accountId) {
		this.accountId = accountId;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public int getProcessType() {
		return processType;
	}
	public void setProcessType(int processType) {
		this.processType = processType;
	}
	public String getActiveDate() {
		return activeDate;
	}
	public void setActiveDate(String activeDate) {
		this.activeDate = activeDate;
	}
	public String getServiceName() {
		return serviceName;
	}
	public void setServiceName(String serviceName) {
		this.serviceName = serviceName;
	}
	
	
}
