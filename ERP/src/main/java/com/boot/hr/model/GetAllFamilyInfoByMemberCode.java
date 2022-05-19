package com.boot.hr.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Lob;
import javax.persistence.NamedStoredProcedureQueries;
import javax.persistence.NamedStoredProcedureQuery;
import javax.persistence.ParameterMode;
import javax.persistence.StoredProcedureParameter;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

@Entity
@Table
@NamedStoredProcedureQueries({@NamedStoredProcedureQuery(name = "getAllFamilyInfoByMemberCode", procedureName = "getAllFamilyInfoByMemberCode", parameters = {
			@StoredProcedureParameter(mode = ParameterMode.IN, name = "membercode", type = String.class)},resultClasses = GetAllFamilyInfoByMemberCode.class) })

public class GetAllFamilyInfoByMemberCode {
	@Id
	private Long id;
	@Column(name="membercode")
	private String memberCode;
	@Column(name="relationship")
	private int relationship;
	@Column(name="fmembername")
	private String fMemberName;
	@Column(name="dateofbirth")
	private String dateOfBirth;
	@Column(name="placeofbirth")
	private String placeOfBirth;
	@Column(name="genderid")
	private int genderId;
	@Column(name="bloodgroupid")
	private int bloodGroupId;
	@Column(name="maritialstatusid")
	private int maritialStatusId;
	@Column(name="occupationid")
	private Long occupationId;
	@Column(name="countryid")
	private Long CountryId;
	@Column(name="nationalityid")
	private String NationalityId;
	@Column(name="passportno")
	private String passportNo;
	@Lob
	@Column(name="picture")
	private Byte[] picture;
	@Column(name="mobileno")
	private String mobileNo;
	@Column(name="email")
	private String email;
	@Column(name="isnominee")
	private int isNominee;
	@Column(name="percentage")
	private Long percentage;
	@Column(name="compid")
	private Long compId;
	@Column(name="comtype")
	private int comType;
	@Column(name="moduleid")
	private Long moduleId;
	@Temporal(TemporalType.DATE)
	@Column(name="createddate")
	private java.util.Date createdDate;
	@Column(name="modifiedby")
	private int modifiedBy;
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
	public int getRelationship() {
		return relationship;
	}
	public void setRelationship(int relationship) {
		this.relationship = relationship;
	}
	public String getfMemberName() {
		return fMemberName;
	}
	public void setfMemberName(String fMemberName) {
		this.fMemberName = fMemberName;
	}
	public String getDateOfBirth() {
		return dateOfBirth;
	}
	public void setDateOfBirth(String dateOfBirth) {
		this.dateOfBirth = dateOfBirth;
	}
	public String getPlaceOfBirth() {
		return placeOfBirth;
	}
	public void setPlaceOfBirth(String placeOfBirth) {
		this.placeOfBirth = placeOfBirth;
	}
	public int getGenderId() {
		return genderId;
	}
	public void setGenderId(int genderId) {
		this.genderId = genderId;
	}
	public int getBloodGroupId() {
		return bloodGroupId;
	}
	public void setBloodGroupId(int bloodGroupId) {
		this.bloodGroupId = bloodGroupId;
	}
	public int getMaritialStatusId() {
		return maritialStatusId;
	}
	public void setMaritialStatusId(int maritialStatusId) {
		this.maritialStatusId = maritialStatusId;
	}
	public Long getOccupationId() {
		return occupationId;
	}
	public void setOccupationId(Long occupationId) {
		this.occupationId = occupationId;
	}
	public Long getCountryId() {
		return CountryId;
	}
	public void setCountryId(Long countryId) {
		CountryId = countryId;
	}
	public String getNationalityId() {
		return NationalityId;
	}
	public void setNationalityId(String nationalityId) {
		NationalityId = nationalityId;
	}
	public String getPassportNo() {
		return passportNo;
	}
	public void setPassportNo(String passportNo) {
		this.passportNo = passportNo;
	}
	public Byte[] getPicture() {
		return picture;
	}
	public void setPicture(Byte[] picture) {
		this.picture = picture;
	}
	public String getMobileNo() {
		return mobileNo;
	}
	public void setMobileNo(String mobileNo) {
		this.mobileNo = mobileNo;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public int getIsNominee() {
		return isNominee;
	}
	public void setIsNominee(int isNominee) {
		this.isNominee = isNominee;
	}
	public Long getPercentage() {
		return percentage;
	}
	public void setPercentage(Long percentage) {
		this.percentage = percentage;
	}
	public Long getCompId() {
		return compId;
	}
	public void setCompId(Long compId) {
		this.compId = compId;
	}
	public int getComType() {
		return comType;
	}
	public void setComType(int comType) {
		this.comType = comType;
	}
	public Long getModuleId() {
		return moduleId;
	}
	public void setModuleId(Long moduleId) {
		this.moduleId = moduleId;
	}
	public java.util.Date getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(java.util.Date createdDate) {
		this.createdDate = createdDate;
	}
	public int getModifiedBy() {
		return modifiedBy;
	}
	public void setModifiedBy(int modifiedBy) {
		this.modifiedBy = modifiedBy;
	}
	
	
	
}
