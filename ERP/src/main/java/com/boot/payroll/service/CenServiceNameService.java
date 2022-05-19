package com.boot.payroll.service;

import java.util.List;

import com.boot.payroll.model.CenServiceName;


public interface CenServiceNameService {
	boolean saveCenServiceName(CenServiceName cenServiceName);
	boolean updateCenServiceName(CenServiceName cenServiceName);
	boolean deleteByIdCenServiceName(Long id);
	CenServiceName getByIdCenServiceName(Long id);
	List<CenServiceName> getAllCenServiceName();
}
