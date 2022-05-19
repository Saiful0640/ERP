package com.boot.hr.service;

import java.util.List;

import com.boot.hr.model.BloodGroup;
import com.boot.hr.model.District;
import com.boot.hr.model.Gender;
import com.boot.hr.model.MaritalStatus;
import com.boot.hr.model.Religion;
import com.boot.hr.model.Thana;
import com.boot.hr.model.Upazila;

public interface EmployeeCommonService {
	List<Gender> getAllGender();
	List<BloodGroup> getAllBloodGroup();
	List<Religion> getAllReligion();
	List<MaritalStatus> getAllMaritalStatus();
	List<Thana> getAllThana();
	List<Upazila> getAllUpazila();
	List<District> getAllDistrict();
}
