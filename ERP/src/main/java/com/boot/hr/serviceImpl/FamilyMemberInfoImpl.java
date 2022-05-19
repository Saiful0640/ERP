package com.boot.hr.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.hr.model.FamilyMemberInfo;
import com.boot.hr.model.Nationality;
import com.boot.hr.model.Occupation;
import com.boot.hr.repo.FamilyMemberInfoRepo;
import com.boot.hr.repo.NationalityRepo;
import com.boot.hr.repo.OccupationRepo;
import com.boot.hr.service.FamilyMemberInfoService;
@Service
public class FamilyMemberInfoImpl implements FamilyMemberInfoService {
	@Autowired
	FamilyMemberInfoRepo repos;
	@Autowired
	NationalityRepo nationalrepos;
	@Autowired
	OccupationRepo occupationrepos;
	
	public boolean saveFamilyMemberInfo(FamilyMemberInfo familyMemberInfo) {
		familyMemberInfo =repos.save(familyMemberInfo);
		boolean isSuccess = familyMemberInfo.getId()>1;
		return isSuccess;
	}

	
	public boolean updateFamilyMemberInfo(FamilyMemberInfo familyMemberInfo) {
		repos.save(familyMemberInfo);
		return true;
	}

	
	public boolean deleteByIdFamilyMemberInfo(Long id) {
		repos.deleteById(id);
		return true;
	}

	
	public FamilyMemberInfo getByIdFamilyMemberInfo(Long id) {
		Optional<FamilyMemberInfo> opt =repos.findById(id);
		if(opt.isPresent()) {
			return opt.get();
		}
		return null;
	}

	
	public List<FamilyMemberInfo> getAllFamilyMemberInfo() {
		// TODO Auto-generated method stub
		return repos.findAll();
	}


	
	public List<Nationality> getAllNationality() {
		// TODO Auto-generated method stub
		return nationalrepos.findAll();
	}


	
	public List<Occupation> getAllOccupation() {
		// TODO Auto-generated method stub
		return occupationrepos.findAll();
	}

}
