package com.boot.superadmin.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.superadmin.model.Company;
import com.boot.superadmin.repo.CompanyRepo;
import com.boot.superadmin.service.CompanyService;
@Service
public class CompanyImpl implements CompanyService{
	@Autowired
	CompanyRepo companyrepo;
	
	public boolean saveCompany(Company company) {
		company =companyrepo.save(company);
		boolean isSuccess = company.getId()>1;
		return isSuccess;
	}

	
	public boolean updateCompany(Company company) {
		companyrepo.save(company);
		return true;
	}

	public boolean deleteByIdCompany(Long id) {
		companyrepo.deleteById(id);
		return true;
	}

	public Company getByIdCompany(Long id) {
		Optional<Company> opt = companyrepo.findById(id);
		if(opt.isPresent()) {
			return opt.get();
		}
		return null;
	}

	
	public List<Company> getAllCompany() {
		
		return companyrepo.findAll();
	}

}
