package com.boot.hr.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boot.hr.model.LeaveInfo;

public interface LeaveInfoRepo extends JpaRepository<LeaveInfo, Long>{

}
