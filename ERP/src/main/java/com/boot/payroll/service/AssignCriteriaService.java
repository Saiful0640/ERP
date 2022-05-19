package com.boot.payroll.service;

import java.util.List;

import com.boot.payroll.model.AssignCriteria;


public interface AssignCriteriaService {
	boolean saveAssignCriteria(AssignCriteria assignCriteria);
	boolean updateAssignCriteria(AssignCriteria assignCriteria);
	boolean deleteByIdAssignCriteria(Long id);
	AssignCriteria getByIdAssignCriteria(Long id);
	List<AssignCriteria> getAllAssignCriteria();
}
