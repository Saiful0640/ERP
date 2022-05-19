package com.boot.hr.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.hr.model.GroupType;
import com.boot.hr.repo.GroupTypeRepo;
import com.boot.hr.service.GroupTypeService;
@Service
public class GroupTypeImpl implements GroupTypeService{
	@Autowired
	GroupTypeRepo repos;
	
	public boolean saveGroupType(GroupType groupType) {
		groupType =repos.save(groupType);
		boolean isSuccess = groupType.getId()>1;
		return isSuccess;
	}

	
	public boolean updateGroupType(GroupType groupType) {
		repos.save(groupType);
		return true;
	}

	
	public boolean deleteByIdGroupType(Long id) {
		repos.deleteById(id);
		return false;
	}

	
	public GroupType getByIdGroupType(Long id) {
		Optional<GroupType> opt = repos.findById(id);
		if(opt.isPresent()) {
			return opt.get();
		}
		return null;
	}

	
	public List<GroupType> getAllGroupType() {
		return repos.findAll();
	}

}
