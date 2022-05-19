package com.boot.accounting.restcontroller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.boot.accounting.model.MidGroup;
import com.boot.accounting.service.MidGroupService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/basicEntry")
public class MidGroupController {
	@Autowired
	MidGroupService service;
	@GetMapping("/getAllMidGroup")
	public ResponseEntity<List<MidGroup>> getAllMidGroup(){
		List<MidGroup> list = service.getAllMidGroup();
		return ResponseEntity.ok(list);
	}
}
