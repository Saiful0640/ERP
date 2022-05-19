package com.boot.payroll.model;

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
@NamedStoredProcedureQueries({@NamedStoredProcedureQuery(name="get_MonthlyAttendance_steel", procedureName = "get_MonthlyAttendance_steel", parameters ={@StoredProcedureParameter(mode = ParameterMode.IN, name = "GroupID", type = long.class),@StoredProcedureParameter(mode = ParameterMode.IN, name = "SectionID", type = long.class)},resultClasses = GetMonthlyAttendanceSteel.class) })
public class GetMonthlyAttendanceSteel {
	@Id
	@Column(name="memberid")
	private long memberID;
	@Column(name="membercode")
	private String memberCode;
	@Column(name="paymenttype")
	private int paymentType;
	@Column(name="paymentamount")
	private Double paymentAmount;
	@Column(name="grosssalary")
	private Double grossSalary;
	@Column(name="compid")
	private long compId;
	public long getMemberID() {
		return memberID;
	}
	public void setMemberID(long memberID) {
		this.memberID = memberID;
	}
	public String getMemberCode() {
		return memberCode;
	}
	public void setMemberCode(String memberCode) {
		this.memberCode = memberCode;
	}
	public int getPaymentType() {
		return paymentType;
	}
	public void setPaymentType(int paymentType) {
		this.paymentType = paymentType;
	}
	public Double getPaymentAmount() {
		return paymentAmount;
	}
	public void setPaymentAmount(Double paymentAmount) {
		this.paymentAmount = paymentAmount;
	}
	public Double getGrossSalary() {
		return grossSalary;
	}
	public void setGrossSalary(Double grossSalary) {
		this.grossSalary = grossSalary;
	}
	public long getCompId() {
		return compId;
	}
	public void setCompId(long compId) {
		this.compId = compId;
	}
	
	
}
