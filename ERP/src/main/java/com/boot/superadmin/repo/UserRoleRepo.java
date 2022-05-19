package com.boot.superadmin.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boot.superadmin.model.UserRole;

public interface UserRoleRepo extends JpaRepository<UserRole, Long>{

}
