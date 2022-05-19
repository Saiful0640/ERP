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
import com.boot.accounting.model.TransDetailAcc;
import com.boot.accounting.service.TransDetailAccService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/transDetail")
public class TransDetailAccController {
	@Autowired
	TransDetailAccService service;
	@PostMapping("/SaveTransDetailAcc")
	public ResponseEntity<Boolean> SaveTransDetailAcc(@RequestBody TransDetailAcc transDetailAcc){
		service.saveTransDetailAcc(transDetailAcc);
		return ResponseEntity.ok(true);
	}
	@PutMapping("/updateTransDetailAcc")
	public ResponseEntity<Boolean> updateTransDetailAcc(@RequestBody TransDetailAcc transDetailAcc){
		service.saveTransDetailAcc(transDetailAcc);
		return ResponseEntity.ok(true);
	}
	@DeleteMapping("/deleteTransDetailAcc/{id}")
	public ResponseEntity<String> deleteTransDetailAcc(@PathVariable Long id){
		service.deleteByIdTransDetailAcc(id);
    	String message = "TransDetailAcc Delete!"+id;
    	return ResponseEntity.ok(message);
    }
	@GetMapping("/getOneTransDetailAcc/{id}")
    public ResponseEntity<TransDetailAcc>getByIdTransDetailAcc(@PathVariable Long id){
		TransDetailAcc company = service.getByIdTransDetailAcc(id);
    	return ResponseEntity.ok(company);
    }
	@GetMapping("/getAllTransDetailAcc")
	public ResponseEntity<List<TransDetailAcc>> getAllTransDetailAcc(){
		List<TransDetailAcc> list =service.getAllTransDetailAcc();
		return ResponseEntity.ok(list);
	}
}
