package com.boot.superadmin.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="financialyear")
public class FinancialYear {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@Column(name="sfyear")
	private String sfYear;
	@Column(name="efyear")
	private String efYear;
	@Column(name="yearname")
	private String yearName;
	@Column(name="compid")
	private Long compId;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getSfYear() {
		return sfYear;
	}
	public void setSfYear(String sfYear) {
		this.sfYear = sfYear;
	}
	public String getEfYear() {
		return efYear;
	}
	public void setEfYear(String efYear) {
		this.efYear = efYear;
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
	public FinancialYear(Long id, String sfYear, String efYear, String yearName, Long compId) {
		super();
		this.id = id;
		this.sfYear = sfYear;
		this.efYear = efYear;
		this.yearName = yearName;
		this.compId = compId;
	}
	public FinancialYear() {
		
	}
	
}
