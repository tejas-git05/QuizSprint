package com.exam.controller;

import java.util.HashMap;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.exam.entity.Roles;
import com.exam.entity.UserRole;
import com.exam.entity.Users;
import com.exam.service.UserService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	// creating user
	@PostMapping("/create-user")
	public Users createUser(@RequestBody Users user )
	{
		Set<UserRole> roles = new HashSet<>();
		
		Roles role = new Roles();
		role.setRoleId(11L);  // for admin -12L
		role.setRoleName("NORMAL");  // for admin - ADMIN
		
		UserRole userRole = new UserRole();
		userRole.setUser(user);
		userRole.setRole(role);
		
		roles.add(userRole);
		
		return this.userService.createUser(user, roles);
	}
	
	// get user by userName
	@GetMapping("/{username}")
	public Users getUser(@PathVariable("username") String username) {
		return this.userService.getUser(username);
	}
	
	// delete user by userId
	@DeleteMapping("{userId}")
	public void deleteUser(@PathVariable("userId") Long userId)
	{
		this.userService.deleteUser(userId);
	}
	
	//login
	@PostMapping("/login")
	public ResponseEntity<?> loginUser (@RequestBody Map<String, String> loginData)
	{
		String username= loginData.get("userName");
		String password = loginData.get("password");
		
		Users user = userService.getUser(username);
		// check userName
		if(user == null) {
			return ResponseEntity.status(404).body("User not found");
		}
		// check password
		if(!user.getPassword().equals(password)) {
			return ResponseEntity.status(401).body("Invalid Credentials");
		}
		
		// Get the User's role
		String role = "NORMAL"; // Default role
		if(!user.getUserRole().isEmpty())
		{
			role = user.getUserRole().iterator().next().getRole().getRoleName();
		}
		
		//response with role information
	    Map<String, Object> response = new HashMap<>();
	    response.put("userId", user.getUserId());
	    response.put("userName", user.getUserName());
	    response.put("firstName", user.getFirstName());
	    response.put("lastName", user.getLastName());
	    response.put("email", user.getEmail());
	    response.put("phone", user.getPhone());
	    response.put("profile", user.getProfile());
	    response.put("role", role); 
	    
		return ResponseEntity.ok(response);	
	}
	
}










