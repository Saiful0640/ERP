package com.boot.payroll.model;

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
@NamedStoredProcedureQueries({@NamedStoredProcedureQuery(name="GetSalaryProcessMonthly", procedureName = "GetSalaryProcessMonthly", parameters ={@StoredProcedureParameter(mode = ParameterMode.IN, name = "periodID", type = long.class),@StoredProcedureParameter(mode = ParameterMode.IN, name = "groupID", type = long.class)},resultClasses = GetSalaryProcessMonthly.class) })
public class GetSalaryProcessMonthly {
	@Id
	private long id;
	@Column(name="absentdays")
	private Double absentDays;
	@Column(name="absentdeductamount")
	private Double absentDeductAmount;
	@Column(name="advanceamount")
	private Double advanceAmonut;
	@Column(name="compid")
	private long compID;
	@Column(name="empcode")
	private String empCode;
	@Column(name="extentmobilebill")
	private Double extentMobileBill;
	@Column(name="fine")
	private Double fine;
	@Column(name="grosssalary")
	private Double grossSalary;
	@Column(name="groupid")
	private long groupID;
	@Column(name="incometax")
	private Double incomeTax;
	@Column(name="latedays")
	private Double lateDays;
	@Column(name="latedeductamount")
	private Double lateDeductAmount;
	@Column(name="loanamount")
	private Double loanAmount;
	@Column(name="meetingamount")
	private Double meetingAmount;
	@Column(name="moduleid")
	private long moduleID;
	@Column(name="narration")
	private String narration;
	@Column(name="netpayment")
	private Double netPayment;
	@Column(name="overtimehour")
	private Double overTimeHour;
	@Column(name="overtimehouramount")
	private Double overTimeHourAmount;
	@Column(name="periodid")
	private long periodID;
	@Column(name="providentfund")
	private Double providentFund;
	@Column(name="sectionid")
	private long sectionID;
	@Column(name="stampamount")
	private Double stampAmount;
	@Column(name="tadaamount")
	private Double taDaAmount;
	@Column(name="totaldeductamount")
	private Double totalDeductAmount;
	@Column(name="totalpressent")
	private Double totalPressent;
	@Column(name="tourdays")
	private Double tourDays;
	@Column(name="workingdays")
	private Double workingDays;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public Double getAbsentDays() {
		return absentDays;
	}
	public void setAbsentDays(Double absentDays) {
		this.absentDays = absentDays;
	}
	public Double getAbsentDeductAmount() {
		return absentDeductAmount;
	}
	public void setAbsentDeductAmount(Double absentDeductAmount) {
		this.absentDeductAmount = absentDeductAmount;
	}
	public Double getAdvanceAmonut() {
		return advanceAmonut;
	}
	public void setAdvanceAmonut(Double advanceAmonut) {
		this.advanceAmonut = advanceAmonut;
	}
	public long getCompID() {
		return compID;
	}
	public void setCompID(long compID) {
		this.compID = compID;
	}
	public String getEmpCode() {
		return empCode;
	}
	public void setEmpCode(String empCode) {
		this.empCode = empCode;
	}
	public Double getExtentMobileBill() {
		return extentMobileBill;
	}
	public void setExtentMobileBill(Double extentMobileBill) {
		this.extentMobileBill = extentMobileBill;
	}
	public Double getFine() {
		return fine;
	}
	public void setFine(Double fine) {
		this.fine = fine;
	}
	public Double getGrossSalary() {
		return grossSalary;
	}
	public void setGrossSalary(Double grossSalary) {
		this.grossSalary = grossSalary;
	}
	public long getGroupID() {
		return groupID;
	}
	public void setGroupID(long groupID) {
		this.groupID = groupID;
	}
	public Double getIncomeTax() {
		return incomeTax;
	}
	public void setIncomeTax(Double incomeTax) {
		this.incomeTax = incomeTax;
	}
	public Double getLateDays() {
		return lateDays;
	}
	public void setLateDays(Double lateDays) {
		this.lateDays = lateDays;
	}
	public Double getLateDeductAmount() {
		return lateDeductAmount;
	}
	public void setLateDeductAmount(Double lateDeductAmount) {
		this.lateDeductAmount = lateDeductAmount;
	}
	public Double getLoanAmount() {
		return loanAmount;
	}
	public void setLoanAmount(Double loanAmount) {
		this.loanAmount = loanAmount;
	}
	public Double getMeetingAmount() {
		return meetingAmount;
	}
	public void setMeetingAmount(Double meetingAmount) {
		this.meetingAmount = meetingAmount;
	}
	public long getModuleID() {
		return moduleID;
	}
	public void setModuleID(long moduleID) {
		this.moduleID = moduleID;
	}
	public String getNarration() {
		return narration;
	}
	public void setNarration(String narration) {
		this.narration = narration;
	}
	public Double getNetPayment() {
		return netPayment;
	}
	public void setNetPayment(Double netPayment) {
		this.netPayment = netPayment;
	}
	public Double getOverTimeHour() {
		return overTimeHour;
	}
	public void setOverTimeHour(Double overTimeHour) {
		this.overTimeHour = overTimeHour;
	}
	public Double getOverTimeHourAmount() {
		return overTimeHourAmount;
	}
	public void setOverTimeHourAmount(Double overTimeHourAmount) {
		this.overTimeHourAmount = overTimeHourAmount;
	}
	public long getPeriodID() {
		return periodID;
	}
	public void setPeriodID(long periodID) {
		this.periodID = periodID;
	}
	public Double getProvidentFund() {
		return providentFund;
	}
	public void setProvidentFund(Double providentFund) {
		this.providentFund = providentFund;
	}
	public long getSectionID() {
		return sectionID;
	}
	public void setSectionID(long sectionID) {
		this.sectionID = sectionID;
	}
	public Double getStampAmount() {
		return stampAmount;
	}
	public void setStampAmount(Double stampAmount) {
		this.stampAmount = stampAmount;
	}
	public Double getTaDaAmount() {
		return taDaAmount;
	}
	public void setTaDaAmount(Double taDaAmount) {
		this.taDaAmount = taDaAmount;
	}
	public Double getTotalDeductAmount() {
		return totalDeductAmount;
	}
	public void setTotalDeductAmount(Double totalDeductAmount) {
		this.totalDeductAmount = totalDeductAmount;
	}
	public Double getTotalPressent() {
		return totalPressent;
	}
	public void setTotalPressent(Double totalPressent) {
		this.totalPressent = totalPressent;
	}
	public Double getTourDays() {
		return tourDays;
	}
	public void setTourDays(Double tourDays) {
		this.tourDays = tourDays;
	}
	public Double getWorkingDays() {
		return workingDays;
	}
	public void setWorkingDays(Double workingDays) {
		this.workingDays = workingDays;
	}
	
}
