package com.exam.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exam.entity.User;

public interface UserRepository extends JpaRepository<User, Long>{

	public User findByUserName(String userName);

}
