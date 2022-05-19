package com.boot.accounting.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.accounting.model.MidGroup;
import com.boot.accounting.repo.MidGroupRepo;
import com.boot.accounting.service.MidGroupService;
@Service
public class MidGroupImpl implements MidGroupService {
	@Autowired
	MidGroupRepo repo;
	
	public List<MidGroup> getAllMidGroup() {
		
		return repo.findAll();
	}

}
