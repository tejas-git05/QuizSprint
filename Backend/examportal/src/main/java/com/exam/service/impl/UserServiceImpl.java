package com.exam.service.impl;

import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.exam.Repository.RoleRepository;
import com.exam.Repository.UserRepository;
import com.exam.entity.UserRole;
import com.exam.entity.Users;
import com.exam.service.UserService;


@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UserRepository userRepo;
	
	@Autowired
	private RoleRepository roleRepo;
	
	// creating users
	@Override
	public Users createUser(Users users, Set<UserRole> userRoles) {
		
		Users local = this.userRepo.findByUserName(users.getUserName());
		if(local != null)
		{
			System.out.println("\n----------------------");
			System.out.println("User already present!!!");
			System.out.println("----------------------\n");
		} 
		else 
		{
			users.setPassword(users.getPassword());
			
			// save roles
			for(UserRole ur : userRoles) 
			{
				roleRepo.save(ur.getRole());
			}
			users.getUserRole().addAll(userRoles);
			local = this.userRepo.save(users);	
		}	
		return local;
	}

	// update User
	@Override
	public Users getUser(String username) {
	
		return this.userRepo.findByUserName(username);
	}

	@Override
	public void deleteUser(Long userId) {
		this.userRepo.deleteById(userId);
	}
 
}
