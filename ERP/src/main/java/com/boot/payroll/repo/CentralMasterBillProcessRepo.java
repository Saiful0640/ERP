package com.boot.payroll.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boot.payroll.model.CentralMasterBillProcess;

public interface CentralMasterBillProcessRepo extends JpaRepository<CentralMasterBillProcess, Long> {

}
