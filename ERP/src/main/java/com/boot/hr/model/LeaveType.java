package com.boot.hr.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="leavetype")
public class LeaveType {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name="typename")
	private String typeName;
	@Column(name="days")
	private int days;
	@Column(name="gradevalue")
	private int gradeValue;
	@Column(name="userid")
	private int userId;
	@Column(name="status")
	private boolean status;
	@Column(name="compid")
	private Long compId;
	@Column(name="moduleid")
	private Long moduleId;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getTypeName() {
		return typeName;
	}
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
	public int getDays() {
		return days;
	}
	public void setDays(int days) {
		this.days = days;
	}
	public int getGradeValue() {
		return gradeValue;
	}
	public void setGradeValue(int gradeValue) {
		this.gradeValue = gradeValue;
	}
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public Long getCompId() {
		return compId;
	}
	public void setCompId(Long compId) {
		this.compId = compId;
	}
	public Long getModuleId() {
		return moduleId;
	}
	public void setModuleId(Long moduleId) {
		this.moduleId = moduleId;
	}
	public LeaveType(Long id, String typeName, int days, int gradeValue, int userId, boolean status, Long compId,
			Long moduleId) {
		super();
		this.id = id;
		this.typeName = typeName;
		this.days = days;
		this.gradeValue = gradeValue;
		this.userId = userId;
		this.status = status;
		this.compId = compId;
		this.moduleId = moduleId;
	}
	public LeaveType() {
		
	}
	
	
}
