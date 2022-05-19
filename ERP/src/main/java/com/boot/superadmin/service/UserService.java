package com.boot.superadmin.service;

import java.util.List;

import com.boot.superadmin.model.User;
import com.boot.superadmin.model.UserRole;
import com.boot.superadmin.model.UserType;


public interface UserService {
	boolean saveUser(User user);
	boolean updateUser(User user);
	boolean deleteByIdUser(Long id);
	User getByIdUser(Long id);
	List<User> getAllUser();
	List<UserRole> getAllUserRole();
	List<UserType> getAllUserType();
	
}
