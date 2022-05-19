package com.boot.hr.service;

import java.util.List;

import com.boot.hr.model.LeaveType;


public interface LeaveTypeService {
	boolean saveLeaveType(LeaveType leaveType);
	boolean updateLeaveType(LeaveType leaveType);
	boolean deleteByIdLeaveType(Long id);
	LeaveType getByIdLeaveType(Long id);
	List<LeaveType> getAllLeaveType();
}
