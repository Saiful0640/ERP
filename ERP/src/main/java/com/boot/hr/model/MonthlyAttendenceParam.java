package com.boot.hr.model;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

public class MonthlyAttendenceParam {
	@Id
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
	@Column(name="memberid")
	private long memberID;
	@Column(name="empcode")
	private String empCode;
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
	@Column(name="tdaleavedays")
	private Double tdaLeaveDays;
	@Column(name="tdaabsentdays")
	private Double tdaAbsentDays;
	@Column(name="tourdays")
	private Double tourDays;
	@Column(name="payabledays")
	private Double payableDays;
	@Column(name="payableamount")
	private Double payableAmount;
	@Column(name="remarks")
	private String remarks;
	@Column(name="comment")
	private String comment;
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
	
	
}
