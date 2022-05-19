package com.boot.accounting.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.boot.accounting.model.CriteriaCenter;
import com.boot.accounting.service.CriteriaCenterService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/basicEntry")
public class CriteriaCenterController {
	@Autowired
	CriteriaCenterService service;
	@GetMapping("/getAllCriteriaCenter")
	public ResponseEntity<List<CriteriaCenter>> getAllCriteriaCenter(){
		List<CriteriaCenter> list =service.getAllCriteriaCenter();
		return ResponseEntity.ok(list);
	}
}
