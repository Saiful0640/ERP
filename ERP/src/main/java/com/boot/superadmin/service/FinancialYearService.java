package com.boot.superadmin.service;

import java.util.List;

import com.boot.superadmin.model.FinancialYear;

public interface FinancialYearService {
	boolean savFinancialYear(FinancialYear financialYear);
	boolean updatFinancialYear(FinancialYear financialYear );
	boolean deleteByIdFinancialYear(Long id);
	FinancialYear getByIdFinancialYeary(Long id);
	List<FinancialYear> getAllFinancialYear();
}
