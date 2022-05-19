package com.boot.payroll.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.payroll.model.ServiceType;
import com.boot.payroll.repo.ServiceTypeRepo;
import com.boot.payroll.service.ServiceTypeService;
@Service
public class ServiceTypeImpl implements ServiceTypeService {
	@Autowired
	ServiceTypeRepo repos;
	
	public List<ServiceType> getAllServiceType() {
		
		return repos.findAll();
	}

}
