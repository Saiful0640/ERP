package com.boot.hr.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boot.hr.model.BloodGroup;

public interface BloodGroupRepo extends JpaRepository<BloodGroup, Long> {

}
