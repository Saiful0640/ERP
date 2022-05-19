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

import com.boot.accounting.model.ChequeBook;
import com.boot.accounting.service.ChequeBookService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/basicEntry")
public class ChequeBookController {
	@Autowired
	ChequeBookService service;
	@PostMapping("/SaveChequeBook")
	public ResponseEntity<Boolean> SaveChequeBook(@RequestBody ChequeBook chequeBook){
		service.saveChequeBook(chequeBook);
		return ResponseEntity.ok(true);
	}
	@PutMapping("/updateChequeBook")
	public ResponseEntity<Boolean> updateChequeBook(@RequestBody ChequeBook chequeBook){
		service.saveChequeBook(chequeBook);
		return ResponseEntity.ok(true);
	}
	@DeleteMapping("/deleteChequeBook/{id}")
	public ResponseEntity<String> deleteChequeBook(@PathVariable Long id){
		service.deleteByIdChequeBook(id);
    	String message = "ChequeBook Delete!"+id;
    	return ResponseEntity.ok(message);
    }
	@GetMapping("/getOneChequeBook/{id}")
    public ResponseEntity<ChequeBook>getByIdChequeBook(@PathVariable Long id){
		ChequeBook company = service.getByIdChequeBook(id);
    	return ResponseEntity.ok(company);
    }
	@GetMapping("/getAllChequeBook")
	public ResponseEntity<List<ChequeBook>> getAllChequeBook(){
		List<ChequeBook> list =service.getAllChequeBook();
		return ResponseEntity.ok(list);
	}
}
