package com.boot.superadmin.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.boot.superadmin.model.User;
import com.boot.superadmin.model.UserRole;
import com.boot.superadmin.model.UserType;
import com.boot.superadmin.repo.UserRepo;
import com.boot.superadmin.repo.UserRoleRepo;
import com.boot.superadmin.repo.UserTypeRepo;
import com.boot.superadmin.service.UserService;
@Service
public class UserImpl implements UserService {
	@Autowired
	UserRepo userrepo;
	@Autowired
	UserRoleRepo userrolerepo;
	@Autowired
	UserTypeRepo usertyperepo;
	
	public boolean saveUser(User user) {
		user=userrepo.save(user);
		boolean isSuccess = user.getId()>1;
		return isSuccess;
	}

	public boolean updateUser(User user) {
		userrepo.save(user);
		return true;
	}

	public boolean deleteByIdUser(Long id) {
		userrepo.deleteById(id);
		return true;
	}

	public User getByIdUser(Long id) {
		Optional<User> opt = userrepo.findById(id);
		if(opt.isPresent()) {
			return opt.get();
		}
		return null;
	}

	public List<User> getAllUser() {
		return userrepo.findAll();
	}

	
	public List<UserRole> getAllUserRole() {
		
		return userrolerepo.findAll();
	}

	
	public List<UserType> getAllUserType() {
		
		return usertyperepo.findAll();
	}

}
