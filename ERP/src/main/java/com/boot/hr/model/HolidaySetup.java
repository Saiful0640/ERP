package com.boot.hr.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="holidaysetup")
public class HolidaySetup {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column(name="hyear")
	private String hYear;
	@Column(name="hdate")
	private String hDate;
	@Column(name="note")
	private String note;
	@Column(name="compid")
	private Long compId;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String gethYear() {
		return hYear;
	}
	public void sethYear(String hYear) {
		this.hYear = hYear;
	}
	public String gethDate() {
		return hDate;
	}
	public void sethDate(String hDate) {
		this.hDate = hDate;
	}
	public String getNote() {
		return note;
	}
	public void setNote(String note) {
		this.note = note;
	}
	public Long getCompId() {
		return compId;
	}
	public void setCompId(Long compId) {
		this.compId = compId;
	}
	public HolidaySetup(long id, String hYear, String hDate, String note, Long compId) {
		super();
		this.id = id;
		this.hYear = hYear;
		this.hDate = hDate;
		this.note = note;
		this.compId = compId;
	}
	public HolidaySetup() {
		
	}
	
	
}
