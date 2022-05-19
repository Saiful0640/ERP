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
import com.boot.accounting.service.TransCostCenterService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/basicEntry")
public class TransCostCenterController {
	@Autowired
	TransCostCenterService service;
	@PostMapping("/SaveTransCostCenter")
	public ResponseEntity<Boolean> SaveTransCostCenter(@RequestBody TransCostCenter transCostCenter){
		service.saveTransCostCenter(transCostCenter);
		return ResponseEntity.ok(true);
	}
	@PutMapping("/updateTransCostCenter")
	public ResponseEntity<Boolean> updateTransCostCenter(@RequestBody TransCostCenter transCostCenter){
		service.saveTransCostCenter(transCostCenter);
		return ResponseEntity.ok(true);
	}
	@DeleteMapping("/deleteTransCostCenter/{id}")
	public ResponseEntity<String> deleteTransCostCenter(@PathVariable Long id){
		service.deleteByIdTransCostCenter(id);
    	String message = "TransCostCenter Delete!"+id;
    	return ResponseEntity.ok(message);
    }
	@GetMapping("/getOneTransCostCenter/{id}")
    public ResponseEntity<TransCostCenter>getByIdTransCostCenter(@PathVariable Long id){
		TransCostCenter company = service.getByIdTransCostCenter(id);
    	return ResponseEntity.ok(company);
    }
	@GetMapping("/getAllTransCostCenter")
	public ResponseEntity<List<TransCostCenter>> getAllTransCostCenter(){
		List<TransCostCenter> list =service.getAllTransCostCenter();
		return ResponseEntity.ok(list);
	}
}
