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

import com.boot.payroll.model.EnrolmentDetails;
import com.boot.payroll.service.EnrolmentDetailsService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/payroll")
public class EnrolmentDetailsController {
	@Autowired
	EnrolmentDetailsService service;
	
	@PostMapping("/SaveEnrolmentDetails")
	public ResponseEntity<Boolean> SaveEnrolmentDetails(@RequestBody EnrolmentDetails enrolmentDetails){
		service.saveEnrolmentDetails(enrolmentDetails);
		return ResponseEntity.ok(true);
	}
	@PutMapping("/updateEnrolmentDetails")
	public ResponseEntity<Boolean> updateEnrolmentDetails(@RequestBody EnrolmentDetails enrolmentDetails){
		service.saveEnrolmentDetails(enrolmentDetails);
		return ResponseEntity.ok(true);
	}
	@DeleteMapping("/deleteEnrolmentDetails/{id}")
	public ResponseEntity<String> deleteEnrolmentDetails(@PathVariable Long id){
		service.deleteByIdEnrolmentDetails(id);
    	String message = "EnrolmentDetails Delete!"+id;
    	return ResponseEntity.ok(message);
    }
	@GetMapping("/getOneEnrolmentDetails/{id}")
    public ResponseEntity<EnrolmentDetails>getByIdEnrolmentDetails(@PathVariable Long id){
		EnrolmentDetails company = service.getByIdEnrolmentDetails(id);
    	return ResponseEntity.ok(company);
    }
	@GetMapping("/getAllEnrolmentDetails")
	public ResponseEntity<List<EnrolmentDetails>> getAllEnrolmentDetails(){
		List<EnrolmentDetails> list =service.getAllEnrolmentDetails();
		return ResponseEntity.ok(list);
	}
}
