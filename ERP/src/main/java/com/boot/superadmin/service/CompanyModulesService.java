package com.boot.superadmin.service;

import java.util.List;

import com.boot.superadmin.model.CompanyModules;

public interface CompanyModulesService {
	boolean saveCompanyModules(CompanyModules companyModules);
	boolean updateCompanyModules(CompanyModules companyModules);
	List<CompanyModules> getAllCompanyModules();
}
