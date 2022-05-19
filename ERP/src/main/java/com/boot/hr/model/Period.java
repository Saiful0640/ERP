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
@Table(name="period")
public class Period {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name="startdate")
	private String startDate;
	@Column(name="enddate")
	private String endDate;
	@Column(name="periodname")
	private String periodName;
	@Column(name="yearid")
	private Long yearId;
	@Column(name="createdby")
	private int createdBy;
	@Temporal(TemporalType.DATE)
	@Column(name="createdate")
	private Date createdDate;
	@Column(name="compid")
	private Long compId;
	@Column(name="moduleid")
	private Long moduleId;
	@Column(name="monthid")
	private Long monthId;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getStartDate() {
		return startDate;
	}
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	public String getEndDate() {
		return endDate;
	}
	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}
	public String getPeriodName() {
		return periodName;
	}
	public void setPeriodName(String periodName) {
		this.periodName = periodName;
	}
	public Long getYearId() {
		return yearId;
	}
	public void setYearId(Long yearId) {
		this.yearId = yearId;
	}
	public int getCreatedBy() {
		return createdBy;
	}
	public void setCreatedBy(int createdBy) {
		this.createdBy = createdBy;
	}
	public Date getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	public Long getCompId() {
		return compId;
	}
	public void setCompId(Long compId) {
		this.compId = compId;
	}
	public long getModuleId() {
		return moduleId;
	}
	public void setModuleId(Long moduleId) {
		this.moduleId = moduleId;
	}
	public Long getMonthId() {
		return monthId;
	}
	public void setMonthId(Long monthId) {
		this.monthId = monthId;
	}
	public Period(Long id, String startDate, String endDate, String periodName, Long yearId, int createdBy,
			Date createdDate, Long compId, Long moduleId, Long monthId) {
		super();
		this.id = id;
		this.startDate = startDate;
		this.endDate = endDate;
		this.periodName = periodName;
		this.yearId = yearId;
		this.createdBy = createdBy;
		this.createdDate = createdDate;
		this.compId = compId;
		this.moduleId = moduleId;
		this.monthId = monthId;
	}
	public Period() {
		
	}
	
}
