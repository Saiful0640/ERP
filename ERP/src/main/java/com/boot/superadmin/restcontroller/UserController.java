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
import com.boot.superadmin.model.User;
import com.boot.superadmin.model.UserType;
import com.boot.superadmin.service.UserService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/settings")
public class UserController {
	@Autowired
	UserService userservice;
	@PostMapping("/saveUserInfo")
	public ResponseEntity<Boolean> saveUser(@RequestBody User user){
		userservice.saveUser(user);
		return ResponseEntity.ok(true);
	}
	@PutMapping("/updateUserInfo")
	public ResponseEntity<Boolean> updateUser(@RequestBody User user){
		userservice.saveUser(user);
		return ResponseEntity.ok(true);
	}
	@DeleteMapping("/deleteUserInfo/{id}")
	public ResponseEntity<String> deleteUser(@PathVariable Long id){
		userservice.deleteByIdUser(id);
    	String message = "Company Delete!"+id;
    	return ResponseEntity.ok(message);
    }
	@GetMapping("/getOneUserInfo/{id}")
    public ResponseEntity<User>getByIdUser(@PathVariable Long id){
		User company = userservice.getByIdUser(id);
    	return ResponseEntity.ok(company);
    }
	@GetMapping("/getAllUserInfo")
	public ResponseEntity<List<User>> getAllUser(){
		List<User> list =userservice.getAllUser();
		return ResponseEntity.ok(list);
	}
	
	@GetMapping("/getAllUserType")
	public ResponseEntity<List<UserType>> getAllUserType(){
		List<UserType> list =userservice.getAllUserType();
		return ResponseEntity.ok(list);
	}
}
