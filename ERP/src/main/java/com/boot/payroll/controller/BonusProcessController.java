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

import com.boot.payroll.model.BonusProcess;
import com.boot.payroll.service.BonusProcessService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/payroll")
public class BonusProcessController {
	@Autowired
	BonusProcessService service;
	
	@PostMapping("/SaveBonusProcess")
	public ResponseEntity<Boolean> SaveBonusProcess(@RequestBody BonusProcess bonusProcess){
		service.saveBonusProcess(bonusProcess);
		return ResponseEntity.ok(true);
	}
	@PutMapping("/updateBonusProcess")
	public ResponseEntity<Boolean> updateBonusProcess(@RequestBody BonusProcess bonusProcess){
		service.saveBonusProcess(bonusProcess);
		return ResponseEntity.ok(true);
	}
	@DeleteMapping("/deleteBonusProcess/{id}")
	public ResponseEntity<String> deleteBonusProcess(@PathVariable Long id){
		service.deleteByIdBonusProcess(id);
    	String message = "BonusProcess Delete!"+id;
    	return ResponseEntity.ok(message);
    }
	@GetMapping("/getOneBonusProcess/{id}")
    public ResponseEntity<BonusProcess>getByIdBonusProcess(@PathVariable Long id){
		BonusProcess company = service.getByIdBonusProcess(id);
    	return ResponseEntity.ok(company);
    }
	@GetMapping("/getAllBonusProcess")
	public ResponseEntity<List<BonusProcess>> getAllBonusProcess(){
		List<BonusProcess> list =service.getAllBonusProcess();
		return ResponseEntity.ok(list);
	}
}
