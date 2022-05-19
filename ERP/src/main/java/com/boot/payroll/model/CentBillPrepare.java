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
@Table(name="centbillprepare")
public class CentBillPrepare {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column(name="costcenterid")
	private long costCenterId;
	@Column(name="amount")
	private Double amount;
	@Column(name="accountid")
	private long accountId;
	@Column(name="transid")
	private long transId;
	@Column(name="readingqty")
	private int readingQty;
	@Column(name="compid")
	private long compId;
	@Column(name="tag")
	private int tag;
	@Column(name="moduleid")
	private long moduleID;
	@Column(name="periodid")
	private long periodID;
	@Column(name="memberid")
	private long memberID;
	@Column(name="reftransid")
	private long refTransID;
	@Column(name="unitprice")
	private Double unitPrice;
	@Temporal(TemporalType.DATE)
	@Column(name="billdate")
	private Date billDate = new Date(System.currentTimeMillis());
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getCostCenterId() {
		return costCenterId;
	}
	public void setCostCenterId(long costCenterId) {
		this.costCenterId = costCenterId;
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
	public long getTransId() {
		return transId;
	}
	public void setTransId(long transId) {
		this.transId = transId;
	}
	public int getReadingQty() {
		return readingQty;
	}
	public void setReadingQty(int readingQty) {
		this.readingQty = readingQty;
	}
	public long getCompId() {
		return compId;
	}
	public void setCompId(long compId) {
		this.compId = compId;
	}
	public int getTag() {
		return tag;
	}
	public void setTag(int tag) {
		this.tag = tag;
	}
	public long getModuleID() {
		return moduleID;
	}
	public void setModuleID(long moduleID) {
		this.moduleID = moduleID;
	}
	public long getPeriodID() {
		return periodID;
	}
	public void setPeriodID(long periodID) {
		this.periodID = periodID;
	}
	public long getMemberID() {
		return memberID;
	}
	public void setMemberID(long memberID) {
		this.memberID = memberID;
	}
	public long getRefTransID() {
		return refTransID;
	}
	public void setRefTransID(long refTransID) {
		this.refTransID = refTransID;
	}
	public Double getUnitPrice() {
		return unitPrice;
	}
	public void setUnitPrice(Double unitPrice) {
		this.unitPrice = unitPrice;
	}
	public Date getBillDate() {
		return billDate;
	}
	public void setBillDate(Date billDate) {
		this.billDate = billDate;
	}
	public CentBillPrepare(long id, long costCenterId, Double amount, long accountId, long transId, int readingQty,
			long compId, int tag, long moduleID, long periodID, long memberID, long refTransID, Double unitPrice,
			Date billDate) {
		super();
		this.id = id;
		this.costCenterId = costCenterId;
		this.amount = amount;
		this.accountId = accountId;
		this.transId = transId;
		this.readingQty = readingQty;
		this.compId = compId;
		this.tag = tag;
		this.moduleID = moduleID;
		this.periodID = periodID;
		this.memberID = memberID;
		this.refTransID = refTransID;
		this.unitPrice = unitPrice;
		this.billDate = billDate;
	}
	public CentBillPrepare() {
		
	}
	
}
