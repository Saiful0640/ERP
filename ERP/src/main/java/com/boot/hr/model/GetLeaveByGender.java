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
@NamedStoredProcedureQueries({@NamedStoredProcedureQuery(name = "get_LeavebyGender", procedureName = "get_LeavebyGender", parameters = {
			@StoredProcedureParameter(mode = ParameterMode.IN, name = "membercode", type = String.class)},resultClasses = GetLeaveByGender.class) })
public class GetLeaveByGender {
	@Id
	private Long id;
	@Column(name="genderid")
	private int genderID;
	@Column(name="membercode")
	private String memberCode;
	@Column(name="typename")
	private String typeName;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public int getGenderID() {
		return genderID;
	}
	public void setGenderID(int genderID) {
		this.genderID = genderID;
	}
	public String getMemberCode() {
		return memberCode;
	}
	public void setMemberCode(String memberCode) {
		this.memberCode = memberCode;
	}
	public String getTypeName() {
		return typeName;
	}
	public void setTypeName(String typeName) {
		this.typeName = typeName;
	}
	public GetLeaveByGender(Long id, int genderID, String memberCode, String typeName) {
		super();
		this.id = id;
		this.genderID = genderID;
		this.memberCode = memberCode;
		this.typeName = typeName;
	}
	public GetLeaveByGender() {
		
	}
	
}
