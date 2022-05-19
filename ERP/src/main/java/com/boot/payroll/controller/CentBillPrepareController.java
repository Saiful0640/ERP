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

import com.boot.payroll.model.CentBillPrepare;
import com.boot.payroll.service.CentBillPrepareService;

@CrossOrigin(origins ="http://localhost:4200")
@RestController
@RequestMapping("/payroll")
public class CentBillPrepareController {
	@Autowired
	CentBillPrepareService service;
	
	@PostMapping("/SaveCentBillPrepare")
	public ResponseEntity<Boolean> SaveCentBillPrepare(@RequestBody CentBillPrepare centBillPrepare){
		service.saveCentBillPrepare(centBillPrepare);
		return ResponseEntity.ok(true);
	}
	@PutMapping("/updateCentBillPrepare")
	public ResponseEntity<Boolean> updateCentBillPrepare(@RequestBody CentBillPrepare centBillPrepare){
		service.saveCentBillPrepare(centBillPrepare);
		return ResponseEntity.ok(true);
	}
	@DeleteMapping("/deleteCentBillPrepare/{id}")
	public ResponseEntity<String> deleteCentBillPrepare(@PathVariable Long id){
		service.deleteByIdCentBillPrepare(id);
    	String message = "CentBillPrepare Delete!"+id;
    	return ResponseEntity.ok(message);
    }
	@GetMapping("/getOneCentBillPrepare/{id}")
    public ResponseEntity<CentBillPrepare>getByIdCentBillPrepare(@PathVariable Long id){
		CentBillPrepare company = service.getByIdCentBillPrepare(id);
    	return ResponseEntity.ok(company);
    }
	@GetMapping("/getCentBillPrepare")
	public ResponseEntity<List<CentBillPrepare>> getAllCentBillPrepare(){
		List<CentBillPrepare> list =service.getAllCentBillPrepare();
		return ResponseEntity.ok(list);
	}
}
