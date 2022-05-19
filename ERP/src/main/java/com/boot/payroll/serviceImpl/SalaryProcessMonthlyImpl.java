package com.boot.payroll.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.payroll.model.SalaryProcessMonthly;
import com.boot.payroll.repo.SalaryProcessMonthlyRepo;
import com.boot.payroll.service.SalaryProcessMonthlyService;
@Service
public class SalaryProcessMonthlyImpl implements SalaryProcessMonthlyService {
	@Autowired
	SalaryProcessMonthlyRepo repos;
	
	public boolean saveSalaryProcessMonthly(SalaryProcessMonthly SalaryProcessMonthly) {
		SalaryProcessMonthly =repos.save(SalaryProcessMonthly);
		boolean isSuccess = SalaryProcessMonthly.getId()>1;
		return isSuccess;
	}

	
	public boolean updateSalaryProcessMonthly(SalaryProcessMonthly salaryProcessMonthly) {
		repos.save(salaryProcessMonthly);
		return true;
	}

	
	public boolean deleteByIdSalaryProcessMonthly(Long id) {
		repos.deleteById(id);
		return true;
	}

	
	public SalaryProcessMonthly getByIdSalaryProcessMonthly(Long id) {
		Optional<SalaryProcessMonthly> opt = repos.findById(id);
		if(opt.isPresent()) {
			return opt.get();
		}
		return null;
	}

	
	public List<SalaryProcessMonthly> getAllSalaryProcessMonthly() {
		return repos.findAll();
	}

}
