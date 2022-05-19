package com.boot.superadmin.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="year")
public class Year {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name="startdate")
	private String startDate;
	@Column(name="enddate")
	private String endDate;
	@Column(name="yearname")
	private String yearName;
	@Column(name="compid")
	private Long compId;
	@Column(name="active")
	private Boolean active;
	@Column(name="createdby")
	private int createdby;
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
	public String getYearName() {
		return yearName;
	}
	public void setYearName(String yearName) {
		this.yearName = yearName;
	}
	public Long getCompId() {
		return compId;
	}
	public void setCompId(Long compId) {
		this.compId = compId;
	}
	public boolean getActive() {
		return active;
	}
	public void setIsActive(boolean active) {
		this.active = active;
	}
	public int getCreatedby() {
		return createdby;
	}
	public void setCreatedby(int createdby) {
		this.createdby = createdby;
	}
	public Year(Long id, String startDate, String endDate, String yearName, Long compId, Boolean active, int createdby) {
		super();
		this.id = id;
		this.startDate = startDate;
		this.endDate = endDate;
		this.yearName = yearName;
		this.compId = compId;
		this.active = active;
		this.createdby = createdby;
	}
	public Year() {
		
	}
	
}
