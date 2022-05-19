package com.boot.accounting.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boot.accounting.model.CurrencyInfo;

public interface CurrencyInfoRepo extends JpaRepository<CurrencyInfo, Long> {

}
