package com.boot.payroll.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.payroll.model.AssignCriteria;
import com.boot.payroll.model.CenServiceName;
import com.boot.payroll.repo.AssignCriteriaRepo;
import com.boot.payroll.service.AssignCriteriaService;

@Service
public class AssignCriteriaImpl implements AssignCriteriaService{
	@Autowired
	AssignCriteriaRepo repos;
	
	public boolean saveAssignCriteria(AssignCriteria assignCriteria) {
		assignCriteria =repos.save(assignCriteria);
		boolean isSuccess = assignCriteria.getId()>1;
		return isSuccess;
	}

	
	public boolean updateAssignCriteria(AssignCriteria assignCriteria) {
		repos.save(assignCriteria);
		return true;
	}

	
	public boolean deleteByIdAssignCriteria(Long id) {
		repos.deleteById(id);
		return true;
	}

	
	public AssignCriteria getByIdAssignCriteria(Long id) {
		Optional<AssignCriteria> opt = repos.findById(id);
		if(opt.isPresent()) {
			return opt.get();
		}
		return null;
	}

	
	public List<AssignCriteria> getAllAssignCriteria() {
		return repos.findAll();
	}

}
