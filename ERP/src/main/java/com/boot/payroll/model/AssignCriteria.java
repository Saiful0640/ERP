package com.boot.payroll.model;

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
@Table(name="assigncriteria")
public class AssignCriteria {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column(name="detailsid")
	private long detailsID;
	@Column(name="memberid")
	private long memberID;
	@Column(name="moduleid")
	private long moduleID;
	@Column(name="compid")
	private long compID;
	@Column(name="createddate")
	@Temporal(TemporalType.DATE)
	private Date createdDate = new Date(System.currentTimeMillis());
	@Column(name="serviceaccountid")
	private long serviceAccountID;
	@Column(name="amount")
	private Double amount;
	@Column(name="status")
	private boolean status;
	@Column(name="processtype")
	private int processType;
	@Column(name="activedate")
	private String activeDate;
	@Column(name="accountid")
	private long accountId;
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
	public long getModuleID() {
		return moduleID;
	}
	public void setModuleID(long moduleID) {
		this.moduleID = moduleID;
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
	public long getAccountId() {
		return accountId;
	}
	public void setAccountId(long accountId) {
		this.accountId = accountId;
	}
	public AssignCriteria(long id, long detailsID, long memberID, long moduleID, long compID, Date createdDate,
			long serviceAccountID, Double amount, boolean status, int processType, String activeDate, long accountId) {
		super();
		this.id = id;
		this.detailsID = detailsID;
		this.memberID = memberID;
		this.moduleID = moduleID;
		this.compID = compID;
		this.createdDate = createdDate;
		this.serviceAccountID = serviceAccountID;
		this.amount = amount;
		this.status = status;
		this.processType = processType;
		this.activeDate = activeDate;
		this.accountId = accountId;
	}
	public AssignCriteria() {
		
	}
	
}
