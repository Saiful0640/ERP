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
import com.boot.payroll.model.CentralMasterBillProcess;
import com.boot.payroll.service.CentralMasterBillProcessService;

@CrossOrigin(origins ="http://localhost:4200")
@RestController
@RequestMapping("/payroll")
public class CentralMasterBillProcessController {
	@Autowired
	CentralMasterBillProcessService service;
	@PostMapping("/SaveCentralMasterBillProcess")
	public ResponseEntity<Boolean> SaveCentralMasterBillProcess(@RequestBody CentralMasterBillProcess centralMasterBillProcess){
		service.saveCentralMasterBillProcess(centralMasterBillProcess);
		return ResponseEntity.ok(true);
	}
	@PutMapping("/updateCentralMasterBillProcess")
	public ResponseEntity<Boolean> updateCentralMasterBillProcess(@RequestBody CentralMasterBillProcess centralMasterBillProcess){
		service.saveCentralMasterBillProcess(centralMasterBillProcess);
		return ResponseEntity.ok(true);
	}
	@DeleteMapping("/deleteCentralMasterBillProcess/{id}")
	public ResponseEntity<String> deleteCentralMasterBillProcess(@PathVariable Long id){
		service.deleteByIdCentralMasterBillProcess(id);
    	String message = "CentralMasterBillProcess Delete!"+id;
    	return ResponseEntity.ok(message);
    }
	@GetMapping("/getOneCentralMasterBillProcess/{id}")
    public ResponseEntity<CentralMasterBillProcess>getByIdCentralMasterBillProcess(@PathVariable Long id){
		CentralMasterBillProcess company = service.getByIdCentralMasterBillProcess(id);
    	return ResponseEntity.ok(company);
    }
	@GetMapping("/getAllCentralMasterBillProcess")
	public ResponseEntity<List<CentralMasterBillProcess>> getAllCentralMasterBillProcess(){
		List<CentralMasterBillProcess> list =service.getAllCentralMasterBillProcess();
		return ResponseEntity.ok(list);
	}
}
