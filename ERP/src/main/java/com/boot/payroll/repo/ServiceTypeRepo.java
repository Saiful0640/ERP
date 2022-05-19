package com.boot.payroll.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boot.payroll.model.ServiceType;

public interface ServiceTypeRepo extends JpaRepository<ServiceType, Long> {

}
