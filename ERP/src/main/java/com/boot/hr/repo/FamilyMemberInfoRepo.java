package com.boot.hr.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boot.hr.model.FamilyMemberInfo;

public interface FamilyMemberInfoRepo extends JpaRepository<FamilyMemberInfo, Long> {

}
