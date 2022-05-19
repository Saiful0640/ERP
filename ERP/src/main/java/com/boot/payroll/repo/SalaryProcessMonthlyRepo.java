package com.boot.payroll.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boot.payroll.model.SalaryProcessMonthly;

public interface SalaryProcessMonthlyRepo extends JpaRepository<SalaryProcessMonthly, Long> {

}
