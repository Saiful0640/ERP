package com.boot.hr.service;

import java.util.List;

import com.boot.hr.model.GroupType;

public interface GroupTypeService {
	boolean saveGroupType(GroupType groupType);
	boolean updateGroupType(GroupType groupType);
	boolean deleteByIdGroupType(Long id);
	GroupType getByIdGroupType(Long id);
	List<GroupType> getAllGroupType();
}
