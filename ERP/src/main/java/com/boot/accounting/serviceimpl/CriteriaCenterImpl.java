package com.boot.accounting.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.accounting.model.CriteriaCenter;
import com.boot.accounting.repo.CriteriaCenterRepo;
import com.boot.accounting.service.CriteriaCenterService;
@Service
public class CriteriaCenterImpl implements CriteriaCenterService {
	@Autowired
	CriteriaCenterRepo repos;
	
	public List<CriteriaCenter> getAllCriteriaCenter() {
		// TODO Auto-generated method stub
		return repos.findAll();
	}

}
