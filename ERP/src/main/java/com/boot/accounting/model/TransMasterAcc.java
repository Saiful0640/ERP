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
@Table(name="transmasteracc")
public class TransMasterAcc {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name="transid")
	private Long transId;
	@Column(name="compid")
	private Long compId;
	@Column(name="partyid")
	private Long partyId;
	@Column(name="voucherno")
	private int voucherNo;
	@Column(name="voucherdate")
	private String voucherDate;
	@Column(name="vouchertype")
	private String voucherType;
	@Column(name="refaccountid")
	private Long refAccountId;
	@Column(name="moneyreciptid")
	private Long moneyReciptId;
	@Column(name="transtype")
	private int transType;
	@Column(name="totalamount")
	private Double totalAmount;
	@Column(name="refno")
	private String refNo;
	@Column(name="narration")
	private String narration;
	@Column(name="otheraddition")
	private Double otherAddition;
	@Column(name="otherdeduction")
	private Double otherDeduction;
	@Column(name="transportcost")
	private Double transportCost;
	@Column(name="labourecost")
	private Double labourCost;
	@Column(name="paidamount")
	private Double paidAmount;
	@Column(name="paymode")
	private int payMode;
	@Column(name="billto")
	private String billTo;
	@Column(name="billaddress")
	private String billAddress;
	@Column(name="billcontractno")
	private String billContactNo;
	@Column(name="bankbranch")
	private String bankBranch;
	@Column(name="chequeno")
	private String chequeNo;
	@Column(name="chequedate")
	private String chequeDate;
	@Column(name="empid")
	private Long empId;
	@Column(name="discountrate")
	private Double discountRate;
	@Column(name="discountamount")
	private Double discountAmount;
	@Column(name="vatrate")
	private Double vateRate;
	@Column(name="userid")
	private Long userId;
	@Column(name="netpayable")
	private Double netPayable;
	@Column(name="branchid")
	private Long branchId;
	@Column(name="currencyrate")
	private Double currencyRate;
	@Column(name="salespersonempcode")
	private String salesPersonEmpCode;
	@Column(name="conrate")
	private Double conRate;
	@Column(name="yearid")
	private int yearID;
	@Temporal(TemporalType.DATE)
	@Column(name="createdate")
	private Date createdDate;
	@Column(name="refbillid")
	private int	refBillId;
	@Column(name="formatevoucherno")
	private String formateVoucherNo;
	@Column(name="taxtamount")
	private Double taxtAmount;
	@Column(name="taxtrate")
	private Double taxtRate;
	@Column(name="billemail")
	private String billEmail;
	@Column(name="billcountry")
	private String billCountry;
	@Column(name="approvestatus")
	private int approveStatus;
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
	public Long getCompId() {
		return compId;
	}
	public void setCompId(Long compId) {
		this.compId = compId;
	}
	public Long getPartyId() {
		return partyId;
	}
	public void setPartyId(Long partyId) {
		this.partyId = partyId;
	}
	public int getVoucherNo() {
		return voucherNo;
	}
	public void setVoucherNo(int voucherNo) {
		this.voucherNo = voucherNo;
	}
	public String getVoucherDate() {
		return voucherDate;
	}
	public void setVoucherDate(String voucherDate) {
		this.voucherDate = voucherDate;
	}
	public String getVoucherType() {
		return voucherType;
	}
	public void setVoucherType(String voucherType) {
		this.voucherType = voucherType;
	}
	public Long getRefAccountId() {
		return refAccountId;
	}
	public void setRefAccountId(Long refAccountId) {
		this.refAccountId = refAccountId;
	}
	public Long getMoneyReciptId() {
		return moneyReciptId;
	}
	public void setMoneyReciptId(Long moneyReciptId) {
		this.moneyReciptId = moneyReciptId;
	}
	public int getTransType() {
		return transType;
	}
	public void setTransType(int transType) {
		this.transType = transType;
	}
	public Double getTotalAmount() {
		return totalAmount;
	}
	public void setTotalAmount(Double totalAmount) {
		this.totalAmount = totalAmount;
	}
	public String getRefNo() {
		return refNo;
	}
	public void setRefNo(String refNo) {
		this.refNo = refNo;
	}
	public String getNarration() {
		return narration;
	}
	public void setNarration(String narration) {
		this.narration = narration;
	}
	public Double getOtherAddition() {
		return otherAddition;
	}
	public void setOtherAddition(Double otherAddition) {
		this.otherAddition = otherAddition;
	}
	public Double getOtherDeduction() {
		return otherDeduction;
	}
	public void setOtherDeduction(Double otherDeduction) {
		this.otherDeduction = otherDeduction;
	}
	public Double getTransportCost() {
		return transportCost;
	}
	public void setTransportCost(Double transportCost) {
		this.transportCost = transportCost;
	}
	public Double getLabourCost() {
		return labourCost;
	}
	public void setLabourCost(Double labourCost) {
		this.labourCost = labourCost;
	}
	public Double getPaidAmount() {
		return paidAmount;
	}
	public void setPaidAmount(Double paidAmount) {
		this.paidAmount = paidAmount;
	}
	public int getPayMode() {
		return payMode;
	}
	public void setPayMode(int payMode) {
		this.payMode = payMode;
	}
	public String getBillTo() {
		return billTo;
	}
	public void setBillTo(String billTo) {
		this.billTo = billTo;
	}
	public String getBillAddress() {
		return billAddress;
	}
	public void setBillAddress(String billAddress) {
		this.billAddress = billAddress;
	}
	public String getBillContactNo() {
		return billContactNo;
	}
	public void setBillContactNo(String billContactNo) {
		this.billContactNo = billContactNo;
	}
	public String getBankBranch() {
		return bankBranch;
	}
	public void setBankBranch(String bankBranch) {
		this.bankBranch = bankBranch;
	}
	public String getChequeNo() {
		return chequeNo;
	}
	public void setChequeNo(String chequeNo) {
		this.chequeNo = chequeNo;
	}
	public String getChequeDate() {
		return chequeDate;
	}
	public void setChequeDate(String chequeDate) {
		this.chequeDate = chequeDate;
	}
	public Long getEmpId() {
		return empId;
	}
	public void setEmpId(Long empId) {
		this.empId = empId;
	}
	public Double getDiscountRate() {
		return discountRate;
	}
	public void setDiscountRate(Double discountRate) {
		this.discountRate = discountRate;
	}
	public Double getDiscountAmount() {
		return discountAmount;
	}
	public void setDiscountAmount(Double discountAmount) {
		this.discountAmount = discountAmount;
	}
	public Double getVateRate() {
		return vateRate;
	}
	public void setVateRate(Double vateRate) {
		this.vateRate = vateRate;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Double getNetPayable() {
		return netPayable;
	}
	public void setNetPayable(Double netPayable) {
		this.netPayable = netPayable;
	}
	public Long getBranchId() {
		return branchId;
	}
	public void setBranchId(Long branchId) {
		this.branchId = branchId;
	}
	public Double getCurrencyRate() {
		return currencyRate;
	}
	public void setCurrencyRate(Double currencyRate) {
		this.currencyRate = currencyRate;
	}
	public String getSalesPersonEmpCode() {
		return salesPersonEmpCode;
	}
	public void setSalesPersonEmpCode(String salesPersonEmpCode) {
		this.salesPersonEmpCode = salesPersonEmpCode;
	}
	public Double getConRate() {
		return conRate;
	}
	public void setConRate(Double conRate) {
		this.conRate = conRate;
	}
	public int getYearID() {
		return yearID;
	}
	public void setYearID(int yearID) {
		this.yearID = yearID;
	}
	public Date getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	public int getRefBillId() {
		return refBillId;
	}
	public void setRefBillId(int refBillId) {
		this.refBillId = refBillId;
	}
	public String getFormateVoucherNo() {
		return formateVoucherNo;
	}
	public void setFormateVoucherNo(String formateVoucherNo) {
		this.formateVoucherNo = formateVoucherNo;
	}
	public Double getTaxtAmount() {
		return taxtAmount;
	}
	public void setTaxtAmount(Double taxtAmount) {
		this.taxtAmount = taxtAmount;
	}
	public Double getTaxtRate() {
		return taxtRate;
	}
	public void setTaxtRate(Double taxtRate) {
		this.taxtRate = taxtRate;
	}
	public String getBillEmail() {
		return billEmail;
	}
	public void setBillEmail(String billEmail) {
		this.billEmail = billEmail;
	}
	public String getBillCountry() {
		return billCountry;
	}
	public void setBillCountry(String billCountry) {
		this.billCountry = billCountry;
	}
	public int getApproveStatus() {
		return approveStatus;
	}
	public void setApproveStatus(int approveStatus) {
		this.approveStatus = approveStatus;
	}
	public TransMasterAcc(Long id, Long transId, Long compId, Long partyId, int voucherNo, String voucherDate,
			String voucherType, Long refAccountId, Long moneyReciptId, int transType, Double totalAmount, String refNo,
			String narration, Double otherAddition, Double otherDeduction, Double transportCost, Double labourCost,
			Double paidAmount, int payMode, String billTo, String billAddress, String billContactNo, String bankBranch,
			String chequeNo, String chequeDate, Long empId, Double discountRate, Double discountAmount, Double vateRate,
			Long userId, Double netPayable, Long branchId, Double currencyRate, String salesPersonEmpCode,
			Double conRate, int yearID, Date createdDate, int refBillId, String formateVoucherNo, Double taxtAmount,
			Double taxtRate, String billEmail, String billCountry, int approveStatus) {
		super();
		this.id = id;
		this.transId = transId;
		this.compId = compId;
		this.partyId = partyId;
		this.voucherNo = voucherNo;
		this.voucherDate = voucherDate;
		this.voucherType = voucherType;
		this.refAccountId = refAccountId;
		this.moneyReciptId = moneyReciptId;
		this.transType = transType;
		this.totalAmount = totalAmount;
		this.refNo = refNo;
		this.narration = narration;
		this.otherAddition = otherAddition;
		this.otherDeduction = otherDeduction;
		this.transportCost = transportCost;
		this.labourCost = labourCost;
		this.paidAmount = paidAmount;
		this.payMode = payMode;
		this.billTo = billTo;
		this.billAddress = billAddress;
		this.billContactNo = billContactNo;
		this.bankBranch = bankBranch;
		this.chequeNo = chequeNo;
		this.chequeDate = chequeDate;
		this.empId = empId;
		this.discountRate = discountRate;
		this.discountAmount = discountAmount;
		this.vateRate = vateRate;
		this.userId = userId;
		this.netPayable = netPayable;
		this.branchId = branchId;
		this.currencyRate = currencyRate;
		this.salesPersonEmpCode = salesPersonEmpCode;
		this.conRate = conRate;
		this.yearID = yearID;
		this.createdDate = createdDate;
		this.refBillId = refBillId;
		this.formateVoucherNo = formateVoucherNo;
		this.taxtAmount = taxtAmount;
		this.taxtRate = taxtRate;
		this.billEmail = billEmail;
		this.billCountry = billCountry;
		this.approveStatus = approveStatus;
	}
	public TransMasterAcc() {
		
	}
	
	
	
	
	
}
