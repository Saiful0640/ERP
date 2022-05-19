package com.boot.hr.service;

import java.util.List;

import com.boot.hr.model.HolidaySetup;


public interface HolidaySetupService {
	boolean saveHolidaySetup(HolidaySetup holidaySetup);
	boolean updateHolidaySetup(HolidaySetup holidaySetup);
	boolean deleteByIdHolidaySetup(Long id);
	HolidaySetup getByIdHolidaySetup(Long id);
	List<HolidaySetup> getAllHolidaySetup();
}
