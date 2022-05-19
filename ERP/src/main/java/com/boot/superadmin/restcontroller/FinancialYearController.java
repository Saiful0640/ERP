package com.boot.superadmin.restcontroller;

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

import com.boot.superadmin.model.FinancialYear;
import com.boot.superadmin.service.FinancialYearService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/settings")
public class FinancialYearController {
	@Autowired
	FinancialYearService service;
	@PostMapping("/SaveFinancialYear")
	public ResponseEntity<Boolean> SaveFinancialYear(@RequestBody FinancialYear financialYear){
		service.savFinancialYear(financialYear);
		return ResponseEntity.ok(true);
	}
	@PutMapping("/updateFinancialYear")
	public ResponseEntity<Boolean> updateFinancialYear(@RequestBody FinancialYear FinancialYear){
		service.savFinancialYear(FinancialYear);
		return ResponseEntity.ok(true);
	}
	@DeleteMapping("/deleteeFinancialYear/{id}")
	public ResponseEntity<String>  deleteFinancialYear(@PathVariable Long id){
		service.deleteByIdFinancialYear(id);
    	String message = "FinancialYear Delete!"+id;
    	return ResponseEntity.ok(message);
    }
	@GetMapping("/getOneFinancialYear/{id}")
    public ResponseEntity<FinancialYear>getByIdFinancialYear(@PathVariable Long id){
    	FinancialYear company = service.getByIdFinancialYeary(id);
    	return ResponseEntity.ok(company);
    }
	@GetMapping("/getAllFinancialYear")
	public ResponseEntity<List<FinancialYear>> getAllFinancialYear(){
		List<FinancialYear> list =service.getAllFinancialYear();
		return ResponseEntity.ok(list);
	}
}
