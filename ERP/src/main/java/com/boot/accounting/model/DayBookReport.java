package com.boot.accounting.model;

import javax.persistence.Entity;

import javax.persistence.NamedStoredProcedureQueries;
import javax.persistence.NamedStoredProcedureQuery;
import javax.persistence.ParameterMode;
import javax.persistence.StoredProcedureParameter;


import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table
@NamedStoredProcedureQueries({@NamedStoredProcedureQuery(name = "daybookrepot", procedureName = "daybook_report", parameters = {
			@StoredProcedureParameter(mode = ParameterMode.IN, name = "startdate", type = String.class),@StoredProcedureParameter(mode = ParameterMode.IN, name = "enddate", type = String.class),@StoredProcedureParameter(mode = ParameterMode.IN, name = "vouchertype", type = String.class),@StoredProcedureParameter(mode = ParameterMode.IN, name = "accountid", type = Long.class) },resultClasses = DayBookReport.class) })

public class DayBookReport {
	@Id
	private Long transid;
	private String voucherdate;
	private int voucherno;
	private String refno;
	private String vouchertype;
	private String accountname;
	private String refaccountname;
	private Double totalamount;
	private String narration;
	private int transtype;
	private Long accountid;
	private String formatevoucherno;
	public Long getTransid() {
		return transid;
	}
	public void setTransid(Long transid) {
		this.transid = transid;
	}
	public String getVoucherdate() {
		return voucherdate;
	}
	public void setVoucherdate(String voucherdate) {
		this.voucherdate = voucherdate;
	}
	public int getVoucherno() {
		return voucherno;
	}
	public void setVoucherno(int voucherno) {
		this.voucherno = voucherno;
	}
	public String getRefno() {
		return refno;
	}
	public void setRefno(String refno) {
		this.refno = refno;
	}
	public String getVouchertype() {
		return vouchertype;
	}
	public void setVouchertype(String vouchertype) {
		this.vouchertype = vouchertype;
	}
	public String getAccountname() {
		return accountname;
	}
	public void setAccountname(String accountname) {
		this.accountname = accountname;
	}
	public String getRefaccountname() {
		return refaccountname;
	}
	public void setRefaccountname(String refaccountname) {
		this.refaccountname = refaccountname;
	}
	public Double getTotalamount() {
		return totalamount;
	}
	public void setTotalamount(Double totalamount) {
		this.totalamount = totalamount;
	}
	public String getNarration() {
		return narration;
	}
	public void setNarration(String narration) {
		this.narration = narration;
	}
	public int getTranstype() {
		return transtype;
	}
	public void setTranstype(int transtype) {
		this.transtype = transtype;
	}
	public Long getAccountid() {
		return accountid;
	}
	public void setAccountid(Long accountid) {
		this.accountid = accountid;
	}
	public String getFormatevoucherno() {
		return formatevoucherno;
	}
	public void setFormatevoucherno(String formatevoucherno) {
		this.formatevoucherno = formatevoucherno;
	}
	
		
}
