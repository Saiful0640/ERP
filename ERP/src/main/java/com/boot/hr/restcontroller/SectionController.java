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
import com.boot.hr.model.Section;
import com.boot.hr.service.SectionService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/BasicEnty")
public class SectionController {
	@Autowired
	SectionService service;
	
	@PostMapping("/SaveSection")
	public ResponseEntity<Boolean> SaveSection(@RequestBody Section section){
		service.saveSection(section);
		return ResponseEntity.ok(true);
	}
	@PutMapping("/updateSection")
	public ResponseEntity<Boolean> updateSection(@RequestBody Section section){
		service.saveSection(section);
		return ResponseEntity.ok(true);
	}
	@DeleteMapping("/deleteSection/{id}")
	public ResponseEntity<String> deleteSection(@PathVariable Long id){
		service.deleteByIdSection(id);
    	String message = "Section Delete!"+id;
    	return ResponseEntity.ok(message);
    }
	@GetMapping("/getOneSection/{id}")
    public ResponseEntity<Section>getByIdSection(@PathVariable Long id){
		Section company = service.getByIdSection(id);
    	return ResponseEntity.ok(company);
    }
	@GetMapping("/getAllSection")
	public ResponseEntity<List<Section>> getAllSection(){
		List<Section> list =service.getAllSection();
		return ResponseEntity.ok(list);
	}
}
