package com.boot.accounting.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="accountgroup")
public class AccountGroup  {
	@Id
	@GeneratedValue(strategy =GenerationType.AUTO)
	private Long id;
	@Column(name="lowergroupid")
	private int lowerGroupId;
	@Column(name="midgroupid")
	private int midGroupId;
	@Column(name="groupname")
	private String groupName;
	@Column(name="groupnamealias")
	private String groupNameAlias;
	@Column(name="amount")
	private Double amonut;
	@Column(name="acctype")
	private int accType;
	@Column(name="balancesheetcaption")
	private String balanceSheetCaption;
	@Column(name="profitlosscaption")
	private String profitLossCaption;
	@Column(name="fundflowcaption")
	private String fundFlowCaption;
	@Column(name="comid")
	private int comId;
	@Column(name="accounttype")
	private int accountType;
	@Column(name="balancetype")
	private int balanceType;
	@Column(name="balancesheetprintorder")
	private int balancesheetPrintOrder;
	@Column(name="isactive")
	private int isActive;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public int getLowerGroupId() {
		return lowerGroupId;
	}
	public void setLowerGroupId(int lowerGroupId) {
		this.lowerGroupId = lowerGroupId;
	}
	public int getMidGroupId() {
		return midGroupId;
	}
	public void setMidGroupId(int midGroupId) {
		this.midGroupId = midGroupId;
	}
	public String getGroupName() {
		return groupName;
	}
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	public String getGroupNameAlias() {
		return groupNameAlias;
	}
	public void setGroupNameAlias(String groupNameAlias) {
		this.groupNameAlias = groupNameAlias;
	}
	public Double getAmonut() {
		return amonut;
	}
	public void setAmonut(Double amonut) {
		this.amonut = amonut;
	}
	public int getAccType() {
		return accType;
	}
	public void setAccType(int accType) {
		this.accType = accType;
	}
	public String getBalanceSheetCaption() {
		return balanceSheetCaption;
	}
	public void setBalanceSheetCaption(String balanceSheetCaption) {
		this.balanceSheetCaption = balanceSheetCaption;
	}
	public String getProfitLossCaption() {
		return profitLossCaption;
	}
	public void setProfitLossCaption(String profitLossCaption) {
		this.profitLossCaption = profitLossCaption;
	}
	public String getFundFlowCaption() {
		return fundFlowCaption;
	}
	public void setFundFlowCaption(String fundFlowCaption) {
		this.fundFlowCaption = fundFlowCaption;
	}
	public int getComId() {
		return comId;
	}
	public void setComId(int comId) {
		this.comId = comId;
	}
	public int getAccountType() {
		return accountType;
	}
	public void setAccountType(int accountType) {
		this.accountType = accountType;
	}
	public int getBalanceType() {
		return balanceType;
	}
	public void setBalanceType(int balanceType) {
		this.balanceType = balanceType;
	}
	public int getBalancesheetPrintOrder() {
		return balancesheetPrintOrder;
	}
	public void setBalancesheetPrintOrder(int balancesheetPrintOrder) {
		this.balancesheetPrintOrder = balancesheetPrintOrder;
	}
	public int getIsActive() {
		return isActive;
	}
	public void setIsActive(int isActive) {
		this.isActive = isActive;
	}
	
}
