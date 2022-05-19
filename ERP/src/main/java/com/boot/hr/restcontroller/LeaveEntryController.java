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

import com.boot.hr.model.LeaveEntry;
import com.boot.hr.service.LeaveEntryService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/basicEntry")
public class LeaveEntryController {
	@Autowired
	LeaveEntryService service;
	
	@PostMapping("/SaveLeaveEntry")
	public ResponseEntity<Boolean> SaveLeaveEntry(@RequestBody LeaveEntry leaveEntry){
		service.saveLeaveEntry(leaveEntry);
		return ResponseEntity.ok(true);
	}
	@PutMapping("/updateLeaveEntry")
	public ResponseEntity<Boolean> updateLeaveEntry(@RequestBody LeaveEntry leaveEntry){
		service.saveLeaveEntry(leaveEntry);
		return ResponseEntity.ok(true);
	}
	@DeleteMapping("/deleteLeaveEntry/{id}")
	public ResponseEntity<String> deleteLeaveEntry(@PathVariable Long id){
		service.deleteByIdLeaveEntry(id);
    	String message = "LeaveEntry Delete!"+id;
    	return ResponseEntity.ok(message);
    }
	@GetMapping("/getOneLeaveEntry/{id}")
    public ResponseEntity<LeaveEntry>getByIdLeaveEntry(@PathVariable Long id){
		LeaveEntry company = service.getByIdLeaveEntry(id);
    	return ResponseEntity.ok(company);
    }
	@GetMapping("/getAllLeaveEntry")
	public ResponseEntity<List<LeaveEntry>> getAllLeaveEntry(){
		List<LeaveEntry> list =service.getAllLeaveEntry();
		return ResponseEntity.ok(list);
	}
}
