package com.boot.hr.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.hr.model.EmploymentInfo;
import com.boot.hr.repo.EmploymentInfoRepo;
import com.boot.hr.service.EmploymentInfoService;
@Service
public class EmploymentInfoImpl implements EmploymentInfoService {
	@Autowired
	EmploymentInfoRepo repos;
	
	public boolean saveEmploymentInfo(EmploymentInfo employmentInfo) {
		employmentInfo =repos.save(employmentInfo);
		boolean isSuccess = employmentInfo.getId()>1;
		return isSuccess;
	}

	
	public boolean updateEmploymentInfo(EmploymentInfo employmentInfo) {
		repos.save(employmentInfo);
		return true;
	}

	
	public boolean deleteByIdEmploymentInfo(Long id) {
		repos.deleteById(id);
		return true;
	}

	
	public EmploymentInfo getByIdEmploymentInfo(Long id) {
		Optional<EmploymentInfo> opt =repos.findById(id);
		if(opt.isPresent()) {
			return opt.get();
		}
		return null;
	}

	
	public List<EmploymentInfo> getAllEmploymentInfo() {
		// TODO Auto-generated method stub
		return repos.findAll();
	}

}
