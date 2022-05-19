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
@Table(name="leaveentry")
public class LeaveEntry {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name="membercode")
	private String memberCode;
	@Column(name="adate")
	private String aDate;
	@Column(name="sdate")
	private String sDate;
	@Column(name="edate")
	private String eDate;
	@Column(name="duration")
	private Double duration;
	@Column(name="categoryid")
	private Long categoryId;
	@Column(name="reason")
	private String reason;
	@Temporal(TemporalType.DATE)
	@Column(name="entrydate")
	private Date entryDate = new Date(System.currentTimeMillis());
	@Column(name="compid")
	private Long compId;
	@Column(name="userid")
	private Long userId;
	@Column(name="moduleid")
	private Long moduleId;
	@Column(name="apptype")
	private int appType;
	@Column(name="yearid")
	private Long yearId;
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
	public String getaDate() {
		return aDate;
	}
	public void setaDate(String aDate) {
		this.aDate = aDate;
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
	public Double getDuration() {
		return duration;
	}
	public void setDuration(Double duration) {
		this.duration = duration;
	}
	public Long getCategoryId() {
		return categoryId;
	}
	public void setCategoryId(Long categoryId) {
		this.categoryId = categoryId;
	}
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public Date getEntryDate() {
		return entryDate;
	}
	public void setEntryDate(Date entryDate) {
		this.entryDate = entryDate;
	}
	public Long getCompId() {
		return compId;
	}
	public void setCompId(Long compId) {
		this.compId = compId;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public Long getModuleId() {
		return moduleId;
	}
	public void setModuleId(Long moduleId) {
		this.moduleId = moduleId;
	}
	public int getAppType() {
		return appType;
	}
	public void setAppType(int appType) {
		this.appType = appType;
	}
	public Long getYearId() {
		return yearId;
	}
	public void setYearId(Long yearId) {
		this.yearId = yearId;
	}
	public LeaveEntry(Long id, String memberCode, String aDate, String sDate, String eDate, Double duration,
			Long categoryId, String reason, Date entryDate, Long compId, Long userId, Long moduleId, int appType,
			Long yearId) {
		super();
		this.id = id;
		this.memberCode = memberCode;
		this.aDate = aDate;
		this.sDate = sDate;
		this.eDate = eDate;
		this.duration = duration;
		this.categoryId = categoryId;
		this.reason = reason;
		this.entryDate = entryDate;
		this.compId = compId;
		this.userId = userId;
		this.moduleId = moduleId;
		this.appType = appType;
		this.yearId = yearId;
	}
	public LeaveEntry() {
		
	}
	
}
