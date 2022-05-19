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
import com.boot.hr.model.Designation;
import com.boot.hr.service.DesignationService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/BasicEnty")
public class DesignationController {
	@Autowired
	DesignationService service;
	
	@PostMapping("/SaveDesignation")
	public ResponseEntity<Boolean> SaveDesignation(@RequestBody Designation designation){
		service.saveDesignation(designation);
		return ResponseEntity.ok(true);
	}
	@PutMapping("/updateDesignation")
	public ResponseEntity<Boolean> updateDepartment(@RequestBody Designation designation){
		service.saveDesignation(designation);
		return ResponseEntity.ok(true);
	}
	@DeleteMapping("/deleteDesignation/{id}")
	public ResponseEntity<String> deleteDesignation(@PathVariable Long id){
		service.deleteByIdDesignation(id);
    	String message = "Designation Delete!"+id;
    	return ResponseEntity.ok(message);
    }
	@GetMapping("/getOneDesignation/{id}")
    public ResponseEntity<Designation>getByIdDesignation(@PathVariable Long id){
		Designation company = service.getByIdDesignation(id);
    	return ResponseEntity.ok(company);
    }
	@GetMapping("/getAllDesignation")
	public ResponseEntity<List<Designation>> getAllDesignation(){
		List<Designation> list =service.getAllDesignation();
		return ResponseEntity.ok(list);
	}
}
