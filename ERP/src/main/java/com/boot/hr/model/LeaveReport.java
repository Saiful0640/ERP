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
@NamedStoredProcedureQueries({@NamedStoredProcedureQuery(name = "sp_RptleaveInfo", procedureName = "sp_RptleaveInfo", parameters = {
			@StoredProcedureParameter(mode = ParameterMode.IN, name = "year", type = long.class),@StoredProcedureParameter(mode = ParameterMode.IN, name = "empCode", type = String.class)},resultClasses = LeaveReport.class) })

public class LeaveReport {
	@Id
	private Long id;
	@Column(name="membercode")
	private String memberCode;
	@Column(name="membername")
	private String memberName;
	@Column(name="applicationdate")
	private String applicationDate;
	@Column(name="sdate")
	private String sDate;
	@Column(name="edate")
	private String eDate;
	@Column(name="compid")
	private Long compId;
	@Column(name="reason")
	private String reason;
	@Column(name="enjoy")
	private Long enjoy;
	@Column(name="typename")
	private String typeName;
	@Column(name="yearname")
	private String yearName;
	@Column(name="designation")
	private String designation;
	@Column(name="status")
	private int status;
	@Column(name="memberid")
	private Long memberID;
	@Column(name="department")
	private String department;
	@Column(name="days")
	private int days;
	@Column(name="totaldays")
	private int totalDays;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
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
	public String getApplicationDate() {
		return applicationDate;
	}
	public void setApplicationDate(String applicationDate) {
		this.applicationDate = applicationDate;
	}
	public String getsDate() {
		return sDate;
	}
	public void setsDate(String sDate) {
		this.sDate = sDate;
	}
	public String geteDate() {
		return eDate;
	}
	public void seteDate(String eDate) {
		this.eDate = eDate;
	}
	public Long getCompId() {
		return compId;
	}
	public void setCompId(Long compId) {
		this.compId = compId;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public Long getEnjoy() {
		return enjoy;
	}
	public void setEnjoy(Long enjoy) {
		this.enjoy = enjoy;
	}
	public String getTypeName() {
		return typeName;
	}
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
	public String getYearName() {
		return yearName;
	}
	public void setYearName(String yearName) {
		this.yearName = yearName;
	}
	public String getDesignation() {
		return designation;
	}
	public void setDesignation(String designation) {
		this.designation = designation;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public Long getMemberID() {
		return memberID;
	}
	public void setMemberID(Long memberID) {
		this.memberID = memberID;
	}
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public int getDays() {
		return days;
	}
	public void setDays(int days) {
		this.days = days;
	}
	public int getTotalDays() {
		return totalDays;
	}
	public void setTotalDays(int totalDays) {
		this.totalDays = totalDays;
	}
	
	
}
