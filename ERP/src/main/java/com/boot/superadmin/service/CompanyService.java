package com.boot.superadmin.service;

import java.util.List;

import com.boot.superadmin.model.Company;


public interface CompanyService {
	boolean saveCompany(Company company);
	boolean updateCompany(Company company);
	boolean deleteByIdCompany(Long id);
	Company getByIdCompany(Long id);
	List<Company> getAllCompany();
}
