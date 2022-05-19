package com.boot.accounting.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boot.hr.model.Period;

public interface PeriodRepo extends JpaRepository<Period, Long> {
	
}
