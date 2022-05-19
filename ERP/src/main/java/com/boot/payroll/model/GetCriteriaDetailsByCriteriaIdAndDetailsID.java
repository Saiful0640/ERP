package com.boot.payroll.model;

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
@NamedStoredProcedureQueries({@NamedStoredProcedureQuery(name="getCriteriaDetailsByCriteriaIdAndDetailsID", procedureName = "getCriteriaDetailsByCriteriaIdAndDetailsID", parameters ={@StoredProcedureParameter(mode = ParameterMode.IN, name = "ModuleID", type = long.class),@StoredProcedureParameter(mode = ParameterMode.IN, name = "CriteriaID", type = long.class),@StoredProcedureParameter(mode = ParameterMode.IN, name = "DetailsID", type = long.class)},resultClasses = GetCriteriaDetailsByCriteriaIdAndDetailsID.class) })
public class GetCriteriaDetailsByCriteriaIdAndDetailsID {
	@Id
	private Long id;
	@Column(name="criteriaid")
	private Long criteriaId;
	@Column(name="detailscaption")
	private String detailsCaption;
	@Column(name="parentid")
	private Long parentId;
	@Column(name="accountid")
	private Long accountId;
	@Column(name="moduleid")
	private Long moduleId;
	@Column(name="compid")
	private Long compId;
	@Column(name="status")
	private boolean status;
	@Column(name="detailsnote")
	private String detailsNoste;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getCriteriaId() {
		return criteriaId;
	}
	public void setCriteriaId(Long criteriaId) {
		this.criteriaId = criteriaId;
	}
	public String getDetailsCaption() {
		return detailsCaption;
	}
	public void setDetailsCaption(String detailsCaption) {
		this.detailsCaption = detailsCaption;
	}
	public Long getParentId() {
		return parentId;
	}
	public void setParentId(Long parentId) {
		this.parentId = parentId;
	}
	public Long getAccountId() {
		return accountId;
	}
	public void setAccountId(Long accountId) {
		this.accountId = accountId;
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
	public String getDetailsNoste() {
		return detailsNoste;
	}
	public void setDetailsNoste(String detailsNoste) {
		this.detailsNoste = detailsNoste;
	}
}
