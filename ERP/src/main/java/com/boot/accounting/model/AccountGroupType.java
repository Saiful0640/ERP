package com.boot.accounting.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="accountgrouptype")
public class AccountGroupType {
	@Id
	@GeneratedValue(strategy =GenerationType.AUTO)
	private int  ID ;
	@Column(name="typename")
	private String TypeName;
	@Column(name="lowergroupid")
	private Long LowerGroupID ;
	@Column(name="isactive")
	private boolean IsActive ;
	@Column(name="compid")
	private Long CompID ;
	@org.springframework.data.annotation.CreatedDate
	@Column(name="createddate")
	private Date CreatedDate;
	public int getID() {
		return ID;
	}
	public void setID(int iD) {
		ID = iD;
	}
	public String getTypeName() {
		return TypeName;
	}
	public void setTypeName(String typeName) {
		TypeName = typeName;
	}
	public Long getLowerGroupID() {
		return LowerGroupID;
	}
	public void setLowerGroupID(Long lowerGroupID) {
		LowerGroupID = lowerGroupID;
	}
	public boolean isIsActive() {
		return IsActive;
	}
	public void setIsActive(boolean isActive) {
		IsActive = isActive;
	}
	public Long getCompID() {
		return CompID;
	}
	public void setCompID(Long compID) {
		CompID = compID;
	}
	public Date getCreatedDate() {
		return CreatedDate;
	}
	public void setCreatedDate(Date createdDate) {
		CreatedDate = createdDate;
	}
	
}
