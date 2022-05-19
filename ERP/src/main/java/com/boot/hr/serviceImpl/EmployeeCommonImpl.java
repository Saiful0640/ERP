package com.boot.hr.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.hr.model.BloodGroup;
import com.boot.hr.model.District;
import com.boot.hr.model.Gender;
import com.boot.hr.model.MaritalStatus;
import com.boot.hr.model.Religion;
import com.boot.hr.model.Thana;
import com.boot.hr.model.Upazila;
import com.boot.hr.repo.BloodGroupRepo;
import com.boot.hr.repo.DistrictRepo;
import com.boot.hr.repo.GenderRepo;
import com.boot.hr.repo.MaritalStatusRepo;
import com.boot.hr.repo.ReligionRepo;
import com.boot.hr.repo.ThanaRepo;
import com.boot.hr.repo.UpzilaRepo;
import com.boot.hr.service.EmployeeCommonService;

@Service
public class EmployeeCommonImpl implements EmployeeCommonService {
	@Autowired
	GenderRepo genderrepo;
	@Autowired
	BloodGroupRepo bloodgrouprepo;
	@Autowired
	ReligionRepo religionrepo;
	@Autowired
	MaritalStatusRepo maritalrepo;
	@Autowired
	ThanaRepo thanarepo;
	@Autowired
	UpzilaRepo upzilarepo;
	@Autowired
	DistrictRepo districtrepo;
	
	public List<Gender> getAllGender() {
		return genderrepo.findAll();
	}
	public List<BloodGroup> getAllBloodGroup() {
		return bloodgrouprepo.findAll();
	}
	public List<Religion> getAllReligion() {
		return religionrepo.findAll();
	}
	public List<MaritalStatus> getAllMaritalStatus() {
		return maritalrepo.findAll();
	}
	public List<Thana> getAllThana() {
		return thanarepo.findAll();
	}
	public List<Upazila> getAllUpazila() {
		return upzilarepo.findAll();
	}
	public List<District> getAllDistrict() {
		return districtrepo.findAll();
	}
}
