package com.boot.superadmin.service;

import java.util.List;

import com.boot.superadmin.model.UserRole;

public interface UserRoleService {
	boolean saveUserRole(UserRole userRole);
	boolean updateUserRole(UserRole userRole);
	boolean deleteByIdUserRole(Long id);
	UserRole getByIdUserRole(Long id);
	List<UserRole> getAllUserRole();
}
