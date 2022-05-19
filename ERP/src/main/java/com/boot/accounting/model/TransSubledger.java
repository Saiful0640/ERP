package com.boot.accounting.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="transsubledger")
public class TransSubledger {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name="transid")
	private Long transId;
	@Column(name="accountid")
	private Long accountId;
	@Column(name="subledgerid")
	private Long subledgerId;
	@Column(name="amonut")
	private Double amount;
	@Column(name="compid")
	private Long compId;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getTransId() {
		return transId;
	}
	public void setTransId(Long transId) {
		this.transId = transId;
	}
	public Long getAccountId() {
		return accountId;
	}
	public void setAccountId(Long accountId) {
		this.accountId = accountId;
	}
	public Long getSubledgerId() {
		return subledgerId;
	}
	public void setSubledgerId(Long subledgerId) {
		this.subledgerId = subledgerId;
	}
	public Double getAmount() {
		return amount;
	}
	public void setAmount(Double amount) {
		this.amount = amount;
	}
	public Long getCompId() {
		return compId;
	}
	public void setCompId(Long compId) {
		this.compId = compId;
	}
	public TransSubledger(Long id, Long transId, Long accountId, Long subledgerId, Double amount, Long compId) {
		super();
		this.id = id;
		this.transId = transId;
		this.accountId = accountId;
		this.subledgerId = subledgerId;
		this.amount = amount;
		this.compId = compId;
	}
	public TransSubledger() {
		
	}
	
}
