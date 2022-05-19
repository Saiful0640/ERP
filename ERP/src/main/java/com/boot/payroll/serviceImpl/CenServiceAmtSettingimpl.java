package com.boot.payroll.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.payroll.model.CenServiceAmtSetting;
import com.boot.payroll.repo.CenServiceamtsettingRepo;
import com.boot.payroll.service.CenServiceAmtSettingService;
@Service
public class CenServiceAmtSettingimpl implements CenServiceAmtSettingService {

	@Autowired
	CenServiceamtsettingRepo repos;
	public boolean saveCenServiceAmtSetting(CenServiceAmtSetting cenServiceAmtSetting) {
		cenServiceAmtSetting =repos.save(cenServiceAmtSetting);
		boolean isSuccess = cenServiceAmtSetting.getId()>1;
		return isSuccess;
	}

	
	public boolean updateCenServiceAmtSetting(CenServiceAmtSetting cenServiceAmtSetting) {
		repos.save(cenServiceAmtSetting);
		return true;
	}

	
	public boolean deleteByIdCenServiceAmtSetting(Long id) {
		repos.deleteById(id);
		return true;
	}

	
	public CenServiceAmtSetting getByIdCenServiceAmtSetting(Long id) {
		Optional<CenServiceAmtSetting> opt = repos.findById(id);
		if(opt.isPresent()) {
			return opt.get();
		}
		return null;
	}

	
	public List<CenServiceAmtSetting> getAllCenServiceAmtSetting() {
		// TODO Auto-generated method stub
		return repos.findAll();
	}

}
