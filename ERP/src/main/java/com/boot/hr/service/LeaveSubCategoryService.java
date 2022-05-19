package com.boot.hr.service;

import java.util.List;

import com.boot.hr.model.LeaveSubCategory;


public interface LeaveSubCategoryService {
	boolean saveLeaveSubCategory(LeaveSubCategory leaveSubCategory);
	boolean updateLeaveSubCategory(LeaveSubCategory leaveSubCategory);
	boolean deleteByIdLeaveSubCategory(Long id);
	LeaveSubCategory getByIdLeaveSubCategory(Long id);
	List<LeaveSubCategory> getAllleaveSubCategory();
}
