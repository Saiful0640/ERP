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
@Table(name="menualattendance")
public class MenualAttendance {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column(name="membercode")
	private String memberCode;
	@Column(name="periodid")
	private long periodID;
	@Column(name="workingday")
	private int workingDay;
	@Column(name="withoutpay")
	private Double withoutPay;
	@Column(name="withpay")
	private Double withPay;
	@Column(name="attendday")
	private Double attendDay;
	@Column(name="totalday")
	private int totalDay;
	@Column(name="compid")
	private long compID;
	@Column(name="moduleid")
	private Long moduleID;
	@Column(name="userid")
	private long userID;
	@Temporal(TemporalType.DATE)
	@Column(name="createdate")
	private Date createDate = new Date(System.currentTimeMillis());
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getMemberCode() {
		return memberCode;
	}
	public void setMeberCode(String memberCode) {
		this.memberCode = memberCode;
	}
	public long getPeriodID() {
		return periodID;
	}
	public void setPeriodID(long periodID) {
		this.periodID = periodID;
	}
	public int getWorkingDay() {
		return workingDay;
	}
	public void setWorkingDay(int workingDay) {
		this.workingDay = workingDay;
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
	public int getTotalDay() {
		return totalDay;
	}
	public void setTotalDay(int totalDay) {
		this.totalDay = totalDay;
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
	public long getUserID() {
		return userID;
	}
	public void setUserID(long userId) {
		this.userID = userId;
	}
	public Date getCreateDate() {
		return createDate;
	}
	public void setCreateDate(Date createDate) {
		this.createDate = createDate;
	}
	public MenualAttendance(long id, String memberCode, long periodID, int workingDay, Double withoutPay, Double withPay,
			Double attendDay, int totalDay, long compID, Long moduleID, long userID, Date createDate) {
		super();
		this.id = id;
		this.memberCode = memberCode;
		this.periodID = periodID;
		this.workingDay = workingDay;
		this.withoutPay = withoutPay;
		this.withPay = withPay;
		this.attendDay = attendDay;
		this.totalDay = totalDay;
		this.compID = compID;
		this.moduleID = moduleID;
		this.userID= userID;
		this.createDate = createDate;
	}
	public MenualAttendance() {
		
	}
	
	
}
