package com.boot.accounting.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.accounting.model.TransCostCenter;
import com.boot.accounting.repo.TransCostCenterRepo;
import com.boot.accounting.service.TransCostCenterService;
@Service
public class TransCostCenterImpn implements TransCostCenterService {

	@Autowired
	TransCostCenterRepo repos;
	public boolean saveTransCostCenter(TransCostCenter transCostCenter) {
		transCostCenter =repos.save(transCostCenter);
		boolean isSuccess = transCostCenter.getId()>1;
		return isSuccess;
	}

	
	public boolean updateTransCostCenter(TransCostCenter transCostCenter) {
		repos.save(transCostCenter);
		return true;
	}

	
	public boolean deleteByIdTransCostCenter(Long id) {
		repos.deleteById(id);
		return true;
	}

	
	public TransCostCenter getByIdTransCostCenter(Long id) {
		Optional<TransCostCenter> opt =repos.findById(id);
		if(opt.isPresent()) {
			return opt.get();
		}
		return null;
	}

	
	public List<TransCostCenter> getAllTransCostCenter() {
		return repos.findAll();
	}

}
