package com.boot.accounting.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.accounting.model.CriteriaDetails;
import com.boot.accounting.repo.CriteriaDetailsRepo;
import com.boot.accounting.service.CriteriaDetailsService;
@Service
public class CriteriaDetailsImpl implements CriteriaDetailsService {
	@Autowired
	CriteriaDetailsRepo repos;
	
	public boolean saveCriteriaDetails(CriteriaDetails criteriaDetails) {
		criteriaDetails =repos.save(criteriaDetails);
		boolean isSuccess = criteriaDetails.getId()>1;
		return isSuccess;	
	}

	public boolean updateCriteriaDetails(CriteriaDetails criteriaDetails) {
		repos.save(criteriaDetails);
		return true;
	}

	
	public boolean deleteByIdCriteriaDetails(Long id) {
		repos.deleteById(id);
		return true;
	}

	
	public CriteriaDetails getByIdCriteriaDetails(Long id) {
		Optional<CriteriaDetails> opt =repos.findById(id);
		if(opt.isPresent()) {
			return opt.get();
		}
		return null;
	}

	
	public List<CriteriaDetails> getAllCriteriaDetails() {
		// TODO Auto-generated method stub
		return repos.findAll();
	}

}
