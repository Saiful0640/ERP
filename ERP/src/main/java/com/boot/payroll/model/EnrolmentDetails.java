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
@Table(name="enrolmentdetails")
public class EnrolmentDetails {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column(name="memberid")
	private long memberID;
	@Column(name="grosssalary")
	private Double grossSalary;
	@Column(name="incrimentamount")
	private Double incrimentAmount;
	@Column(name="paymentmethod")
	private int paymentMethod;
	@Column(name="bankid")
	private long bankId;
	@Column(name="branchname")
	private String branchName;
	@Column(name="avvountname")
	private String accountName;
	@Column(name="accountno")
	private String accountNo;
	@Column(name="paymenttype")
	private int paymentType;
	@Column(name="paymentamount")
	private Double paymentAmount;
	@Column(name="compid")
	private long compId;
	@Column(name="moduleid")
	private long moduleId;
	@Column(name="entrydate")
	@Temporal(TemporalType.DATE)
	private Date entryDate = new Date (System.currentTimeMillis());
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getMemberID() {
		return memberID;
	}
	public void setMemberID(long memberID) {
		this.memberID = memberID;
	}
	public Double getGrossSalary() {
		return grossSalary;
	}
	public void setGrossSalary(Double grossSalary) {
		this.grossSalary = grossSalary;
	}
	public Double getIncrimentAmount() {
		return incrimentAmount;
	}
	public void setIncrimentAmount(Double incrimentAmount) {
		this.incrimentAmount = incrimentAmount;
	}
	public int getPaymentMethod() {
		return paymentMethod;
	}
	public void setPaymentMethod(int paymentMethod) {
		this.paymentMethod = paymentMethod;
	}
	public long getBankId() {
		return bankId;
	}
	public void setBankId(long bankId) {
		this.bankId = bankId;
	}
	public String getBranchName() {
		return branchName;
	}
	public void setBranchName(String branchName) {
		this.branchName = branchName;
	}
	public String getAccountName() {
		return accountName;
	}
	public void setAccountName(String accountName) {
		this.accountName = accountName;
	}
	public String getAccountNo() {
		return accountNo;
	}
	public void setAccountNo(String accountNo) {
		this.accountNo = accountNo;
	}
	public int getPaymentType() {
		return paymentType;
	}
	public void setPaymentType(int paymentType) {
		this.paymentType = paymentType;
	}
	public Double getPaymentAmount() {
		return paymentAmount;
	}
	public void setPaymentAmount(Double paymentAmount) {
		this.paymentAmount = paymentAmount;
	}
	public long getCompId() {
		return compId;
	}
	public void setCompId(long compId) {
		this.compId = compId;
	}
	public long getModuleId() {
		return moduleId;
	}
	public void setModuleId(long moduleId) {
		this.moduleId = moduleId;
	}
	public Date getEntryDate() {
		return entryDate;
	}
	public void setEntryDate(Date entryDate) {
		this.entryDate = entryDate;
	}
	public EnrolmentDetails(long id, long memberID, Double grossSalary, Double incrimentAmount, int paymentMethod,
			long bankId, String branchName, String accountName, String accountNo, int paymentType, Double paymentAmount,
			long compId, long moduleId, Date entryDate) {
		super();
		this.id = id;
		this.memberID = memberID;
		this.grossSalary = grossSalary;
		this.incrimentAmount = incrimentAmount;
		this.paymentMethod = paymentMethod;
		this.bankId = bankId;
		this.branchName = branchName;
		this.accountName = accountName;
		this.accountNo = accountNo;
		this.paymentType = paymentType;
		this.paymentAmount = paymentAmount;
		this.compId = compId;
		this.moduleId = moduleId;
		this.entryDate = entryDate;
	}
	public EnrolmentDetails() {
		
	}
	
}
