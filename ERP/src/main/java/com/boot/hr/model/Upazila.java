package com.boot.hr.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="upazila")
public class Upazila {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	private Long id;
	@Column(name="upazilaname")
	private String upazilaName;
	@Column(name="districtid")
	private Long districtId;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getUpazilaName() {
		return upazilaName;
	}
	public void setUpazilaName(String upazilaName) {
		this.upazilaName = upazilaName;
	}
	public Long getDistrictId() {
		return districtId;
	}
	public void setDistrictId(Long districtId) {
		this.districtId = districtId;
	}
	public Upazila(Long id, String upazilaName, Long districtId) {
		super();
		this.id = id;
		this.upazilaName = upazilaName;
		this.districtId = districtId;
	}
	public Upazila() {
		
	}
	
	
	
}
