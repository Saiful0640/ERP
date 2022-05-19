package com.boot.hr.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boot.hr.model.Department;

public interface DepartmentRepo extends JpaRepository<Department, Long> {

}
