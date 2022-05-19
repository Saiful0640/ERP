package com.boot.payroll.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.payroll.model.AssignCriteria;
import com.boot.payroll.model.CentBillPrepare;
import com.boot.payroll.repo.CentBillPrepareRepo;
import com.boot.payroll.service.CentBillPrepareService;

@Service
public class CentBillPrepareImpl implements CentBillPrepareService{
	@Autowired
	CentBillPrepareRepo repos;
	
	public boolean saveCentBillPrepare(CentBillPrepare centBillPrepare) {
		centBillPrepare =repos.save(centBillPrepare);
		boolean isSuccess = centBillPrepare.getId()>1;
		return isSuccess;
	}

	
	public boolean updateCentBillPrepare(CentBillPrepare CentBillPrepare) {
		repos.save(CentBillPrepare);
		return true;
	}

	
	public boolean deleteByIdCentBillPrepare(Long id) {
		repos.deleteById(id);
		return true;
	}

	
	public CentBillPrepare getByIdCentBillPrepare(Long id) {
		Optional<CentBillPrepare> opt = repos.findById(id);
		if(opt.isPresent()) {
			return opt.get();
		}
		return null;
	}

	
	public List<CentBillPrepare> getAllCentBillPrepare() {
		return repos.findAll();
	}

}
