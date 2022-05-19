package com.boot.superadmin.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boot.superadmin.model.Year;

public interface YearRepo extends JpaRepository<Year, Long> {
	
}
