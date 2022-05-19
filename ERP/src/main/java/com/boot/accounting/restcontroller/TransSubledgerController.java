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

import com.boot.accounting.model.TransCostCenter;
import com.boot.accounting.model.TransSubledger;
import com.boot.accounting.service.TransSubledgerService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/basicEntry")
public class TransSubledgerController {
	@Autowired
	TransSubledgerService service;
	@PostMapping("/SaveTransSubledger")
	public ResponseEntity<Boolean> SaveTransSubledger(@RequestBody TransSubledger transSubledger){
		service.saveTransSubledger(transSubledger);
		return ResponseEntity.ok(true);
	}
	@PutMapping("/updateTransSubledger")
	public ResponseEntity<Boolean> updateTransSubledger(@RequestBody TransSubledger transSubledger){
		service.saveTransSubledger(transSubledger);
		return ResponseEntity.ok(true);
	}
	@DeleteMapping("/deleteTransSubledger/{id}")
	public ResponseEntity<String> deleteTransSubledger(@PathVariable Long id){
		service.deleteByIdTransSubledger(id);
    	String message = "TransSubledger Delete!"+id;
    	return ResponseEntity.ok(message);
    }
	@GetMapping("/getOneTransSubledger/{id}")
    public ResponseEntity<TransSubledger>getByIdTransSubledger(@PathVariable Long id){
		TransSubledger company = service.getByIdTransSubledger(id);
    	return ResponseEntity.ok(company);
    }
	@GetMapping("/getAllTransSubledger")
	public ResponseEntity<List<TransSubledger>> getAllTransSubledger(){
		List<TransSubledger> list =service.getAllTransSubledger();
		return ResponseEntity.ok(list);
	}
}
