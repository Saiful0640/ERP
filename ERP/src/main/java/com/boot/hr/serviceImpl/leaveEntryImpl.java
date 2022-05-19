package com.boot.hr.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.hr.model.LeaveEntry;
import com.boot.hr.model.Section;
import com.boot.hr.repo.LeaveEntryRepo;
import com.boot.hr.service.LeaveEntryService;
@Service
public class leaveEntryImpl implements LeaveEntryService {
	@Autowired
	LeaveEntryRepo repos;
	
	public boolean saveLeaveEntry(LeaveEntry leaveEntry) {
		leaveEntry =repos.save(leaveEntry);
		boolean isSuccess = leaveEntry.getId()>1;
		return isSuccess;
	}

	
	public boolean updateLeaveEntry(LeaveEntry leaveEntry) {
		repos.save(leaveEntry);
		return true;
	}

	
	public boolean deleteByIdLeaveEntry(Long id) {
		repos.deleteById(id);
		return true;
	}

	
	public LeaveEntry getByIdLeaveEntry(Long id) {
		Optional<LeaveEntry> opt = repos.findById(id);
		if(opt.isPresent()) {
			return opt.get();
		}
		return null;
	}

	
	public List<LeaveEntry> getAllLeaveEntry() {
		return repos.findAll();
	}

}
