package com.boot.hr.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.hr.model.LeaveSubCategory;
import com.boot.hr.model.Section;
import com.boot.hr.repo.LeaveSubCategoryRepo;
import com.boot.hr.service.LeaveSubCategoryService;
@Service
public class leaveSubCategoryImpl implements LeaveSubCategoryService {
	@Autowired
	LeaveSubCategoryRepo repos;
	
	public boolean saveLeaveSubCategory(LeaveSubCategory leaveSubCategory) {
		leaveSubCategory =repos.save(leaveSubCategory);
		boolean isSuccess = leaveSubCategory.getId()>1;
		return isSuccess;
	}

	
	public boolean updateLeaveSubCategory(LeaveSubCategory leaveSubCategory) {
		repos.save(leaveSubCategory);
		return true;
	}

	
	public boolean deleteByIdLeaveSubCategory(Long id) {
		repos.deleteById(id);
		return true;
	}

	
	public LeaveSubCategory getByIdLeaveSubCategory(Long id) {
		Optional<LeaveSubCategory> opt = repos.findById(id);
		if(opt.isPresent()) {
			return opt.get();
		}
		return null;
	}

	
	public List<LeaveSubCategory> getAllleaveSubCategory() {
		return repos.findAll();
	}

}
