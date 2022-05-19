package com.boot.accounting.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="currencyinfo")
public class CurrencyInfo {
	@Id
	@GeneratedValue(strategy =GenerationType.AUTO)
	private Long id;
	@Column(name="currencysign")
	private String currencySign;
	@Column(name="currencyname")
	private String currecnyName;
	@Column(name="ispredefined")
	private int isPredefined;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getCurrencySign() {
		return currencySign;
	}
	public void setCurrencySign(String currencySign) {
		this.currencySign = currencySign;
	}
	public String getCurrecnyName() {
		return currecnyName;
	}
	public void setCurrecnyName(String currecnyName) {
		this.currecnyName = currecnyName;
	}
	public int getIsPredefined() {
		return isPredefined;
	}
	public void setIsPredefined(int isPredefined) {
		this.isPredefined = isPredefined;
	}
	
}
