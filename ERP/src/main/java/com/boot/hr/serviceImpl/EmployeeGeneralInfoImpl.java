package com.boot.hr.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.hr.model.EmployeeGeneralInfo;
import com.boot.hr.repo.EmployeeGeneralinfoRepo;
import com.boot.hr.service.EmployeeGeneralinfoService;
@Service
public class EmployeeGeneralInfoImpl implements EmployeeGeneralinfoService {
	@Autowired
	EmployeeGeneralinfoRepo emprepo;
	public boolean saveEmployeeGeneralInfo(EmployeeGeneralInfo empgeninfo) {
		empgeninfo=emprepo.save(empgeninfo);
		boolean isSuccess = empgeninfo.getId()>1;
		return isSuccess;
	}

	
	public boolean updateEmployeeGeneralInfo(EmployeeGeneralInfo empgeninfo) {
		emprepo.save(empgeninfo);
		return true;
	}

	
	public boolean deleteByIdEmployeeGeneralInfo(Long id) {
		emprepo.deleteById(id);
		return true;
	}

	
	public EmployeeGeneralInfo getByIdEmployeeGeneralInfo(Long id) {
		Optional<EmployeeGeneralInfo> opt = emprepo.findById(id);
		if(opt.isPresent()) {
			return opt.get();
		}
		return null;
	}

	public List<EmployeeGeneralInfo> getAllEmployeeGeneralInfo() {
		return emprepo.findAll();
	}

}
