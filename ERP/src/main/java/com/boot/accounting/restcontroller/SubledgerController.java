package com.boot.accounting.restcontroller;

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

import com.boot.accounting.model.Subledger;
import com.boot.accounting.service.SubledgerService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/basicEntry")
public class SubledgerController {
	@Autowired(required=true)
	SubledgerService service;
	
	@PostMapping("/SaveSubledger")
	public ResponseEntity<Boolean> SaveSubledger(@RequestBody Subledger subledger){
		service.saveSubledger(subledger);
		return ResponseEntity.ok(true);
	}
	@PutMapping("/updateSubledger")
	public ResponseEntity<Boolean> updateSubledger(@RequestBody Subledger subledger){
		service.saveSubledger(subledger);
		return ResponseEntity.ok(true);
	}
	@DeleteMapping("/deleteSubledger/{id}")
	public ResponseEntity<String> deleteSubledger(@PathVariable Long id){
		service.deleteByIdSubledger(id);
    	String message = "Subledger Delete!"+id;
    	return ResponseEntity.ok(message);
    }
	@GetMapping("/getOneSubledger/{id}")
    public ResponseEntity<Subledger>getByIdSubledger(@PathVariable Long id){
		Subledger company = service.getByIdSubledger(id);
    	return ResponseEntity.ok(company);
    }
	@GetMapping("/getAllSubledger")
	public ResponseEntity<List<Subledger>> getAllSubledger(){
		List<Subledger> list =service.getAllSubledger();
		return ResponseEntity.ok(list);
	}
}
