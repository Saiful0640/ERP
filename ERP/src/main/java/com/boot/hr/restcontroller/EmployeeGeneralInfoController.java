package com.boot.hr.restcontroller;

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

import com.boot.hr.model.EmployeeGeneralInfo;
import com.boot.hr.service.EmployeeGeneralinfoService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/employeeGeneral")
public class EmployeeGeneralInfoController {
	@Autowired
	EmployeeGeneralinfoService empgenservice;
	
	@PostMapping("/saveempGenInfo")
	public ResponseEntity<Boolean> saveEmployeeGeneralInfo(@RequestBody EmployeeGeneralInfo empgeninfo){
		empgenservice.saveEmployeeGeneralInfo(empgeninfo);
		return ResponseEntity.ok(true);
	}
	@PutMapping("/updateempGenInfo")
	public ResponseEntity<Boolean> updateEmployeeGeneralInfo(@RequestBody EmployeeGeneralInfo empgeninfo){
		empgenservice.saveEmployeeGeneralInfo(empgeninfo);
		return ResponseEntity.ok(true);
	}
	@DeleteMapping("/deleteempGenInfo/{id}")
	public ResponseEntity<String> deleteEmployeeGeneralInfo(@PathVariable Long id){
		empgenservice.deleteByIdEmployeeGeneralInfo(id);
    	String message = "employee Delete!"+id;
    	return ResponseEntity.ok(message);
    }
	@GetMapping("/getOneempGenInfo/{id}")
    public ResponseEntity<EmployeeGeneralInfo>getByIdEmployeeGeneralInfo(@PathVariable Long id){
		EmployeeGeneralInfo empgeninfo = empgenservice.getByIdEmployeeGeneralInfo(id);
    	return ResponseEntity.ok(empgeninfo);
    }
	@GetMapping("/getAllempGenInfo")
	public ResponseEntity<List<EmployeeGeneralInfo>> getAllEmployeeGeneralInfo(){
		List<EmployeeGeneralInfo> list =empgenservice.getAllEmployeeGeneralInfo();
		return ResponseEntity.ok(list);
	}
}
