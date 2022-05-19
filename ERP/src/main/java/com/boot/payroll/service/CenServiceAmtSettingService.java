package com.boot.payroll.service;

import java.util.List;

import com.boot.payroll.model.CenServiceAmtSetting;


public interface CenServiceAmtSettingService {
	boolean saveCenServiceAmtSetting(CenServiceAmtSetting cenServiceAmtSetting);
	boolean updateCenServiceAmtSetting(CenServiceAmtSetting cenServiceAmtSetting);
	boolean deleteByIdCenServiceAmtSetting(Long id);
	CenServiceAmtSetting getByIdCenServiceAmtSetting(Long id);
	List<CenServiceAmtSetting> getAllCenServiceAmtSetting();
}
