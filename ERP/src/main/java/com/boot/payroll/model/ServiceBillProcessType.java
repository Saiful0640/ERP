package com.boot.payroll.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="servicebillprocesstype")
public class ServiceBillProcessType {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column(name="processtypename")
	private String processTypeName;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getProcessTypeName() {
		return processTypeName;
	}
	public void setProcessTypeName(String processTypeName) {
		this.processTypeName = processTypeName;
	}
	public ServiceBillProcessType(long id, String processTypeName) {
		super();
		this.id = id;
		this.processTypeName = processTypeName;
	}
	public ServiceBillProcessType() {
		
	}
	
}
