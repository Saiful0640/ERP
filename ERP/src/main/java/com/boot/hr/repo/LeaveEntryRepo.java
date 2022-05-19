package com.boot.hr.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boot.hr.model.LeaveEntry;

public interface LeaveEntryRepo extends JpaRepository<LeaveEntry, Long> {

}
