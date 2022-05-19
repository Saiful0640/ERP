package com.boot.hr.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="leaveinfo")
public class LeaveInfo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name="empcode")
	private String empCode;
	@Column(name="leavetypeid")
	private int leaveTypeId;
	@Column(name="sdate")
	private String sDate;
	@Column(name="edate")
	private String eDate;
	@Column(name="totakdays")
	private int totalDays;
	@Column(name="remarks")
	private String remarks;
	@Column(name="periodid")
	private Long periodId;
	@Column(name="compid")
	private Long compId;
	@Column(name="withpay")
	private int withPay;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getEmpCode() {
		return empCode;
	}
	public void setEmpCode(String empCode) {
		this.empCode = empCode;
	}
	public int getLeaveTypeId() {
		return leaveTypeId;
	}
	public void setLeaveTypeId(int leaveTypeId) {
		this.leaveTypeId = leaveTypeId;
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
	public int getTotalDays() {
		return totalDays;
	}
	public void setTotalDays(int totalDays) {
		this.totalDays = totalDays;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public Long getPeriodId() {
		return periodId;
	}
	public void setPeriodId(Long periodId) {
		this.periodId = periodId;
	}
	public Long getCompId() {
		return compId;
	}
	public void setCompId(Long compId) {
		this.compId = compId;
	}
	public int getWithPay() {
		return withPay;
	}
	public void setWithPay(int withPay) {
		this.withPay = withPay;
	}
	public LeaveInfo(Long id, String empCode, int leaveTypeId, String sDate, String eDate, int totalDays,
			String remarks, Long periodId, Long compId, int withPay) {
		super();
		this.id = id;
		this.empCode = empCode;
		this.leaveTypeId = leaveTypeId;
		this.sDate = sDate;
		this.eDate = eDate;
		this.totalDays = totalDays;
		this.remarks = remarks;
		this.periodId = periodId;
		this.compId = compId;
		this.withPay = withPay;
	}
	public LeaveInfo() {
		
	}
	
}
