package com.boot.superadmin.service;

import java.util.List;
import com.boot.superadmin.model.Modules;

public interface ModulesService {
	boolean saveModules(Modules modules);
	boolean updateModules(Modules modules);
	List<Modules> getAllModules();
}
