package com.boot.payroll.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.payroll.model.CentralMasterBillProcess;
import com.boot.payroll.repo.CentralMasterBillProcessRepo;
import com.boot.payroll.service.CentralMasterBillProcessService;
@Service
public class CentralMasterBillProcessImpl implements CentralMasterBillProcessService {
	@Autowired
	CentralMasterBillProcessRepo repos;
	public boolean saveCentralMasterBillProcess(CentralMasterBillProcess centralMasterBillProcess) {
		centralMasterBillProcess =repos.save(centralMasterBillProcess);
		boolean isSuccess = centralMasterBillProcess.getId()>1;
		return isSuccess;
	}

	
	public boolean updateCentralMasterBillProcess(CentralMasterBillProcess centralMasterBillProcess) {
		repos.save(centralMasterBillProcess);
		return true;
	}

	
	public boolean deleteByIdCentralMasterBillProcess(Long id) {
		repos.deleteById(id);
		return true;
	}

	
	public CentralMasterBillProcess getByIdCentralMasterBillProcess(Long id) {
		Optional<CentralMasterBillProcess> opt = repos.findById(id);
		if(opt.isPresent()) {
			return opt.get();
		}
		return null;
	}

	
	public List<CentralMasterBillProcess> getAllCentralMasterBillProcess() {
		return repos.findAll();
	}

}
