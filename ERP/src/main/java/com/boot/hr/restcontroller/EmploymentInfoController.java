package com.boot.hr.restcontroller;

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

import com.boot.hr.dao.GetAllEmployeementInfoByMemberCodeDao;
import com.boot.hr.model.EmploymentInfo;
import com.boot.hr.model.GetAllEmployeementInfoByMemberCode;
import com.boot.hr.service.EmploymentInfoService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/EmpInfo")
public class EmploymentInfoController {
	@Autowired
	EmploymentInfoService service;
	@Autowired
	private GetAllEmployeementInfoByMemberCodeDao dao;
	@PostMapping("/SaveEmploymentInfo")
	public ResponseEntity<Boolean> SaveEmploymentInfo(@RequestBody EmploymentInfo employmentInfo){
		service.saveEmploymentInfo(employmentInfo);
		return ResponseEntity.ok(true);
	}
	@PutMapping("/updateEmploymentInfo")
	public ResponseEntity<Boolean> updateEmploymentInfo(@RequestBody EmploymentInfo employmentInfo){
		service.saveEmploymentInfo(employmentInfo);
		return ResponseEntity.ok(true);
	}
	@DeleteMapping("/deleteEmploymentInfo/{id}")
	public ResponseEntity<String> deleteEmploymentInfo(@PathVariable Long id){
		service.deleteByIdEmploymentInfo(id);
    	String message = "EmploymentInfo Delete!"+id;
    	return ResponseEntity.ok(message);
    }
	@GetMapping("/getOneEmploymentInfo/{id}")
    public ResponseEntity<EmploymentInfo>getByIdEmploymentInfo(@PathVariable Long id){
		EmploymentInfo company = service.getByIdEmploymentInfo(id);
    	return ResponseEntity.ok(company);
    }
	@GetMapping("/getAllEmploymentInfo")
	public ResponseEntity<List<EmploymentInfo>> getAllEmploymentInfo(){
		List<EmploymentInfo> list =service.getAllEmploymentInfo();
		return ResponseEntity.ok(list);
	}
	@GetMapping("/getAllEmployeementInfoByMemberCode/{membercode}")
    public ResponseEntity<List<GetAllEmployeementInfoByMemberCode>>getAllEmployeementInfoByMemberCode(@PathVariable String membercode){
		List <GetAllEmployeementInfoByMemberCode> list = dao.getAllEmployeementInfoByMemberCode(membercode);
    	return ResponseEntity.ok(list);
    }
}
