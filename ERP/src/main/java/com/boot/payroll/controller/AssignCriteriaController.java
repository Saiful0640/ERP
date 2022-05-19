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

import com.boot.payroll.model.AssignCriteria;
import com.boot.payroll.service.AssignCriteriaService;

@CrossOrigin(origins ="http://localhost:4200")
@RestController
@RequestMapping("/payroll")
public class AssignCriteriaController {
	@Autowired
	AssignCriteriaService service;
	@PostMapping("/SaveAssignCriteria")
	public ResponseEntity<Boolean> SaveAssignCriteria(@RequestBody AssignCriteria assignCriteria){
		service.saveAssignCriteria(assignCriteria);
		return ResponseEntity.ok(true);
	}
	@PutMapping("/updateAssignCriteria")
	public ResponseEntity<Boolean> updateAssignCriteria(@RequestBody AssignCriteria assignCriteria){
		service.saveAssignCriteria(assignCriteria);
		return ResponseEntity.ok(true);
	}
	@DeleteMapping("/deleteAssignCriteria/{id}")
	public ResponseEntity<String> deleteAssignCriteria(@PathVariable Long id){
		service.deleteByIdAssignCriteria(id);
    	String message = "AssignCriteria Delete!"+id;
    	return ResponseEntity.ok(message);
    }
	@GetMapping("/getOneAssignCriteria/{id}")
    public ResponseEntity<AssignCriteria>getByIdAssignCriteria(@PathVariable Long id){
		AssignCriteria company = service.getByIdAssignCriteria(id);
    	return ResponseEntity.ok(company);
    }
	@GetMapping("/getAllAssignCriteria")
	public ResponseEntity<List<AssignCriteria>> getAllAssignCriteria(){
		List<AssignCriteria> list =service.getAllAssignCriteria();
		return ResponseEntity.ok(list);
	}
}
