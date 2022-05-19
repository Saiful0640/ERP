package com.boot.superadmin.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.superadmin.model.Company;
import com.boot.superadmin.model.FinancialYear;
import com.boot.superadmin.repo.FinalcialYearRepo;
import com.boot.superadmin.service.FinancialYearService;
@Service
public class FinancialYearImpl implements FinancialYearService {
	@Autowired
	FinalcialYearRepo repos;
	
	public boolean savFinancialYear(FinancialYear financialYear) {
		financialYear =repos.save(financialYear);
		boolean isSuccess = financialYear.getId()>1;
		return isSuccess;
	}

	
	public boolean updatFinancialYear(FinancialYear financialYear) {
		repos.save(financialYear);
		return true;
	}

	
	public boolean deleteByIdFinancialYear(Long id) {
		repos.deleteById(id);
		return true;
	}

	
	public FinancialYear getByIdFinancialYeary(Long id) {
		Optional<FinancialYear> opt = repos.findById(id);
		if(opt.isPresent()) {
			return opt.get();
		}
		return null;
	}

	
	public List<FinancialYear> getAllFinancialYear() {
		// TODO Auto-generated method stub
		return repos.findAll();
	}

}
