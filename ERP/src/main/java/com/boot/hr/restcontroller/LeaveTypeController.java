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

import com.boot.hr.model.LeaveType;
import com.boot.hr.service.LeaveTypeService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/leaveType")
public class LeaveTypeController {
	@Autowired
	LeaveTypeService service;
	
	@PostMapping("/SaveLeaveType")
	public ResponseEntity<Boolean> SaveLeaveType(@RequestBody LeaveType leaveType){
		service.saveLeaveType(leaveType);
		return ResponseEntity.ok(true);
	}
	@PutMapping("/updateLeaveType")
	public ResponseEntity<Boolean> updateLeaveType(@RequestBody LeaveType leaveType){
		service.saveLeaveType(leaveType);
		return ResponseEntity.ok(true);
	}
	@DeleteMapping("/deleteLeaveType/{id}")
	public ResponseEntity<String> deleteLeaveType(@PathVariable Long id){
		service.deleteByIdLeaveType(id);
    	String message = "LeaveType Delete!"+id;
    	return ResponseEntity.ok(message);
    }
	@GetMapping("/getOneLeaveType/{id}")
    public ResponseEntity<LeaveType>getByIdLeaveType(@PathVariable Long id){
		LeaveType company = service.getByIdLeaveType(id);
    	return ResponseEntity.ok(company);
    }
	@GetMapping("/getAllLeaveType")
	public ResponseEntity<List<LeaveType>> getAllLeaveType(){
		List<LeaveType> list =service.getAllLeaveType();
		return ResponseEntity.ok(list);
	}
}
