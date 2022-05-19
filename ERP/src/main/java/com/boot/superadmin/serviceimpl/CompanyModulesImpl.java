package com.boot.superadmin.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.superadmin.model.CompanyModules;
import com.boot.superadmin.repo.CompanyModulesRepo;
import com.boot.superadmin.service.CompanyModulesService;
@Service
public class CompanyModulesImpl implements CompanyModulesService {

	@Autowired
	CompanyModulesRepo companyMrepo;
	public boolean saveCompanyModules(CompanyModules companyModules) {
		companyModules=companyMrepo.save(companyModules);
		boolean isSuccess = companyModules.getId()>1;
		return isSuccess;
	}

	public boolean updateCompanyModules(CompanyModules companyModules) {
		companyMrepo.save(companyModules);
		return true;
	}

	public List<CompanyModules> getAllCompanyModules() {
		return companyMrepo.findAll();
	}

}
