package com.boot.superadmin.serviceimpl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.superadmin.model.Modules;
import com.boot.superadmin.repo.ModulesRepo;
import com.boot.superadmin.service.ModulesService;
@Service
public class ModulesImpl implements ModulesService {
	@Autowired
	ModulesRepo modulesrepo;
	
	public boolean saveModules(Modules modules) {
		modules=modulesrepo.save(modules);
		boolean isSuccess = modules.getId()>1;
		return isSuccess;
	}

	public boolean updateModules(Modules modules) {
		modulesrepo.save(modules);
		return true;
	}

	public List<Modules> getAllModules() {
		return modulesrepo.findAll();
	}

}
