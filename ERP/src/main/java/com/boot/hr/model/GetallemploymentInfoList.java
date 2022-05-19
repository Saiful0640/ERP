package com.boot.hr.model;

import java.util.Date;

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
@NamedStoredProcedureQueries({@NamedStoredProcedureQuery(name = "GetallemploymentInfoList", procedureName = "GetallemploymentInfoList", parameters = {
			@StoredProcedureParameter(mode = ParameterMode.IN, name = "moduleid", type = Long.class),@StoredProcedureParameter(mode = ParameterMode.IN, name = "groupid", type = Long.class),@StoredProcedureParameter(mode = ParameterMode.IN, name = "sectionid", type = Long.class)},resultClasses = GetallemploymentInfoList.class) })
public class GetallemploymentInfoList {
	@Id
	private long id;
	@Column(name="membercode")
	private String memberCode;
	@Column(name="membername")
	private String memberName;
	@Column(name="joindate")
	private String joinDate;
	@Column(name="groupid")
	private Long groupID;
	@Column(name="groupname")
	private String groupName;	
	@Column(name="department")
	private String department;
	@Column(name="designation")
	private String designation;	
	@Column(name="jobdescription")
	private String jobDescription;
	@Column(name="moduleid")
	private Long moduleId;
	@Column(name="compid")
	private Long compId;
	@Column(name="memberid")
	private Long memberID;
	@Column(name="departmentid")
	private Long departmentId;
	@Column(name="designationid")
	private Long designationId;
	@Column(name="sectionid")
	private Long sectionId;
	@Column(name="sectionname")
	private String sectionName;
	@Column(name="joblocation")
	private Long joblocation;
	@Column(name="actiontypeid")
	private int actionTypeId;
	@Column(name="actiondate")
	private String actionDate;
	@Column(name="entrydate")
	private Date entryDate;
	@Column(name="userid")
	private Long userId;	
	@Column(name="emptypeid")
	private int empTypeId;	
	@Column(name="confirmationdate")
	private String confirmationDate;
	@Column(name="proconfirmationdate")
	private String proConfirmationDate;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getMemberCode() {
		return memberCode;
	}
	public void setMemberCode(String memberCode) {
		this.memberCode = memberCode;
	}
	public String getMemberName() {
		return memberName;
	}
	public void setMemberName(String memberName) {
		this.memberName = memberName;
	}
	public String getJoinDate() {
		return joinDate;
	}
	public void setJoinDate(String joinDate) {
		this.joinDate = joinDate;
	}
	public Long getGroupID() {
		return groupID;
	}
	public void setGroupID(Long groupID) {
		this.groupID = groupID;
	}
	public String getGroupName() {
		return groupName;
	}
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	public String getDepartment() {
		return department;
	}
	public void setDepartment(String department) {
		this.department = department;
	}
	public String getDesignation() {
		return designation;
	}
	public void setDesignation(String designation) {
		this.designation = designation;
	}
	public String getJobDescription() {
		return jobDescription;
	}
	public void setJobDescription(String jobDescription) {
		this.jobDescription = jobDescription;
	}
	public Long getModuleId() {
		return moduleId;
	}
	public void setModuleId(Long moduleId) {
		this.moduleId = moduleId;
	}
	public Long getCompId() {
		return compId;
	}
	public void setCompId(Long compId) {
		this.compId = compId;
	}
	public Long getMemberID() {
		return memberID;
	}
	public void setMemberID(Long memberID) {
		this.memberID = memberID;
	}
	public Long getDepartmentId() {
		return departmentId;
	}
	public void setDepartmentId(Long departmentId) {
		this.departmentId = departmentId;
	}
	public Long getDesignationId() {
		return designationId;
	}
	public void setDesignationId(Long designationId) {
		this.designationId = designationId;
	}
	public Long getSectionId() {
		return sectionId;
	}
	public void setSectionId(Long sectionId) {
		this.sectionId = sectionId;
	}
	public String getSectionName() {
		return sectionName;
	}
	public void setSectionName(String sectionName) {
		this.sectionName = sectionName;
	}
	public Long getJoblocation() {
		return joblocation;
	}
	public void setJoblocation(Long joblocation) {
		this.joblocation = joblocation;
	}
	public int getActionTypeId() {
		return actionTypeId;
	}
	public void setActionTypeId(int actionTypeId) {
		this.actionTypeId = actionTypeId;
	}
	public String getActionDate() {
		return actionDate;
	}
	public void setActionDate(String actionDate) {
		this.actionDate = actionDate;
	}
	public Date getEntryDate() {
		return entryDate;
	}
	public void setEntryDate(Date entryDate) {
		this.entryDate = entryDate;
	}
	public Long getUserId() {
		return userId;
	}
	public void setUserId(Long userId) {
		this.userId = userId;
	}
	public int getEmpTypeId() {
		return empTypeId;
	}
	public void setEmpTypeId(int empTypeId) {
		this.empTypeId = empTypeId;
	}
	public String getConfirmationDate() {
		return confirmationDate;
	}
	public void setConfirmationDate(String confirmationDate) {
		this.confirmationDate = confirmationDate;
	}
	public String getProConfirmationDate() {
		return proConfirmationDate;
	}
	public void setProConfirmationDate(String proConfirmationDate) {
		this.proConfirmationDate = proConfirmationDate;
	}
	
	
}
