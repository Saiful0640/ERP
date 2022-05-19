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

import com.boot.accounting.model.TransMasterAcc;
import com.boot.accounting.service.TransMasterAccService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/basicEntry")
public class TransMasterAccController {
	@Autowired
	TransMasterAccService service;
	@PostMapping("/SaveTransMasterAcc")
	public ResponseEntity<Boolean> SaveTransMasterAcc(@RequestBody TransMasterAcc transMasterAcc){
		service.saveTransMasterAcc(transMasterAcc);
		return ResponseEntity.ok(true);
	}
	@PutMapping("/updateTransMasterAcc")
	public ResponseEntity<Boolean> updateTransMasterAcc(@RequestBody TransMasterAcc transMasterAcc){
		service.saveTransMasterAcc(transMasterAcc);
		return ResponseEntity.ok(true);
	}
	@DeleteMapping("/deleteTransMasterAcc/{id}")
	public ResponseEntity<String> deleteTransMasterAcc(@PathVariable Long id){
		service.deleteByIdTransMasterAcc(id);
    	String message = "TransMasterAcc Delete!"+id;
    	return ResponseEntity.ok(message);
    }
	@GetMapping("/getOneTransMasterAcc/{id}")
    public ResponseEntity<TransMasterAcc>getByIdTransMasterAcc(@PathVariable Long id){
		TransMasterAcc company = service.getByIdTransMasterAcc(id);
    	return ResponseEntity.ok(company);
    }
	@GetMapping("/getAllTransMasterAcc")
	public ResponseEntity<List<TransMasterAcc>> getAllTransMasterAcc(){
		List<TransMasterAcc> list =service.getAllTransMasterAcc();
		return ResponseEntity.ok(list);
	}
}
