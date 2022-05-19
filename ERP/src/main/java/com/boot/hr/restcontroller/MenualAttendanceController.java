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

import com.boot.hr.dao.UspEmpManualAttendenceDao;
import com.boot.hr.model.Department;
import com.boot.hr.model.MenualAttendance;
import com.boot.hr.model.UspEmpManualAttendence;
import com.boot.hr.service.MenualAttendanceService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/Attendance")
public class MenualAttendanceController {
	@Autowired
	MenualAttendanceService service;
	@Autowired
	UspEmpManualAttendenceDao dao;
	@PostMapping("/SaveMenualAttendance")
	public ResponseEntity<Boolean> SaveMenualAttendance(@RequestBody MenualAttendance menualAttendance){
		service.saveMenualAttendance(menualAttendance);
		return ResponseEntity.ok(true);
	}
	@PutMapping("/updateMenualAttendance")
	public ResponseEntity<Boolean> updateMenualAttendance(@RequestBody  MenualAttendance menualAttendance){
		service.saveMenualAttendance(menualAttendance);
		return ResponseEntity.ok(true);
	}
	@DeleteMapping("/deleteMenualAttendance/{id}")
	public ResponseEntity<String> deleteMenualAttendance(@PathVariable Long id){
		service.deleteByIdMenualAttendance(id);
    	String message = "MenualAttendance Delete!"+id;
    	return ResponseEntity.ok(message);
    }
	@GetMapping("/getOneMenualAttendance/{id}")
    public ResponseEntity<MenualAttendance>getByIdMenualAttendance(@PathVariable Long id){
		MenualAttendance company = service.getByIdMenualAttendance(id);
    	return ResponseEntity.ok(company);
    }
	@GetMapping("/getAllMenualAttendance")
	public ResponseEntity<List<MenualAttendance>> getAllMenualAttendance(){
		List<MenualAttendance> list =service.getAllMenualAttendancep();
		return ResponseEntity.ok(list);
	}
	@GetMapping("/getAllUspEmpManualAttendence/{empcode}/{departmentid}/{designationid}/{periodid}")
	public ResponseEntity<List<UspEmpManualAttendence>> getUspEmpManualAttendence(@PathVariable String empcode, @PathVariable long departmentid, @PathVariable long designationid, @PathVariable long periodid){
		List<UspEmpManualAttendence> list =dao.getUspEmpManualAttendence(empcode, departmentid, designationid, periodid);
		return ResponseEntity.ok(list);
	}
}
