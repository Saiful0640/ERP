package com.boot.hr.service;

import java.util.List;

import com.boot.hr.model.MenualAttendance;

public interface MenualAttendanceService {
	boolean saveMenualAttendance(MenualAttendance menualAttendance);
	boolean updateMenualAttendance(MenualAttendance menualAttendance);
	boolean deleteByIdMenualAttendance(Long id);
	MenualAttendance getByIdMenualAttendance(Long id);
	List<MenualAttendance> getAllMenualAttendancep();
}
