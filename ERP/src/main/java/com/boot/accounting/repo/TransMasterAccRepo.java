package com.boot.accounting.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boot.accounting.model.TransMasterAcc;

public interface TransMasterAccRepo extends JpaRepository<TransMasterAcc, Long> {

}
