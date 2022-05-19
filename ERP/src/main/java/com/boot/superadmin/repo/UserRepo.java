package com.boot.superadmin.repo;

import org.springframework.data.jpa.repository.JpaRepository;

import com.boot.superadmin.model.User;

public interface UserRepo extends JpaRepository<User, Long>{

}
