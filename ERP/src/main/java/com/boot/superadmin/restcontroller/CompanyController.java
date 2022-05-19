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
import com.boot.superadmin.model.Company;
import com.boot.superadmin.service.CompanyService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/settings")
public class CompanyController {
	@Autowired
	CompanyService companyservice;
	@PostMapping("/SaveCompany")
	public ResponseEntity<Boolean> SaveCompany(@RequestBody Company company){
		companyservice.saveCompany(company);
		return ResponseEntity.ok(true);
	}
	@PutMapping("/updateCompany")
	public ResponseEntity<Boolean> updateCompany(@RequestBody Company company){
		companyservice.saveCompany(company);
		return ResponseEntity.ok(true);
	}
	@DeleteMapping("/deleteCompany/{id}")
	public ResponseEntity<String> deleteCompany(@PathVariable Long id){
		companyservice.deleteByIdCompany(id);
    	String message = "Company Delete!"+id;
    	return ResponseEntity.ok(message);
    }
	@GetMapping("/getOneCompany/{id}")
    public ResponseEntity<Company>getByIdCompany(@PathVariable Long id){
    	Company company = companyservice.getByIdCompany(id);
    	return ResponseEntity.ok(company);
    }
	@GetMapping("/getAllCompany")
	public ResponseEntity<List<Company>> getAllCompany(){
		List<Company> list =companyservice.getAllCompany();
		return ResponseEntity.ok(list);
	}
}
