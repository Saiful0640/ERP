package com.boot.hr.service;

import java.util.List;

import com.boot.hr.model.Department;

public interface DepartmentService {
	boolean saveDepartment(Department department);
	boolean updateDepartment(Department department);
	boolean deleteByIdDepartment(Long id);
	Department getByIdDepartment(Long id);
	List<Department> getAllDepartment();
}
