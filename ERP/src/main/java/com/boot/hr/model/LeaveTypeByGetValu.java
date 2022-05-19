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
@NamedStoredProcedureQueries({@NamedStoredProcedureQuery(name = "LeaveTypeByGetValu", procedureName = "LeaveTypeByGetValu", parameters = {
			@StoredProcedureParameter(mode = ParameterMode.IN, name = "gradevalue", type = int.class)},resultClasses = LeaveTypeByGetValu.class) })
public class LeaveTypeByGetValu {
	@Id
	private Long id;
	@Column(name="compid")
	private Long compId;
	@Column(name="days")
	private int days;
	@Column(name="gradevalues")
	private int gradeValues;
	@Column(name="status")
	private int status;
	@Column(name="moduleid")
	private Long moduleId;
	@Column(name="typename")
	private String typeName;
	@Column(name="userid")
	private Long userID;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getCompId() {
		return compId;
	}
	public void setCompId(Long compId) {
		this.compId = compId;
	}
	public int getDays() {
		return days;
	}
	public void setDays(int days) {
		this.days = days;
	}
	public int getGradeValues() {
		return gradeValues;
	}
	public void setGradeValues(int gradeValues) {
		this.gradeValues = gradeValues;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public Long getModuleId() {
		return moduleId;
	}
	public void setModuleId(Long moduleId) {
		this.moduleId = moduleId;
	}
	public String getTypeName() {
		return typeName;
	}
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
	public Long getUserID() {
		return userID;
	}
	public void setUserID(Long userID) {
		this.userID = userID;
	}
	
}
