package com.boot.hr.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boot.hr.model.LeaveType;

public interface LeaveTypeRepo extends JpaRepository<LeaveType, Long>{

}
