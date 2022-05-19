package com.boot.payroll.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boot.payroll.model.EnrolmentDetails;

public interface EnrolmentDetailsRepo extends JpaRepository<EnrolmentDetails, Long> {

}
