package com.boot.accounting.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="chequebook")
public class ChequeBook {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name="accountid")
	private Long accountId;
	
	@Column(name="reciveddate")
	private String recivedDate;
	@Column(name="chequeno")
	private Long chequeNo;
	@Column(name="isused")
	private boolean isUsed;
	@Column(name="isrejected")
	private boolean isRejected;
	@Column(name="rejectereson")
	private String rejectReson;
	@Column(name="rejecdate")
	private String rejectDate;
	@Column(name="compid")
	private Long compId;
	@Column(name="rejectedby")
	private Long rejectedBy;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getAccountId() {
		return accountId;
	}
	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}
	public String getRecivedDate() {
		return recivedDate;
	}
	public void setRecivedDate(String recivedDate) {
		this.recivedDate = recivedDate;
	}
	public Long getChequeNo() {
		return chequeNo;
	}
	public void setChequeNo(Long chequeNo) {
		this.chequeNo = chequeNo;
	}
	public boolean isUsed() {
		return isUsed;
	}
	public void setUsed(boolean isUsed) {
		this.isUsed = isUsed;
	}
	public boolean isRejected() {
		return isRejected;
	}
	public void setRejected(boolean isRejected) {
		this.isRejected = isRejected;
	}
	public String getRejectReson() {
		return rejectReson;
	}
	public void setRejectReson(String rejectReson) {
		this.rejectReson = rejectReson;
	}
	public String getRejectDate() {
		return rejectDate;
	}
	public void setRejectDate(String rejectDate) {
		this.rejectDate = rejectDate;
	}
	public Long getCompId() {
		return compId;
	}
	public void setCompId(Long compId) {
		this.compId = compId;
	}
	public Long getRejectedBy() {
		return rejectedBy;
	}
	public void setRejectedBy(Long rejectedBy) {
		this.rejectedBy = rejectedBy;
	}
	public ChequeBook(Long id, Long accountId, String recivedDate, Long chequeNo, boolean isUsed, boolean isRejected,
			String rejectReson, String rejectDate, Long compId, Long rejectedBy) {
		super();
		this.id = id;
		this.accountId = accountId;
		this.recivedDate = recivedDate;
		this.chequeNo = chequeNo;
		this.isUsed = isUsed;
		this.isRejected = isRejected;
		this.rejectReson = rejectReson;
		this.rejectDate = rejectDate;
		this.compId = compId;
		this.rejectedBy = rejectedBy;
	}
	public ChequeBook() {
		
	}
	
}
