package com.exam.service;

import java.util.Set;
import com.exam.entity.UserRole;
import com.exam.entity.Users;

public interface UserService {
	
	//creating user
	public Users createUser(Users user,Set<UserRole> userRoles);
	
	// get user by userName
	public Users getUser(String username);
		
	// delete user by user id
	public void deleteUser(Long userId);

}


