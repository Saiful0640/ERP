package com.boot.hr.service;

import java.util.List;

import com.boot.hr.model.EmploymentInfo;


public interface EmploymentInfoService {
	boolean saveEmploymentInfo(EmploymentInfo employmentInfo);
	boolean updateEmploymentInfo(EmploymentInfo employmentInfo);
	boolean deleteByIdEmploymentInfo(Long id);
	EmploymentInfo getByIdEmploymentInfo(Long id);
	List<EmploymentInfo> getAllEmploymentInfo();
}
