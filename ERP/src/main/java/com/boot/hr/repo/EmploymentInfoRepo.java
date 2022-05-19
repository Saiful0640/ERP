package com.boot.hr.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boot.hr.model.EmploymentInfo;

public interface EmploymentInfoRepo extends JpaRepository<EmploymentInfo, Long>{

}
