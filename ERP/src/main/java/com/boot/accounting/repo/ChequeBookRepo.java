package com.boot.accounting.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boot.accounting.model.ChequeBook;

public interface ChequeBookRepo extends JpaRepository<ChequeBook, Long> {

}
