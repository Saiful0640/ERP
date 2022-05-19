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
@NamedStoredProcedureQueries({@NamedStoredProcedureQuery(name = "get_LeaveBalence_By_membercode", procedureName = "get_LeaveBalence_By_membercode", parameters = {@StoredProcedureParameter(mode = ParameterMode.IN, name = "membercode", type = String.class),@StoredProcedureParameter(mode = ParameterMode.IN, name = "leaveyear", type = String.class)},resultClasses = GetLeaveBalanceByMemberCode.class) })

public class GetLeaveBalanceByMemberCode {
	@Id
	private Long id;
	@Column(name="typename")
	private String typeName;
	@Column(name="days")
	private int days;
	@Column(name="enjoy")
	private int enjoy;
	@Column(name="compid")
	private Long compId;
	@Column(name="leavebalance")
	private int leaveBalance;
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
	public int getEnjoy() {
		return enjoy;
	}
	public void setEnjoy(int enjoy) {
		this.enjoy = enjoy;
	}
	public Long getCompId() {
		return compId;
	}
	public void setCompId(Long compId) {
		this.compId = compId;
	}
	public int getLeaveBalance() {
		return leaveBalance;
	}
	public void setLeaveBalance(int leaveBalance) {
		this.leaveBalance = leaveBalance;
	}
	
}
