package com.boot.superadmin.model;

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
@Table(name="companymodules")
public class CompanyModules {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@Column(name="compid")
	private Long compId;
	@Column(name="moduleid")
	private Long moduleId;
	@Column(name="assignby")
	private int assignBy;
	@Temporal(TemporalType.DATE)
	@Column(name="entrydate")
	private Date entryDate= new Date (System.currentTimeMillis());
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getCompId() {
		return compId;
	}
	public void setCompId(Long compId) {
		this.compId = compId;
	}
	public Long getModuleId() {
		return moduleId;
	}
	public void setModuleId(Long moduleId) {
		this.moduleId = moduleId;
	}
	public int getAssignBy() {
		return assignBy;
	}
	public void setAssignBy(int assignBy) {
		this.assignBy = assignBy;
	}
	public Date getEntryDate() {
		return entryDate;
	}
	public void setEntryDate(Date entryDate) {
		this.entryDate = entryDate;
	}
	public CompanyModules(Long id, Long compId, Long moduleId, int assignBy, Date entryDate) {
		super();
		this.id = id;
		this.compId = compId;
		this.moduleId = moduleId;
		this.assignBy = assignBy;
		this.entryDate = entryDate;
	}
	public CompanyModules() {
		
	}
	
}
