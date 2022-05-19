package com.boot.hr.service;

import java.util.List;

import com.boot.hr.model.LeaveEntry;


public interface LeaveEntryService {
	boolean saveLeaveEntry(LeaveEntry leaveEntry);
	boolean updateLeaveEntry(LeaveEntry leaveEntry);
	boolean deleteByIdLeaveEntry(Long id);
	LeaveEntry getByIdLeaveEntry(Long id);
	List<LeaveEntry> getAllLeaveEntry();
}
