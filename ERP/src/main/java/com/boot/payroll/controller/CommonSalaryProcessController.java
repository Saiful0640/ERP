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

import com.boot.payroll.model.CommonSalaryProcess;
import com.boot.payroll.service.CommonSalaryProcessService;

@CrossOrigin(origins ="http://localhost:4200")
@RestController
@RequestMapping("/payroll")
public class CommonSalaryProcessController {
	@Autowired
	CommonSalaryProcessService service;
	@PostMapping("/SaveCommonSalaryProcess")
	public ResponseEntity<Boolean> SaveCommonSalaryProcess(@RequestBody CommonSalaryProcess commonSalaryProcess){
		service.saveCommonSalaryProcess(commonSalaryProcess);
		return ResponseEntity.ok(true);
	}
	@PutMapping("/updateCommonSalaryProcess")
	public ResponseEntity<Boolean> updateCommonSalaryProcess(@RequestBody CommonSalaryProcess commonSalaryProcess){
		service.saveCommonSalaryProcess(commonSalaryProcess);
		return ResponseEntity.ok(true);
	}
	@DeleteMapping("/deleteCommonSalaryProcess/{id}")
	public ResponseEntity<String> deleteCommonSalaryProcess(@PathVariable Long id){
		service.deleteByIdCommonSalaryProcess(id);
    	String message = "CommonSalaryProcess Delete!"+id;
    	return ResponseEntity.ok(message);
    }
	@GetMapping("/getOneCommonSalaryProcess/{id}")
    public ResponseEntity<CommonSalaryProcess>getByIdCommonSalaryProcess(@PathVariable Long id){
		CommonSalaryProcess company = service.getByIdCommonSalaryProcess(id);
    	return ResponseEntity.ok(company);
    }
	@GetMapping("/getAllCommonSalaryProcess")
	public ResponseEntity<List<CommonSalaryProcess>> getAllCommonSalaryProcess(){
		List<CommonSalaryProcess> list =service.getAllCommonSalaryProcess();
		return ResponseEntity.ok(list);
	}
	
}
