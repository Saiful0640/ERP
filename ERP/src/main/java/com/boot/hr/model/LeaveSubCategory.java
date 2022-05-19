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
@Table(name="leavesubcategory")
public class LeaveSubCategory {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	@Column(name="leavecategoryid")
	private Long leaveCategoryId;
	@Column(name="title")
	private String title;
	@Column(name="days")
	private int days;
	@Column(name="compid")
	private Long compId;
	@Column(name="moduleid")
	private Long moduleId;
	@Temporal(TemporalType.DATE)
	@Column(name="entrydate")
	private Date entryDate = new Date(System.currentTimeMillis());
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public Long getLeaveCategoryId() {
		return leaveCategoryId;
	}
	public void setLeaveCategoryId(Long leaveCategoryId) {
		this.leaveCategoryId = leaveCategoryId;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public int getDays() {
		return days;
	}
	public void setDays(int days) {
		this.days = days;
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
	public Date getEntryDate() {
		return entryDate;
	}
	public void setEntryDate(Date entryDate) {
		this.entryDate = entryDate;
	}
	public LeaveSubCategory(Long id, Long leaveCategoryId, String title, int days, Long compId, Long moduleId,
			Date entryDate) {
		super();
		this.id = id;
		this.leaveCategoryId = leaveCategoryId;
		this.title = title;
		this.days = days;
		this.compId = compId;
		this.moduleId = moduleId;
		this.entryDate = entryDate;
	}
	public LeaveSubCategory() {
		
	}
	
}
