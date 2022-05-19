package com.boot.superadmin.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.boot.superadmin.model.UserRole;
import com.boot.superadmin.repo.UserRoleRepo;
import com.boot.superadmin.service.UserRoleService;
@Service
public class UserRoleImpl implements UserRoleService {
	@Autowired
	UserRoleRepo userRoleRepo;
	public boolean saveUserRole(UserRole userRole) {
		userRole = userRoleRepo.save(userRole);
		boolean isSuccess = userRole.getId()>1;
		return isSuccess;
	}

	public boolean updateUserRole(UserRole userRole) {
		userRoleRepo.save(userRole);
		return true;
	}

	
	public boolean deleteByIdUserRole(Long id) {
		userRoleRepo.deleteById(id);
		return true;
	}

	
	public UserRole getByIdUserRole(Long id) {
		Optional<UserRole> opt = userRoleRepo.findById(id);
		if(opt.isPresent()) {
			return opt.get();
		}
		return null;
	}

	
	public List<UserRole> getAllUserRole() {
		return userRoleRepo.findAll();
	}

}
