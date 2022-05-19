package com.boot.accounting.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boot.accounting.model.TransSubledger;

public interface TransSubledgerRepo extends JpaRepository<TransSubledger, Long>{

}
