package com.boot.hr.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.boot.hr.dao.GetThanaallinfoDao;
import com.boot.hr.model.BloodGroup;
import com.boot.hr.model.District;
import com.boot.hr.model.Gender;
import com.boot.hr.model.GetThanaallinfo;
import com.boot.hr.model.MaritalStatus;
import com.boot.hr.model.Religion;
import com.boot.hr.model.Thana;
import com.boot.hr.model.Upazila;
import com.boot.hr.service.EmployeeCommonService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/settings")
public class EmployeeCommonController {
	@Autowired
	EmployeeCommonService service;
	@Autowired
	GetThanaallinfoDao dao;
	
	@GetMapping("/getAllGender")
	public ResponseEntity<List<Gender>> getAllGender(){
		List<Gender> list =service.getAllGender();
		return ResponseEntity.ok(list);
	}
	@GetMapping("/getAllBloodGroup")
	public ResponseEntity<List<BloodGroup>> getAllBloodGroup(){
		List<BloodGroup> list =service.getAllBloodGroup();
		return ResponseEntity.ok(list);
	}
	@GetMapping("/getAllReligion")
	public ResponseEntity<List<Religion>> getAllReligion(){
		List<Religion> list =service.getAllReligion();
		return ResponseEntity.ok(list);
	}
	@GetMapping("/getAllMaritalStatus")
	public ResponseEntity<List<MaritalStatus>> getAllMaritalStatus(){
		List<MaritalStatus> list =service.getAllMaritalStatus();
		return ResponseEntity.ok(list);
	}
	@GetMapping("/GetThanaallinfo")
	public ResponseEntity<List<GetThanaallinfo>> getAllThana(){
		List<GetThanaallinfo> list =dao.getGetThanaallinfo();
		return ResponseEntity.ok(list);
	}
//	@GetMapping("/getAllUpzila")
//	public ResponseEntity<List<Upazila>> getAllUpzila(){
//		List<Upazila> list =service.getAllUpazila();
//		return ResponseEntity.ok(list);
//	}
//	@GetMapping("/getAllDistrict")
//	public ResponseEntity<List<District>> getAllDistrict(){
//		List<District> list =service.getAllDistrict();
//		return ResponseEntity.ok(list);
//	}
}
