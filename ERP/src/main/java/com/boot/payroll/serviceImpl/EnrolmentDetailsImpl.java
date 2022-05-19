package com.boot.payroll.serviceImpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.payroll.model.EnrolmentDetails;
import com.boot.payroll.repo.EnrolmentDetailsRepo;
import com.boot.payroll.service.EnrolmentDetailsService;
@Service
public class EnrolmentDetailsImpl implements EnrolmentDetailsService {
	@Autowired
	EnrolmentDetailsRepo repos;
 	
	public boolean saveEnrolmentDetails(EnrolmentDetails enrolmentDetails) {
		enrolmentDetails =repos.save(enrolmentDetails);
		boolean isSuccess = enrolmentDetails.getId()>1;
		return isSuccess;
	}

	
	public boolean updateEnrolmentDetails(EnrolmentDetails enrolmentDetails) {
		repos.save(enrolmentDetails);
		return true;
	}

	
	public boolean deleteByIdEnrolmentDetails(Long id) {
		repos.deleteById(id);
		return true;
	}

	
	public EnrolmentDetails getByIdEnrolmentDetails(Long id) {
		Optional<EnrolmentDetails> opt = repos.findById(id);
		if(opt.isPresent()) {
			return opt.get();
		}
		return null;
	}

	
	public List<EnrolmentDetails> getAllEnrolmentDetails() {
		return repos.findAll();
	}

}
