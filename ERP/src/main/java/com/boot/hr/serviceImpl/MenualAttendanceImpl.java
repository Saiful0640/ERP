package com.boot.hr.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.hr.model.Department;
import com.boot.hr.model.MenualAttendance;
import com.boot.hr.repo.MenualAttendanceRepo;
import com.boot.hr.service.MenualAttendanceService;

@Service
public class MenualAttendanceImpl implements MenualAttendanceService {
	@Autowired
	MenualAttendanceRepo repos;
	
	public boolean saveMenualAttendance(MenualAttendance menualAttendance) {
		menualAttendance =repos.save(menualAttendance);
		boolean isSuccess = menualAttendance.getId()>1;
		return isSuccess;
	}

	
	public boolean updateMenualAttendance(MenualAttendance menualAttendance) {
		repos.save(menualAttendance);
		return true;
	}

	
	public boolean deleteByIdMenualAttendance(Long id) {
		repos.deleteById(id);
		return true;
	}

	
	public MenualAttendance getByIdMenualAttendance(Long id) {
		Optional<MenualAttendance> opt = repos.findById(id);
		if(opt.isPresent()) {
			return opt.get();
		}
		return null;
	}

	
	public List<MenualAttendance> getAllMenualAttendancep() {
		// TODO Auto-generated method stub
		return repos.findAll();
	}

}
