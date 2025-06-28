package com.exam.Repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.exam.entity.Roles;


public interface RoleRepository extends JpaRepository<Roles, Long> {


}
