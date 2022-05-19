package com.boot.hr.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.hr.model.LeaveType;
import com.boot.hr.repo.LeaveTypeRepo;
import com.boot.hr.service.LeaveTypeService;
@Service
public class LeaveTypeImpl implements LeaveTypeService {
	@Autowired
	LeaveTypeRepo repos;
	
	public boolean saveLeaveType(LeaveType leaveType) {
		leaveType =repos.save(leaveType);
		boolean isSuccess = leaveType.getId()>1;
		return isSuccess;
	}

	
	public boolean updateLeaveType(LeaveType leaveType) {
		repos.save(leaveType);
		return true;
	}

	
	public boolean deleteByIdLeaveType(Long id) {
		repos.deleteById(id);
		return true;
	}

	
	public LeaveType getByIdLeaveType(Long id) {
		Optional<LeaveType> opt = repos.findById(id);
		if(opt.isPresent()) {
			return opt.get();
		}
		return null;
	}

	
	public List<LeaveType> getAllLeaveType() {
		return repos.findAll();
	}

}
