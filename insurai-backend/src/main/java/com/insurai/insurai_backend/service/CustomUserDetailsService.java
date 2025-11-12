package com.insurai.insurai_backend.service;

import com.insurai.insurai_backend.entity.UserDetails;
import com.insurai.insurai_backend.repository.UserDetailsRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Lazy;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.Optional;
@EnableWebSecurity
@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserDetailsRepository userDetailsRepository;
    private PasswordEncoder passwordEncoder;


    @Autowired
    public CustomUserDetailsService(UserDetailsRepository userDetailsRepository, @Lazy PasswordEncoder passwordEncoder) {
        this.userDetailsRepository = userDetailsRepository;
        this.passwordEncoder=passwordEncoder;
    }

    @Override
    public org.springframework.security.core.userdetails.UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDetails user = userDetailsRepository.findByEmail(username)
                .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));
        String role = user.getRole();
        return org.springframework.security.core.userdetails.User.builder()
                .username(user.getEmail())
                .password(user.getPassword())
                .roles(role)
                .build();
    }



    // Custom method for signup
    public UserDetails registerUser(com.insurai.insurai_backend.dto.SignUpRequest request) {
        UserDetails newUser = new UserDetails();
        newUser.setEmail(request.getEmail());
        newUser.setFullName(request.getFullName());
        newUser.setPassword((request.getPassword()));


        if (request.getRole() != null && !request.getRole().isEmpty()) {
            newUser.setRole(request.getRole().toUpperCase());
        } else {
            newUser.setRole("USER");
        }
        return userDetailsRepository.save(newUser);
    }

    public Optional<UserDetails> findByEmail(String email) {
        return userDetailsRepository.findByEmail(email);
    }




}

