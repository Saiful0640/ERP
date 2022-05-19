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

import com.boot.superadmin.model.Year;
import com.boot.superadmin.service.YearService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/settings")
public class YearController {
	@Autowired
	YearService service;
	@PostMapping("/saveYear")
	public ResponseEntity<Boolean> SaveYear(@RequestBody Year year){
		service.saveYear(year);
		return ResponseEntity.ok(true);
	}
	@PutMapping("/updateYear")
	public ResponseEntity<Boolean> updateYear(@RequestBody Year year){
		service.saveYear(year);
		return ResponseEntity.ok(true);
	}
	@DeleteMapping("/deleteYear/{id}")
	public ResponseEntity<String> deleteYear(@PathVariable Long id){
		service.deleteByIdYear(id);
    	String message = "Year Delete!"+id;
    	return ResponseEntity.ok(message);
    }
	@GetMapping("/getOneYear/{id}")
    public ResponseEntity<Year>getByIdYear(@PathVariable Long id){
		Year company = service.getByIdYear(id);
    	return ResponseEntity.ok(company);
    }
	@GetMapping("/getAllYear")
	public ResponseEntity<List<Year>> getAllYear(){
		List<Year> list =service.getAllYear();
		return ResponseEntity.ok(list);
	}
}
