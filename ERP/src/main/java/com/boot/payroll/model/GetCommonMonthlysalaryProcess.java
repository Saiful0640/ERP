package com.boot.payroll.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedStoredProcedureQueries;
import javax.persistence.NamedStoredProcedureQuery;
import javax.persistence.ParameterMode;
import javax.persistence.StoredProcedureParameter;
import javax.persistence.Table;

@Entity
@Table
@NamedStoredProcedureQueries({@NamedStoredProcedureQuery(name="GetCommonMonthlysalaryProcess", procedureName = "GetCommonMonthlysalaryProcess", parameters ={@StoredProcedureParameter(mode = ParameterMode.IN, name = "periodID", type = long.class),@StoredProcedureParameter(mode = ParameterMode.IN, name = "GroupID", type = long.class),@StoredProcedureParameter(mode = ParameterMode.IN, name = "departmentID", type = long.class)},resultClasses = GetCommonMonthlysalaryProcess.class) })
public class GetCommonMonthlysalaryProcess {
	@Id
	private long id;
	@Column(name="memberid")
	private long memberID;
	@Column(name="membercode")
	private String memberCode;
	@Column(name="membername")
	private String memberName;
	@Column(name="departmentid")
	private long departmentID;
	@Column(name="designationid")
	private long designationID;
	@Column(name="compid")
	private long compID;
	@Column(name="periodid")
	private long periodID;
	@Column(name="groupid")
	private long groupID;
	@Column(name="grosssalary")
	private Double grossSalary;
	@Column(name="incrimentamount")
	private Double incrimentAmount;
	@Column(name="absentdeductamount")
	private Double absentDeductAmount;
	@Column(name="paymenttype")
	private int paymentType;
	@Column(name="overtimeamount")
	private Double overTimeAmount;
	@Column(name="workingday")
	private Double workingDay;
	@Column(name="holiday")
	private Double holiday;
	@Column(name="withoutpay")
	private Double withoutPay;
	@Column(name="withpay")
	private Double withPay;
	@Column(name="attendday")
	private Double attendDay;
	@Column(name="totalday")
	private Double totalDay;
	@Column(name="basicamount")
	private Double basicAmount;
	@Column(name="houserent")
	private Double houseRent;
	@Column(name="medical")
	private Double medical;
	@Column(name="conveyance")
	private Double conveyance;
	@Column(name="pf")
	private Double pf;
	@Column(name="otherdeduction")
	private Double otherDeduction;
	@Column(name="incometax")
	private Double incomeTax;
	@Column(name="loanamount")
	private Double loanAmount;
	@Column(name="advance")
	private Double advance;
	@Column(name="totaldeductamount")
	private Double totalDeductAmount;
	@Column(name="totaladditionamount")
	private Double totalAdditionAmount;
	@Column(name="netpayment")
	private Double netPayment;
	@Column(name="userid")
	private long userID;
	@Column(name="entrytime")
	private Date entryTime ;
	@Column(name="narration")
	private String narration;
	@Column(name="designation")
	private String designation;
	@Column(name="department")
	private String department;
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
	public String getMemberCode() {
		return memberCode;
	}
	public void setMemberCode(String memberCode) {
		this.memberCode = memberCode;
	}
	public String getMemberName() {
		return memberName;
	}
	public void setMemberName(String memberName) {
		this.memberName = memberName;
	}
	public long getDepartmentID() {
		return departmentID;
	}
	public void setDepartmentID(long departmentID) {
		this.departmentID = departmentID;
	}
	public long getDesignationID() {
		return designationID;
	}
	public void setDesignationID(long designationID) {
		this.designationID = designationID;
	}
	public long getCompID() {
		return compID;
	}
	public void setCompID(long compID) {
		this.compID = compID;
	}
	public long getPeriodID() {
		return periodID;
	}
	public void setPeriodID(long periodID) {
		this.periodID = periodID;
	}
	public long getGroupID() {
		return groupID;
	}
	public void setGroupID(long groupID) {
		this.groupID = groupID;
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
	public Double getAbsentDeductAmount() {
		return absentDeductAmount;
	}
	public void setAbsentDeductAmount(Double absentDeductAmount) {
		this.absentDeductAmount = absentDeductAmount;
	}
	public int getPaymentType() {
		return paymentType;
	}
	public void setPaymentType(int paymentType) {
		this.paymentType = paymentType;
	}
	public Double getOverTimeAmount() {
		return overTimeAmount;
	}
	public void setOverTimeAmount(Double overTimeAmount) {
		this.overTimeAmount = overTimeAmount;
	}
	public Double getWorkingDay() {
		return workingDay;
	}
	public void setWorkingDay(Double workingDay) {
		this.workingDay = workingDay;
	}
	public Double getHoliday() {
		return holiday;
	}
	public void setHoliday(Double holiday) {
		this.holiday = holiday;
	}
	public Double getWithoutPay() {
		return withoutPay;
	}
	public void setWithoutPay(Double withoutPay) {
		this.withoutPay = withoutPay;
	}
	public Double getWithPay() {
		return withPay;
	}
	public void setWithPay(Double withPay) {
		this.withPay = withPay;
	}
	public Double getAttendDay() {
		return attendDay;
	}
	public void setAttendDay(Double attendDay) {
		this.attendDay = attendDay;
	}
	public Double getTotalDay() {
		return totalDay;
	}
	public void setTotalDay(Double totalDay) {
		this.totalDay = totalDay;
	}
	public Double getBasicAmount() {
		return basicAmount;
	}
	public void setBasicAmount(Double basicAmount) {
		this.basicAmount = basicAmount;
	}
	public Double getHouseRent() {
		return houseRent;
	}
	public void setHouseRent(Double houseRent) {
		this.houseRent = houseRent;
	}
	public Double getMedical() {
		return medical;
	}
	public void setMedical(Double medical) {
		this.medical = medical;
	}
	public Double getConveyance() {
		return conveyance;
	}
	public void setConveyance(Double conveyance) {
		this.conveyance = conveyance;
	}
	public Double getPf() {
		return pf;
	}
	public void setPf(Double pf) {
		this.pf = pf;
	}
	public Double getOtherDeduction() {
		return otherDeduction;
	}
	public void setOtherDeduction(Double otherDeduction) {
		this.otherDeduction = otherDeduction;
	}
	public Double getIncomeTax() {
		return incomeTax;
	}
	public void setIncomeTax(Double incomeTax) {
		this.incomeTax = incomeTax;
	}
	public Double getLoanAmount() {
		return loanAmount;
	}
	public void setLoanAmount(Double loanAmount) {
		this.loanAmount = loanAmount;
	}
	public Double getAdvance() {
		return advance;
	}
	public void setAdvance(Double advance) {
		this.advance = advance;
	}
	public Double getTotalDeductAmount() {
		return totalDeductAmount;
	}
	public void setTotalDeductAmount(Double totalDeductAmount) {
		this.totalDeductAmount = totalDeductAmount;
	}
	public Double getTotalAdditionAmount() {
		return totalAdditionAmount;
	}
	public void setTotalAdditionAmount(Double totalAdditionAmount) {
		this.totalAdditionAmount = totalAdditionAmount;
	}
	public Double getNetPayment() {
		return netPayment;
	}
	public void setNetPayment(Double netPayment) {
		this.netPayment = netPayment;
	}
	public long getUserID() {
		return userID;
	}
	public void setUserID(long userID) {
		this.userID = userID;
	}
	public Date getEntryTime() {
		return entryTime;
	}
	public void setEntryTime(Date entryTime) {
		this.entryTime = entryTime;
	}
	public String getNarration() {
		return narration;
	}
	public void setNarration(String narration) {
		this.narration = narration;
	}
	public String getDesignation() {
		return designation;
	}
	public void setDesignation(String designation) {
		this.designation = designation;
	}
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	
	
}
