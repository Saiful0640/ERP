package com.boot.accounting.service;

import java.util.List;

import com.boot.accounting.model.AccountGroup;



public interface AccountGroupService {
	boolean saveAccountGroup(AccountGroup accountGroup);
	boolean updatedAccountGroup(AccountGroup accountGroup);
	AccountGroup getOneAccountGroup(Long id);
	List<AccountGroup> getAllAccountGroup();
}
