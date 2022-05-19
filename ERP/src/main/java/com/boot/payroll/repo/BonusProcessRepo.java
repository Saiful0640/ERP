package com.boot.payroll.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boot.payroll.model.BonusProcess;

public interface BonusProcessRepo extends JpaRepository<BonusProcess, Long> {

}
