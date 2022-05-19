package com.boot.superadmin.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boot.superadmin.model.Company;

public interface CompanyRepo extends JpaRepository<Company, Long> {

}
