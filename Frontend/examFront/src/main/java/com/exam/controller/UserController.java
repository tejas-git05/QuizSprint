package com.exam.controller;

import java.util.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.exam.entity.*;
import com.exam.service.UserService;

@RestController
@RequestMapping("/user")
@CrossOrigin("*")
public class UserController {
	
	@Autowired
	private UserService userService;
	
	// login using username and password
	@PostMapping("/login")
	public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginData) {
	    String username = loginData.get("username");
	    String password = loginData.get("password");

	    User user = userService.getUser(username); 
	    
	    if (user == null) {
	        return ResponseEntity.status(404).body("User not found");
	    }

	    if (!user.getPassword().equals(password)) {
	        return ResponseEntity.status(401).body("Invalid credentials");
	    }
	    
	    // Get the user's role
	    String role ="NORMAL";   // default role
	    if(!user.getUserRoles().isEmpty()) {
	    	role = user.getUserRoles().iterator().next().getRole().getRoleName();
	    }
	    
	 // Create response with role information
	    Map<String, Object> response = new HashMap<>();
	    response.put("userId", user.getUserId());
	    response.put("userName", user.getUserName());
	    response.put("firstName", user.getFirstName());
	    response.put("lastName", user.getLastName());
	    response.put("email", user.getEmail());
	    response.put("phone", user.getPhone());
	    response.put("profile", user.getProfile());
	    response.put("role", role);
	    
	    
	    return ResponseEntity.ok(response); // return the response Map instead of user object 
	}
	
	// creating user
	@PostMapping("/create-user")
	public User createUser(@RequestBody User user) throws Exception {
		
		Set<UserRole> roles = new HashSet<>();
		
		Role role = new Role();
		role.setRoleId(11L);   // for admin - 12L
		role.setRoleName("NORMAL");  // ADMIN
		
		UserRole userRole = new UserRole();
		userRole.setUser(user);
		userRole.setRole(role);
		
		roles.add(userRole);
				
		return this.userService.createUser(user, roles);
	}
	
	// get user by userName
	@GetMapping("/{username}")
	public User getUser(@PathVariable("username")String username) {
		return this.userService.getUser(username);
	}
	
	// delete user by userID
	@DeleteMapping("/{userId}")
	public void deleteUser(@PathVariable("userId")Long userId) {
		this.userService.deleteUser(userId);
	}

}// end class
