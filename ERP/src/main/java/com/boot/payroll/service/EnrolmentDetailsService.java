package com.boot.payroll.service;

import java.util.List;

import com.boot.payroll.model.EnrolmentDetails;


public interface EnrolmentDetailsService {
	boolean saveEnrolmentDetails(EnrolmentDetails enrolmentDetails);
	boolean updateEnrolmentDetails(EnrolmentDetails enrolmentDetails);
	boolean deleteByIdEnrolmentDetails(Long id);
	EnrolmentDetails getByIdEnrolmentDetails(Long id);
	List<EnrolmentDetails> getAllEnrolmentDetails();
}
