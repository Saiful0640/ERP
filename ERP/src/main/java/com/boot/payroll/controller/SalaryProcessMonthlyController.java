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

import com.boot.payroll.model.SalaryProcessMonthly;
import com.boot.payroll.service.SalaryProcessMonthlyService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/payroll")
public class SalaryProcessMonthlyController {
	@Autowired
	SalaryProcessMonthlyService service;
	@PostMapping("/SaveSalaryProcessMonthly")
	public ResponseEntity<Boolean> SaveSalaryProcessMonthly(@RequestBody SalaryProcessMonthly salaryProcessMonthly){
		service.saveSalaryProcessMonthly(salaryProcessMonthly);
		return ResponseEntity.ok(true);
	}
	@PutMapping("/updateSalaryProcessMonthly")
	public ResponseEntity<Boolean> updateSalaryProcessMonthly(@RequestBody SalaryProcessMonthly salaryProcessMonthly){
		service.saveSalaryProcessMonthly(salaryProcessMonthly);
		return ResponseEntity.ok(true);
	}
	@DeleteMapping("/deleteSalaryProcessMonthly/{id}")
	public ResponseEntity<String> deleteSalaryProcessMonthly(@PathVariable Long id){
		service.deleteByIdSalaryProcessMonthly(id);
    	String message = "SalaryProcessMonthly Delete!"+id;
    	return ResponseEntity.ok(message);
    }
	@GetMapping("/getOneSalaryProcessMonthly/{id}")
    public ResponseEntity<SalaryProcessMonthly>getByIdSalaryProcessMonthly(@PathVariable Long id){
		SalaryProcessMonthly company = service.getByIdSalaryProcessMonthly(id);
    	return ResponseEntity.ok(company);
    }
	@GetMapping("/getAllSalaryProcessMonthly")
	public ResponseEntity<List<SalaryProcessMonthly>> getAllSalaryProcessMonthly(){
		List<SalaryProcessMonthly> list =service.getAllSalaryProcessMonthly();
		return ResponseEntity.ok(list);
	}
}
