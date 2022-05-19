package com.boot.payroll.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="centralmasterbillprocess")
public class CentralMasterBillProcess {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column(name="issuedate")
	private String issueDate;
	@Column(name="lastpaymentdate")
	private String lastPaymentDate;
	@Column(name="fiveserchargedate")
	private String fiveSerChargeDate;
	@Column(name="tenserchargedate")
	private String tenSerChargeDate;
	@Column(name="compid")
	private long compId;
	@Column(name="moduleid")
	private long moduleId;
	@Column(name="periodid")
	private long periodId;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public String getIssueDate() {
		return issueDate;
	}
	public void setIssueDate(String issueDate) {
		this.issueDate = issueDate;
	}
	public String getLastPaymentDate() {
		return lastPaymentDate;
	}
	public void setLastPaymentDate(String lastPaymentDate) {
		this.lastPaymentDate = lastPaymentDate;
	}
	public String getFiveSerChargeDate() {
		return fiveSerChargeDate;
	}
	public void setFiveSerChargeDate(String fiveSerChargeDate) {
		this.fiveSerChargeDate = fiveSerChargeDate;
	}
	public String getTenSerChargeDate() {
		return tenSerChargeDate;
	}
	public void setTenSerChargeDate(String tenSerChargeDate) {
		this.tenSerChargeDate = tenSerChargeDate;
	}
	public long getCompId() {
		return compId;
	}
	public void setCompId(long compId) {
		this.compId = compId;
	}
	public long getModuleId() {
		return moduleId;
	}
	public void setModuleId(long moduleId) {
		this.moduleId = moduleId;
	}
	public long getPeriodId() {
		return periodId;
	}
	public void setPeriodId(long periodId) {
		this.periodId = periodId;
	}
	public CentralMasterBillProcess(long id, String issueDate, String lastPaymentDate, String fiveSerChargeDate,
			String tenSerChargeDate, long compId, long moduleId, long periodId) {
		super();
		this.id = id;
		this.issueDate = issueDate;
		this.lastPaymentDate = lastPaymentDate;
		this.fiveSerChargeDate = fiveSerChargeDate;
		this.tenSerChargeDate = tenSerChargeDate;
		this.compId = compId;
		this.moduleId = moduleId;
		this.periodId = periodId;
	}
	public CentralMasterBillProcess() {
		
	}
	
}
