package com.boot.payroll.serviceImpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.payroll.model.ServiceBillProcessType;
import com.boot.payroll.repo.ServiceBillProcessTypeRepo;
import com.boot.payroll.service.ServiceBillProcessTypeService;
@Service
public class ServiceBillProcessTypeImpl implements ServiceBillProcessTypeService {
	@Autowired
	ServiceBillProcessTypeRepo repos;
	
	public List<ServiceBillProcessType> getAllServiceBillProcessType() {
		
		return repos.findAll();
	}

}
