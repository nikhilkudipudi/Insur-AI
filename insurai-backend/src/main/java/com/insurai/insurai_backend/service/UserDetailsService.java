package com.insurai.insurai_backend.service;

import com.insurai.insurai_backend.entity.UserDetails;
import com.insurai.insurai_backend.repository.UserDetailsRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserDetailsService {

    @Autowired
    private UserDetailsRepository userDetailsRepository;

    public UserDetails registerUser(UserDetails user) {
        if (userDetailsRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new RuntimeException("Email already exists!");
        }
        return userDetailsRepository.save(user);
    }
}
