package com.boot.hr.model;

import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.NamedStoredProcedureQueries;
import javax.persistence.NamedStoredProcedureQuery;
import javax.persistence.ParameterMode;
import javax.persistence.StoredProcedureParameter;
import javax.persistence.Table;


@Entity
@Table
@NamedStoredProcedureQueries({@NamedStoredProcedureQuery(name = "holidaylist", procedureName = "holidaylist", parameters = {
			@StoredProcedureParameter(mode = ParameterMode.IN, name = "hdate", type = String.class)},resultClasses = HolidaySetupSP.class) })

public class HolidaySetupSP {
	@Id
	private long id;
	private String hdate;
	private String hyear;
	private String note;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getHdate() {
		return hdate;
	}
	public void setHdate(String hdate) {
		this.hdate = hdate;
	}
	public String getHyear() {
		return hyear;
	}
	public void setHyear(String hyear) {
		this.hyear = hyear;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	
	
}
	
