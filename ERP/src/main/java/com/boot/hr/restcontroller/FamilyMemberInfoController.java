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

import com.boot.hr.dao.GetAllFamilyInfoByMemberCodeDao;
import com.boot.hr.model.FamilyMemberInfo;
import com.boot.hr.model.GetAllFamilyInfoByMemberCode;
import com.boot.hr.model.GetLeaveInformationByMemberCode;
import com.boot.hr.model.Nationality;
import com.boot.hr.model.Occupation;
import com.boot.hr.model.Relationship;
import com.boot.hr.service.FamilyMemberInfoService;
import com.boot.hr.service.RelationshipService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/EmpGenInfo")
public class FamilyMemberInfoController {
	@Autowired
	FamilyMemberInfoService service;
	@Autowired
	RelationshipService service2;
	
	@Autowired
	 GetAllFamilyInfoByMemberCodeDao getallfamilydao;
	
	@PostMapping("/SaveFamilyMemberInfo")
	public ResponseEntity<Boolean> SaveFamilyMemberInfo(@RequestBody FamilyMemberInfo familyMemberInfo){
		service.saveFamilyMemberInfo(familyMemberInfo);
		return ResponseEntity.ok(true);
	}
	@PutMapping("/updateFamilyMemberInfo")
	public ResponseEntity<Boolean> updateFamilyMemberInfo(@RequestBody FamilyMemberInfo familyMemberInfo){
		service.saveFamilyMemberInfo(familyMemberInfo);
		return ResponseEntity.ok(true);
	}
	@DeleteMapping("/deleteFamilyMemberInfo/{id}")
	public ResponseEntity<String> deleteFamilyMemberInfo(@PathVariable Long id){
		service.deleteByIdFamilyMemberInfo(id);
    	String message = "FamilyMemberInfo Delete!"+id;
    	return ResponseEntity.ok(message);
    }
	@GetMapping("/getOneFamilyMemberInfo/{id}")
    public ResponseEntity<FamilyMemberInfo>getByIdFamilyMemberInfo(@PathVariable Long id){
		FamilyMemberInfo company = service.getByIdFamilyMemberInfo(id);
    	return ResponseEntity.ok(company);
    }
	@GetMapping("/getAllFamilyMemberInfo")
	public ResponseEntity<List<FamilyMemberInfo>> getAllFamilyMemberInfo(){
		List<FamilyMemberInfo> list =service.getAllFamilyMemberInfo();
		return ResponseEntity.ok(list);
	}
	@GetMapping("/GetAllFamilyInfoByMemberCode/{membercode}")
    public ResponseEntity<List<GetAllFamilyInfoByMemberCode>>getAllEmployeementInfoByMemberCode(@PathVariable String membercode){
		List <GetAllFamilyInfoByMemberCode> list =getallfamilydao.getAllFamilyInfoByMemberCode(membercode);
    	return ResponseEntity.ok(list);
    }
	@GetMapping("/getAllRelationship")
	public ResponseEntity<List<Relationship>>getAllRelationship(){
		List<Relationship> list =service2.getAllRelationship();
		return ResponseEntity.ok(list);
	}
	@GetMapping("/getAllNationality")
	public ResponseEntity<List<Nationality>> getAllNationality(){
		List<Nationality> list =service.getAllNationality();
		return ResponseEntity.ok(list);
	}
	@GetMapping("/getAllOccupation")
	public ResponseEntity<List<Occupation>> getAllOccupation(){
		List<Occupation> list =service.getAllOccupation();
		return ResponseEntity.ok(list);
	}
}
