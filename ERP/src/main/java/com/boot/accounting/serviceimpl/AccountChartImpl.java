package com.boot.accounting.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.accounting.model.AccountChart;
import com.boot.accounting.model.AccountGroupType;
import com.boot.accounting.model.Branch;
import com.boot.accounting.model.CurrencyInfo;
import com.boot.accounting.repo.AccountChartRepo;
import com.boot.accounting.repo.AccountGroupTypeRepo;
import com.boot.accounting.repo.BranchRepo;
import com.boot.accounting.repo.CurrencyInfoRepo;
import com.boot.accounting.service.AccountChartService;
@Service
public class AccountChartImpl implements AccountChartService {
	@Autowired
	AccountChartRepo accountchartrepo;
	@Autowired
	BranchRepo branchrepo;
	@Autowired
	AccountGroupTypeRepo accountgrouptyperepo;
	@Autowired
	CurrencyInfoRepo currencyinforepo;
	
	public boolean saveAccountChart(AccountChart accountchart) {
		 accountchart = accountchartrepo.save(accountchart);
		boolean isSuccess= accountchart.getId()>1;
		 return isSuccess;
	}

	
	public boolean updateAccountChart(AccountChart accountchart) {
		accountchartrepo.save(accountchart);
		return true;
	}

	
	public boolean deleteByIdAccountChart(Long id) {
		accountchartrepo.deleteById(id);
		return true;
	}

	
	public List<AccountChart> getAllAccountChart() {
		
		return accountchartrepo.findAll();
	}

	
	public List<Branch> getAllBranch() {
		return branchrepo.findAll();
	}

	
	public List<AccountGroupType> getAllAccountGroupType() {
		return accountgrouptyperepo.findAll();
	}

	public List<CurrencyInfo> getAllCurrency() {
		
		return currencyinforepo.findAll();
	}

}
