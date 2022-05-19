package com.boot.accounting.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="transcostcenter")
public class TransCostCenter {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name="costcenterid")
	private Long costCenterId;
	@Column(name="transid")
	private Long transId;
	@Column(name="accountid")
	private Long accountId;
	@Column(name="amonut")
	private Double amount;
	@Column(name="compid")
	private Long compId;
	@Column(name="periodid")
	private Long periodId;
	@Column(name="memberid")
	private Long memberId;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getCostCenterId() {
		return costCenterId;
	}
	public void setCostCenterId(Long costCenterId) {
		this.costCenterId = costCenterId;
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
	public Long getCompId() {
		return compId;
	}
	public void setCompId(Long compId) {
		this.compId = compId;
	}
	public Long getPeriodId() {
		return periodId;
	}
	public void setPeriodId(Long periodId) {
		this.periodId = periodId;
	}
	public Long getMemberId() {
		return memberId;
	}
	public void setMemberId(Long memberId) {
		this.memberId = memberId;
	}
	public TransCostCenter(Long id, Long costCenterId, Long transId, Long accountId, Double amount, Long compId,
			Long periodId, Long memberId) {
		super();
		this.id = id;
		this.costCenterId = costCenterId;
		this.transId = transId;
		this.accountId = accountId;
		this.amount = amount;
		this.compId = compId;
		this.periodId = periodId;
		this.memberId = memberId;
	}
	public TransCostCenter() {
		
	}
	
}
