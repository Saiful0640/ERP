package com.boot.hr.service;

import java.util.List;

import com.boot.hr.model.EmployeeGeneralInfo;


public interface EmployeeGeneralinfoService {
	boolean saveEmployeeGeneralInfo(EmployeeGeneralInfo empgeninfo);
	boolean updateEmployeeGeneralInfo(EmployeeGeneralInfo empgeninfo);
	boolean deleteByIdEmployeeGeneralInfo(Long id);
	EmployeeGeneralInfo getByIdEmployeeGeneralInfo(Long id);
	List<EmployeeGeneralInfo> getAllEmployeeGeneralInfo();
}
