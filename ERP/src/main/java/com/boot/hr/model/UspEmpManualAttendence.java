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
@NamedStoredProcedureQueries({@NamedStoredProcedureQuery(name = "usp_EmpManualAttendence", procedureName = "usp_EmpManualAttendence", parameters = {@StoredProcedureParameter(mode = ParameterMode.IN, name = "empcode", type = String.class),@StoredProcedureParameter(mode = ParameterMode.IN, name = "departmentid", type = long.class),@StoredProcedureParameter(mode = ParameterMode.IN, name = "designationid", type = long.class),@StoredProcedureParameter(mode = ParameterMode.IN, name = "periodid", type = long.class)},resultClasses = UspEmpManualAttendence.class) })
public class UspEmpManualAttendence {
	@Id
	@Column(name="moduleid")
	private long moduleID;
	@Column(name="membercode")
	private String memberCode;
	@Column(name="membername")
	private String memberName;
	@Column(name="Department")
	private String department;
	@Column(name="designation")
	private String designation;
	@Column(name="duration")
	private int duration;
	@Column(name="holiday")
	private int holiDay;
	@Column(name="totaldays")
	private int totalDays;
	@Column(name="workingday")
	private int workingDay;
	@Column(name="attendday")
	private int attendDay;
	public long getModuleID() {
		return moduleID;
	}
	public void setModuleID(long moduleID) {
		this.moduleID = moduleID;
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
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public String getDesignation() {
		return designation;
	}
	public void setDesignation(String designation) {
		this.designation = designation;
	}
	public int getDuration() {
		return duration;
	}
	public void setDuration(int duration) {
		this.duration = duration;
	}
	public int getHoliDay() {
		return holiDay;
	}
	public void setHoliDay(int holiDay) {
		this.holiDay = holiDay;
	}
	public int getTotalDays() {
		return totalDays;
	}
	public void setTotalDays(int totalDays) {
		this.totalDays = totalDays;
	}
	public int getWorkingDay() {
		return workingDay;
	}
	public void setWorkingDay(int workingDay) {
		this.workingDay = workingDay;
	}
	public int getAttendDay() {
		return attendDay;
	}
	public void setAttendDay(int attendDay) {
		this.attendDay = attendDay;
	}	
	
}
