package com.boot.accounting.restcontroller;

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

import com.boot.accounting.model.CriteriaDetails;
import com.boot.accounting.model.TransMasterAcc;
import com.boot.accounting.service.CriteriaDetailsService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/basicEntry")
public class CriteriaDetailsController {
	@Autowired
	CriteriaDetailsService service;
	@PostMapping("/SaveCriteriaDetails")
	public ResponseEntity<Boolean> SaveCriteriaDetails(@RequestBody CriteriaDetails criteriaDetails){
		service.saveCriteriaDetails(criteriaDetails);
		return ResponseEntity.ok(true);
	}
	@PutMapping("/updateCriteriaDetails")
	public ResponseEntity<Boolean> updateCriteriaDetails(@RequestBody CriteriaDetails criteriaDetails){
		service.saveCriteriaDetails(criteriaDetails);
		return ResponseEntity.ok(true);
	}
	@DeleteMapping("/deleteCriteriaDetails/{id}")
	public ResponseEntity<String> deleteCriteriaDetails(@PathVariable Long id){
		service.deleteByIdCriteriaDetails(id);
    	String message = "CriteriaDetails Delete!"+id;
    	return ResponseEntity.ok(message);
    }
	@GetMapping("/getOneCriteriaDetails/{id}")
    public ResponseEntity<CriteriaDetails>getByIdCriteriaDetails(@PathVariable Long id){
		CriteriaDetails company = service.getByIdCriteriaDetails(id);
    	return ResponseEntity.ok(company);
    }
	@GetMapping("/getAllCriteriaDetails")
	public ResponseEntity<List<CriteriaDetails>> getAllCriteriaDetails(){
		List<CriteriaDetails> list =service.getAllCriteriaDetails();
		return ResponseEntity.ok(list);
	}
}
