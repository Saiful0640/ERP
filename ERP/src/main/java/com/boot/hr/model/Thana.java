package com.boot.hr.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="thana")
public class Thana {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY )
	private Long id;
	@Column(name="thananame")
	private String thanaName;
	@Column(name="upazilaid")
	private Long upazilaId;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getThanaName() {
		return thanaName;
	}
	public void setThanaName(String thanaName) {
		this.thanaName = thanaName;
	}
	public Long getUpazilaId() {
		return upazilaId;
	}
	public void setUpazilaId(Long upazilaId) {
		this.upazilaId = upazilaId;
	}
	public Thana(Long id, String thanaName, Long upazilaId) {
		super();
		this.id = id;
		this.thanaName = thanaName;
		this.upazilaId = upazilaId;
	}
	public Thana() {
		
	}
	
	
}
