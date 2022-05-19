package com.boot.accounting.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="criteriacenter")
public class CriteriaCenter {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name="criteriacaption")
	private String criteriaCaption;
	@Column(name="moduleid")
	private Long moduleId;
	@Column(name="compid")
	private Long compId;
	@Column(name="status")
	private boolean status;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getCriteriaCaption() {
		return criteriaCaption;
	}
	public void setCriteriaCaption(String criteriaCaption) {
		this.criteriaCaption = criteriaCaption;
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
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public CriteriaCenter(Long id, String criteriaCaption, Long moduleId, Long compId, boolean status) {
		super();
		this.id = id;
		this.criteriaCaption = criteriaCaption;
		this.moduleId = moduleId;
		this.compId = compId;
		this.status = status;
	}
	public CriteriaCenter() {
		
	}
	
	
	
}
