package com.boot.hr.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.hr.model.LeaveCategory;
import com.boot.hr.model.LeaveEntry;
import com.boot.hr.repo.LeaveCategoryRepo;
import com.boot.hr.service.LeaveCategoryService;

@Service
public class LeaveCategoryImpl implements LeaveCategoryService {
	@Autowired
	LeaveCategoryRepo repos;
	
	public boolean saveLeaveCategory(LeaveCategory leaveCategory) {
		leaveCategory =repos.save(leaveCategory);
		boolean isSuccess = leaveCategory.getId()>1;
		return isSuccess;
	}

	
	public boolean updateLeaveCategory(LeaveCategory leaveCategory) {
		repos.save(leaveCategory);
		return true;
	}

	
	public boolean deleteByIdLeaveCategory(Long id) {
		repos.deleteById(id);
		return true;
	}

	
	public LeaveCategory getByIdLeaveCategory(Long id) {
		Optional<LeaveCategory> opt = repos.findById(id);
		if(opt.isPresent()) {
			return opt.get();
		}
		return null;
	}

	
	public List<LeaveCategory> getAllLeaveCategory() {
		return repos.findAll();
	}

}
