package com.boot.payroll.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.payroll.model.CenServiceName;
import com.boot.payroll.repo.CenServiceNameRepo;
import com.boot.payroll.service.CenServiceNameService;
@Service
public class CenServiceNameImpl implements CenServiceNameService {
	@Autowired
	CenServiceNameRepo repos;
	
	public boolean saveCenServiceName(CenServiceName cenServiceName) {
		cenServiceName =repos.save(cenServiceName);
		boolean isSuccess = cenServiceName.getId()>1;
		return isSuccess;
	}

	
	public boolean updateCenServiceName(CenServiceName cenServiceName) {
		repos.save(cenServiceName);
		return true;
	}

	
	public boolean deleteByIdCenServiceName(Long id) {
		repos.deleteById(id);
		return true;
	}

	
	public CenServiceName getByIdCenServiceName(Long id) {
		Optional<CenServiceName> opt = repos.findById(id);
		if(opt.isPresent()) {
			return opt.get();
		}
		return null;
	}

	
	public List<CenServiceName> getAllCenServiceName() {
		// TODO Auto-generated method stub
		return repos.findAll();
	}

}
