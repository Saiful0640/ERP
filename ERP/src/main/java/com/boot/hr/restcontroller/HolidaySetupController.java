package com.boot.hr.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.boot.hr.model.HolidaySetup;
import com.boot.hr.model.HolidaySetupSP;
import com.boot.hr.repo.HolidaySetupSPDao;
import com.boot.hr.service.HolidaySetupService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/BasicEnty")
public class HolidaySetupController {
	@Autowired
	HolidaySetupService service;
	@Autowired
	private HolidaySetupSPDao dao;
	
	@PostMapping("/SaveHolidaySetup")
	public ResponseEntity<Boolean> SaveHolidaySetup(@RequestBody HolidaySetup holidaySetup){
		service.saveHolidaySetup(holidaySetup);
		return ResponseEntity.ok(true);
	}
	@PutMapping("/updateHolidaySetup")
	public ResponseEntity<Boolean> updateHolidaySetup(@RequestBody HolidaySetup holidaySetup){
		service.saveHolidaySetup(holidaySetup);
		return ResponseEntity.ok(true);
	}
	@DeleteMapping("/deleteHolidaySetup/{id}")
	public ResponseEntity<String> deleteHolidaySetup(@PathVariable Long id){
		service.deleteByIdHolidaySetup(id);
    	String message = "HolidaySetup Delete!"+id;
    	return ResponseEntity.ok(message);
    }
	@GetMapping("/getOneHolidaySetup/{id}")
    public ResponseEntity<HolidaySetup>getByIdHolidaySetup(@PathVariable Long id){
		HolidaySetup company = service.getByIdHolidaySetup(id);
    	return ResponseEntity.ok(company);
    }
	@GetMapping("/getallholiday/{hdate}")
	public ResponseEntity<List<HolidaySetupSP>> getHolidaySetupSP(@PathVariable String hdate) {
		List<HolidaySetupSP> list=dao.getHolidaySetupSP(hdate);
		return ResponseEntity.ok(list);
	}
}
