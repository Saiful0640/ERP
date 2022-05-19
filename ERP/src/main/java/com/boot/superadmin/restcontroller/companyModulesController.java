package com.boot.superadmin.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.boot.superadmin.model.CompanyModules;
import com.boot.superadmin.service.CompanyModulesService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/settings")
public class companyModulesController {
	@Autowired
	CompanyModulesService comservice;
	@PostMapping("/SaveCompanyModules")
	public ResponseEntity<Boolean> SaveCompanyModules(@RequestBody CompanyModules companyModules){
		comservice.saveCompanyModules(companyModules);
		return ResponseEntity.ok(true);
	}
	@PutMapping("/updateCompanyModules")
	public ResponseEntity<Boolean> updateCompanyModules(@RequestBody CompanyModules companyModules){
		comservice.saveCompanyModules(companyModules);
		return ResponseEntity.ok(true);
	}
	@GetMapping("/getAllCompanyModules")
	public ResponseEntity<List<CompanyModules>> getAllCompanyModules(){
		List<CompanyModules> list =comservice.getAllCompanyModules();
		return ResponseEntity.ok(list);
	}
	
}
