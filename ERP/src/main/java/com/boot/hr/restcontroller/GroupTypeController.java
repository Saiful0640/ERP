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
import com.boot.hr.model.GroupType;
import com.boot.hr.service.DepartmentService;
import com.boot.hr.service.GroupTypeService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/BasicEnty")
public class GroupTypeController {
	@Autowired
	GroupTypeService service;
	
	@PostMapping("/SaveGroupType")
	public ResponseEntity<Boolean> SaveGroupType(@RequestBody GroupType groupType){
		service.saveGroupType(groupType);
		return ResponseEntity.ok(true);
	}
	@PutMapping("/updateGroupType")
	public ResponseEntity<Boolean> updateGroupType(@RequestBody GroupType groupType){
		service.saveGroupType(groupType);
		return ResponseEntity.ok(true);
	}
	@DeleteMapping("/deleteGroupType/{id}")
	public ResponseEntity<String> deleteGroupType(@PathVariable Long id){
		service.deleteByIdGroupType(id);
    	String message = "GroupType Delete!"+id;
    	return ResponseEntity.ok(message);
    }
	@GetMapping("/getOneGroupType/{id}")
    public ResponseEntity<GroupType>getByIdGroupType(@PathVariable Long id){
		GroupType company = service.getByIdGroupType(id);
    	return ResponseEntity.ok(company);
    }
	@GetMapping("/getAllGroupType")
	public ResponseEntity<List<GroupType>> getAllGroupType(){
		List<GroupType> list =service.getAllGroupType();
		return ResponseEntity.ok(list);
	}
}
