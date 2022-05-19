package com.boot.accounting.restcontroller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.boot.accounting.model.AccountGroup;
import com.boot.accounting.service.AccountGroupService;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/basicEntry")
public class AccountGroupController {
	
	@Autowired
	private AccountGroupService service;
	//save
	@PostMapping("/saveAccountGroup")
	public ResponseEntity<Boolean> saveAccountGroup(@RequestBody AccountGroup accountGroup){
		service.saveAccountGroup(accountGroup);
		return ResponseEntity.ok(true);
	}
	//update
	@PutMapping("/updateaccountgroup")
	public ResponseEntity<Boolean> updateAccountGroup(@RequestBody AccountGroup accountGroup){
		service.saveAccountGroup(accountGroup);
		return ResponseEntity.ok(true);
	}
	
	@GetMapping("/allaccountgroup")
	public ResponseEntity<List<AccountGroup>>getAllAccountGroup(){
		List<AccountGroup> list = service.getAllAccountGroup();
		return ResponseEntity.ok(list);
	}
	
	@GetMapping("/oneaccountgroup/{id}")
	public ResponseEntity<AccountGroup>getOneAccountGroup(@PathVariable Long id){
		AccountGroup accountGroup =service.getOneAccountGroup(id);
		return ResponseEntity.ok(accountGroup);
	}
	
	
	
}
