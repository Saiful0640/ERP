package com.boot.accounting.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boot.accounting.model.CriteriaDetails;

public interface CriteriaDetailsRepo extends JpaRepository<CriteriaDetails, Long> {

}
