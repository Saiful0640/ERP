package com.boot.hr.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boot.hr.model.MaritalStatus;

public interface MaritalStatusRepo extends JpaRepository<MaritalStatus, Long> {
	
}
