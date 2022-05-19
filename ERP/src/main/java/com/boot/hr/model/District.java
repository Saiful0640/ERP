package com.boot.hr.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="district")
public class District {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	private Long id;
	@Column(name="districtname")
	private String upzilaName;
	@Column(name="divisionid")
	private Long divisionId;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getUpzilaName() {
		return upzilaName;
	}
	public void setUpzilaName(String upzilaName) {
		this.upzilaName = upzilaName;
	}
	public Long getDivisionId() {
		return divisionId;
	}
	public void setDivisionId(Long divisionId) {
		this.divisionId = divisionId;
	}
	public District(Long id, String upzilaName, Long divisionId) {
		super();
		this.id = id;
		this.upzilaName = upzilaName;
		this.divisionId = divisionId;
	}
	public District() {
		
	}
	
	
}
