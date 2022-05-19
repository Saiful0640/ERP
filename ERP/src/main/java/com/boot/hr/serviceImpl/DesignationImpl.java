package com.boot.hr.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.boot.hr.model.Designation;
import com.boot.hr.repo.DesignationRepo;
import com.boot.hr.service.DesignationService;
@Service
public class DesignationImpl implements DesignationService {
	
	@Autowired
	DesignationRepo repos;
	
	public boolean saveDesignation(Designation designation) {
		designation =repos.save(designation);
		boolean isSuccess = designation.getId()>1;
		return isSuccess;
	}

	public boolean updateDesignation(Designation designation) {
		repos.save(designation);
		return true;
	}

	public boolean deleteByIdDesignation(Long id) {
		repos.deleteById(id);
		return true;
	}

	public Designation getByIdDesignation(Long id) {
		Optional<Designation> opt = repos.findById(id);
		if(opt.isPresent()) {
			return opt.get();
		}
		return null;
	}

	public List<Designation> getAllDesignation() {
		return repos.findAll();
	}

}
