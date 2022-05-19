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
@NamedStoredProcedureQueries({@NamedStoredProcedureQuery(name = "getLeaveInformationBymembercode", procedureName = "getLeaveInformationBymembercode", parameters = {
			@StoredProcedureParameter(mode = ParameterMode.IN, name = "membercode", type = String.class)},resultClasses = GetLeaveInformationByMemberCode.class) })
public class GetLeaveInformationByMemberCode {
	@Id
	private Long id;
	@Column(name="membercode")
	private String memberCode;
	@Column(name="sdate")
	private String sDate;
	@Column(name="edate")
	private String eDate;
	@Column(name="adate")
	private String aDate;
	@Column(name="duration")
	private String duration;
	@Column(name="reason")
	private String reason;
	@Column(name="leavecategory")
	private String leaveCategory;
	@Column(name="moduleid")
	private Long moduleID;
	@Column(name="yearid")
	private Long YearID;
	@Column(name="compid")
	private Long compId;
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
	public String getaDate() {
		return aDate;
	}
	public void setaDate(String aDate) {
		this.aDate = aDate;
	}
	public String getDuration() {
		return duration;
	}
	public void setDuration(String duration) {
		this.duration = duration;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public String getLeaveCategory() {
		return leaveCategory;
	}
	public void setLeaveCategory(String leaveCategory) {
		this.leaveCategory = leaveCategory;
	}
	public Long getModuleID() {
		return moduleID;
	}
	public void setModuleID(Long moduleID) {
		this.moduleID = moduleID;
	}
	public Long getYearID() {
		return YearID;
	}
	public void setYearID(Long yearID) {
		YearID = yearID;
	}
	public Long getCompId() {
		return compId;
	}
	public void setCompId(Long compId) {
		this.compId = compId;
	}
	
}
