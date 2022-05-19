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
@Table(name="subledger")
public class Subledger {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@Column(name="subledger")
	private String subledgerName;
	@Column(name="aliasname")
	private String aliasName;
	@Column(name="openingbalance")
	private Double openingBalance;
	@Column(name="accountid")
	private Long accountId;
	@Column(name="compid")
	private Long compId;
	@Column(name="isactive")
	private boolean isActive;
	@Column(name="branchid")
	private Long branchId;
	@Temporal(TemporalType.DATE)
	@Column(name="datecreated")
	private Date DateCreated ;
	@Column(name="interestrate")
	private Double InterestRate;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getSubledgerName() {
		return subledgerName;
	}
	public void setSubledgerName(String subledgerName) {
		this.subledgerName = subledgerName;
	}
	public String getAliasName() {
		return aliasName;
	}
	public void setAliasName(String aliasName) {
		this.aliasName = aliasName;
	}
	public Double getOpeningBalance() {
		return openingBalance;
	}
	public void setOpeningBalance(Double openingBalance) {
		this.openingBalance = openingBalance;
	}
	public Long getAccountId() {
		return accountId;
	}
	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}
	public Long getCompId() {
		return compId;
	}
	public void setCompId(Long compId) {
		this.compId = compId;
	}
	public boolean isActive() {
		return isActive;
	}
	public void setActive(boolean isActive) {
		this.isActive = isActive;
	}
	public Long getBranchId() {
		return branchId;
	}
	public void setBranchId(Long branchId) {
		this.branchId = branchId;
	}
	public Date getDateCreated() {
		return DateCreated;
	}
	public void setDateCreated(Date dateCreated) {
		DateCreated = dateCreated;
	}
	public Double getInterestRate() {
		return InterestRate;
	}
	public void setInterestRate(Double interestRate) {
		InterestRate = interestRate;
	}
	public Subledger(Long id, String subledgerName, String aliasName, Double openingBalance, Long accountId,
			Long compId, boolean isActive, Long branchId, Date dateCreated, Double interestRate) {
		super();
		this.id = id;
		this.subledgerName = subledgerName;
		this.aliasName = aliasName;
		this.openingBalance = openingBalance;
		this.accountId = accountId;
		this.compId = compId;
		this.isActive = isActive;
		this.branchId = branchId;
		DateCreated = dateCreated;
		InterestRate = interestRate;
	}
	public Subledger() {
		
	}
	
}
