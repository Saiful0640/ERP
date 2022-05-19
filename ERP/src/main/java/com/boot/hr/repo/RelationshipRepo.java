package com.boot.hr.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boot.hr.model.Relationship;

public interface RelationshipRepo extends JpaRepository<Relationship, Long> {

}
