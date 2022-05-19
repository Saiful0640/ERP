package com.boot.payroll.controller;

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

import com.boot.payroll.model.CenServiceName;
import com.boot.payroll.service.CenServiceNameService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/centerServiceName")
public class CenServiceNameController {
	@Autowired
	CenServiceNameService service;
	@PostMapping("/SaveCenServiceName")
	public ResponseEntity<Boolean> SaveCenServiceName(@RequestBody CenServiceName cenServiceName){
		service.saveCenServiceName(cenServiceName);
		return ResponseEntity.ok(true);
	}
	@PutMapping("/updateCenServiceName")
	public ResponseEntity<Boolean> updateCenServiceName(@RequestBody CenServiceName cenServiceName){
		service.saveCenServiceName(cenServiceName);
		return ResponseEntity.ok(true);
	}
	@DeleteMapping("/deleteCenServiceName/{id}")
	public ResponseEntity<String> deleteCenServiceName(@PathVariable Long id){
		service.deleteByIdCenServiceName(id);
    	String message = "CenServiceName Delete!"+id;
    	return ResponseEntity.ok(message);
    }
	@GetMapping("/getOneCenServiceName/{id}")
    public ResponseEntity<CenServiceName>getByIdCenServiceName(@PathVariable Long id){
		CenServiceName company = service.getByIdCenServiceName(id);
    	return ResponseEntity.ok(company);
    }
	@GetMapping("/getAllCenServiceName")
	public ResponseEntity<List<CenServiceName>> getAllCenServiceName(){
		List<CenServiceName> list =service.getAllCenServiceName();
		return ResponseEntity.ok(list);
	}
}
