package com.exam.service;

import java.util.Set;
import com.exam.entity.User;
import com.exam.entity.UserRole;

public interface UserService {

	//creating user
	public User createUser(User user, Set<UserRole> userRole) throws Exception;
	
	// get user by userName
	public User getUser(String username);
	
	// delete user by user id
	public void deleteUser(Long userId);
	
	
}
