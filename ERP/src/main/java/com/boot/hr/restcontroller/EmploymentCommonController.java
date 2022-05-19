package com.boot.hr.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.boot.hr.model.ActionType;
import com.boot.hr.model.EmpType;
import com.boot.hr.model.Location;
import com.boot.hr.service.EmploymentCommonService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/BasicEnty")
public class EmploymentCommonController {
	@Autowired
	EmploymentCommonService service;
	@GetMapping("/getAllActionType")
	public ResponseEntity<List<ActionType>> getAllActionType(){
		List<ActionType> list =service.getAllActionType();
		return ResponseEntity.ok(list);
	}
	@GetMapping("/getAllEmpType")
	public ResponseEntity<List<EmpType>> getAllEmpType(){
		List<EmpType> list =service.getAllEmpType();
		return ResponseEntity.ok(list);
	}
	@GetMapping("/getAllLocation")
	public ResponseEntity<List<Location>> getAllLocation(){
		List<Location> list =service.getAllLocation();
		return ResponseEntity.ok(list);
	}
}
