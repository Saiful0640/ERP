package com.boot.hr.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.boot.hr.model.Department;
import com.boot.hr.repo.DepartmentRepo;
import com.boot.hr.service.DepartmentService;
@Service
public class DepartmentImpl implements DepartmentService {
	@Autowired
	DepartmentRepo repos;
	
	public boolean saveDepartment(Department department) {
		department =repos.save(department);
		boolean isSuccess = department.getId()>1;
		return isSuccess;
	}

	
	public boolean updateDepartment(Department department) {
		repos.save(department);
		return true;
	}

	public boolean deleteByIdDepartment(Long id) {
		repos.deleteById(id);
		return true;
	}

	public Department getByIdDepartment(Long id) {
		Optional<Department> opt = repos.findById(id);
		if(opt.isPresent()) {
			return opt.get();
		}
		return null;
	}

	public List<Department> getAllDepartment() {
		return repos.findAll();
	}

}
