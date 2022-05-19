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

import com.boot.hr.model.LeaveCategory;
import com.boot.hr.service.LeaveCategoryService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/basicEntry")
public class LeaveCategoryController {
	@Autowired
	LeaveCategoryService service;
	
	@PostMapping("/SaveLeaveCategory")
	public ResponseEntity<Boolean> SaveLeaveCategory(@RequestBody LeaveCategory leaveCategory){
		service.saveLeaveCategory(leaveCategory);
		return ResponseEntity.ok(true);
	}
	@PutMapping("/updateLeaveCategory")
	public ResponseEntity<Boolean> updateLeaveCategory(@RequestBody LeaveCategory leaveCategory){
		service.saveLeaveCategory(leaveCategory);
		return ResponseEntity.ok(true);
	}
	@DeleteMapping("/deleteLeaveCategory/{id}")
	public ResponseEntity<String> deleteLeaveCategory(@PathVariable Long id){
		service.deleteByIdLeaveCategory(id);
    	String message = "LeaveCategory Delete!"+id;
    	return ResponseEntity.ok(message);
    }
	@GetMapping("/getOneLeaveCategory/{id}")
    public ResponseEntity<LeaveCategory>getByIdLeaveCategory(@PathVariable Long id){
		LeaveCategory company = service.getByIdLeaveCategory(id);
    	return ResponseEntity.ok(company);
    }
	@GetMapping("/getAllLeaveCategory")
	public ResponseEntity<List<LeaveCategory>> getAllLeaveCategory(){
		List<LeaveCategory> list =service.getAllLeaveCategory();
		return ResponseEntity.ok(list);
	}
}
