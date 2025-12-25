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
	private AccountChartRepo accountChartRepo;
	@Autowired
	private BranchRepo branchRepo;
	@Autowired
	private AccountGroupTypeRepo accountGroupTypeRepo;
	@Autowired
	private CurrencyInfoRepo currencyInfoRepo;

	@Override
	public AccountChart saveAccountChart(AccountChart accountChart) {
		return accountChartRepo.save(accountChart);
	}

	@Override
	public AccountChart updateAccountChart(AccountChart accountChart) {
		return accountChartRepo.save(accountChart);
	}

	@Override
	public boolean deleteByIdAccountChart(Long id) {
		accountChartRepo.deleteById(id);
		return true;
	}

	@Override
	public List<AccountChart> getAllAccountChart() {
		return accountChartRepo.findAll();
	}

	@Override
	public List<Branch> getAllBranch() {
		return branchRepo.findAll();
	}

	@Override
	public List<AccountGroupType> getAllAccountGroupType() {
		return accountGroupTypeRepo.findAll();
	}

	@Override
	public List<CurrencyInfo> getAllCurrency() {
		return currencyInfoRepo.findAll();
	}
}
