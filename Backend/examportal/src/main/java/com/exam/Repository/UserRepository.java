package com.exam.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import com.exam.entity.Users;

public interface UserRepository extends JpaRepository<Users, Long>  {

	public Users findByUserName(String username);

}
