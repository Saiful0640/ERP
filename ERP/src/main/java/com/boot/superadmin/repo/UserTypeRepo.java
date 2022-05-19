package com.boot.superadmin.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boot.superadmin.model.UserType;

public interface UserTypeRepo extends JpaRepository<UserType, Long>{

}
