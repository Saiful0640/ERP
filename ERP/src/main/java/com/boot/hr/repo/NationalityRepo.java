package com.boot.hr.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boot.hr.model.Nationality;

public interface NationalityRepo extends JpaRepository<Nationality, Long> {

}
