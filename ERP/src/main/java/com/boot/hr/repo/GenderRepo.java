package com.boot.hr.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boot.hr.model.Gender;

public interface GenderRepo extends JpaRepository<Gender, Long> {
	
}
