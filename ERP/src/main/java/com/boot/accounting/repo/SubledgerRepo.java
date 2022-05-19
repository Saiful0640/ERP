package com.boot.accounting.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boot.accounting.model.Subledger;

public interface SubledgerRepo extends JpaRepository<Subledger, Long> {

}
