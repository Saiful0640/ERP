package com.boot.hr.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boot.hr.model.ActionType;

public interface ActionTypeRepo extends JpaRepository<ActionType, Long> {

}
