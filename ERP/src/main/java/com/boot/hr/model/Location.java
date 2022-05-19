package com.boot.hr.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="location")
public class Location {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name="description")
	private String description;
	@Column(name="sortorder")
	private String sortOrder;
	@Column(name="compid")
	private Long compId;
	@Column(name="companytype")
	private int companyType;
	@Column(name="userid")
	private Long userID;
	@Column(name="remarks")
	private String remarks;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getSortOrder() {
		return sortOrder;
	}
	public void setSortOrder(String sortOrder) {
		this.sortOrder = sortOrder;
	}
	public Long getCompId() {
		return compId;
	}
	public void setCompId(Long compId) {
		this.compId = compId;
	}
	public int getCompanyType() {
		return companyType;
	}
	public void setCompanyType(int companyType) {
		this.companyType = companyType;
	}
	public Long getUserID() {
		return userID;
	}
	public void setUserID(Long userID) {
		this.userID = userID;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public Location(Long id, String description, String sortOrder, Long compId, int companyType, Long userID,
			String remarks) {
		super();
		this.id = id;
		this.description = description;
		this.sortOrder = sortOrder;
		this.compId = compId;
		this.companyType = companyType;
		this.userID = userID;
		this.remarks = remarks;
	}
	public Location() {
		
	}
	
}
