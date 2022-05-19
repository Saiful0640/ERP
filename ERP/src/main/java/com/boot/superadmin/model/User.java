package com.boot.superadmin.model;



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
@Table(name="user")
public class User {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Long id;
	@Column(name="username")
	private String userName;
	@Column(name="password")
	private String password;
	@Column(name="isactive")
	private Boolean isActive;
	@Column(name="compid")
	private Long compId;
	@Column(name="usertypeid")
	private int userTypeId;
	@Temporal(TemporalType.DATE)
	@Column(name="createddate")
	private Date createdDate = new Date(System.currentTimeMillis());
	@Column(name="roleid")
	private Long roleId;
	@Column(name="empid")
	private Long empId;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getUserName() {
		return userName;
	}
	public void setUserName(String userName) {
		this.userName = userName;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public Boolean getIsActive() {
		return isActive;
	}
	public void setIsActive(Boolean isActive) {
		this.isActive = isActive;
	}
	public Long getCompId() {
		return compId;
	}
	public void setCompId(Long compId) {
		this.compId = compId;
	}
	public int getUserTypeId() {
		return userTypeId;
	}
	public void setUserTypeId(int userTypeId) {
		this.userTypeId = userTypeId;
	}
	public Date getCreatedDate() {
		return createdDate;
	}
	public void setCreatedDate(Date createdDate) {
		this.createdDate = createdDate;
	}
	public Long getRoleId() {
		return roleId;
	}
	public void setRoleId(Long roleId) {
		this.roleId = roleId;
	}
	public Long getEmpId() {
		return empId;
	}
	public void setEmpId(Long empId) {
		this.empId = empId;
	}
	public User(Long id, String userName, String password, Boolean isActive, Long compId, int userTypeId,
			Date createdDate, Long roleId, Long empId) {
		super();
		this.id = id;
		this.userName = userName;
		this.password = password;
		this.isActive = isActive;
		this.compId = compId;
		this.userTypeId = userTypeId;
		this.createdDate = createdDate;
		this.roleId = roleId;
		this.empId = empId;
	}
	public User() {
		
	}
	
	
}
