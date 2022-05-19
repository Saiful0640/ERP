package com.boot.payroll.service;

import java.util.List;

import com.boot.payroll.model.CentralMasterBillProcess;


public interface CentralMasterBillProcessService {
	boolean saveCentralMasterBillProcess(CentralMasterBillProcess centralMasterBillProcess);
	boolean updateCentralMasterBillProcess(CentralMasterBillProcess centralMasterBillProcess);
	boolean deleteByIdCentralMasterBillProcess(Long id);
	CentralMasterBillProcess getByIdCentralMasterBillProcess(Long id);
	List<CentralMasterBillProcess> getAllCentralMasterBillProcess();
}
