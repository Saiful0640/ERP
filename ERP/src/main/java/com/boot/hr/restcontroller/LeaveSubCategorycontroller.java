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

import com.boot.hr.model.LeaveSubCategory;
import com.boot.hr.service.LeaveSubCategoryService;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/leaveType")
public class LeaveSubCategorycontroller {
	@Autowired
	LeaveSubCategoryService service;
	
	@PostMapping("/SaveLeaveSubCategory")
	public ResponseEntity<Boolean> SaveLeaveSubCategory(@RequestBody LeaveSubCategory leaveSubCategory){
		service.saveLeaveSubCategory(leaveSubCategory);
		return ResponseEntity.ok(true);
	}
	@PutMapping("/updateLeaveSubCategory")
	public ResponseEntity<Boolean> updateLeaveSubCategory(@RequestBody LeaveSubCategory leaveSubCategory){
		service.saveLeaveSubCategory(leaveSubCategory);
		return ResponseEntity.ok(true);
	}
	@DeleteMapping("/deleteLeaveSubCategory/{id}")
	public ResponseEntity<String> deleteLeaveSubCategory(@PathVariable Long id){
		service.deleteByIdLeaveSubCategory(id);
    	String message = "LeaveSubCategory Delete!"+id;
    	return ResponseEntity.ok(message);
    }
	@GetMapping("/getOneLeaveSubCategory/{id}")
    public ResponseEntity<LeaveSubCategory>getByIdLeaveSubCategory(@PathVariable Long id){
		LeaveSubCategory company = service.getByIdLeaveSubCategory(id);
    	return ResponseEntity.ok(company);
    }
	@GetMapping("/getAllLeaveSubCategory")
	public ResponseEntity<List<LeaveSubCategory>> getAllLeaveSubCategory(){
		List<LeaveSubCategory> list =service.getAllleaveSubCategory();
		return ResponseEntity.ok(list);
	}
}
