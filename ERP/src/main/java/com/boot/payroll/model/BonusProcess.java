package com.boot.payroll.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="bonusprocess")
public class BonusProcess {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	@Column(name="compid")
	private long compID;
	@Column(name="moduleid")
	private long ModuleID;
	@Column(name="periodid")
	private long periodID;
	@Column(name="groupid")
	private long groupID;
	@Column(name="sectionid")
	private long sectionID;
	@Column(name="bonusid")
	private long bonusID;
	@Column(name="entrydate")
	private String entryDate;
	@Column(name="empcode")
	private String empCode;
	@Column(name="empname")
	private String empName;
	@Column(name="designationid")
	private long designationID;
	@Column(name="departmentid")
	private long departmentID;
	@Column(name="joingdate")
	private String joingDate;
	@Column(name="serviceperiod")
	private String servicePeriod;
	@Column(name="grosssalary")
	private Double grossSalary;
	@Column(name="percentage")
	private Double percentage;
	@Column(name="bonuseamount")
	private Double bonuseAmount;
	@Column(name="stampamount")
	private Double stampAmount;
	@Column(name="netpayment")
	private Double netPayment;
	@Column(name="remarks")
	private String remarks;
	@Column(name="narration")
	private String narration;
	public long getId() {
		return id;
	}
	public void setId(long id) {
		this.id = id;
	}
	public long getCompID() {
		return compID;
	}
	public void setCompID(long compID) {
		this.compID = compID;
	}
	public long getModuleID() {
		return ModuleID;
	}
	public void setModuleID(long moduleID) {
		ModuleID = moduleID;
	}
	public long getPeriodID() {
		return periodID;
	}
	public void setPeriodID(long periodID) {
		this.periodID = periodID;
	}
	public long getGroupID() {
		return groupID;
	}
	public void setGroupID(long groupID) {
		this.groupID = groupID;
	}
	public long getSectionID() {
		return sectionID;
	}
	public void setSectionID(long sectionID) {
		this.sectionID = sectionID;
	}
	public long getBonusID() {
		return bonusID;
	}
	public void setBonusID(long bonusID) {
		this.bonusID = bonusID;
	}
	public String getEntryDate() {
		return entryDate;
	}
	public void setEntryDate(String entryDate) {
		this.entryDate = entryDate;
	}
	public String getEmpCode() {
		return empCode;
	}
	public void setEmpCode(String empCode) {
		this.empCode = empCode;
	}
	public String getEmpName() {
		return empName;
	}
	public void setEmpName(String empName) {
		this.empName = empName;
	}
	public long getDesignationID() {
		return designationID;
	}
	public void setDesignationID(long designationID) {
		this.designationID = designationID;
	}
	public long getDepartmentID() {
		return departmentID;
	}
	public void setDepartmentID(long departmentID) {
		this.departmentID = departmentID;
	}
	public String getJoingDate() {
		return joingDate;
	}
	public void setJoingDate(String joingDate) {
		this.joingDate = joingDate;
	}
	public String getServicePeriod() {
		return servicePeriod;
	}
	public void setServicePeriod(String servicePeriod) {
		this.servicePeriod = servicePeriod;
	}
	public Double getGrossSalary() {
		return grossSalary;
	}
	public void setGrossSalary(Double grossSalary) {
		this.grossSalary = grossSalary;
	}
	public Double getPercentage() {
		return percentage;
	}
	public void setPercentage(Double percentage) {
		this.percentage = percentage;
	}
	public Double getBonuseAmount() {
		return bonuseAmount;
	}
	public void setBonuseAmount(Double bonuseAmount) {
		this.bonuseAmount = bonuseAmount;
	}
	public Double getStampAmount() {
		return stampAmount;
	}
	public void setStampAmount(Double stampAmount) {
		this.stampAmount = stampAmount;
	}
	public Double getNetPayment() {
		return netPayment;
	}
	public void setNetPayment(Double netPayment) {
		this.netPayment = netPayment;
	}
	public String getRemarks() {
		return remarks;
	}
	public void setRemarks(String remarks) {
		this.remarks = remarks;
	}
	public String getNarration() {
		return narration;
	}
	public void setNarration(String narration) {
		this.narration = narration;
	}
	public BonusProcess(long id, long compID, long moduleID, long periodID, long groupID, long sectionID, long bonusID,
			String entryDate, String empCode, String empName, long designationID, long departmentID, String joingDate,
			String servicePeriod, Double grossSalary, Double percentage, Double bonuseAmount, Double stampAmount,
			Double netPayment, String remarks, String narration) {
		super();
		this.id = id;
		this.compID = compID;
		ModuleID = moduleID;
		this.periodID = periodID;
		this.groupID = groupID;
		this.sectionID = sectionID;
		this.bonusID = bonusID;
		this.entryDate = entryDate;
		this.empCode = empCode;
		this.empName = empName;
		this.designationID = designationID;
		this.departmentID = departmentID;
		this.joingDate = joingDate;
		this.servicePeriod = servicePeriod;
		this.grossSalary = grossSalary;
		this.percentage = percentage;
		this.bonuseAmount = bonuseAmount;
		this.stampAmount = stampAmount;
		this.netPayment = netPayment;
		this.remarks = remarks;
		this.narration = narration;
	}
	public BonusProcess() {
		
	}
	
}
