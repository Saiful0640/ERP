package com.boot.hr.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="leaveCategory")
public class LeaveCategory {
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
	private String duration;
	@Column(name="reason")
	private String reason;
	@Column(name="typename")
	private String typeName;
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
	public String getTypeName() {
		return typeName;
	}
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
	public LeaveCategory(Long id, String memberCode, String aDate, String sDate, String eDate, String duration,
			String reason, String typeName) {
		super();
		this.id = id;
		this.memberCode = memberCode;
		this.aDate = aDate;
		this.sDate = sDate;
		this.eDate = eDate;
		this.duration = duration;
		this.reason = reason;
		this.typeName = typeName;
	}
	public LeaveCategory() {
		
	}
	
}
