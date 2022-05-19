package com.boot.hr.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.hr.model.ActionType;
import com.boot.hr.model.EmpType;
import com.boot.hr.model.Location;
import com.boot.hr.repo.ActionTypeRepo;
import com.boot.hr.repo.EmpTypeRepo;
import com.boot.hr.repo.LocationRepo;
import com.boot.hr.service.EmploymentCommonService;
@Service
public class EmploymentCommonImpl implements EmploymentCommonService {
	@Autowired
	ActionTypeRepo actionrepo;
	@Autowired
	EmpTypeRepo emprepos;
	@Autowired
	LocationRepo locationrepos;
	
	public List<ActionType> getAllActionType() {
		
		return actionrepo.findAll();
	}

	
	public List<EmpType> getAllEmpType() {
		
		return emprepos.findAll();
	}
	public List<Location> getAllLocation() {
		
		return locationrepos.findAll();
	}

}
