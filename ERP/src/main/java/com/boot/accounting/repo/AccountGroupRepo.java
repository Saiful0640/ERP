package com.boot.accounting.repo;


import org.springframework.data.jpa.repository.JpaRepository;

import com.boot.accounting.model.AccountGroup;

public interface AccountGroupRepo extends JpaRepository<AccountGroup, Long> {

	

}
