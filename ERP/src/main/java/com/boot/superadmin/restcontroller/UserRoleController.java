package com.boot.superadmin.restcontroller;

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
import com.boot.superadmin.model.UserRole;
import com.boot.superadmin.service.UserRoleService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/userRole")
public class UserRoleController {
	@Autowired
	UserRoleService userRoleService;
	
	@PostMapping("/saveUserRole")
	public ResponseEntity<Boolean> saveUserRole(@RequestBody UserRole userRole){
		userRoleService.saveUserRole(userRole);
		return ResponseEntity.ok(true);
	}
	@PutMapping("/updateUserRole")
	public ResponseEntity<Boolean> updateUserRole(@RequestBody  UserRole userRole){
		userRoleService.saveUserRole(userRole);
		return ResponseEntity.ok(true);
	}
	@DeleteMapping("/deleteUserRole/{id}")
	public ResponseEntity<String> deleteUserRole(@PathVariable Long id){
		userRoleService.deleteByIdUserRole(id);
    	String message = "UserRole Delete!"+id;
    	return ResponseEntity.ok(message);
    }
	@GetMapping("/getOneUserRole/{id}")
    public ResponseEntity<UserRole>getByIdUserRole(@PathVariable Long id){
		UserRole userRole = userRoleService.getByIdUserRole(id);
    	return ResponseEntity.ok(userRole);
    }
	@GetMapping("/getAllUserRole")
	public ResponseEntity<List<UserRole>> getAllUserRole(){
		List<UserRole> list =userRoleService.getAllUserRole();
		return ResponseEntity.ok(list);
	}
}
