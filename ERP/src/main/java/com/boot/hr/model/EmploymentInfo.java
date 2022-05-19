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
@Table(name="employmentinfo")
public class EmploymentInfo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column(name="membercode")
	private String memberCode;
	@Column(name="joindate")
	private String joinDate;
	@Column(name="departmentid")
	private Long departmentId;
	@Column(name="designationid")
	private Long designationId;
	@Column(name="sectionid")
	private Long sectionId;
	@Column(name="emptypeid")
	private int empTypeId;
	@Column(name="confirmationdate")
	private String confirmationDate;
	@Column(name="proconfirmationdate")
	private String proConfirmationDate;
	@Column(name="jobdescription")
	private String jobDescription;
	@Column(name="joblocation")
	private int jobLocationId;
	@Column(name="actiontypeid")
	private int actionTypeId;
	@Column(name="actiondate")
	private String actionDate;
	@Temporal(TemporalType.DATE)
	@Column(name="entrydate")
	private Date entryDate = new Date(System.currentTimeMillis());
	@Column(name="userid")
	private Long userId;
	@Column(name="moduleid")
	private Long moduleId;
	@Column(name="compid")
	private Long compId;
	@Column(name="reason")
	private String reason;
	@Column(name="memberid")
	private Long memberID;
	@Column(name="groupid")
	private Long groupID;
	@Column(name="leaveid")
	private Long leaveID;
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
	public String getJoinDate() {
		return joinDate;
	}
	public void setJoinDate(String joinDate) {
		this.joinDate = joinDate;
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
	public String getJobDescription() {
		return jobDescription;
	}
	public void setJobDescription(String jobDescription) {
		this.jobDescription = jobDescription;
	}
	public int getJobLocationId() {
		return jobLocationId;
	}
	public void setJobLocationId(int jobLocationId) {
		this.jobLocationId = jobLocationId;
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
	public String getReason() {
		return reason;
	}
	public void setReason(String reason) {
		this.reason = reason;
	}
	public Long getMemberID() {
		return memberID;
	}
	public void setMemberID(Long memberID) {
		this.memberID = memberID;
	}
	public Long getGroupID() {
		return groupID;
	}
	public void setGroupID(Long groupID) {
		this.groupID = groupID;
	}
	public Long getLeaveID() {
		return leaveID;
	}
	public void setLeaveID(Long leaveID) {
		this.leaveID = leaveID;
	}
	public EmploymentInfo(long id, String memberCode, String joinDate, Long departmentId, Long designationId,
			Long sectionId, int empTypeId, String confirmationDate, String proConfirmationDate, String jobDescription,
			int jobLocationId, int actionTypeId, String actionDate, Date entryDate, Long userId, Long moduleId,
			Long compId, String reason, Long memberID, Long groupID, Long leaveID) {
		super();
		this.id = id;
		this.memberCode = memberCode;
		this.joinDate = joinDate;
		this.departmentId = departmentId;
		this.designationId = designationId;
		this.sectionId = sectionId;
		this.empTypeId = empTypeId;
		this.confirmationDate = confirmationDate;
		this.proConfirmationDate = proConfirmationDate;
		this.jobDescription = jobDescription;
		this.jobLocationId = jobLocationId;
		this.actionTypeId = actionTypeId;
		this.actionDate = actionDate;
		this.entryDate = entryDate;
		this.userId = userId;
		this.moduleId = moduleId;
		this.compId = compId;
		this.reason = reason;
		this.memberID = memberID;
		this.groupID = groupID;
		this.leaveID = leaveID;
	}
	public EmploymentInfo() {
		
	}
	
}
