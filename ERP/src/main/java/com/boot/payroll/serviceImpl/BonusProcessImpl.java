package com.boot.payroll.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.payroll.model.BonusProcess;
import com.boot.payroll.repo.BonusProcessRepo;
import com.boot.payroll.service.BonusProcessService;
@Service
public class BonusProcessImpl implements BonusProcessService {
	@Autowired
	BonusProcessRepo repos;

	
	public boolean saveBonusProcess(BonusProcess bonusProcess) {
		bonusProcess =repos.save(bonusProcess);
		boolean isSuccess = bonusProcess.getId()>1;
		return isSuccess;
	}

	
	public boolean updateBonusProcess(BonusProcess bonusProcess) {
		repos.save(bonusProcess);
		return true;
	}

	
	public boolean deleteByIdBonusProcess(Long id) {
		repos.deleteById(id);
		return true;
	}

	
	public BonusProcess getByIdBonusProcess(Long id) {
		Optional<BonusProcess> opt = repos.findById(id);
		if(opt.isPresent()) {
			return opt.get();
		}
		return null;
	}

	
	public List<BonusProcess> getAllBonusProcess() {
		return repos.findAll();
	}

	
	
	
}
