package com.boot.accounting.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.springframework.data.annotation.CreatedDate;
@Entity
@Table(name="branch")
public class Branch {
	@Id
	@GeneratedValue(strategy =GenerationType.AUTO)
    private Long ID;
	@Column(name="name")
    private String Name;
	@Column(name="shortname")
    private String ShortName;
	@Column(name="comid")
    private Long CompId;
	@Column(name="contacno")
    private String ContactNo;
	@Column(name="address")
    private String Address;
	@CreatedDate
	@Column(name="entrydate")
	private Date EntryDate;
	public Long getID() {
		return ID;
	}
	public void setID(Long iD) {
		ID = iD;
	}
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	public String getShortName() {
		return ShortName;
	}
	public void setShortName(String shortName) {
		ShortName = shortName;
	}
	public Long getCompId() {
		return CompId;
	}
	public void setCompId(Long compId) {
		CompId = compId;
	}
	public String getContactNo() {
		return ContactNo;
	}
	public void setContactNo(String contactNo) {
		ContactNo = contactNo;
	}
	public String getAddress() {
		return Address;
	}
	public void setAddress(String address) {
		Address = address;
	}
	public Date getEntryDate() {
		return EntryDate;
	}
	public void setEntryDate(Date entryDate) {
		EntryDate = entryDate;
	}
	
}
