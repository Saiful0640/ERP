package com.boot.payroll.service;

import java.util.List;

import com.boot.payroll.model.BonusProcess;

public interface BonusProcessService {
	boolean saveBonusProcess(BonusProcess bonusProcess);
	boolean updateBonusProcess(BonusProcess bonusProcess);
	boolean deleteByIdBonusProcess(Long id);
	BonusProcess getByIdBonusProcess(Long id);
	List<BonusProcess> getAllBonusProcess();
}
