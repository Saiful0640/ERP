package com.boot.payroll.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.payroll.model.AssignCriteria;
import com.boot.payroll.model.CommonSalaryProcess;
import com.boot.payroll.repo.CommonSalaryProcessRepo;
import com.boot.payroll.service.CommonSalaryProcessService;

@Service
public class CommonSalaryProcessImpl implements CommonSalaryProcessService {
	@Autowired
	CommonSalaryProcessRepo repos;
	
	public boolean saveCommonSalaryProcess(CommonSalaryProcess commonSalaryProcess) {
		commonSalaryProcess =repos.save(commonSalaryProcess);
		boolean isSuccess = commonSalaryProcess.getId()>1;
		return isSuccess;
	}

	
	public boolean updateCommonSalaryProcess(CommonSalaryProcess commonSalaryProcess) {
		repos.save(commonSalaryProcess);
		return true;
	}

	
	public boolean deleteByIdCommonSalaryProcess(Long id) {
		repos.deleteById(id);
		return true;
	}

	
	public CommonSalaryProcess getByIdCommonSalaryProcess(Long id) {
		Optional<CommonSalaryProcess> opt = repos.findById(id);
		if(opt.isPresent()) {
			return opt.get();
		}
		return null;
	}

	
	public List<CommonSalaryProcess> getAllCommonSalaryProcess() {
		return repos.findAll();
	}
	
	
}
