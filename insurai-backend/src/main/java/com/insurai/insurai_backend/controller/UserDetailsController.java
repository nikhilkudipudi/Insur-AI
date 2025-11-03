package com.insurai.insurai_backend.controller;

import com.insurai.insurai_backend.entity.UserDetails;
import com.insurai.insurai_backend.security.JWTUtil;
import com.insurai.insurai_backend.security.JWTUtil;
import com.insurai.insurai_backend.service.CustomUserDetailsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/user")
@CrossOrigin(origins = "http://localhost:5173")
public class UserDetailsController {

    @Autowired
    private CustomUserDetailsService userDetailsService;

    @Autowired
    private JWTUtil jwtUtil;

    // ✅ Get user info from token
    @GetMapping("/profile")
    public ResponseEntity<?> getUserProfile(@RequestHeader("Authorization") String tokenHeader) {
        try {
            String token = tokenHeader.substring(7); // remove "Bearer "
            String email = jwtUtil.extractUsername(token);

            return ResponseEntity.ok(userDetailsService.findByEmail(email));


        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Invalid token or user not found!");
        }
    }
}
