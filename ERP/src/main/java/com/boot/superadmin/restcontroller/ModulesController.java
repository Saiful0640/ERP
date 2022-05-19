package com.boot.superadmin.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.boot.superadmin.model.Modules;
import com.boot.superadmin.service.ModulesService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/settings")
public class ModulesController {
	@Autowired
	ModulesService mservice;
	@PostMapping("/SaveModules")
	public ResponseEntity<Boolean> SaveModules(@RequestBody Modules modules){
		mservice.saveModules(modules);
		return ResponseEntity.ok(true);
	}
	@PutMapping("/updateModules")
	public ResponseEntity<Boolean> updateModules(@RequestBody Modules modules){
		mservice.saveModules(modules);
		return ResponseEntity.ok(true);
	}
	@GetMapping("/getAllModules")
	public ResponseEntity<List<Modules>> getAllModules(){
		List<Modules> list =mservice.getAllModules();
		return ResponseEntity.ok(list);
	}
	
}
