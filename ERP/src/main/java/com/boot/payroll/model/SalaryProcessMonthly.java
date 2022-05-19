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
@Table(name="salaryprocessmonthly")
public class SalaryProcessMonthly {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column(name="moduleid")
	private long moduleID;
	@Column(name="compid")
	private long compID;
	@Column(name="periodid")
	private long periodID;
	@Column(name="groupid")
	private long groupID;
	@Column(name="sectionid")
	private long sectionID;
	@Column(name="empcode")
	private String empCode;
	@Column(name="empname")
	private String empName;
	@Column(name="grosssalary")
	private Double grossSalary;
	@Column(name="workingdays")
	private Double workingDays;
	@Column(name="absentdays")
	private Double absentDays;
	@Column(name="totalpressent")
	private Double totalPressent;
	@Column(name="latedays")
	private Double lateDays;
	@Column(name="leavedays")
	private Double leaveDays;
	@Column(name="tourdays")
	private Double tourDays;
	@Column(name="overtimehour")
	private Double overTimeHour;
	@Column(name="overtimehouramount")
	private Double overTimeHourAmount;
	@Column(name="overtimeamount")
	private Double overTimeAmount;
	@Column(name="tadaamount")
	private Double taDaAmount;
	@Column(name="meetingamount")
	private Double meetingAmount;
	@Column(name="absentdeductamount")
	private Double absentDeductAmount;
	@Column(name="latedeductamount")
	private Double lateDeductAmount;
	@Column(name="providentfund")
	private Double providentFund;
	@Column(name="stampamount")
	private Double stampAmount;
	@Column(name="loanamount")
	private Double loanAmount;
	@Column(name="extentmobilebill")
	private Double extentMobileBill;
	@Column(name="advanceamount")
	private Double advanceAmonut;
	@Column(name="fine")
	private Double fine;
	@Column(name="incometax")
	private Double incomeTax;
	@Column(name="totaldeductamount")
	private Double totalDeductAmount;
	@Column(name="netpayment")
	private Double netPayment;
	@Column(name="narration")
	private String narration;
	@Column(name="userid")
	private long UserID;
	@Column(name="memberid")
	private long memberID;
	@Temporal(TemporalType.DATE)
	@Column(name="entrydate")
	private Date entryDate = new Date(System.currentTimeMillis());
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getModuleID() {
		return moduleID;
	}
	public void setModuleID(long moduleID) {
		this.moduleID = moduleID;
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
	public long getSectionID() {
		return sectionID;
	}
	public void setSectionID(long sectionID) {
		this.sectionID = sectionID;
	}
	public String getEmpCode() {
		return empCode;
	}
	public void setEmpCode(String empCode) {
		this.empCode = empCode;
	}
	public String getEmpName() {
		return empName;
	}
	public void setEmpName(String empName) {
		this.empName = empName;
	}
	public Double getGrossSalary() {
		return grossSalary;
	}
	public void setGrossSalary(Double grossSalary) {
		this.grossSalary = grossSalary;
	}
	public Double getWorkingDays() {
		return workingDays;
	}
	public void setWorkingDays(Double workingDays) {
		this.workingDays = workingDays;
	}
	public Double getAbsentDays() {
		return absentDays;
	}
	public void setAbsentDays(Double absentDays) {
		this.absentDays = absentDays;
	}
	public Double getTotalPressent() {
		return totalPressent;
	}
	public void setTotalPressent(Double totalPressent) {
		this.totalPressent = totalPressent;
	}
	public Double getLateDays() {
		return lateDays;
	}
	public void setLateDays(Double lateDays) {
		this.lateDays = lateDays;
	}
	public Double getTourDays() {
		return tourDays;
	}
	public void setTourDays(Double tourDays) {
		this.tourDays = tourDays;
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
	public Double getTaDaAmount() {
		return taDaAmount;
	}
	public void setTaDaAmount(Double taDaAmount) {
		this.taDaAmount = taDaAmount;
	}
	public Double getMeetingAmount() {
		return meetingAmount;
	}
	public void setMeetingAmount(Double meetingAmount) {
		this.meetingAmount = meetingAmount;
	}
	public Double getAbsentDeductAmount() {
		return absentDeductAmount;
	}
	public void setAbsentDeductAmount(Double absentDeductAmount) {
		this.absentDeductAmount = absentDeductAmount;
	}
	public Double getLateDeductAmount() {
		return lateDeductAmount;
	}
	public void setLateDeductAmount(Double lateDeductAmount) {
		this.lateDeductAmount = lateDeductAmount;
	}
	public Double getProvidentFund() {
		return providentFund;
	}
	public void setProvidentFund(Double providentFund) {
		this.providentFund = providentFund;
	}
	public Double getStampAmount() {
		return stampAmount;
	}
	public void setStampAmount(Double stampAmount) {
		this.stampAmount = stampAmount;
	}
	public Double getLoanAmount() {
		return loanAmount;
	}
	public void setLoanAmount(Double loanAmount) {
		this.loanAmount = loanAmount;
	}
	public Double getExtentMobileBill() {
		return extentMobileBill;
	}
	public void setExtentMobileBill(Double extentMobileBill) {
		this.extentMobileBill = extentMobileBill;
	}
	public Double getAdvanceAmonut() {
		return advanceAmonut;
	}
	public void setAdvanceAmonut(Double advanceAmonut) {
		this.advanceAmonut = advanceAmonut;
	}
	public Double getFine() {
		return fine;
	}
	public void setFine(Double fine) {
		this.fine = fine;
	}
	public Double getIncomeTax() {
		return incomeTax;
	}
	public void setIncomeTax(Double incomeTax) {
		this.incomeTax = incomeTax;
	}
	public Double getTotalDeductAmount() {
		return totalDeductAmount;
	}
	public void setTotalDeductAmount(Double totalDeductAmount) {
		this.totalDeductAmount = totalDeductAmount;
	}
	public Double getNetPayment() {
		return netPayment;
	}
	public void setNetPayment(Double netPayment) {
		this.netPayment = netPayment;
	}
	public String getNarration() {
		return narration;
	}
	public void setNarration(String narration) {
		this.narration = narration;
	}
	
	public Double getLeaveDays() {
		return leaveDays;
	}
	public void setLeaveDays(Double leaveDays) {
		this.leaveDays = leaveDays;
	}
	public Double getOverTimeAmount() {
		return overTimeAmount;
	}
	public void setOverTimeAmount(Double overTimeAmount) {
		this.overTimeAmount = overTimeAmount;
	}
	
	public SalaryProcessMonthly(long id, long moduleID, long compID, long periodID, long groupID, long sectionID,
			String empCode, String empName, Double grossSalary, Double workingDays, Double absentDays,
			Double totalPressent, Double lateDays, Double leaveDays, Double tourDays, Double overTimeHour,
			Double overTimeHourAmount, Double overTimeAmount, Double taDaAmount, Double meetingAmount,
			Double absentDeductAmount, Double lateDeductAmount, Double providentFund, Double stampAmount,
			Double loanAmount, Double extentMobileBill, Double advanceAmonut, Double fine, Double incomeTax,
			Double totalDeductAmount, Double netPayment, String narration) {
		super();
		this.id = id;
		this.moduleID = moduleID;
		this.compID = compID;
		this.periodID = periodID;
		this.groupID = groupID;
		this.sectionID = sectionID;
		this.empCode = empCode;
		this.empName = empName;
		this.grossSalary = grossSalary;
		this.workingDays = workingDays;
		this.absentDays = absentDays;
		this.totalPressent = totalPressent;
		this.lateDays = lateDays;
		this.leaveDays = leaveDays;
		this.tourDays = tourDays;
		this.overTimeHour = overTimeHour;
		this.overTimeHourAmount = overTimeHourAmount;
		this.overTimeAmount = overTimeAmount;
		this.taDaAmount = taDaAmount;
		this.meetingAmount = meetingAmount;
		this.absentDeductAmount = absentDeductAmount;
		this.lateDeductAmount = lateDeductAmount;
		this.providentFund = providentFund;
		this.stampAmount = stampAmount;
		this.loanAmount = loanAmount;
		this.extentMobileBill = extentMobileBill;
		this.advanceAmonut = advanceAmonut;
		this.fine = fine;
		this.incomeTax = incomeTax;
		this.totalDeductAmount = totalDeductAmount;
		this.netPayment = netPayment;
		this.narration = narration;
	}
	public SalaryProcessMonthly() {
		
	}
	
}
