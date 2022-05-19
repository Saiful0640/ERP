package com.boot.superadmin.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="modules")
public class Modules {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@Column(name="name")
	private String name;
	@Column(name="moduleRoutePath")
	private String moduleRoutePath;
	@Column(name="isActive")
	private Boolean isActive;
	@Column(name="serialNo")
	private int serialNo;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getModuleRoutePath() {
		return moduleRoutePath;
	}
	public void setModuleRoutePath(String moduleRoutePath) {
		this.moduleRoutePath = moduleRoutePath;
	}
	public Boolean getIsActive() {
		return isActive;
	}
	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}
	public int getSerialNo() {
		return serialNo;
	}
	public void setSerialNo(int serialNo) {
		this.serialNo = serialNo;
	}
	public Modules(Long id, String name, String moduleRoutePath, Boolean isActive, int serialNo) {
		super();
		this.id = id;
		this.name = name;
		this.moduleRoutePath = moduleRoutePath;
		this.isActive = isActive;
		this.serialNo = serialNo;
	}
	public Modules() {
		
	}
	
}
