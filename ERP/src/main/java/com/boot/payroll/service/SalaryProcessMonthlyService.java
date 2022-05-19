package com.boot.payroll.service;

import java.util.List;

import com.boot.payroll.model.SalaryProcessMonthly;


public interface SalaryProcessMonthlyService {
	boolean saveSalaryProcessMonthly(SalaryProcessMonthly SalaryProcessMonthly);
	boolean updateSalaryProcessMonthly(SalaryProcessMonthly salaryProcessMonthly);
	boolean deleteByIdSalaryProcessMonthly(Long id);
	SalaryProcessMonthly getByIdSalaryProcessMonthly(Long id);
	List<SalaryProcessMonthly> getAllSalaryProcessMonthly();
}
