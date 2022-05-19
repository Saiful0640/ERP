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
import com.boot.hr.model.Department;
import com.boot.hr.service.DepartmentService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/BasicEnty")
public class DepartmentController {
	@Autowired
	DepartmentService service;
	@PostMapping("/SaveDepartment")
	public ResponseEntity<Boolean> SaveDepartment(@RequestBody Department department){
		service.saveDepartment(department);
		return ResponseEntity.ok(true);
	}
	@PutMapping("/updateDepartment")
	public ResponseEntity<Boolean> updateDepartment(@RequestBody Department department){
		service.saveDepartment(department);
		return ResponseEntity.ok(true);
	}
	@DeleteMapping("/deleteDepartment/{id}")
	public ResponseEntity<String> deleteDepartment(@PathVariable Long id){
		service.deleteByIdDepartment(id);
    	String message = "Department Delete!"+id;
    	return ResponseEntity.ok(message);
    }
	@GetMapping("/getOneDepartment/{id}")
    public ResponseEntity<Department>getByIdDepartment(@PathVariable Long id){
		Department company = service.getByIdDepartment(id);
    	return ResponseEntity.ok(company);
    }
	@GetMapping("/getAllDepartment")
	public ResponseEntity<List<Department>> getAllDepartment(){
		List<Department> list =service.getAllDepartment();
		return ResponseEntity.ok(list);
	}
}
