package com.boot.hr.model;


import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table(name="employeinfo")
public class EmployeeGeneralInfo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name="membercode")
	private String memberCode;
	@Column(name="membername")
	private String memberName;
	@Column(name="dateofbirth")
	private String dateOfBirth ;
	@Column(name="genderid")
	private int genderID;
	@Column(name="bloodgroupid")
	private int bloodGroupID;
	@Column(name="religionid")
	private int religionID;
	@Column(name="nationalityid")
	private String nationalityID;
	@Column(name="mobileno")
	private String mobileNo;
	@Column(name="presentaddress")
	private String presentAddress;
	@Column(name="permamentaddress")
	private String permanentAddress;
	@Column(name="maritialstatusid")
	private int maritialStatusID;
	@Column(name="spousename")
	private String spousName;
	@Column(name="fathername")
	private String fathersName;
	@Column(name="mothername")
	private String mothersName;
	@Column(name="remarks")
	private String remarks;
	@Lob
	@Column(name="picture")
	private byte[] picture;
	@Column(name="compid")
	private Long compId;
	@Column(name="userid")
	private Long userID;
	@Column(name="moduleid")
	private Long moduleID;
	@Temporal(TemporalType.DATE)
	@Column(name="entrydate")
	private Date entryDate = new Date(System.currentTimeMillis());
	@Column(name="status")
	private int status;
	@Column(name="thanaid")
	private int thanaID;
	@Column(name="permanentthanaid")
	private int permanentThanaID;
	@Column(name="presentupozilla")
	private String presentUpazila;
	@Column(name="permanentupozila")
	private String permanetUpazila;
	@Column(name="presentdistrict")
	private String presentDistrict;
	@Column(name="permanentdistrict")
	private String permanetDistrict;
	@Column(name="email")
	private String email;
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
	public String getMemberName() {
		return memberName;
	}
	public void setMemberName(String memberName) {
		this.memberName = memberName;
	}
	public String getDateOfBirth() {
		return dateOfBirth;
	}
	public void setDateOfBirth(String dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}
	public int getGenderID() {
		return genderID;
	}
	public void setGenderID(int genderID) {
		this.genderID = genderID;
	}
	public int getBloodGroupID() {
		return bloodGroupID;
	}
	public void setBloodGroupID(int bloodGroupID) {
		this.bloodGroupID = bloodGroupID;
	}
	public int getReligionID() {
		return religionID;
	}
	public void setReligionID(int religionID) {
		this.religionID = religionID;
	}
	public String getNationalityID() {
		return nationalityID;
	}
	public void setNationalityID(String nationalityID) {
		this.nationalityID = nationalityID;
	}
	public String getMobileNo() {
		return mobileNo;
	}
	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}
	public String getPresentAddress() {
		return presentAddress;
	}
	public void setPresentAddress(String presentAddress) {
		this.presentAddress = presentAddress;
	}
	public String getPermanentAddress() {
		return permanentAddress;
	}
	public void setPermanentAddress(String permanentAddress) {
		this.permanentAddress = permanentAddress;
	}
	public int getMaritialStatusID() {
		return maritialStatusID;
	}
	public void setMaritialStatusID(int maritialStatusID) {
		this.maritialStatusID = maritialStatusID;
	}
	public String getSpousName() {
		return spousName;
	}
	public void setSpousName(String spousName) {
		this.spousName = spousName;
	}
	public String getFathersName() {
		return fathersName;
	}
	public void setFathersName(String fathersName) {
		this.fathersName = fathersName;
	}
	public String getMothersName() {
		return mothersName;
	}
	public void setMothersName(String mothersName) {
		this.mothersName = mothersName;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public byte[] getPicture() {
		return picture;
	}
	public void setPicture(byte[] picture) {
		this.picture = picture;
	}
	public Long getCompId() {
		return compId;
	}
	public void setCompId(Long compId) {
		this.compId = compId;
	}
	public Long getUserID() {
		return userID;
	}
	public void setUserID(Long userID) {
		this.userID = userID;
	}
	public Long getModuleID() {
		return moduleID;
	}
	public void setModuleID(Long moduleID) {
		this.moduleID = moduleID;
	}
	public Date getEntryDate() {
		return entryDate;
	}
	public void setEntryDate(Date entryDate) {
		this.entryDate = entryDate;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public int getThanaID() {
		return thanaID;
	}
	public void setThanaID(int thanaID) {
		this.thanaID = thanaID;
	}
	public int getPermanentThanaID() {
		return permanentThanaID;
	}
	public void setPermanentThanaID(int permanentThanaID) {
		this.permanentThanaID = permanentThanaID;
	}
	public String getPresentUpazila() {
		return presentUpazila;
	}
	public void setPresentUpazila(String presentUpazila) {
		this.presentUpazila = presentUpazila;
	}
	public String getPermanetUpazila() {
		return permanetUpazila;
	}
	public void setPermanetUpazila(String permanetUpazila) {
		this.permanetUpazila = permanetUpazila;
	}
	public String getPresentDistrict() {
		return presentDistrict;
	}
	public void setPresentDistrict(String presentDistrict) {
		this.presentDistrict = presentDistrict;
	}
	public String getPermanetDistrict() {
		return permanetDistrict;
	}
	public void setPermanetDistrict(String permanetDistrict) {
		this.permanetDistrict = permanetDistrict;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public EmployeeGeneralInfo(Long id, String memberCode, String memberName, String dateOfBirth, int genderID,
			int bloodGroupID, int religionID, String nationalityID, String mobileNo, String presentAddress,
			String permanentAddress, int maritialStatusID, String spousName, String fathersName, String mothersName,
			String remarks, byte[] picture, Long compId, Long userID, Long moduleID, Date entryDate, int status,
			int thanaID, int permanentThanaID, String presentUpazila, String permanetUpazila, String presentDistrict,
			String permanetDistrict, String email) {
		super();
		this.id = id;
		this.memberCode = memberCode;
		this.memberName = memberName;
		this.dateOfBirth = dateOfBirth;
		this.genderID = genderID;
		this.bloodGroupID = bloodGroupID;
		this.religionID = religionID;
		this.nationalityID = nationalityID;
		this.mobileNo = mobileNo;
		this.presentAddress = presentAddress;
		this.permanentAddress = permanentAddress;
		this.maritialStatusID = maritialStatusID;
		this.spousName = spousName;
		this.fathersName = fathersName;
		this.mothersName = mothersName;
		this.remarks = remarks;
		this.picture = picture;
		this.compId = compId;
		this.userID = userID;
		this.moduleID = moduleID;
		this.entryDate = entryDate;
		this.status = status;
		this.thanaID = thanaID;
		this.permanentThanaID = permanentThanaID;
		this.presentUpazila = presentUpazila;
		this.permanetUpazila = permanetUpazila;
		this.presentDistrict = presentDistrict;
		this.permanetDistrict = permanetDistrict;
		this.email = email;
	}
	public EmployeeGeneralInfo() {
		
	}
	
	
}
