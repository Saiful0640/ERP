package com.boot.payroll.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.boot.hr.model.HolidaySetupSP;
import com.boot.payroll.dao.GetCriteriaDetailsByCriteriaIdAndDetailsIDDao;
import com.boot.payroll.model.GetCriteriaDetailsByCriteriaIdAndDetailsID;
import com.boot.payroll.model.ServiceBillProcessType;
import com.boot.payroll.model.ServiceType;
import com.boot.payroll.service.ServiceBillProcessTypeService;
import com.boot.payroll.service.ServiceTypeService;


@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/payroll")
public class ServiceTypeController {
	@Autowired
	ServiceTypeService service;
	
	@Autowired
	ServiceBillProcessTypeService service1;
	@Autowired
	GetCriteriaDetailsByCriteriaIdAndDetailsIDDao dao;
	
	@GetMapping("/getAllServiceType")
	public ResponseEntity<List<ServiceType>> getAllServiceType(){
		List<ServiceType> list =service.getAllServiceType();
		return ResponseEntity.ok(list);
	}
	@GetMapping("/getAllServiceBillProcessType")
	public ResponseEntity<List<ServiceBillProcessType>> getAllServiceBillProcessType(){
		List<ServiceBillProcessType> list =service1.getAllServiceBillProcessType();
		return ResponseEntity.ok(list);
	}
	@GetMapping("/getCriteriaDetailsByModuleIdCriteriaIdDetailsId/{moduleId}/{criteriaId}/{detailsId}")
	public ResponseEntity<List<GetCriteriaDetailsByCriteriaIdAndDetailsID>> getCriteriaDetailsByCriteriaIdAndDetailsID(@PathVariable long moduleId,@PathVariable long criteriaId,@PathVariable long detailsId) {
		List<GetCriteriaDetailsByCriteriaIdAndDetailsID> list=dao.getCriteriaDetailsByCriteriaIdAndDetailsID(moduleId, criteriaId, detailsId);
		return ResponseEntity.ok(list);
	}
	
	
	
}
