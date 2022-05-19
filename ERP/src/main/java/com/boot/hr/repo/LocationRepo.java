package com.boot.hr.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boot.hr.model.Location;

public interface LocationRepo extends JpaRepository<Location, Long>{

}
