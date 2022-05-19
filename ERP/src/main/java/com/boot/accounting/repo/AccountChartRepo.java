package com.boot.accounting.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boot.accounting.model.AccountChart;

public interface AccountChartRepo extends JpaRepository<AccountChart, Long> {

	

}
