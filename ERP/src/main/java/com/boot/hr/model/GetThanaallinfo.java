package com.boot.hr.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedStoredProcedureQueries;
import javax.persistence.NamedStoredProcedureQuery;
import javax.persistence.Table;

@Entity
@Table
@NamedStoredProcedureQueries({@NamedStoredProcedureQuery(name = "GetThanaallinfo", procedureName = "GetThanaallinfo",resultClasses = GetThanaallinfo.class) })

public class GetThanaallinfo {
	@Id
	private Long id;
	private String thananame;
	private String upazilaname;
	private String districtname;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getThananame() {
		return thananame;
	}
	public void setThananame(String thananame) {
		this.thananame = thananame;
	}
	public String getUpazilaname() {
		return upazilaname;
	}
	public void setUpazilaname(String upazilaname) {
		this.upazilaname = upazilaname;
	}
	public String getDistrictname() {
		return districtname;
	}
	public void setDistrictname(String districtname) {
		this.districtname = districtname;
	}
	
}
