package com.boot.hr.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boot.hr.model.HolidaySetup;

public interface HolidaySetupRepo extends JpaRepository<HolidaySetup, Long>{

}
