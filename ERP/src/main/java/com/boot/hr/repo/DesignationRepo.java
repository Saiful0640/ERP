package com.boot.hr.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boot.hr.model.Designation;

public interface DesignationRepo extends JpaRepository<Designation, Long> {

}
