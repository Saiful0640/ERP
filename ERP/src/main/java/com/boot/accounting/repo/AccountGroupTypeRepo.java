package com.boot.accounting.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boot.accounting.model.AccountGroupType;

public interface AccountGroupTypeRepo extends JpaRepository<AccountGroupType, Long> {

}
