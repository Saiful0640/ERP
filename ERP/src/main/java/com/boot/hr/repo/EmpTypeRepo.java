package com.boot.hr.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boot.hr.model.EmpType;

public interface EmpTypeRepo extends JpaRepository<EmpType, Long>{

}
