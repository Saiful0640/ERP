package com.boot.hr.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.hr.model.HolidaySetup;
import com.boot.hr.repo.HolidaySetupRepo;
import com.boot.hr.service.HolidaySetupService;
@Service
public class HolidaySetupImpl implements HolidaySetupService {
	@Autowired
	HolidaySetupRepo repos;
	
	public boolean saveHolidaySetup(HolidaySetup holidaySetup) {
		holidaySetup =repos.save(holidaySetup);
		boolean isSuccess = holidaySetup.getId()>1;
		return isSuccess;
	}

	
	public boolean updateHolidaySetup(HolidaySetup holidaySetup) {
		repos.save(holidaySetup);
		return true;
	}

	
	public boolean deleteByIdHolidaySetup(Long id) {
		repos.deleteById(id);
		return true;
	}

	
	public HolidaySetup getByIdHolidaySetup(Long id) {
		Optional<HolidaySetup> opt =repos.findById(id);
		if(opt.isPresent()) {
			return opt.get();
		}
		return null;
	}

	
	public List<HolidaySetup> getAllHolidaySetup() {
		// TODO Auto-generated method stub
		return repos.findAll();
	}

}
