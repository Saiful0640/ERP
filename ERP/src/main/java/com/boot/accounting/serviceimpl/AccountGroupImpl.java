package com.boot.accounting.serviceimpl;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.boot.accounting.model.AccountGroup;
import com.boot.accounting.repo.AccountGroupRepo;
import com.boot.accounting.service.AccountGroupService;

@Service
public class AccountGroupImpl implements AccountGroupService {
	@Autowired
	private AccountGroupRepo repo;
	public boolean saveAccountGroup(AccountGroup accountGroup) {
		
		accountGroup=repo.save(accountGroup);
		boolean isSuccess = accountGroup.getId()>1;
		return isSuccess;
	}

	
	public boolean updatedAccountGroup(AccountGroup accountGroup) {
		repo.save(accountGroup);
		return true;
	}

	
	public AccountGroup getOneAccountGroup(Long id) {
		Optional<AccountGroup> opt= repo.findById(id);
		if(opt.isPresent()) {
			return opt.get();
		}
		return null;
	}

	
	public List<AccountGroup> getAllAccountGroup() {
		return repo.findAll();
		
	}

}
