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

import com.boot.accounting.service.PeriodService;
import com.boot.hr.model.Period;

@CrossOrigin(origins ="http://localhost:4200")
@RestController
@RequestMapping("/basicEntry")
public class PeriodController {
	@Autowired
	PeriodService service;
	
	@PostMapping("/savePeriod")
	public ResponseEntity<Boolean> SavePeriod(@RequestBody Period period){
		service.savePeriod(period);
		return ResponseEntity.ok(true);
	}
	@PutMapping("/updatePeriod")
	public ResponseEntity<Boolean> updatePeriod(@RequestBody Period period){
		service.savePeriod(period);
		return ResponseEntity.ok(true);
	}
	@DeleteMapping("/deletePeriod/{id}")
	public ResponseEntity<String> deletePeriod(@PathVariable Long id){
		service.deleteByIdPeriod(id);
    	String message = "Period Delete!"+id;
    	return ResponseEntity.ok(message);
    }
	@GetMapping("/getOnePeriod/{id}")
    public ResponseEntity<Period>getByIdPeriod(@PathVariable Long id){
		Period company = service.getByIdPeriod(id);
    	return ResponseEntity.ok(company);
    }
	@GetMapping("/getAllPeriod")
	public ResponseEntity<List<Period>> getAllPeriod(){
		List<Period> list =service.getAllPeriod();
		return ResponseEntity.ok(list);
	}
}
