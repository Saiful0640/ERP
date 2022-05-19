package com.boot.hr.service;

import java.util.List;

import com.boot.hr.model.FamilyMemberInfo;
import com.boot.hr.model.Nationality;
import com.boot.hr.model.Occupation;

public interface FamilyMemberInfoService {
	boolean saveFamilyMemberInfo(FamilyMemberInfo familyMemberInfo);
	boolean updateFamilyMemberInfo(FamilyMemberInfo familyMemberInfo);
	boolean deleteByIdFamilyMemberInfo(Long id);
	FamilyMemberInfo getByIdFamilyMemberInfo(Long id);
	List<FamilyMemberInfo> getAllFamilyMemberInfo();
	List<Nationality> getAllNationality();
	List<Occupation> getAllOccupation();
}
