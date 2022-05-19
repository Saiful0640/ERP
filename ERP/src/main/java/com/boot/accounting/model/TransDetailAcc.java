package com.boot.accounting.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="transdetailacc")
public class TransDetailAcc {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name="transid")
	private Long transId;
	@Column(name="accountid")
	private Long accountId;
	@Column(name="amonut")
	private Double amount;
	@Column(name="taxid")
	private Long taxId;
	@Column(name="compid")
	private Long compId;
	@Column(name="subsubid")
	private Long subSubId;
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
	public Double getAmount() {
		return amount;
	}
	public void setAmount(Double amount) {
		this.amount = amount;
	}
	public Long getTaxId() {
		return taxId;
	}
	public void setTaxId(Long taxId) {
		this.taxId = taxId;
	}
	public Long getCompId() {
		return compId;
	}
	public void setCompId(Long compId) {
		this.compId = compId;
	}
	public Long getSubSubId() {
		return subSubId;
	}
	public void setSubSubId(Long subSubId) {
		this.subSubId = subSubId;
	}
	public TransDetailAcc(Long id, Long transId, Long accountId, Double amount, Long taxId, Long compId,
			Long subSubId) {
		super();
		this.id = id;
		this.transId = transId;
		this.accountId = accountId;
		this.amount = amount;
		this.taxId = taxId;
		this.compId = compId;
		this.subSubId = subSubId;
	}
	public TransDetailAcc() {
		
	}
	
	
}
