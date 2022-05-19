package com.boot.payroll.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boot.payroll.model.CommonSalaryProcess;

public interface CommonSalaryProcessRepo extends JpaRepository<CommonSalaryProcess, Long>{

}
