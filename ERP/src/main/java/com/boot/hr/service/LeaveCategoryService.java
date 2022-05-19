package com.boot.hr.service;

import java.util.List;

import com.boot.hr.model.LeaveCategory;


public interface LeaveCategoryService {
	boolean saveLeaveCategory(LeaveCategory leaveCategory);
	boolean updateLeaveCategory(LeaveCategory leaveCategory);
	boolean deleteByIdLeaveCategory(Long id);
	LeaveCategory getByIdLeaveCategory(Long id);
	List<LeaveCategory> getAllLeaveCategory();
}
