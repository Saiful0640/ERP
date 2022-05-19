package com.boot.hr.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="occupation")
public class Occupation {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name="description")
	private String description;
	@Column(name="code")
	private String code;
	@Column(name="sortorder")
	private int sortOrder;
	@Column(name="companyID")
	private int companyID;
	@Column(name="status")
	private int status;
	@Column(name="genderid")
	private int genderId;
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
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public int getSortOrder() {
		return sortOrder;
	}
	public void setSortOrder(int sortOrder) {
		this.sortOrder = sortOrder;
	}
	public int getCompanyID() {
		return companyID;
	}
	public void setCompanyID(int companyID) {
		this.companyID = companyID;
	}
	public int getStatus() {
		return status;
	}
	public void setStatus(int status) {
		this.status = status;
	}
	public int getGenderId() {
		return genderId;
	}
	public void setGenderId(int genderId) {
		this.genderId = genderId;
	}
	public Occupation(Long id, String description, String code, int sortOrder, int companyID, int status,
			int genderId) {
		super();
		this.id = id;
		this.description = description;
		this.code = code;
		this.sortOrder = sortOrder;
		this.companyID = companyID;
		this.status = status;
		this.genderId = genderId;
	}
	public Occupation() {
		
	}
	
}
