package com.boot.hr.model;


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
@Table(name="monthlyattendence")
public class MonthlyAttendence {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column(name="periodid")
	private long periodID;
	@Column(name="compid")
	private long compID;
	@Column(name="moduleid")
	private long moduleID;
	@Column(name="groupid")
	private long groupID;
	@Column(name="sectionid")
	private long sectionID;
	@Column(name="userid")
	private long userID;
	@Column(name="workdays")
	private Double workDays;
	@Column(name="pdwise")
	private Double pdWise;
	@Column(name="pmwise")
	private Double pmWise;
	@Column(name="membercode")
	private String memberCode;
	@Column(name="membername")
	private String memberName;
	@Column(name="memberid")
	private long memberID;
	@Column(name="empcode")
	private String empCode;
	@Column(name="empname")
	private String empName;
	@Column(name="workingdays")
	private Double workingDays;
	@Column(name="absentdays")
	private Double absentDays;
	@Column(name="latedays")
	private Double lateDays;
	@Column(name="leavedays")
	private Double leaveDays;
	@Column(name="totalpressentdays")
	private Double totalPressentDays;
	@Column(name="overtimehours")
	private Double overTimeHours;
	@Column(name="overtimeamount")
	private Double overTimeAmount;
	@Column(name="tdaworkingdays")
	private Double tdaWorkingDays;
	@Column(name="amount")
	private Double amount;	
	@Column(name="tdaleavedays")
	private Double tdaLeaveDays;
	@Column(name="tdaabsentdays")
	private Double tdaAbsentDays;
	@Column(name="tourdays")
	private Double tourDays;
	@Column(name="payabledays")
	private Double payableDays;
	@Column(name="penalty")
	private Double penalty;
	@Column(name="payableamount")
	private Double payableAmount;
	@Column(name="remarks")
	private String remarks;
	@Column(name="comment")
	private String comment;
	@Column(name="grouptypeid")
	private long groupTypeID;
	@Temporal(TemporalType.DATE)
	@Column(name="entrydate")
	private Date entryDate = new Date(System.currentTimeMillis()); 
	@Column(name="apptype")
	private int appType;
	
	
	
	public long getId() {
		return id;
	}



	public void setId(long id) {
		this.id = id;
	}



	public long getPeriodID() {
		return periodID;
	}



	public void setPeriodID(long periodID) {
		this.periodID = periodID;
	}



	public long getCompID() {
		return compID;
	}



	public void setCompID(long compID) {
		this.compID = compID;
	}



	public long getModuleID() {
		return moduleID;
	}



	public void setModuleID(long moduleID) {
		this.moduleID = moduleID;
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



	public long getUserID() {
		return userID;
	}



	public void setUserID(long userID) {
		this.userID = userID;
	}



	public Double getWorkDays() {
		return workDays;
	}



	public void setWorkDays(Double workDays) {
		this.workDays = workDays;
	}



	public Double getPdWise() {
		return pdWise;
	}



	public void setPdWise(Double pdWise) {
		this.pdWise = pdWise;
	}



	public Double getPmWise() {
		return pmWise;
	}



	public void setPmWise(Double pmWise) {
		this.pmWise = pmWise;
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



	public long getMemberID() {
		return memberID;
	}



	public void setMemberID(long memberID) {
		this.memberID = memberID;
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



	public Double getLateDays() {
		return lateDays;
	}



	public void setLateDays(Double lateDays) {
		this.lateDays = lateDays;
	}



	public Double getLeaveDays() {
		return leaveDays;
	}



	public void setLeaveDays(Double leaveDays) {
		this.leaveDays = leaveDays;
	}



	public Double getTotalPressentDays() {
		return totalPressentDays;
	}



	public void setTotalPressentDays(Double totalPressentDays) {
		this.totalPressentDays = totalPressentDays;
	}



	public Double getOverTimeHours() {
		return overTimeHours;
	}



	public void setOverTimeHours(Double overTimeHours) {
		this.overTimeHours = overTimeHours;
	}



	public Double getOverTimeAmount() {
		return overTimeAmount;
	}



	public void setOverTimeAmount(Double overTimeAmount) {
		this.overTimeAmount = overTimeAmount;
	}



	public Double getTdaWorkingDays() {
		return tdaWorkingDays;
	}



	public void setTdaWorkingDays(Double tdaWorkingDays) {
		this.tdaWorkingDays = tdaWorkingDays;
	}



	public Double getAmount() {
		return amount;
	}



	public void setAmount(Double amount) {
		this.amount = amount;
	}



	public Double getTdaLeaveDays() {
		return tdaLeaveDays;
	}



	public void setTdaLeaveDays(Double tdaLeaveDays) {
		this.tdaLeaveDays = tdaLeaveDays;
	}



	public Double getTdaAbsentDays() {
		return tdaAbsentDays;
	}



	public void setTdaAbsentDays(Double tdaAbsentDays) {
		this.tdaAbsentDays = tdaAbsentDays;
	}



	public Double getTourDays() {
		return tourDays;
	}



	public void setTourDays(Double tourDays) {
		this.tourDays = tourDays;
	}



	public Double getPayableDays() {
		return payableDays;
	}



	public void setPayableDays(Double payableDays) {
		this.payableDays = payableDays;
	}



	public Double getPenalty() {
		return penalty;
	}



	public void setPenalty(Double penalty) {
		this.penalty = penalty;
	}



	public Double getPayableAmount() {
		return payableAmount;
	}



	public void setPayableAmount(Double payableAmount) {
		this.payableAmount = payableAmount;
	}



	public String getRemarks() {
		return remarks;
	}



	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}



	public String getComment() {
		return comment;
	}



	public void setComment(String comment) {
		this.comment = comment;
	}



	public long getGroupTypeID() {
		return groupTypeID;
	}



	public void setGroupTypeID(long groupTypeID) {
		this.groupTypeID = groupTypeID;
	}



	public Date getEntryDate() {
		return entryDate;
	}



	public void setEntryDate(Date entryDate) {
		this.entryDate = entryDate;
	}



	public int getAppType() {
		return appType;
	}



	public void setAppType(int appType) {
		this.appType = appType;
	}



	public MonthlyAttendence(long id, long periodID, long compID, long moduleID, long groupID, long sectionID,
			long userID, Double workDays, Double pdWise, Double pmWise, String memberCode, String memberName,
			long memberID, String empCode, String empName, Double workingDays, Double absentDays, Double lateDays,
			Double leaveDays, Double totalPressentDays, Double overTimeHours, Double overTimeAmount,
			Double tdaWorkingDays, Double amount, Double tdaLeaveDays, Double tdaAbsentDays, Double tourDays,
			Double payableDays, Double penalty, Double payableAmount, String remarks, String comment, long groupTypeID,
			Date entryDate, int appType) {
		super();
		this.id = id;
		this.periodID = periodID;
		this.compID = compID;
		this.moduleID = moduleID;
		this.groupID = groupID;
		this.sectionID = sectionID;
		this.userID = userID;
		this.workDays = workDays;
		this.pdWise = pdWise;
		this.pmWise = pmWise;
		this.memberCode = memberCode;
		this.memberName = memberName;
		this.memberID = memberID;
		this.empCode = empCode;
		this.empName = empName;
		this.workingDays = workingDays;
		this.absentDays = absentDays;
		this.lateDays = lateDays;
		this.leaveDays = leaveDays;
		this.totalPressentDays = totalPressentDays;
		this.overTimeHours = overTimeHours;
		this.overTimeAmount = overTimeAmount;
		this.tdaWorkingDays = tdaWorkingDays;
		this.amount = amount;
		this.tdaLeaveDays = tdaLeaveDays;
		this.tdaAbsentDays = tdaAbsentDays;
		this.tourDays = tourDays;
		this.payableDays = payableDays;
		this.penalty = penalty;
		this.payableAmount = payableAmount;
		this.remarks = remarks;
		this.comment = comment;
		this.groupTypeID = groupTypeID;
		this.entryDate = entryDate;
		this.appType = appType;
	}



	public MonthlyAttendence() {
		
	}
	
	
}
