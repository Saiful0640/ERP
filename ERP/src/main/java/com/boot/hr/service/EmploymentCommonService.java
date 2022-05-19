package com.boot.hr.service;

import java.util.List;

import com.boot.hr.model.ActionType;
import com.boot.hr.model.EmpType;
import com.boot.hr.model.Location;


public interface EmploymentCommonService {
	List<ActionType> getAllActionType();
	List<EmpType> getAllEmpType();
	List<Location> getAllLocation();
}
