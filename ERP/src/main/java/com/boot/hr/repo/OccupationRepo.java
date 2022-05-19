package com.boot.hr.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boot.hr.model.Occupation;

public interface OccupationRepo extends JpaRepository<Occupation, Long> {

}
