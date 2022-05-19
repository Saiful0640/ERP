package com.boot.payroll.controller;

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

import com.boot.hr.model.Department;
import com.boot.payroll.dao.CenterServiceAmountListDao;
import com.boot.payroll.dao.DeletecenserviceamtsettingByDetailsAndModuleIdDao;
import com.boot.payroll.model.CenServiceAmtSetting;
import com.boot.payroll.model.CenServiceAmtSettingParam;
import com.boot.payroll.model.CenterServiceAmountList;
import com.boot.payroll.model.GetCriteriaDetailsByCriteriaIdAndDetailsID;
import com.boot.payroll.service.CenServiceAmtSettingService;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/Payroll")
public class CenServiceAmtSettingController {
	@Autowired
	CenServiceAmtSettingService service;
	
	@Autowired
	DeletecenserviceamtsettingByDetailsAndModuleIdDao dao;
	
	@Autowired
	CenterServiceAmountListDao ceaDao;
	
	@PostMapping("/DeleteCenServiceAmtSettingByModuleIdAndDetailsId")
	public ResponseEntity<Boolean> DeleteCenServiceAmtSettingByModuleIdAndDetailsId(@RequestBody CenServiceAmtSettingParam cenServiceAmtSettingParam){
		dao.deletecenserviceamtsettingByDetailsAndModuleId(cenServiceAmtSettingParam);
		return ResponseEntity.ok(true);
	}
	@PostMapping("/SaveCenServiceAmtSetting")
	public ResponseEntity<Boolean> SaveCenServiceAmtSetting(@RequestBody CenServiceAmtSetting cenServiceAmtSetting){
		service.saveCenServiceAmtSetting(cenServiceAmtSetting);
		return ResponseEntity.ok(true);
	}
	@PutMapping("/updateCenServiceAmtSetting")
	public ResponseEntity<Boolean> updateCenServiceAmtSetting(@RequestBody CenServiceAmtSetting cenServiceAmtSetting){
		service.saveCenServiceAmtSetting(cenServiceAmtSetting);
		return ResponseEntity.ok(true);
	}
	@DeleteMapping("/deleteCenServiceAmtSetting/{id}")
	public ResponseEntity<String> deleteCenServiceAmtSetting(@PathVariable Long id){
		service.deleteByIdCenServiceAmtSetting(id);
    	String message = "CenServiceAmtSetting Delete!"+id;
    	return ResponseEntity.ok(message);
    }
	@GetMapping("/getOneCenServiceAmtSetting/{id}")
    public ResponseEntity<CenServiceAmtSetting>getByIdCenServiceAmtSetting(@PathVariable Long id){
		CenServiceAmtSetting company = service.getByIdCenServiceAmtSetting(id);
    	return ResponseEntity.ok(company);
    }
	@GetMapping("/getAllCenServiceAmtSetting")
	public ResponseEntity<List<CenServiceAmtSetting>> getAllCenServiceAmtSetting(){
		List<CenServiceAmtSetting> list =service.getAllCenServiceAmtSetting();
		return ResponseEntity.ok(list);
	}
	@GetMapping("/getCenterServiceAmountList/{moduleId}/{detailsId}")
	public ResponseEntity<List<CenterServiceAmountList>> getCenterServiceAmountList(@PathVariable long moduleId,@PathVariable long detailsId) {
		List<CenterServiceAmountList> list=ceaDao.getCenterServiceAmountList(moduleId, detailsId);
		return ResponseEntity.ok(list);
	}
	
	
}
