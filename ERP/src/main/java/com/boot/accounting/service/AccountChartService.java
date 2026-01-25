package com.boot.accounting.service;

import java.util.List;

import com.boot.accounting.model.AccountChart;
import com.boot.accounting.model.AccountGroupType;
import com.boot.accounting.model.Branch;
import com.boot.accounting.model.CurrencyInfo;

public interface AccountChartService {
	AccountChart saveAccountChart(AccountChart accountChart);
	AccountChart updateAccountChart(AccountChart accountChart);
	boolean deleteByIdAccountChart(Long id);
	List<AccountChart> getAllAccountChart();
	List<Branch> getAllBranch();
	List<AccountGroupType> getAllAccountGroupType();
	List<CurrencyInfo> getAllCurrency();
}
