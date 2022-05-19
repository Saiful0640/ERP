package com.boot.payroll.service;

import java.util.List;

import com.boot.payroll.model.CommonSalaryProcess;


public interface CommonSalaryProcessService {
	boolean saveCommonSalaryProcess(CommonSalaryProcess commonSalaryProcess);
	boolean updateCommonSalaryProcess(CommonSalaryProcess commonSalaryProcess);
	boolean deleteByIdCommonSalaryProcess(Long id);
	CommonSalaryProcess getByIdCommonSalaryProcess(Long id);
	List<CommonSalaryProcess> getAllCommonSalaryProcess();
}
