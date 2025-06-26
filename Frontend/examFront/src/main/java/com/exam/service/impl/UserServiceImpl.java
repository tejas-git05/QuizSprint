package com.exam.service.impl;

import java.util.Map;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.exam.entity.User;
import com.exam.entity.UserRole;
import com.exam.repository.RoleRepository;
import com.exam.repository.UserRepository;
import com.exam.service.UserService;

@Service
public class UserServiceImpl implements UserService{

	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	private RoleRepository roleRepository;
	
	
	
	// creating user
	@Override
    public User createUser(User user, Set<UserRole> userRole) throws Exception {

        User local = this.userRepository.findByUserName(user.getUserName());
        if (local != null) {
            throw new Exception("User is already present!!");
        } else {
            
            user.setPassword(user.getPassword());

            // Save roles
            for (UserRole ur : userRole) {
                roleRepository.save(ur.getRole());
            }

            user.getUserRoles().addAll(userRole);
            local = this.userRepository.save(user);
        }

        return local;
    }

	// getting user by user-name 
	@Override
	public User getUser(String username) {

		return this.userRepository.findByUserName(username);
	}

	@Override
	public void deleteUser(Long userId) {
		this.userRepository.deleteById(userId);
	}

}
