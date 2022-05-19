package com.boot.hr.model;

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
@NamedStoredProcedureQueries({@NamedStoredProcedureQuery(name = "GetMonthlyAttendence", procedureName = "GetMonthlyAttendence", parameters = {@StoredProcedureParameter(mode = ParameterMode.IN, name = "periodID", type = long.class),@StoredProcedureParameter(mode = ParameterMode.IN, name = "groupID", type = long.class),@StoredProcedureParameter(mode = ParameterMode.IN, name = "sectionID", type = long.class)},resultClasses = GetMonthlyAttendence.class) })
public class GetMonthlyAttendence {
	@Id
	private long id;
	@Column(name="periodid")
	private long periodID;
	@Column(name="compid")
	private long compID;
	@Column(name="moduleid")
	private Long moduleID;
	@Column(name="groupid")
	private Long groupID;
	@Column(name="sectionid")
	private Long SectionID;
	@Column(name="workdays")
	private Double workDays;
	@Column(name="pdwise")
	private Double pdWise;
	@Column(name="pmwise")
	private Double pmWise;
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
	public Long getModuleID() {
		return moduleID;
	}
	public void setModuleID(Long moduleID) {
		this.moduleID = moduleID;
	}
	public Long getGroupID() {
		return groupID;
	}
	public void setGroupID(Long groupID) {
		this.groupID = groupID;
	}
	public Long getSectionID() {
		return SectionID;
	}
	public void setSectionID(Long sectionID) {
		SectionID = sectionID;
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
}
