package com.boot.accounting.service;

import java.util.List;

import com.boot.accounting.model.CriteriaDetails;
import com.boot.accounting.model.TransCostCenter;

public interface CriteriaDetailsService {
	boolean saveCriteriaDetails(CriteriaDetails criteriaDetails);
	boolean updateCriteriaDetails(CriteriaDetails criteriaDetails);
	boolean deleteByIdCriteriaDetails(Long id);
	CriteriaDetails getByIdCriteriaDetails(Long id);
	List<CriteriaDetails> getAllCriteriaDetails();
}
